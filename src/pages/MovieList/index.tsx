import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import api from '../../services/api';

import notFoundImage from '../../assets/not-found.png';
import PageHeader from '../../components/PageHeader';

import { Form, Movies, Error, Pagination } from './styles';


interface Movie {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}

const MovieList: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [inputError, setInputError] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState('');
    const [flagFavorited, setFlagFavorited] = useState(false);
    const [page, setPage] = useState(1);

    // USED TO SET THE FAVORITES WHEN UPDATED
    useEffect(() => {
        let favoritesString = sessionStorage.getItem('favorites');
        if(favoritesString){
            setFavorites(favoritesString);
        }

    }, [flagFavorited]);

    async function handleGetLstMovie(event: SyntheticEvent, newPage:number): Promise<void>{
        event.preventDefault();
        try {
            // VERIFY IF SEARCH TEXT IS NULL
            if(!searchText){
                setInputError('Try to type something!')
                setMovies([]);
                return;   
            }
            // IF PAGE IS INVALID SET PAGE 1
            if(newPage <= 0){
                newPage = 1;
            }

            const response = await api.get('', { params: { s: searchText, page: newPage } });
            if(response.data.Response === 'True'){
                // ADDING A NEW VARIABLE TO THE MOVIE ITEM (LIKED)
                for (let i = 0; i < response.data.Search.length; i++) {
                    response.data.Search[i].liked = false;
                    
                    // VERIFY IF IMAGE IS OK, IF ITS NOT SET NOT FOUND IMAGE
                    if(response.data.Search[i].Poster === 'N/A'){
                        response.data.Search[i].Poster = notFoundImage;
                    }
                }

                setMovies(response.data.Search);
                setInputError('')
            }else{
                setInputError(response.data.Error);
                setMovies([]);
            }

            setPage(newPage);
        } catch (error) {
            setInputError('Sorry, try again later!');
            setMovies([]);
        }
    }

    async function handleFavoritedMovie(imdbID: string){
        let favoritesArray = [];
        let flagIsFavorite = false;
        const favorites = sessionStorage.getItem('favorites');
        sessionStorage.setItem('favorites', '');
        setFlagFavorited(!flagFavorited);
        
        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }

        // IF ARRAY IS EMPTY SIMPLE ADD
        if(favoritesArray.length === 0){
            favoritesArray.push(imdbID);
            
        }else{
            for (let i = 0; i < favoritesArray.length; i++) {
                if(favoritesArray[i] === imdbID){
                    //REMOVE FROM FAVORITES
                    favoritesArray.splice(i, 1);
                    flagIsFavorite = true;
                }
            }

            // IF THE FOR COUDNT FIND ANY INDEX ADD
            if(flagIsFavorite === false){
                favoritesArray.push(imdbID);
            }
        }

        sessionStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setFavorites(JSON.stringify(favoritesArray));
    }

    return (
        <>
            <PageHeader/>

            <Form hasError={!!inputError} onSubmit={(event) => handleGetLstMovie(event, 1)}>
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Search Movies' 
                />
                <button type='submit'>Search</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Movies>
                {movies.map(movie => (
                    <div key={movie.imdbID} className='movieItem'>
                        <img 
                            src={movie.Poster} 
                            alt={movie.Title}/>
                        <div className='overlay'>
                            <AiFillHeart data-testid="favorited-button" cursor='pointer' size={30} color={favorites.includes(movie.imdbID) ? 'red' : 'white'} onClick={() => handleFavoritedMovie(movie.imdbID)}/>
                            <Link to={
                                { 
                                    pathname: '/movie-details', 
                                    state: movie
                                }
                            } className='description'>
                                <h1>{movie.Title}</h1>
                                <p>{movie.Year}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </Movies>
            {movies.length > 0 && (
                <Pagination firstPageAlready={page === 1}>
                    <AiOutlineArrowLeft  size={40} onClick={(event) => handleGetLstMovie(event, page - 1)} />
                    <AiOutlineArrowRight size={40} onClick={(event) => handleGetLstMovie(event, page + 1)} />
                </Pagination>
            )}
            
        </>
    );
}

export default MovieList;