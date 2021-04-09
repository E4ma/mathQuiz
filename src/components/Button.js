import styled from 'styled-components'


export const Button = styled.button`
    border: 1px solid #3C1874;
    border-radius: 50px;
    padding: 15px 30px;
    text-decoration: none;
    color: #932432;
    background-color: #283747;
    transition: 0.3s;
    font-size: 1em;
    cursor: pointer;
    outline: none;
    &:hover {
        color: #F3F3F3;
        background-color: #3C1874;
    }
`;

export default Button