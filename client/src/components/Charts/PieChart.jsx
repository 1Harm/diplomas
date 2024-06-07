<<<<<<< HEAD:client/src/components/Charts/PieChart.jsx
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationLegend,
  Tooltip
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { linearRegression, linearRegressionLine } from 'simple-statistics';

const PieChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrediction, setShowPrediction] = useState(false);
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
=======
import { 
  AccumulationChartComponent, 
  AccumulationSeriesCollectionDirective, 
  AccumulationSeriesDirective, 
  PieSeries, 
  AccumulationDataLabel, 
  Inject, 
  AccumulationLegend, 
  Tooltip 
} from '@syncfusion/ej2-react-charts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PieChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/components/Charts/PieChart.jsx

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
        console.log(revenueData);

        if (isMounted) {
          const completeData = revenueData.map(revenue => {
            let yearMap = {};

            for (const [year, monthData] of Object.entries(revenue)) {
              yearMap[year] = Object.values(monthData).reduce((acc, total) => acc + total, 0);
            }

            return Object.entries(yearMap).map(([year, total]) => ({ x: year, y: total }));
          });

          setRevenueData(completeData.flat());
          setLoading(false);
        }
      } catch (error) {
<<<<<<< HEAD:client/src/components/Charts/PieChart.jsx
        console.error('Ошибка при получении данных о доходах:', error);
=======
        if (error.response && error.response.status === 403) {
          navigate('/forbidden');
        } else {
          console.error('Error fetching company data:', error);
        }
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/components/Charts/PieChart.jsx
      }
    };

    if (userId) {
      fetchRevenueData();
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

<<<<<<< HEAD:client/src/components/Charts/PieChart.jsx
  const handlePrediction = () => {
    const futureYears = generateYearsRange(currentYear + 1, currentYear + 5);
    const validData = revenueData.map(data => ([parseInt(data.x), data.y])).filter(data => !isNaN(data[1]));
    const regression = linearRegression(validData);
    const predict = linearRegressionLine(regression);

    const prediction = futureYears.map(year => ({
      x: year.toString(),
      y: predict(year)
    }));

    setPredictedData(prediction);
    setShowPrediction(true);
  };

  if (loading) {
    return <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">Загрузка...</div>;
  }

  const allData = showPrediction ? [...revenueData, ...predictedData] : revenueData;

  return (
    <div>
      <AccumulationChartComponent
        id="pie-chart"
        legendSettings={{ visible: true }}
        tooltip={{ enable: true }}
      >
        <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, Tooltip]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={allData}
            xName="x"
            yName="y"
            type="Pie"
            dataLabel={{
              visible: true,
              position: 'Outside',
              connectorStyle: { length: '10%' },
              name: 'y',
              template: '<div>${point.y}</div>',
              font: {
                fontWeight: '600',
                color: '#000000'
              }
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none mb-15"
        onClick={handlePrediction}>Prediction</button>
    </div>
=======
  if (loading) {
    return <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">Loading...</div>;
  }

  return (
    <AccumulationChartComponent
      id="pie-chart"
      legendSettings={{ visible: true }}
      tooltip={{ enable: true }}
    >
      <Inject services={[PieSeries, AccumulationDataLabel, AccumulationLegend, Tooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={revenueData}
          xName="x"
          yName="y"
          type="Pie"
          dataLabel={{
            visible: true,
            position: 'Outside',
            connectorStyle: { length: '10%' },
            name: 'y',
            template: '<div>${point.y}</div>',
            font: {
              fontWeight: '600',
              color: '#000000'
            }
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/components/Charts/PieChart.jsx
  );
};

export default PieChart;
