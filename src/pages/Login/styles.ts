import styled from 'styled-components';

export const Form = styled.form`
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 400;
      margin: 5%;

      button{
        margin-top: 5px;
        flex-grow: 1
      }

      /* THIS IS A POSSIBILITY TOO */
      /* .MuiCardHeader-root{
        text-align: center;
        background: '#212121';
        color: '#fff';
      } */
`;

export const SubTitle = styled.div`
    text-align: center;
    margin: 5px auto 10px auto;

    a{
        margin-left:5px;
        text-decoration: none;
        color: blue;
    }

`;

export const Error = styled.span`
    margin-top: 10px;
    margin-left: 30px;
    font-size: 1.3em;
    display: block;
    color: #c53030;
`;