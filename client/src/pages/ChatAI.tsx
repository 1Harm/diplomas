import React, { useState, useRef, useEffect } from "react";
import { Header } from "../components/index.jsx";

const ChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState();
  const [result, setResult] = useState();

  const handleQuestionChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    if (inputText) {
      formData.append("question", inputText);
    }

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.result);
        setMessages([
          ...messages,
          { text: inputText, sender: "user" },
          { text: "Привет, вы написали: " + inputText, sender: "bot" },
          { text: "Результат: " + data.result, sender: "bot" },
        ]);
        setInputText("");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Чат с ботом AI" />
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={inputText}
            onChange={handleQuestionChange}
            placeholder="Введите ваше сообщение..."
            className="chat-input"
          />
          <button type="submit" className="send-button">
            Отправить
          </button>
        </form>
        <form className="upload-form" onSubmit={handleSubmit}>
          <label className="block mb-2 font-bold text-gray-700" htmlFor="file">
            Загрузить файл CSV:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-3"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!file || !inputText}
          >
            Загрузить
          </button>
        </form>
      </div>
      <p className="text-gray-700 font-bold">Result: {result}</p>
    </div>
  );
};

export default ChatAI;
