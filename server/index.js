const express = require("express");

require("./models/database");
require("./models/User");
require("./models/Score");

const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');
const cors = require('cors');


// const User = mongoose.model("User");
// const Score = mongoose.model("Score");
const { body, validationResult } = require('express-validator');

const port = 4000;
const app = express();
const User = require('./models/User');
const Score = require('./models/Score');

app.use(express.json());
app.options('*', cors());

app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.post(
  '/login',
  body('username').notEmpty(),
  body('password').isLength({ min: 3 }),
  async (req, res) => {
    const { username, password } = req.body;
    console.log("*******USERNAME",username );
    console.log("*******PASSWORD", password);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const isUserExist = await User.findOne({ username });
      console.log('isUserExist ; ', isUserExist);

      if (isUserExist) {
        console.log('le username existe deja');
        const tokenLogin = jwt.sign({ userId: isUserExist._id }, "MY_SECRET_KEY");
        console.log("tokenLogin : ", tokenLogin);

        return res.status(200).send({tokenLogin});
      }
      const user = new User({
        username,
        password,
      });
      await user.save();
      const tokenSuscribe = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
      res.send({ tokenSuscribe });
    } catch (error) {
      console.log(error.message);
      return res.status(422).send({
        name: error.name,
        code: error.code,
        message: "username invalide",
      });
    }
  }
);

app.get('/', async (req, res) => {
res.send('bonjour');
});

// route pour recupérer tout les score en bdd
app.get('/getScore', async (req, res) => {
  await Score.find()
    // .sort("score")
    .exec((err, result) => {
      if (!result) {
        res.send(err);
      } else {
        res.status(201).send(result);
      }
    });
});

// route pour ajouté son score
app.post("/addScore", async (req, res) => {
  const { token , score } = req.body;

  if (!token) {
    return res.status(422).send({ error: "Pas de token" });
  }
  try {
    jwt.verify(token, async (err, payload) => {
      if (err) {
        return res
          .status(401)
          .send({ error: "impossible de set les score probleme token" });
      }

      const score = new Score({
        score,
        date,
      });
      await score.save();
      res.send(score);
    });
  } catch (err) {
    return res.status(422).send({ error: "impossible de créer un score" });
  }
});

// route pour update son score
app.post('/updateScore', async (req, res) => {
  const { token, userId, date, point } = req.body;

  const scoreToUpdate = await Score.findOne({ _id: userId });
  scoreToUpdate.point = point;
  scoreToUpdate.date = date;
  scoreToUpdate.save();

  res.send(scoreToUpdate);
});

// route pour delete son score
app.post('/deleteScore/:id', async (req, res) => {
  Score.findByIdAndRemove({ _id: req.params.id }, async (err) => {
    if (err) res.send(err);
    else res.json("Bien retiré");
  });
});

app.get('/hello', (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
