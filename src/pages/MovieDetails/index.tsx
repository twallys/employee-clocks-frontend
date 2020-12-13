import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { AiOutlineArrowLeft, AiFillHeart } from 'react-icons/ai';
import imdbLogo from '../../assets/imdb-logo.png';
import rottenTomatoesLogo from '../../assets/rotten-tomatoes-logo.png';

import api from '../../services/api';

import { MovieItem, MovieDescription, MovieCast, Poster, RatingItens, Error } from './styles'

interface MovieDetailsParams {
    imdbID: string;
}
interface Movie {
    Poster: string,
    Title: string,
    Runtime: string,
    Year: string,
    imdbID: string,
    Rated: string,
    Ratings: Array<any>,
    Plot: string,
    Actors: string,
    Genre: string,
    Director: string,
}

const MovieDetails: React.FC = () => {
    const params= useLocation<MovieDetailsParams>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [favorites, setFavorites] = useState('');
    const [flagFavorited, setFlagFavorited] = useState(false);
    const [inputError, setInputError] = useState('');

    // USED TO CONSULT WHEN OPEN MOVIE DETAILS
    useEffect(() => {
        try {
            api.get('', { params: { i: params.state.imdbID } }).then((response) => {
                setMovie(response.data);
            });
        } catch (error) {
            setInputError('Sorry, try again later!');
        }
    }, [params]);

    // USED TO SET THE FAVORITES WHEN UPDATED
    useEffect(() => {
        let favoritesString = sessionStorage.getItem('favorites');
        if (favoritesString) {
            setFavorites(favoritesString);
        }

    }, [flagFavorited]);

    async function handleLikedMovie(imdbID: string) {
        let favoritesArray = [];
        let flagIsFavorite = false;
        const favorites = sessionStorage.getItem('favorites');
        sessionStorage.setItem('favorites', '');
        setFlagFavorited(!flagFavorited);

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        // IF ARRAY IS EMPTY SIMPLE ADD
        if (favoritesArray.length === 0) {
            favoritesArray.push(imdbID);

        } else {
            for (let i = 0; i < favoritesArray.length; i++) {
                if (favoritesArray[i] === imdbID) {
                    //REMOVE FROM FAVORITES
                    favoritesArray.splice(i, 1);
                    flagIsFavorite = true;
                }
            }

            // IF THE FOR COUDNT FIND ANY INDEX ADD
            if (flagIsFavorite === false) {
                favoritesArray.push(imdbID);
            }
        }

        sessionStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setFavorites(JSON.stringify(favoritesArray));
    }

    return (
        <>
            <PageHeader />

            {inputError && <Error>{inputError}</Error>}

            {movie && (
                <MovieItem>
                    <MovieDescription>
                        <Link to={'/'} >
                            <AiOutlineArrowLeft size={20}></AiOutlineArrowLeft>
                        </Link>

                        <p className='minimumInfo'>{movie.Runtime} - {movie.Year} - <span>{movie.Rated}</span></p>

                        <h1 className='title'>{movie.Title}</h1>

                        <RatingItens>
                            <div>
                                <img src={imdbLogo} alt="IMDb Logo" />
                                {movie.Ratings[0].Value}
                            </div>
                            <div>
                                <img src={rottenTomatoesLogo} alt="IMDb Logo" />
                                {movie.Ratings[0].Value}
                            </div>
                            <button onClick={() => handleLikedMovie(movie.imdbID)}>
                                <AiFillHeart cursor='pointer' size={30} color={favorites.includes(movie.imdbID) ? 'red' : 'white'} />
                                {favorites.includes(movie.imdbID) ? 'Favorited' : 'Add to Favorites'}
                            </button>
                        </RatingItens>



                        <h3 className='plotLabel'>Plot</h3>
                        <p className='plot'>{movie.Plot}
                        </p>

                        <MovieCast>
                            <div>
                                <h3 className='castLabel'>cast</h3>
                                <p className='cast'>{movie.Actors}
                                </p>
                            </div>
                            <div>
                                <h3 className='castLabel'>genre</h3>
                                <p className='cast'>{movie.Genre}
                                </p>
                            </div>
                            <div>
                                <h3 className='castLabel'>director</h3>
                                <p className='cast'>{movie.Director}
                                </p>
                            </div>
                        </MovieCast>
                    </MovieDescription>
                    <Poster>
                        <img src={movie.Poster} alt={movie.Title} />
                    </Poster>
                </MovieItem>
            )}
        </>
    );
}

export default MovieDetails;