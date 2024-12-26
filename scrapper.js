import axios from "axios";
import Movie from "./models/Movie.js";
import Torrent from "./models/Torrent.js";

const scrap = async () => {
  try {
    const url = `https://yts.mx/api/v2/list_movies.json?&sort_by=rating&order_by=desc`;
    const { data } = await axios.get(url);

    const maxPages = Math.ceil(data.data.movie_count / data.data.limit);
    // const maxPages = 10;

    const availableMovieCount = await Movie.count();

    const scrappedPagesCount = Math.floor(
      availableMovieCount / data.data.limit
    );

    console.log(`All movie count`, data.data.movie_count);

    console.log(`available pages`, maxPages);

    console.log("available movie count", availableMovieCount);

    console.log("scrapped pages count", scrappedPagesCount);

    console.log("scrapped pages");

    const startPage = scrappedPagesCount - 1;

    console.log("Starting from page", startPage);

    const fetchMovies = async (page) => {
      const url = `https://yts.mx/api/v2/list_movies.json?&sort_by=rating&order_by=desc&page=${page}`;
      const { data } = await axios.get(url);
      return data.data.movies;
    };

    for (let i = startPage; i < maxPages; i++) {
      let page = i + 1;
      console.log("Fetching page", page);

      const fetchedMovies = await fetchMovies(page);

      for (let j = 0; j < fetchedMovies.length; j++) {
        const m = fetchedMovies[j];

        const exitMovie = await Movie.findOne({
          where: {
            scrapId: m.id,
          },
        });

        if (exitMovie) {
          console.log(
            `${exitMovie.id}. ${m.title} - Is allready exits. skipping...`
          );
          continue;
        }

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
          imdbCode: m.imdb_code,
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

        console.log(`${newMovie.id}. ${m.title} - Success`);
      }
    }

    console.log("All movies scrapped success");
  } catch (error) {
    console.error("Error scraping movies:", error);
  }
};

scrap();
