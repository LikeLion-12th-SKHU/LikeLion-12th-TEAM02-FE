// Chat.jsx
import Menubar from "../../components/common/Menubar";
import Header from "../../components/common/Header";
import instance from "../../api/instance";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setInput("");
    setChatHistory((prevHistory) => [...prevHistory, { content: input }]);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await instance.post(
        `/api/v1/hoya/chat?prompt=${input}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const { content } = response.data.data.choices[0].message;

      setChatHistory((prevHistory) => [...prevHistory, { content }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header title="호야와 채팅하기" backLink="/" />
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>{chat.content}</div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요."
        />
        <button type="submit">전송</button>
      </form>
      <Menubar />
    </div>
  );
}
