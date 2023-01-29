import './App.css';
import api from './api/axiosConfig';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const res = await api.get('/api/v1/movies');
      console.log(res.data.data);
      
      setMovies(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const res = await api.get(`/api/v1/movies/${movieId}`);
      console.log(res.data.data);

      const singleMovie = res.data.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/trailer/:ytTrailerId' element={<Trailer />} />
          <Route path='/reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
