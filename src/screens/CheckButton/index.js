import React from 'react';

const CheckButton = () => {
    return (
        <div
            className={`card ${
                selectedAnswer === index ? 'selected' : ''
                }`}
            key={index}
            onClick={() => handleSelectAnswer(index)}
        >
            <svg width="22" height="22" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="outer" cx="11" cy="11.3436" r="11" fill="#FBEAFE"/>
                <ellipse className="inner" cx="11" cy="11.5632" rx="9.16667" ry="8.97569" fill="white"/>
            </svg>
            <p>{answer}</p>
        </div>
    );
};

export default CheckButton;