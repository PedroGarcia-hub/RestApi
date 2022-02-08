const { Router } = require("express");
const router = Router();
const movies = require("../sample.json");
// const _ = require("underscore");

// console.log(movies);

router.get("/", (req, res) => {
  res.json(movies);
});

router.post("/", (req, res) => {
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    const id = movies.length + 1;
    const newMovie = { ...req.body, id };
    movies.push(newMovie);
    res.json(movies);
  } else {
    res.status(500).json({ error: "There was an error" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, director, year, rating } = req.body;
  if (title && director && year && rating) {
    movies.map((m) => {
      if (m.id === id) {
        m.title = title;
        m.director = director;
        m.year = year;
        m.rating = rating;
      }
    });
    res.json(movies);
  } else {
    res.status(500).json({ error: "There was an error" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  movies.map((m) => {
    if (m.id === id) {
      movies.splice(movies.indexOf(m), 1);
    }
  });
  res.send(movies);
});
module.exports = router;
