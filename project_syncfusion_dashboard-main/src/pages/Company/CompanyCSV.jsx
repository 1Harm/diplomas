import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UploadCSV from './UploadCSV';

const CompanyCSV = () => {
    const { companyId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            navigate('/forbidden');
        } else {
            fetch('http://localhost:8080/api/auth/check-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.status !== 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate('/forbidden');
                }
            }).catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/forbidden');
            });
        }
    }, [navigate]);

    return <UploadCSV companyId={companyId} />;
};

export default CompanyCSV;
