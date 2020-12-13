import styled from 'styled-components';
import { shade } from 'polished';

export const MovieItem = styled.div`
    
    color: #fff;
    max-width: 1300px;
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    
`;

export const MovieDescription = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px;
    max-width: 600px;
    padding-left: 30px;
    padding-right: 10px;

    a{
        width: 5%;

        svg{
            color: #ddd;
            margin-bottom: 20px;
        }

        &:hover{
            svg{
                color: ${shade(0.6, '#fff')};
            }
        }
    }

    .minimumInfo{
        margin-top: 10px;
        color: #999;

        span{
            background-color: #999;
            padding: 0px 4.5px;
            border-radius: 10%;
            color: #000;
            font-weight: 600;
            font-size: 1em;
        }
    }

    .title{
        margin-top: 10px;
        font-size: 4em;
    }

    .plotLabel{
        margin-top: 40px;
        font-size: 1.1em;
        color: #666;
    }

    .plot{
        margin-top: 10px;
        font-size: 1.1em;
    }
`;

export const RatingItens = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;

    div{
        width: 163px;
        height: 50px;
        background: transparent;
        border: 2px solid #666;
        border-radius: 5px;
        margin-right: 5px;
        margin-top: 5px;

        font-size: 1.4em;
        color: #666;
        font-weight: bold;

        img{
            width: 56%;
            border-radius: 12px;
            margin: -6px 5px -22px 0px;
        }
    }

    button{
        width: 163px;
        height: 50px;
        padding-bottom: 5px;
        background: transparent;
        border: 2px solid #666;
        border-radius: 5px;
        color: #666;
        font-weight: bold;
        transition: background-color 0.2s;
        margin-top: 5px;

        justify-content: center;

        &:hover {
            background: ${shade(0.2, '#666')};
            color: #000;
        }

        svg{
            margin: 0px 5px -10px 0px;
            align-items:center;
            justify-content:center;
        }
    }
    
`;

export const MovieCast = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 40px;

    div{
        width: 150px;
    }

    .castLabel{
        color: #666;
        font-size: 1.1em;
        padding-right: 15px;
    }

    .cast{
        margin-top: 10px;
        padding-right: 15px;
    }
`;

export const Poster = styled.div`
    margin: 30px;

    img{
        width: 400px;
        height: 550px;
    }

    
`;


export const Error = styled.span `
    margin-top: 10px;
    margin-left: 30px;
    font-size: 1.3em;
    display: block;
    color: #c53030;
`;