import axios from "axios";
import Movie from "./models/Movie.js";
import Torrent from "./models/Torrent.js";

const scrap = async () => {
  try {
    const url = `https://yts.mx/api/v2/list_movies.json?&sort_by=rating&order_by=desc`;
    const { data } = await axios.get(url);

    // const maxPages = Math.ceil(data.data.movie_count / data.data.limit);
    const maxPages = 10;

    console.log(`${maxPages} pages available`);

    const fetchMovies = async (page) => {
      const url = `https://yts.mx/api/v2/list_movies.json?&sort_by=rating&order_by=desc&page=${page}`;
      const { data } = await axios.get(url);
      return data.data.movies;
    };

    for (let i = 0; i < maxPages; i++) {
      let page = i + 1;
      const fetchedMovies = await fetchMovies(page);

      for (let j = 0; j < fetchedMovies.length; j++) {
        const m = fetchedMovies[j];

        const newMovie = await Movie.create({
          scrapId: m.id,
          title: m.title,
          titleEnglish: m.title_english,
          titleLong: m.title_long,
          slug: m.slug,
          year: m.year,
          rating: m.rating,
          runtime: m.runtime,
          genres: Array.isArray(m.genres) ? m.genres.join(", ") : "",
          summary: m.summary,
          ytTrailerCode: m.yt_trailer_code,
          language: m.language,
          backgroundImage: m.background_image_original,
          smallCoverImage: m.small_cover_image,
          mediumCoverImage: m.medium_cover_image,
          largeCoverImage: m.large_cover_image,
          dateUploaded: m.date_uploaded_unix,
        });

        const torrents = m.torrents;

        for (let k = 0; k < torrents.length; k++) {
          const torrent = torrents[k];
          const t = await Torrent.create({
            movieId: newMovie.id,
            url: torrent.url,
            hash: torrent.hash,
            quality: torrent.quality,
            type: torrent.type,
            size: torrent.size,
            seeds: torrent.seeds,
            peers: torrent.peers,
          });
        }

        console.log(`${j}. ${m.title} - Success`);
      }
    }

    console.log("All movies scrapped success");
  } catch (error) {
    console.error("Error scraping movies:", error);
  }
};

scrap();
