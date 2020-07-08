import React, { useState, useEffect, useContext } from 'react';

import RadioButton from './RadioButton';
import Result from './Result';
import Load from '../Load';
import { QuestionContext } from '../../Context/QuestionContext';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = ({ currentQuestion }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [allAnswers, setAllAnswers] = useState([]);
    const [result, setResult] = useState({message: "", selectedAnswer: -1});

    const {
        currentQuestionIndex,
        setCurrentQuestionIndex,
        setPlaying,
        setFinished
    } = useContext(QuestionContext);

    useEffect(() => {
        setAllAnswers(currentQuestion.allAnswers);
    }, [currentQuestion]);

    function handleSelectAnswer(index) {
        setSelectedAnswer(index);
    }

    function handleSend(selectedAnswer) {
        if (selectedAnswer < 0 || selectedAnswer > 4) {
            setResult({
                message: "alert",
                selectedAnswer
            });
            return;
        }

        const found = allAnswers.find(item => allAnswers.indexOf(item) === selectedAnswer);

        const isCorrect = (currentQuestion.correct_answer === found);
        if (isCorrect) {
            setResult({
                message: "success",
                selectedAnswer
            });
        } else {
            setResult({
                message: "error",
                selectedAnswer
            });
        }
    }

    function handleNextQuestion() {
        setSelectedAnswer(-1);
        
        if (currentQuestionIndex < 9) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }

        if (currentQuestionIndex >= 9) {
            setPlaying(false);
            setFinished(true);
        }
    }

    return (
        <section className="question">
            <img className="logo" src={logo} alt="Asking the Dev logo" />
            <h1>{currentQuestion.question}</h1>

            <Result result={result} handleNextQuestion={handleNextQuestion} />
            
            <div className="currentQuestion">
                {currentQuestionIndex + 1}/10
            </div>
            <div className="cards">
                {allAnswers ? 
                    allAnswers.map(answer => {
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
                    }) :
                    <Load />
                }
            </div>

            <button className="send" onClick={() => handleSend(selectedAnswer)}>Send</button>
        </section>
    );
};

export default Question;