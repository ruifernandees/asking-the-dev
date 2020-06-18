import React, { useState, useEffect, createContext } from 'react';
// import { useHistory } from 'react-router-dom';
import api from '../services/api';

import history from '../history';

const QuestionContext = createContext();



const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]); //booleans
    const [difficulty, setDifficulty] = useState('easy');
    const [loading, setLoading] = useState(false);

    // const history = useHistory();

    function handleSelectDifficulty(event) {
        const difficulty = event.target.value;
        
        setDifficulty(difficulty);
    }

    async function handleBegin(event) {
        event.preventDefault();

        setLoading(true);

        const response = await api.get(`?amount=10&category=18&difficulty=${difficulty}&type=multiple`);

        // console.log(response.data);
        const results = response.data.results;
        console.log("Results ", results);
        const allAnswers = results.map(result => [
            ...result.incorrect_answers,
            result.correct_answer
        ]);

        // console.log("All answers: ", allAnswers);
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

        // console.log("shuffled all answers", shuffledAllAnswers);
        const filteredResult = results.map(result => ({
            ...result, 
            allAnswers: shuffledAllAnswers.filter(allAnswer => {
                return (allAnswer.includes(result.correct_answer) &&
                allAnswer.includes(result.incorrect_answers[0]) &&
                allAnswer.includes(result.incorrect_answers[1]) &&
                allAnswer.includes(result.incorrect_answers[2]))
            })[0]
        }));

        // console.log(filteredResult);
        setQuestions(filteredResult);
        const newCompletedQuestions = [ ...completedQuestions, filteredResult[0], filteredResult[1], filteredResult[2], filteredResult[3], filteredResult[4], filteredResult[5], filteredResult[6], filteredResult[7] ]
        setCompletedQuestions(newCompletedQuestions);
        setLoading(false);
        history.push('/question');
    }

    useEffect(() => {
        console.log("Completed Questions: ", completedQuestions);
    }, [completedQuestions]);
    
    return (
        <QuestionContext.Provider 
            value={{ 
                questions,
                setQuestions,
                completedQuestions,
                setCompletedQuestions,
                userAnswers,
                setUserAnswers,
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