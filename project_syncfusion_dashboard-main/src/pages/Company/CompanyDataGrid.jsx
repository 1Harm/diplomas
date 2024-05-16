import BoxHeader from "../../components/BoxHeader.tsx";
import DashboardBox from "../../components/DashboardBox.tsx";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const CompanyDataGrid = () => {
    const [companyData, setCompanyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { companyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/companies/${companyId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data && typeof response.data.data === 'object') {
                    const dataArray = Object.values(response.data.data);
                    const rows = dataArray[0].map((_, index) => {
                        const rowData = dataArray.map((column) => column[index]);
                        return {
                            id: index,
                            ...rowData.reduce((acc, value, i) => {
                                const columnName = Object.keys(response.data.data)[i];
                                acc[columnName] = value;
                                return acc;
                            }, {})
                        };
                    });
                    setCompanyData(rows);
                } else {
                    console.error('Error fetching company data: Data is not in the expected format');
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [companyId]);

    const columns = companyData.length > 0 ? Object.keys(companyData[0]).map((columnName) => ({
        field: columnName,
        headerName: columnName,
        flex: 1,
        autoWidth: true,
    })) : [];

    const handleUploadPageRedirect = () => {
        navigate(`/companies/${companyId}/upload`);
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            {loading ? (
                <p className="text-xl font-semibold">Loading company data...</p>
            ) : (
                <>
                    {companyData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-xl font-semibold">Company data not loaded</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none" onClick={handleUploadPageRedirect}>
                                Upload data
                            </button>
                        </div>
                    ) : (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                columnHeaderHeight={25}
                                rowHeight={35}
                                rows={companyData}
                                columns={columns}
                                sx={{
                                    '& .MuiDataGrid-root': {
                                        color: 'grey.300',
                                        border: 'none',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        color: 'black',
                                        borderBottom: '1px solid grey.800 !important',
                                    },
                                    '& .MuiDataGrid-columnHeaders': {
                                        borderBottom: '1px solid grey.800 !important',
                                    },
                                    '& .MuiDataGrid-columnSeparator': {
                                        visibility: 'hidden',
                                    },
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CompanyDataGrid;
