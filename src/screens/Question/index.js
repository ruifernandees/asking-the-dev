import React, { useState, useEffect, useRef, useContext } from 'react';

import RadioButton from './RadioButton';
import { QuestionContext } from '../../Context/QuestionContext';
import history from '../../history';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [question, setQuestion] = useState({});
    const [allAnswers, setAllAnswers] = useState([]);

    const resultScreen = useRef(null);
    const correctAnswerScreen = useRef(null);
    const wrongAnswerScreen = useRef(null);
    const alertAnswerScreen = useRef(null);

    const {
        questions,
        setQuestions,
        completedQuestions,
        setCompletedQuestions,
        loading,
        setLoading
    } = useContext(QuestionContext);

    let answersToRender;
    if (allAnswers) {
        answersToRender = allAnswers.map(answer => {
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
        });
    } else {
        answersToRender = "Loading...";
    }

    useEffect(() => {
        if (questions.length === 0) {
            history.push('/set-questions');
            return;
        }

        if (completedQuestions.length >= 10) {
            history.push('/end');
            return;
        }
        // console.log("Question screen: ", questions);
        const notCompletedQuestions = questions.filter(question => {
            return !completedQuestions.includes(question);
        });
        // console.log("Completed questions: ", completedQuestions);
        // console.log("Not completed questions: ", notCompletedQuestions);

        const currentQuestion = notCompletedQuestions[0];
        // console.log("Current Question: ", currentQuestion);
        // setQuestion([currentQuestion]);
        setQuestion({ ...currentQuestion, questionNumber: questions.indexOf(currentQuestion) });
    }, []);
    

    useEffect(() => {
        // console.log("Question const: ", question);
        setAllAnswers(question.allAnswers);
        // console.log("us question", allAnswers)
    }, [question]);

    function handleSelectAnswer(index) {
        setSelectedAnswer(index);
    }

    function handleSend(selectedAnswer) {
        if (selectedAnswer < 0 || selectedAnswer > 4) {
            resultScreen.current.style.display = 'flex';
            alertAnswerScreen.current.style.display = 'flex';
            return;
        }

        const found = allAnswers.find(item => allAnswers.indexOf(item) === selectedAnswer);

        const isCorrect = (question.correct_answer === found);
        if (isCorrect) {
            resultScreen.current.style.display = 'flex';
            correctAnswerScreen.current.style.display = 'flex';
        } else {
            resultScreen.current.style.display = 'flex';
            wrongAnswerScreen.current.style.display = 'flex';
        }
    }

    function handleNextQuestion() {
        const newCompletedQuestions = [ ...completedQuestions, question ];
        setCompletedQuestions(newCompletedQuestions);
        history.push('/question');
    }

    useEffect(() => {
        console.log(completedQuestions);
    }, [completedQuestions])

    return (
        <section className="question">
            <img className="logo" src={logo} alt="Asking the Dev logo" />
            <h1>{question.question}</h1>

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
            <div className="currentQuestion">
                {question.questionNumber}/10
            </div>
            <div className="cards">
                {answersToRender}
            </div>

            <button className="send" onClick={() => handleSend(selectedAnswer)}>Send</button>
        </section>
    );
};

export default Question;