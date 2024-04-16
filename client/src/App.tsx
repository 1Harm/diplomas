import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings, FiMessageCircle } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaTelegram } from "react-icons/fa";

import { Navbar, Footer, Sidebar, ThemeSettings, ChatBot } from "./components";
import {
  Landing,
  Ecommerce,
  ChatAI,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  DataInput,
  DropFile,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  SignIn,
} from "./pages/index.tsx";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    ChatModalOpen,
    setChatModalOpen,
    isLoggedIn, // Добавлено состояние авторизации
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>

        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="ChatBot" position="Top">
              <button
                type="button"
                onClick={() => setChatModalOpen(true)}
                style={{
                  background: currentColor,
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiMessageCircle />
              </button>
            </TooltipComponent>{" "}
            <a
              href="https://t.me/eanalitics_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TooltipComponent content="TelegramBot" position="Top">
                <button
                  type="button"
                  style={{
                    background: currentColor,
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FaTelegram />
                </button>
              </TooltipComponent>{" "}
            </a>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              {ChatModalOpen && <ChatBot />}
              <Routes>
                <Route path="/ecommerce" element={<Ecommerce />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/chatai" element={<ChatAI />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/data-input" element={<DataInput />} />
                <Route path="/drop-file" element={<DropFile />} />
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
