import styled from 'styled-components'
import {Button} from './Button'
import Confetti from 'react-confetti'

const Title = styled.h1`
    margin-top: 4em;
    font-size: 48px;
`;

const Points = styled.p`
    font-size: 24px;
    margin-bottom: 3em;
`;

const GameOver = ({pts}) => {

    const refreshPage = () => window.location.reload();

    if ( pts >= 5 ) { 
        return (
        <>
        <Confetti />
        <Title>Game Over</Title>
            <Points>
                 {pts} out of 10...<br></br>You are a <strong>Math Whiz!</strong>
                </Points>
            <Button onClick={refreshPage}>Retry</Button>
        </>
        );
    } else if (pts < 5){
        return (
            <>
                <Title>Game Over</Title>
                <Points>
                     {pts} out of 10...<br></br> Better luck next time.
                    </Points>
                <Button onClick={refreshPage}>Retry</Button>
            </>
        );
    }
}

export default GameOver