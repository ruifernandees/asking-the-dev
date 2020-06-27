import React, {useState, useEffect, useContext } from 'react';

import QuestionSetup from '../QuestionSetup';
import Question from '../Question';
import { QuestionContext } from '../../Context/QuestionContext';

const Quiz = () => {
    const { playing } = useContext(QuestionContext);

    const [currentQuestion, setCurrentQuestion] = useState({});

    const {
        questions,
        completedQuestions,
        // setCompletedQuestions,
        // loading,
        // setLoading
    } = useContext(QuestionContext);

    useEffect(() => {
        // console.log("Question screen: ", questions);
        const notCompletedQuestions = questions.filter(question => {
            return !completedQuestions.includes(question);
        });
        // console.log("Completed questions: ", completedQuestions);
        // console.log("Not completed questions: ", notCompletedQuestions);

        // const currentQuestion = notCompletedQuestions[0];
        // console.log("Current Question: ", currentQuestion);
        // setQuestion([currentQuestion]);
        setCurrentQuestion({ ...notCompletedQuestions[0], questionNumber: questions.indexOf(currentQuestion) });
    }, [completedQuestions]);

    return (
        <>
            {playing ? <Question currentQuestion={currentQuestion} /> : <QuestionSetup />}
        </>
    );
};

export default Quiz;