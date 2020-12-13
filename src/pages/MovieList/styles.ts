import styled, { css } from 'styled-components';
import { shade, transparentize } from 'polished';

interface FormProps {
    hasError: boolean;
}

interface PaginationProps {
    firstPageAlready: boolean;
}

export const Form = styled.form<FormProps> `
    margin: 10px 20px;
    display: flex;
    
    input{
        flex: 1;
        width: 100%;
        height: 70px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3a3a3a;
        border: 2px solid #fff;

        ${(props) => props.hasError && css`
            border-color: #c53030;
        `}

        &::placeholder {
            color: #a8a8b3;
        }
    }

    button{
        width: 210px;
        height: 70px;
        background: #d71e1e;
        border: 0;
        border-radius: 0 5px 5px 0;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, '#d71e1e')};
        }
    }
`;

export const Error = styled.span `
    margin-top: 10px;
    margin-left: 30px;
    font-size: 1.3em;
    display: block;
    color: #c53030;
`;

export const Movies = styled.div`
    margin-top: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .movieItem{
        position: relative;
        width: 230px;
        height: 270px;
        margin: 5px;        
        text-decoration: none;

        &:hover {
            .overlay{
                opacity: 1;
            }
        }

        img{
            width: 100%;
            height: 100%;
        }

        .overlay{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            transition: .5s ease;
            background-color: ${transparentize(0.2, '#000')};

            svg{
                position: absolute;
                top: 5%;
                left: 80%;
            }

            .description{
                position: absolute;
                top: 80%;
                left: 50%;
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);

                width: 100%;
                color: #fff;
                font-size: 15px;
                text-align: center;
                text-decoration: none;

                &:hover {
                    color: ${shade(0.4, '#fff')};
                }

                h1{
                    font-size: 18px;
                    border: solid 1px '#fff';
                }
            }
            
        }

    }
`;

export const Pagination = styled.div<PaginationProps>`
    text-align: center;
    margin: 5px 0;

    svg{
        margin: 0 30px;
        color: #FFF;

        &:hover{
            color: ${shade(0.6, '#fff')};
        }
    }
    
    ${(props) => props.firstPageAlready && css`
        svg:first-child {
            color: ${shade(0.6, '#fff')};
        }
    `}
`;