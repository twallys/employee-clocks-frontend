import React from 'react';

import logoImg from '../../assets/logo-movies.png';

import { Header } from './styles';

const PageHeader: React.FC = () => {
    return (
        <Header>
            <img src={logoImg} alt='Movie Filter Logo'/>
            <h1>Movie Crazies</h1>
        </Header>
    );
}

export default PageHeader;