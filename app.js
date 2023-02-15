// const app = require("express")();
const express = require("express");
const app = express();

// app.use(express.json());

const birds = [
  { id: 1, birdName: "Kingfisher", sound: "kik - kik" },
  { id: 2, birdName: "Nightingale", sound: "whining" },
];

// Get all birds
app.get("/birds", (req, res) => {
  res.send({ birds });
});

// Get a specific bird
app.get("/birds/:id", (req, res) => {
  const bird = birds.find((bird) => bird.id === parseInt(req.params.id));
  if (!bird) {
    res.status(400).send("No bird available");
  } else {
    res.send(bird);
  }
});

app.listen(8080);
