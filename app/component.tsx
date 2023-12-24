"use client";
import React from "react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovies from "@/hooks/useMovieList";

function HomePage() {
  const { data: movies = [] } = useMovies();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  );
}

export default HomePage;
