"use client";
import React from "react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovies from "@/hooks/useMovieList";
import useFavourites from "@/hooks/useFavourites";

function HomePage() {
  const { data: movies = [] } = useMovies();
  const { data: favourties = [] } = useFavourites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favourties} />
      </div>
    </>
  );
}

export default HomePage;
