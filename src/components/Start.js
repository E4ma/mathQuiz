import React from 'react'
import styled, { css } from 'styled-components/macro'
import Button from './Button'

const Intro = styled.div`
  margin-top: 8em;
  text-align: center;
`;

const btnCSS = css`
    margin-top: 2em;
`;

const score = css`
  
animation: pulse-animation 4s infinite;
@keyframes pulse-animation {
    0% {
      color: #001F3F;
    }
    100% {
      color: #932432;
    }
  }
      
`;


const Start = ({props}) => {

    const startQuiz = () => props(true)
 
    return (
        <Intro>
            <h1>Are you a Math Whiz?</h1>
            <h4>Prove it! <br></br>Score <strong css={score}>5/10</strong> on this Quiz.</h4>
            <Button onClick={startQuiz} css={btnCSS}>Quiz</Button>
        </Intro>
    )
}

export default Start