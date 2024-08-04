// Chat.jsx
import Header from "../../components/common/Header";
import instance from "../../api/instance";
import { useState, useRef, useEffect } from "react";
import HoyaChatProfile from "../../assets/icons/HoyaChatProfile.png";
import "./style.css";

export default function Chat() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { content: input, role: "user" }
    ]);
    setInput("");

    setChatHistory((prevHistory) => [
      ...prevHistory,
      { content: "호야가 생각하고 있어요.", role: "hoya", loading: true }
    ]);

    setIsLoading(true);

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

      setChatHistory((prevHistory) => [
        ...prevHistory.slice(0, -1),
        { content, role: "hoya" }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
      }
      console.log(container.scrollTop);
    }
  }, [chatHistory]);

  return (
    <div>
      <Header title="호야와 채팅하기" backLink="/" />

      <div className="chat_container" ref={chatContainerRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.role}`}>
            {chat.role === "hoya" && (
              <div className="hoya_chat_section">
                <img
                  className="hoya_chat_img"
                  src={HoyaChatProfile}
                  alt="hoya"
                />
                <div
                  className={`chat_section hoya ${chat.loading ? "loading" : ""}`}
                >
                  {chat.content}
                </div>
              </div>
            )}

            {chat.role === "user" && (
              <div className="user_chat_section">
                <div className="chat_section">{chat.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="form_wrap">
        <div className="input_wrap">
          <input
            type="text"
            className="messageInput"
            value={input}
            onChange={handleInputChange}
            placeholder="메시지를 입력하세요."
          />
        </div>

        <button type="submit" className="chat_submitBtn">
          전송
        </button>
      </form>
    </div>
  );
}
