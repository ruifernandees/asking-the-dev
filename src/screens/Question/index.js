import React, { useState, useEffect, useRef, useContext } from 'react';

import RadioButton from './RadioButton';
import Result from './Result';
import { QuestionContext } from '../../Context/QuestionContext';
import history from '../../history';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [question, setQuestion] = useState({});
    const [allAnswers, setAllAnswers] = useState([]);
    const [result, setResult] = useState({message: "", selectedAnswer: -1});

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
            setResult({
                message: "alert",
                selectedAnswer
            });
            return;
        }

        const found = allAnswers.find(item => allAnswers.indexOf(item) === selectedAnswer);

        const isCorrect = (question.correct_answer === found);
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

            <Result result={result} />
            
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