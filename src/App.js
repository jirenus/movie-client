import './App.css';
import MovieService from './services/MovieService';
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

  const getAllMovies = async () => {
    try {
      const res = await MovieService.getAllMovies();
      console.log("Get all movies");
      console.log(res);
      
      setMovies(res.data.data);
    } catch (error) {
      console.log("Get all movies");
      console.log(error);
    }
  }

  const getSingleMovie = async (movieId) => {
    try {
      const res = await MovieService.getSingleMovie(movieId);
      console.log("Get single movie");
      console.log(res);

      const singleMovie = res.data.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);
    } catch (error) {
      console.log("Get single movie");
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMovies();
  }, []);
  

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/trailer/:ytTrailerId' element={<Trailer />} />
          <Route path='/reviews/:movieId' element={<Reviews getSingleMovie={getSingleMovie} movie={movie} reviews={reviews} setReviews={setReviews} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
