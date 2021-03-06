import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { QuestionContext } from '../../Context/QuestionContext';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const End = () => {
    const [finalResult, setFinalResult] = useState(0);

    const { 
        setPlaying,
        setFinished,
        userResults,
        setUserResults
     } = useContext(QuestionContext);

    function handleQuizEnd() {
        setPlaying(false);
        setFinished(false);
    }

    useEffect(() => {
        const finalResultLength = userResults.filter(result => result).length;

        setFinalResult(finalResultLength);

        /** CLEAN */
        setUserResults([]);
    }, []);

    return (
        <section className="end">
            <img className="logo" src={logo} alt="Asking the Dev logo" />

            <h1>Congratulations! You've finished the quiz!</h1>
            <h2>Score: {finalResult}/10</h2>

            <div className="buttons">
                <Link to='/' onClick={handleQuizEnd}>
                    <button className="button">
                        <span className="material-icons md-36">
                            home
                        </span>
                        <p style={{marginLeft: 2 + 'px'}}>Home</p>
                    </button>
                </Link>

                <a className="button" target='_blank' href="https://github.com/ruifernandees/asking-the-dev">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-github"
                    >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                        </path>
                    </svg>
                    <p>GitHub</p>
                </a>
            </div>
        </section>
    );
};

export default End;