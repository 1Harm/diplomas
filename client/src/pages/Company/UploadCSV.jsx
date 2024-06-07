import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD:client/src/pages/Company/UploadCSV.jsx
import '../../components/drop-file-input.css';
import uploadImg from '../../assets/cloud-upload-regular-240.png';

=======
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/pages/Company/UploadCSV.jsx
const UploadCSV = ({ companyId }) => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
<<<<<<< HEAD:client/src/pages/Company/UploadCSV.jsx
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
        } else {
            alert('Пожалуйста, выберите файл CSV.');
        }
=======
        setFile(e.target.files[0]);
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/pages/Company/UploadCSV.jsx
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/companies/${companyId}/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
<<<<<<< HEAD:client/src/pages/Company/UploadCSV.jsx
            alert('Файл успешно загружен.');
=======
            alert('File successfully uploaded.');
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/pages/Company/UploadCSV.jsx
            navigate('/company');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                navigate('/forbidden');
            } else {
<<<<<<< HEAD:client/src/pages/Company/UploadCSV.jsx
                console.error('Ошибка при загрузке файла:', error);
                alert('Ошибка при загрузке файла. Пожалуйста, попробуйте еще раз.');
=======
                console.error('Error during uploading file:', error);
                alert('Error during uploading file. Please, try again.');
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/pages/Company/UploadCSV.jsx
            }
        }
    };

    return (
<<<<<<< HEAD:client/src/pages/Company/UploadCSV.jsx
        <div className="h-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <h2 className="flex flex-col items-center justify-center text-xl font-semibold mb-4">Upload data of your company in CSV file</h2>
            <div className="drop-file-input">
                <div className="drop-file-input__label ">
                    <img src={uploadImg} alt="Загрузить файл" />
                    <p>Drop your file</p>
                </div>
                <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            {file && (
                <div className="drop-file-preview mt-4">
                    <div className="drop-file-preview__item">
                        <p>{file.name}</p>
                        <p>{file.size} байт</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center">
                <button
                    onClick={handleUpload}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                >
                    Upload your data
                </button>
            </div>
=======
        <div>
            <h2>Upload Your Company Data</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
>>>>>>> 33638dd01c1bd47871b3b68ebcfc98ed05ccee44:project_syncfusion_dashboard-main/src/pages/Company/UploadCSV.jsx
        </div>
    );
};

export default UploadCSV;
