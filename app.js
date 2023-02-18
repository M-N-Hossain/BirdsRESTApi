// const app = require("express")();
const express = require("express");
const app = express();

app.use(express.json());

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
  const foundBird = birds.find((bird) => bird.id === parseInt(req.params.id));
  if (!foundBird) {
    res.status(400).send("No bird available");
  } else {
    res.send(foundBird);
  }
});

// Another way to get a specific bird. (Tried with birds endpoint, but didn't work)

app.get("/bird", (req, res) => {
  console.log(req.query);
  const foundBird = birds.find((bird) => bird.id === parseInt(req.query.id));
  if (!foundBird) {
    res.status(400).send("No bird available");
  } else {
    res.send(foundBird);
  }
});

// Post a bird

app.post("/birds", (req, res) => {
  let lastBirdElemntID;

  if (birds.length === 0) {
    lastBirdElemntID = 0;
  } else {
    lastBirdElemntID = birds[birds.length - 1].id;
  }

  const newBird = {
    id: lastBirdElemntID + 1,
    birdName: req.body.birdName,
    sound: req.body.sound,
  };

  birds.push(newBird);
  res.send(birds);
});

// Update a bird

app.put("/birds/:id", (req, res) => {
  let foundBird = birds.find((bird) => bird.id === Number(req.params.id));
  if (!foundBird) {
    res.status(400).send("No birds found with this id");
  } else {
    // Code for update a bird
    const indexNumber = birds.indexOf(foundBird);
    const updatedBird = req.body;
    birds[indexNumber] = updatedBird;
    res.send(birds);
  }
});

// Delete a bird

app.delete("/birds/:id", (req, res) => {
  let foundBird = birds.find((bird) => bird.id === Number(req.params.id));
  if (!foundBird) {
    res.status(400).send("No bird found");
  } else {
    const indexNumber = birds.indexOf(foundBird);
    birds.splice(indexNumber, 1);
    res.send(birds);
  }
});

app.listen(8080);
