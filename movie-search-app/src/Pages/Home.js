// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/movies/popular');
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []); // Executa apenas uma vez no carregamento inicial

  // Função para adicionar atraso à busca
  const delayedSearchMovies = (value) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movies/search/${value}`);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 300); // Atraso de 300ms (ajuste conforme necessário)
  };

  // Função chamada durante a digitação
  const handleInputChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    // Chama a busca após o atraso
    delayedSearchMovies(value);
  };

  return (
    <div className="search-container">
      <div className="results-container">
        <h1>Buscar Filmes</h1>
        <input
          type="text"
          placeholder="Digite o Nome do Filme"
          value={query}
          onChange={handleInputChange}
        />
        {/* Removido o botão de busca manual */}
        <div className="movie-cards-container">
          {query
            ? results.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <h3>{movie.title}</h3>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.overview}</p>
                </div>
              ))
            : popularMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <h3>{movie.title}</h3>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.overview}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
