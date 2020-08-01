import React from 'react';
import { Link } from 'react-router-dom';

import author from '../../images/rui.png';
import './styles.css';

const About = () => {
    return (
        <section className="about">
            <div className="author">
                <header class="header-author">
                    <img src={author} alt="Rui Fernandes photo"/>
                    <h1>Author: Rui Fernandes</h1>
                </header>
                <a 
                    href="https://www.linkedin.com/in/ruifernandees"
                    target="_blank"
                    className="link-author"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-linkedin"
                    >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                        </path>
                        <rect x="2" y="9" width="4" height="12">
                        </rect>
                        <circle cx="4" cy="4" r="2">
                        </circle>
                    </svg>
                    <p>Linkedin</p>
                </a>
                <a 
                    href="https://github.com/ruifernandees"
                    target="_blank"
                    className="link-author"
                >
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
            <div className="notices">
                <h1>Notice:</h1>
                <p>This project consumes the <a href="https://opentdb.com" target="_blank">Open Trivia DB API</a></p>
                <p>The elements are based on the <a href="https://dribbble.com/shots/10760164-Free-UI-kit-Freelance-Platform-App?utm_source=Clipboard_Shot&utm_campaign=AnthonyChoren&utm_content=Free%20UI%20kit%20Freelance%20Platform%20App&utm_medium=Social_Share">Free UI kit by Anthony Choren</a></p>
            </div>
            <div className="buttons">
                <Link to='/'>
                    <button className="button">
                        <span className="material-icons md-36">
                            arrow_back
                        </span>
                        <p style={{marginLeft: 2 + 'px'}}>Go back</p>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default About;