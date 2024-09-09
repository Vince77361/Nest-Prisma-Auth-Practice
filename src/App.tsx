import { useState } from "react";
import axios from "axios";

const App = () => {
  // 그냥 로그인 기능만 구현함
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("토큰이 없습니다");
      return;
    }
    await axios
      .get("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => console.log(r.data));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = {
        email: email,
        password: password,
      };
      await axios
        .post("http://localhost:3000/auth/login", formData)
        .then((r) => localStorage.setItem("token", r.data.access_token));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          placeholder="이메일"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
        />
        <input
          id="password"
          placeholder="비밀번호"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          value={password}
        />
        <input type="submit" value="로그인" />
      </form>
      <button onClick={onClick}>내 프로필 보기</button>
    </div>
  );
};

export default App;
