import api from '../api/axiosConfig';

const REVIEW_API_BASE_URL = "http://localhost:8080/api/v1/reviews";

class ReviewService {
    addReview({ reviewBody, imdbId }) {
        return api.post(`${REVIEW_API_BASE_URL}`, { reviewBody, imdbId });
    }
}

export default new ReviewService();