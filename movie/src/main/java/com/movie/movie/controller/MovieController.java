package com.movie.movie.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.movie.movie.service.TMDbService;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private TMDbService tmdbService;

    @GetMapping("/search/{query}")
    public String searchMovies(@PathVariable String query) {
        return tmdbService.searchMovies(query);
    }

    @GetMapping("/popular")
    public String getPopularMovies() {
        return tmdbService.getPopularMovies();
    }

    


}

