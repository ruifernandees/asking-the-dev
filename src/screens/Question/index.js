import React, { useState, useEffect, useRef } from 'react';

import RadioButton from './RadioButton';
import api from '../../services/api';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [question, setQuestion] = useState([]);

    const resultScreen = useRef(null);
    const correctAnswerScreen = useRef(null);
    const wrongAnswerScreen = useRef(null);
    const alertAnswerScreen = useRef(null);

    useEffect(() => {
        api.get('?amount=1&category=18&difficulty=easy&type=multiple')
            .then(response => {
                // console.log(response.data);
                const result = response.data.results[0];

                const allAnswers = [
                    ...result.incorrect_answers,
                    result.correct_answer
                ];

                const shuffle = (arr) => {
                    for (let i = arr.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * i)
                        const temp = arr[i]
                        arr[i] = arr[j]
                        arr[j] = temp
                    }
                    return arr;
                }

                const shuffledAllAnswers = shuffle(allAnswers);
                const filteredResult = {
                    ...result,
                    allAnswers: shuffledAllAnswers
                }

                setQuestion([filteredResult]);
            });
    }, []);

    function handleSelectAnswer(index) {
        setSelectedAnswer(index);
    }

    function handleSend(selectedAnswer) {
        if (selectedAnswer < 0 || selectedAnswer > 4) {
            resultScreen.current.style.display = 'flex';
            alertAnswerScreen.current.style.display = 'flex';
            return;
        }

        const allAnswers = question[0].allAnswers;
        const found = allAnswers.find(item => allAnswers.indexOf(item) === selectedAnswer);

        const isCorrect = (question[0].correct_answer === found);
        if (isCorrect) {
            resultScreen.current.style.display = 'flex';
            correctAnswerScreen.current.style.display = 'flex';
        } else {
            resultScreen.current.style.display = 'flex';
            wrongAnswerScreen.current.style.display = 'flex';
        }
        // console.log(selectedAnswer);
        // console.log(allAnswers);
        // console.log(found);
    }

    return (
        <section className="question">
            <img className="logo" src={logo} alt="Asking the Dev logo" />
            {/* <h1>{question.map((item) => {
                return item.question;
            })}</h1> */}
            <h1>{question.map(item => item.question)}</h1>

            <div
                className={`result`}
                ref={resultScreen}
            >
                <div className="success" ref={correctAnswerScreen}>
                    <span className="material-icons md-128">
                        check_circle_outline
                    </span>

                    <h1>Very well! You got the question right!</h1>

                    <button
                        className="navigate"
                        onClick={() => {
                            resultScreen.current.style.display = 'none';
                            correctAnswerScreen.current.style.display = 'none';
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
                        }}
                        className="navigate"
                    >

                        <span className="material-icons md-36">
                            keyboard_backspace
                        </span>
                        Go back
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

            <div className="cards">
                {question.map((item) => {
                    const allAnswers = item.allAnswers;
                    return allAnswers.map((answer) => {
                        const index = allAnswers.indexOf(answer);
                        return (
                            <div
                                className={`card ${
                                    selectedAnswer === index ? 'selected' : ''
                                    }`}
                                key={index}
                                onClick={() => handleSelectAnswer(index)}
                            >
                                <RadioButton />
                                <p>{answer}</p>
                            </div>
                        );
                    })
                })}
            </div>

            <button className="send" onClick={() => handleSend(selectedAnswer)}>Send</button>
        </section>
    );
};

export default Question;