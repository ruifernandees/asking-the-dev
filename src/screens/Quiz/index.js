import React, { useContext } from 'react';

import QuestionSetup from '../QuestionSetup';
import Question from '../Question';
import { QuestionContext } from '../../Context/QuestionContext';

const Quiz = () => {
    const { playing } = useContext(QuestionContext);

    return (
        <>
            {playing ? <Question /> : <QuestionSetup />}
        </>
    );
};

export default Quiz;