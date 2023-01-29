import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import ReviewForm from '../reviewFrom/ReviewForm';
import { Container, Row, Col } from 'react-bootstrap';


import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    const params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const res = await api.post(`/api/v1/reviews`, { reviewBody: rev.value, imdbId: movieId });
            console.log(res.data.data);

            const updatedReviews = [...reviews, { body: rev.value }];

            rev.value = "";

            setReviews(updatedReviews);   
        } catch (error) {
            console.log(error);
        }
    }

    
  return (
    <Container>
        <Row>
            <Col>
                <h1>Reviews</h1>
            </Col>
        </Row>
        <Row className='mt-2'>
            <Col>
                <img src={movie?.poster} alt={movie?.title} />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText = "Write a review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews?.map((review) => {
                        return (
                            <>
                                <Row>
                                    <Col>
                                        {review.body}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews;