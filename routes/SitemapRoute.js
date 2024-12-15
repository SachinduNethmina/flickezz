import express from "express";
import Movie from "../models/Movie.js";
import Blog from "../models/Blog.js";
const router = express.Router();

// Batch size per request (adjust as needed)
const BATCH_SIZE = 500; // You can adjust this based on performance requirements

// Fetch movies from the database using Sequelize with pagination
const getMoviesByBatch = async (batchIndex) => {
  try {
    const offset = batchIndex * BATCH_SIZE; // Calculate the offset for pagination
    const movies = await Movie.findAll({
      attributes: ["slug", "createdAt"],
      limit: BATCH_SIZE,
      offset: offset,
    });

    return movies.map((movie) => ({
      slug: movie.slug,
      lastmod: movie.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching movies from the database:", error);
    return [];
  }
};

// Generate sitemap index (main sitemap)
router.get("/sitemap.xml", async (req, res) => {
  let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemapIndex +=
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Add the reference to the main pages sitemap
  sitemapIndex += `
    <sitemap>
      <loc>https://flickezz.com/sitemap-main.xml</loc>
      <lastmod>2024-12-05</lastmod>
    </sitemap>
  `;

  try {
    // Fetch total number of movies to calculate how many batches of movies we need
    const movieCount = await Movie.count();
    const totalBatches = Math.ceil(movieCount / BATCH_SIZE); // Calculate the total number of batches

    // Generate sitemap entries for each movie batch
    for (let i = 1; i <= totalBatches; i++) {
      sitemapIndex += `
        <sitemap>
          <loc>https://flickezz.com/sitemap-movies-${i}.xml</loc>
          <lastmod>2024-12-05</lastmod>
        </sitemap>
      `;
    }

    sitemapIndex += `
        <sitemap>
          <loc>https://flickezz.com/sitemap-blog.xml</loc>
          <lastmod>2024-12-05</lastmod>
        </sitemap>
      `;

    sitemapIndex += "</sitemapindex>";

    // Set the content type and send the response
    res.header("Content-Type", "application/xml");
    res.send(sitemapIndex);
  } catch (error) {
    console.error("Error generating sitemap index:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Generate the main sitemap (for main pages)
router.get("/sitemap-main.xml", (req, res) => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Add main pages to the sitemap
  sitemap += `
    <url>
      <loc>https://flickezz.com/</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://flickezz.com/movies</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://flickezz.com/about</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://flickezz.com/contact</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://flickezz.com/privacy-policies</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://flickezz.com/blog</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://flickezz.com/blogs/search</loc>
      <lastmod>2024-12-05</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `;

  sitemap += "</urlset>";

  // Set the content type and send the response
  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

// Generate movie sitemaps (split into batches)
router.get("/sitemap-movies-:index.xml", async (req, res) => {
  const index = parseInt(req.params.index, 10) - 1; // Get the correct batch index
  const movies = await getMoviesByBatch(index);

  if (movies.length === 0) {
    return res.status(404).send("No movies found for this batch.");
  }

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Add each movie in the batch to the sitemap
  movies.forEach((movie) => {
    sitemap += `
      <url>
        <loc>https://flickezz.com/movies/${movie.slug}</loc>
        <lastmod>${formatLocalISODate(movie.lastmod)}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  });

  sitemap += "</urlset>";

  // Set the content type and send the response
  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

router.get("/sitemap-blog.xml", async (req, res) => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  try {
    const blogs = await Blog.findAll();
    blogs.forEach((blog) => {
      sitemap += `
      <url>
        <loc>https://flickezz.com/blog/${blog.slug}</loc>
        <lastmod>${formatLocalISODate(blog.updatedAt)}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
    });
  } catch (error) {}

  sitemap += "</urlset>";

  // Set the content type and send the response
  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

// Generate robots.txt with dynamic sitemaps
router.get("/robots.txt", async (req, res) => {
  try {
    const movieCount = await Movie.count();

    // Dynamic robots.txt generation
    let robotsTxt = `User-agent: *\nDisallow:\n\nSitemap: https://flickezz.com/sitemap.xml\nSitemap: https://flickezz.com/sitemap-main.xml\nSitemap: https://flickezz.com/sitemap-blog.xml\n`;

    // Add individual movie sitemaps dynamically
    const totalBatches = Math.ceil(movieCount / BATCH_SIZE);
    for (let i = 1; i <= totalBatches; i++) {
      robotsTxt += `Sitemap: https://flickezz.com/sitemap-movies-${i}.xml\n`;
    }

    // Set the content type and send the response
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt.trim());
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Utility function to format dates to ISO with local timezone
const formatLocalISODate = (date) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * -1; // Get timezone offset in minutes
  const hours = Math.floor(offset / 60);
  const minutes = Math.abs(offset % 60);
  const timezone = `${hours >= 0 ? "+" : "-"}${String(Math.abs(hours)).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(2, "0")}`;

  return `${d.toISOString().split("T")[0]}T${
    d.toTimeString().split(" ")[0]
  }${timezone}`;
};

export default router;
