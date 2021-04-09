import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import GameOver from './GameOver';

const QuizWindow = styled.div`
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 10vh;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 2em auto;
    @media screen and (min-width: 1180px) {
        width: 50%;
    }
`;

const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 15px;
    padding: 15px 30px;
    text-decoration: none;
    color: #616A94;
    background-color: #161A31;
    position: relative;
    font-size: 1em;
    user-select: none;
    outline: none;
    margin-top: 1em;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    @media screen and (min-width: 1180px) {
        &:hover {
            color: white;
            background-color: #616A94;
        }
    }
    &:before {
        content: "";
        position: absolute;
        left: var(--x);
        top: var(--y);
        transform: translate(-50%, -50%);
        background-image: radial-gradient(circle closest-side, #ff7a00, transparent);
        width: 0; height: 0;
        transition: width 0.3s ease, height 0.3s ease;
        z-index: -1;
      }
      &:hover::before { width: 250px; height: 250px; }
`;


const Question = styled.div`
    width: 70%;
    margin: 0 auto;
`;

const Quiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [pts, setPts] = useState(0);

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {

        let userAnswer = e.target.outerText;

        if (quiz[number].answer === userAnswer) setPts(pts + 1);
        setNumber(number + 1);
    }

    useEffect(() => {

        axios.get('https://opentdb.com/api.php?amount=10&category=19')
            .then(res => {
                setQuiz(res.data.results.map(item => (

                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer
                    }

                )));
            })
            .catch(err => console.error(err))
            

    }, []);

    //going to use dangerouslySetInnerHTML instead of innerHTML to avoid exposure to cross-site scripting attack

    //direction aware button hover effect
    const optionsBtn = (e) => {
        const xPos = e.pageX - e.target.offsetLeft;
        const yPos = e.pageY - e.target.offsetTop;

        e.target.style.setProperty("--x", `${xPos}px`);
        e.target.style.setProperty("--y", `${yPos}px`);
    }

    return (
        <QuizWindow>
            { quiz[number] &&

                <>
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>

                    <Options>
                        {quiz[number].options.map((item, index) => (
                            <Option key={index} dangerouslySetInnerHTML={{ __html: item }} onClick={pickAnswer}onMouseMove={optionsBtn}></Option>
                        ))}
                    </Options>
                </>

            }
            {
                number === 10 && <GameOver pts={pts} />
            }
        </QuizWindow>
    )
}

export default Quiz