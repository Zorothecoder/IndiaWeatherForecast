import React from 'react';

const About = () => {
    const abt = {
        fontSize: '16px',
        color: 'white',
        fontWeight: '500'
    }
    return (
        <div className="mt-3 container">
            <div className="about">
                <h3 style={{ color: 'white' }}>About Our Weather Forecast App</h3>
                <p style={abt}>Welcome to ICWF, our weather forecasting application for Indian cities</p>
                <p style={abt}>Get accurate 5-day forecasts</p>
            </div>
        </div>
    );
}

export default About;
