package com.movie.movie.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TMDbService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String tmdbApiUrl = "https://api.themoviedb.org/3";

    public String searchMovies(String query) {
        // Construa a URL da API do TMDb para pesquisa de filmes
        String apiUrl = tmdbApiUrl + "/search/movie?api_key=" + apiKey + "&query=" + query;

        // Faça a solicitação à API usando RestTemplate
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(apiUrl, String.class);
    }

    public String getPopularMovies() {
        // Construa a URL da API do TMDb para filmes populares
        String apiUrl = tmdbApiUrl + "/movie/popular?api_key=" + apiKey;

        // Faça a solicitação à API usando RestTemplate
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(apiUrl, String.class);
    }



}

