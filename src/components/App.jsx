// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './Navigation/Navigation'
import React from 'react';


const NotFoundPage = React.lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage')
);
const HomePage = React.lazy(() =>
  import('../pages/HomePage/HomePage')
);
const MoviesPage = React.lazy(() =>
  import('../pages/MoviesPage/MoviesPage')
);
const MovieDetailsPage = React.lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = React.lazy(() =>
  import('../components/MovieCast/MovieCast')
);
const MovieReviews = React.lazy(() =>
  import('../components/MovieReviews/MovieReviews')
);

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App
