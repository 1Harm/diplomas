import React, { useState } from 'react';

const CreateCompany = () => {
    const [companyData, setCompanyData] = useState({
        name: '',
        industry: '',
        // Другие поля компании
    });

    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            console.log('TOKEN = ', token);
            console.log('USER ID = ', userId);

            const companyDataWithOwnerId = {
                ...companyData,
                ownerId: userId
              };
            // Отправка данных о создаваемой компании на сервер
            const response = await fetch('http://localhost:8080/api/companies/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(companyDataWithOwnerId)
            });
            if (response.ok) {
                console.log('Company created successfully!');
                // Можно выполнить перенаправление на другую страницу
            } else {
                console.log('Failed to create company');
            }
        } catch (error) {
            console.error('Error during company creation:', error);
        }
    };

    return (
        <div>
            <h2>Create Company</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={companyData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Industry:</label>
                    <input type="text" name="industry" value={companyData.industry} onChange={handleChange} />
                </div>
                {/* Добавьте другие поля компании, например: */}
                {/* <div>
          <label>Employees:</label>
          <input type="number" name="employees" value={companyData.employees} onChange={handleChange} />
        </div> */}
                {/* Другие поля компании */}
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateCompany;
