import React, { useEffect, useRef, useContext } from 'react';

import { QuestionContext } from '../../Context/QuestionContext';

const Result = ({ result, handleNextQuestion }) => {
    const resultScreen = useRef(null);
    const correctAnswerScreen = useRef(null);
    const wrongAnswerScreen = useRef(null);
    const alertAnswerScreen = useRef(null);

    const {
        userResults,
        setUserResults
    } = useContext(QuestionContext);

    const possibleResults = {
        success() {
            resultScreen.current.style.display = 'flex';
            correctAnswerScreen.current.style.display = 'flex';
            const newResults = [...userResults, true];
            setUserResults(newResults);
        },

        error() {
            resultScreen.current.style.display = 'flex';
            wrongAnswerScreen.current.style.display = 'flex';
            const newResults = [...userResults, false];
            setUserResults(newResults);
        },

        alert() {
            resultScreen.current.style.display = 'flex';
            alertAnswerScreen.current.style.display = 'flex';
        }
    };

    useEffect(() => {
        const showResultFunction = possibleResults[result.message];

        if (showResultFunction) {
            showResultFunction();
        }
    }, [result]);

    return (
        <div
            className={`result`}
            ref={resultScreen}
        >
            <div 
                className="success" 
                ref={correctAnswerScreen}
            >
                <span className="material-icons md-128">
                    check_circle_outline
                </span>

                <h1>Very well! You got the question right!</h1>

                <button
                    className="navigate"
                    onClick={() => {
                        resultScreen.current.style.display = 'none';
                        correctAnswerScreen.current.style.display = 'none';
                        handleNextQuestion();
                    }}
                >
                    Next answer 
                    <span className="material-icons md-36">
                        arrow_right_alt
                    </span>
                </button>
            </div>

            <div className="error" ref={wrongAnswerScreen}>
                <span className="material-icons md-128">
                    highlight_off
                </span>
                <h1>Ooops! You got the question wrong!</h1>
                <button 
                    onClick={() => {
                        resultScreen.current.style.display = 'none';
                        wrongAnswerScreen.current.style.display = 'none';
                        handleNextQuestion();
                    }}
                    className="navigate"
                >
                    Next answer
                    <span className="material-icons md-36">
                        arrow_right_alt
                    </span>
                </button>
            </div>

            <div className="alert" ref={alertAnswerScreen}>
                <span className="material-icons md-128">
                    info
                </span>
                <h1>Ooops! Choose an alternative!</h1>
                <button 
                    onClick={() => {
                        resultScreen.current.style.display = 'none';
                        alertAnswerScreen.current.style.display = 'none';
                    }}
                    className="navigate"
                >

                    <span className="material-icons md-36">
                        keyboard_backspace
                    </span>
                    Go back
                </button>
            </div>
        </div>
    );
};

export default Result;