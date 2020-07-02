import React, {useState, useEffect, useContext } from 'react';

import QuestionSetup from '../QuestionSetup';
import Question from '../Question';
import End from '../End';
import { QuestionContext } from '../../Context/QuestionContext';

const Quiz = () => {
    const { playing } = useContext(QuestionContext);

    const [currentQuestion, setCurrentQuestion] = useState({});

    const {
        questions,
        currentQuestionIndex,
        finished,
    } = useContext(QuestionContext);

    useEffect(() => {
        const currentQuestionObject = questions.filter(question => 
            questions.indexOf(question) === currentQuestionIndex
        )[0];

        if (currentQuestionObject) setCurrentQuestion(currentQuestionObject);
    }, [currentQuestionIndex]);

    return (
        <>
            {playing && !finished && <Question currentQuestion={currentQuestion} />}
            {!playing && !finished &&  <QuestionSetup />}
            {!playing && finished && <End />}
        </>
    );
};

export default Quiz;