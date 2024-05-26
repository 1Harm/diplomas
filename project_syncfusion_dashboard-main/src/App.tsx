import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
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
  Editor,
} from "./pages/index.tsx";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider.js";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import CreateCompany from "./pages/Company/CreateCompany.jsx";
import CompanyList from "./pages/Company/CompanyList.jsx";
import CompanyCSV from "./pages/Company/CompanyCSV.jsx";
import CompanyDataGrid from "./pages/Company/CompanyDataGrid.jsx";
import { ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import BarChart from "./components/Charts/BarChart.jsx";
import PieChart from "./components/Charts/PieChart.jsx";
import HistogramChart from "./components/Charts/HistogramChart.jsx";
import AreaChart from "./components/Charts/AreaChart.jsx";
import LineChartByMonth from "./components/Charts/ChartsByMonth/LineChartByMonth.jsx";
import BarChartByMonths from "./components/Charts/ChartsByMonth/BarChartByMonths.jsx";
import PieChartByMonths from "./components/Charts/ChartsByMonth/PieChartByMonths.jsx";
import HistogramChartByMonths from "./components/Charts/ChartsByMonth/HistogramChartByMonths.jsx";
import AreaChartByMonths from "./components/Charts/ChartsByMonth/AreaChartByMonths.jsx";
import LineChart from "./components/Charts/LineChart.jsx";
import BarChartByFields from "./components/Charts/ChartsByMonth/ByFields/BarChartByFields.jsx";
import PieChartByFields from "./components/Charts/ChartsByMonth/ByFields/PieChartByFields.jsx";
import PredictionLineChart from "./components/Charts/PredictionLineChart.jsx";
import Forbidden from "./pages/HttpStatuses/Forbidden.jsx";
import ProtectedRoute from "./components/Exceptions/ProtectedRoute.jsx";
import NotFound from "./pages/HttpStatuses/NotFound.jsx";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="flex relative dark:bg-main-dark-bg">
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* auth  */}
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/forbidden" element={<Forbidden />} />

                  {/* companies  */}
                  <Route path="/create-company" element={<ProtectedRoute><CreateCompany /></ProtectedRoute>} />
                  <Route path="/companies" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
                  <Route path="/companies/:companyId" element={<ProtectedRoute><CompanyDataGrid /></ProtectedRoute>} />
                  <Route path="/companies/:companyId/upload" element={<ProtectedRoute><CompanyCSV /></ProtectedRoute>} />

                  {/* graphs */}
                  <Route path="/linechart" element={<ProtectedRoute><LineChart /></ProtectedRoute>} />
                  <Route path="/barchart" element={<ProtectedRoute><BarChart /></ProtectedRoute>} />
                  <Route path="/piechart" element={<ProtectedRoute><PieChart /></ProtectedRoute>} />
                  <Route path="/histogramchart" element={<ProtectedRoute><HistogramChart /></ProtectedRoute>} />
                  <Route path="/areachart" element={<ProtectedRoute><AreaChart /></ProtectedRoute>} />

                  <Route path="/linechart-by-months" element={<ProtectedRoute><LineChartByMonth /></ProtectedRoute>} />
                  <Route path="/barchart-by-months" element={<ProtectedRoute><BarChartByMonths /></ProtectedRoute>} />
                  <Route path="/piechart-by-months" element={<ProtectedRoute><PieChartByMonths /></ProtectedRoute>} />
                  <Route path="/histogramchart-by-months" element={<ProtectedRoute><HistogramChartByMonths /></ProtectedRoute>} />
                  <Route path="/areachart-by-months" element={<ProtectedRoute><AreaChartByMonths /></ProtectedRoute>} />

                  <Route path="/testbarchart" element={<ProtectedRoute><BarChartByFields /></ProtectedRoute>} />
                  <Route path="/testpiechart" element={<ProtectedRoute><PieChartByFields /></ProtectedRoute>} />

                  <Route path="/prediction" element={<ProtectedRoute><PredictionLineChart /></ProtectedRoute>} />

                  {/* NotFound route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
