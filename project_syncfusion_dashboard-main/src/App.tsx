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
import CompanyDetails from "./pages/Company/CompanyDetails.jsx";
import CompanyCVS from "./pages/Company/UploadCSV.jsx";
import CompanyCSV from "./pages/Company/CompanyCSV.jsx";
import CompanyDataGrid from "./pages/Company/CompanyDataGrid.jsx";
import { ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme.ts";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import RevenuePage from "./pages/Dashboard/DashboardPage.jsx";
import Graph from "./components/Charts/Graph.jsx";
import CompanyChart from "./components/Charts/CompanyChart.jsx";
import CompanyChartPage from "./pages/Company/CompanyChartPage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import BarChart from "./components/Charts/BarChart.jsx";
import PieChart from "./components/Charts/PieChart.jsx";
import HistogramChart from "./components/Charts/HistogramChart.jsx";
import AreaChart from "./components/Charts/AreaChart.jsx";
import LineChartByMonth from "./components/Charts/ChartsByMonth/LineChartByMonth.jsx";
import BarChartByMonths from "./components/Charts/ChartsByMonth/BarChartByMonths.jsx";
import PieChartByMonths from "./components/Charts/ChartsByMonth/PieChartByMonths.jsx";
import HistogramChartByMonths from "./components/Charts/ChartsByMonth/HistogramChartByMonths.jsx";
import AreaChartByMonths from "./components/Charts/ChartsByMonth/AreaChartByMonths.jsx";
import RevenueByCategoryChart from "./components/Charts/ChartsByMonth/ByCategory/RevenueByCategoryChart.jsx";
import TestCategory from "./components/Charts/ChartsByMonth/TestCategory.jsx";
import BarChartByCategoryCity from "./components/Charts/ChartsByMonth/BarChartByCategoryCity.jsx";
import TestBarChart from "./components/Charts/ChartsByMonth/ByFields/BarChartByFields.jsx";
import TestPieChart from "./components/Charts/ChartsByMonth/ByFields/PieChartByFields.jsx";
import TestHistogram from "./components/Charts/ChartsByMonth/TestHistogram.jsx";
import Prediction from "./components/Charts/PredictionLineChart.jsx";
import LineChart from "./components/Charts/LineChart.jsx";
import BarChartByFields from "./components/Charts/ChartsByMonth/ByFields/BarChartByFields.jsx";
import PieChartByFields from "./components/Charts/ChartsByMonth/ByFields/PieChartByFields.jsx";
import PredictionLineChart from "./components/Charts/PredictionLineChart.jsx";

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

                  {/* companies  */}
                  <Route path="/create-company" element={<CreateCompany />} />
                  <Route path="/companies" element={<CompanyList />} />
                  <Route path="/companies/:companyId" element={<CompanyDataGrid />} />
                  <Route path="/companies/:companyId/upload" element={<CompanyCSV />} />
                  <Route path="/companies/:companyId/revenue" element={<RevenuePage />} />
                  <Route path="/companies/:companyId/dashboard" element={<DashboardPage />} />
                  <Route path="/companies/:companyId/chart" element={<CompanyChartPage />} />

                  {/* graphs  */}
                  <Route path="/linechart" element={<LineChart />} />
                  <Route path="/barchart" element={<BarChart />} />
                  <Route path="/piechart" element={<PieChart />} />
                  <Route path="/histogramchart" element={<HistogramChart />} />
                  <Route path="/areachart" element={<AreaChart />} />
                  
                  
                  <Route path="/linechart-by-months" element={<LineChartByMonth />} />
                  <Route path="/barchart-by-months" element={<BarChartByMonths />} />
                  <Route path="/piechart-by-months" element={<PieChartByMonths />} />
                  <Route path="/histogramchart-by-months" element={<HistogramChartByMonths />} />
                  <Route path="/areachart-by-months" element={<AreaChartByMonths />} />
                  
                  <Route path="/testbarchart" element={<BarChartByFields />} />
                  <Route path="/testpiechart" element={<PieChartByFields />} />
                  
                  <Route path="/prediction" element={<PredictionLineChart />} />
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
