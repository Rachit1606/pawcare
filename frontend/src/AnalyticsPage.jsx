import React from 'react';
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  return (
    <div>
      <h1>Analytics Data</h1>      
      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="400"  
        height="250"
        src="https://charts.mongodb.com/charts-pawcare_backend-vrpbisz/embed/charts?id=66b3119c-78bb-412b-8c92-1adf7172684d&maxDataAge=300&theme=light&autoRefresh=true"
        title="MongoDB Chart 1"
      ></iframe>

      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="400"  
        height="250" 
        src="https://charts.mongodb.com/charts-pawcare_backend-vrpbisz/embed/charts?id=66b3128e-a1cf-4402-88d2-ca70a5c9a880&maxDataAge=300&theme=light&autoRefresh=true"
        title="MongoDB Chart 2"
      ></iframe>

      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="400"
        height="250" 
        src="https://charts.mongodb.com/charts-pawcare_backend-vrpbisz/embed/charts?id=66b3135d-9fea-4423-8b2d-5c2a4561d183&maxDataAge=300&theme=light&autoRefresh=true"
        title="MongoDB Chart 3"
      ></iframe>

      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="400"  
        height="250" 
        src="https://charts.mongodb.com/charts-pawcare_backend-vrpbisz/embed/charts?id=66b31440-9fea-4feb-8e6f-5c2a45697a80&maxDataAge=300&theme=light&autoRefresh=true"
        title="MongoDB Chart 4"
      ></iframe>

      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="400"  
        height="250" 
        src="https://charts.mongodb.com/charts-pawcare_backend-vrpbisz/embed/charts?id=66b314dc-b3a3-4218-850e-3e9709ef8409&maxDataAge=300&theme=light&autoRefresh=true"
        title="MongoDB Chart 5"
      ></iframe>

      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
        }}
        width="400"  
        height="250" 
        src="https://charts.mongodb.com/charts-pawcare_backend-vrpbisz/embed/charts?id=66b31603-78bb-4f5d-8e3a-1adf718e89d4&maxDataAge=300&theme=light&autoRefresh=true"
        title="MongoDB Chart 6"
      ></iframe>
    </div>
  );
};

export default AnalyticsPage;