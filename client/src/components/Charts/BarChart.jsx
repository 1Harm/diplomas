<<<<<<< HEAD:client/src/components/Charts/BarChart.jsx
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  BarSeries,
  Category,
  Legend,
  Tooltip
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { linearRegression, linearRegressionLine } from 'simple-statistics';

const BarChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrediction, setShowPrediction] = useState(false);
=======
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, BarSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BarChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/components/Charts/BarChart.jsx
  const userId = localStorage.getItem('userId');
  const currentYear = new Date().getFullYear();
  const startYear = 2000;

  const generateYearsRange = (start, end) => {
    let years = [];
    for (let year = start; year <= end; year++) {
      years.push(year.toString());
    }
    return years;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchRevenueData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/companies/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const companies = response.data;
        const promises = companies.map(company => axios.get(`http://localhost:8080/api/companies/${company._id}/revenue-by-month-and-year`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }));

        const revenueResponses = await Promise.all(promises);
        const revenueData = revenueResponses.map(response => response.data);

        if (isMounted) {
          const yearsRange = generateYearsRange(startYear, currentYear);
          const completeData = revenueData.map(revenue => {
            let yearMap = {};
            yearsRange.forEach(year => {
              yearMap[year] = 0;
            });

            for (const [year, monthData] of Object.entries(revenue)) {
              yearMap[year] = Object.values(monthData).reduce((acc, total) => acc + total, 0);
            }

            return Object.entries(yearMap).map(([year, total]) => ({ year, total }));
          });

          setRevenueData(completeData);
          setLoading(false);
        }
      } catch (error) {
<<<<<<< HEAD:client/src/components/Charts/BarChart.jsx
        console.error('Ошибка при получении данных о доходах:', error);
=======
        if (error.response && error.response.status === 403) {
          navigate('/forbidden');
        } else {
          console.error('Error fetching company data:', error);
        }
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/components/Charts/BarChart.jsx
      }
    };

    if (userId) {
      fetchRevenueData();
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

<<<<<<< HEAD:client/src/components/Charts/BarChart.jsx
  const handlePrediction = () => {
    const futureYears = generateYearsRange(currentYear + 1, currentYear + 5);
    const predictedData = revenueData.map(companyData => {
      const validData = companyData.map(data => ([parseInt(data.year), data.total])).filter(data => !isNaN(data[1]));
      const regression = linearRegression(validData);
      const predict = linearRegressionLine(regression);

      return futureYears.map(year => ({
        year: year.toString(),
        total: predict(year)
      }));
    });

    setPredictedData(predictedData);
    setShowPrediction(true);
  };

  if (loading) {
    return <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">Загрузка...</div>;
  }

  const allData = showPrediction ? [...revenueData, ...predictedData] : revenueData;
  const maxRevenue = Math.max(...allData.flatMap(data => data.map(d => d.total)));
  const yAxisMax = maxRevenue + 10000;

  return (
    <div>
      <ChartComponent
        id="bar-chart"
        height="620px"
        primaryXAxis={{ valueType: 'Category', title: 'Year' }}
        primaryYAxis={{ valueType: 'Double', minimum: 0, maximum: yAxisMax }}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        legendSettings={{ visible: true }}
      >
        <Inject services={[BarSeries, Category, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          {revenueData.map((revenue, index) => (
            <SeriesDirective key={index} dataSource={revenue} xName="year" yName="total" type="Bar" marker={{ visible: true }} />
          ))}
          {showPrediction && predictedData.map((prediction, index) => (
            <SeriesDirective key={`prediction-${index}`} dataSource={prediction} xName="year" yName="total" type="Bar" name={`Prediction`} marker={{ visible: true }} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none mb-15 "
        onClick={handlePrediction}>Prediction</button>
    </div>
=======
  if (loading) {
    return <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">Loading...</div>;
  }

  const maxRevenue = Math.max(...revenueData.flatMap(data => data.map(d => d.total)));
  const yAxisMax = maxRevenue + 10000;

  return (
    <ChartComponent
      id="bar-chart"
      height="620px"
      primaryXAxis={{ valueType: 'Category', title: 'Year' }}
      primaryYAxis={{ valueType: 'Double', minimum: 0, maximum: yAxisMax }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{ visible: true }}
    >
      <Inject services={[BarSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {revenueData.map((revenue, index) => (
          <SeriesDirective key={index} dataSource={revenue} xName="year" yName="total" type="Bar" marker={{ visible: true }} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/components/Charts/BarChart.jsx
  );
};

export default BarChart;
