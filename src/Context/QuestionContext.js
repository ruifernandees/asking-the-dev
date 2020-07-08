import React, { useState, createContext } from 'react';

import api from '../services/api';

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [userResults, setUserResults] = useState([]); //booleans
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [difficulty, setDifficulty] = useState('easy');
    const [loading, setLoading] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [finished, setFinished] = useState(false);

    function handleSelectDifficulty(event) {
        const difficulty = event.target.value;
        
        setDifficulty(difficulty);
    }

    async function handleBegin(event) {
        event.preventDefault();

        setLoading(true);

        const response = await api.get(`?amount=10&category=18&difficulty=${difficulty}&type=multiple`);

        const results = response.data.results;
        const allAnswers = results.map(result => [
            ...result.incorrect_answers,
            result.correct_answer
        ]);

        const shuffle = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
            return arr;
        };

        const shuffledAllAnswers = allAnswers.map(questionAllAnswers => shuffle(questionAllAnswers));

        const filteredResult = results.map(result => ({
            ...result, 
            allAnswers: shuffledAllAnswers.filter(allAnswer => {
                return (allAnswer.includes(result.correct_answer) &&
                allAnswer.includes(result.incorrect_answers[0]) &&
                allAnswer.includes(result.incorrect_answers[1]) &&
                allAnswer.includes(result.incorrect_answers[2]))
            })[0]
        }));

        setQuestions(filteredResult);
        setCurrentQuestionIndex(0);
        setLoading(false);
        setPlaying(true);
    }

    return (
        <QuestionContext.Provider 
            value={{ 
                questions,
                setQuestions,
                userResults,
                setUserResults,
                currentQuestionIndex,
                setCurrentQuestionIndex,
                playing,
                setPlaying,
                finished,
                setFinished,
                handleBegin,
                difficulty,
                handleSelectDifficulty,
                loading,
                setLoading
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export { QuestionContext, QuestionProvider };