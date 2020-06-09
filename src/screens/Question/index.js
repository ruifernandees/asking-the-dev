import React, { useState, useEffect } from 'react';

import RadioButton from './RadioButton';
import api from '../../services/api'


import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(0);
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        api.get('?amount=1&category=18&difficulty=easy&type=multiple')
            .then(response => {
                console.log(response.data);
                const result = response.data.results[0];

                const allAnswers = [
                    ...result.incorrect_answers,
                    result.correct_answer
                ];

                const shuffle = (arr) => {
                    for(let i = arr.length - 1; i > 0; i--){
                        const j = Math.floor(Math.random() * i)
                        const temp = arr[i]
                        arr[i] = arr[j]
                        arr[j] = temp
                    }
                    return arr;
                }

                const shuffledAllAnswers = shuffle(allAnswers);
                console.log(shuffledAllAnswers)
                console.log(result.correct_answer);
                const filteredResult = { 
                    ...result, 
                    allAnswers: shuffledAllAnswers
                }

                // console.log(filteredResult);
                setQuestion([filteredResult]);
            });
    }, []);

    useEffect(() => {
        console.log(question);
    }, [question]);

    return (
        <section className="question">
            <img className="logo" src={logo} alt="Asking the Dev logo"/>
            {/* <h1>{question.map((item) => {
                return item.question;
            })}</h1> */}
            <h1>{question.map(item => item.question)}</h1>

            <div className="cards">
                {question.map((item) => {
                    const allAnswers = item.allAnswers;
                    return allAnswers.map((answer) => {
                        return (
                            <div className="card" key={allAnswers.indexOf(answer)} onClick={() => {}}>
                                <RadioButton />
                                <p>{answer}</p>    
                            </div>
                        );
                    })
                })}
            </div>

            <button>Send</button>
        </section>
    );
};

export default Question;