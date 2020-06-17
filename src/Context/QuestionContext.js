import React, { useState, useEffect, createContext } from 'react';
// import { useHistory } from 'react-router-dom';
import api from '../services/api';

import history from '../history';

const Context = createContext();



const QuestionProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
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

        const response = await api.get(`?amount=10&category=18&difficulty=${difficulty}&type=multiple`)

        console.log(response.data);
        const results = response.data.results;

        const allAnswers = results.map(result => [
            ...result.incorrect_answers,
            result.correct_answer
        ]);

        // console.log(allAnswers);

        const shuffle = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i)
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
            return arr;
        }

        const shuffledAllAnswers = allAnswers.map(questionAllAnswers => shuffle(questionAllAnswers));

        // console.log(shuffledAllAnswers);
        const filteredResult = results.map(result => ({
            ...result, 
            allAnswers: shuffledAllAnswers.filter(allAnswer => {
                return (allAnswer.includes(result.correct_answer) &&
                allAnswer.includes(result.incorrect_answers[0]) &&
                allAnswer.includes(result.incorrect_answers[1]) &&
                allAnswer.includes(result.incorrect_answers[2]))
            })
        }));

        console.log(filteredResult);
        setQuestions(filteredResult);
        setLoading(false);
        history.push('/question');
    }

    // useEffect(() => {
    //     if (!loading) {
    //         history.push('/question');
    //     }
    // }, [loading]);
    

    return (
        <Context.Provider value={{ questions, handleBegin, difficulty, handleSelectDifficulty, loading, setLoading }}>
            {children}
        </Context.Provider>
    );
};

export { Context, QuestionProvider };