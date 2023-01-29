import api from '../api/axiosConfig';

const MOVIE_API_BASE_URL = "http://localhost:8080/api/v1/movies";

class MovieService {
    getAllMovies() {
        return api.get(MOVIE_API_BASE_URL);
    }

    getSingleMovie(movieId) {
        return api.get(`${MOVIE_API_BASE_URL}/${movieId}`);
    }
}

export default new MovieService();