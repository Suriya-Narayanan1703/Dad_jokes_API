const express = require("express");
const joi = require("joi");
const object = require("joi/lib/types/object");
const app = express();
app.use(express.json());
//const mongoose = require("mongoose");
/*
mongoose.connect("mongodb://localhost:27017");

const UserSchema = mongoose.Schema({
  id: Number,
  author: String,
  joke: String,
});

const UserModel = mongoose.model("Dad", UserSchema);
*/
const jokes = [
  {
    id: 1,
    author: "suriya",
    joke: "I'm afraid for the calendar. Its days are numbered.",
  },
  {
    id: 2,
    author: "candie",
    joke: "Dear Math, grow up and solve your own problems.",
  },
  {
    id: 3,
    author: "fletcher",
    joke: 'What did the ocean say to the beach?" "Nothing, it just waved.',
  },
];
app.get("/jokes", (req, res) => {
  res.send(
    "<h1><center>Hello homies, this is dad jokes api for to make you laugh...</center></h1>"
  );
});

app.get("/jokes/full", (req, res) => {
  res.send(jokes);
});

app.get("/jokes/:id", (req, res) => {
  var joke = jokes.find((c) => c.id == parseInt(req.params.id));
  if (!joke)
    res
      .status(404)
      .send("Dad hasn't said any such joke with the id you mentioned...");

  res.send("The joke is: " + joke["joke"]);
});

app.post("/jokes/add", (req, res) => {
  //const schema = {
  //name: joi.string().min(3).required(),
  //};

  //const result = joi.validate(req.body, schema);
  //console.log(result);

  //if (result.error) {
  //res.status(404).send("your dad missed something in the joke..");
  //return;
  //}
  var name = req.body.author;
  console.log(name);
  var jk = req.body.joke;
  const jokeadd = {
    id: jokes.length + 1,
    author: name,
    joke: jk,
  };
  jokes.push(jokeadd);
  res.send(jokeadd);
});
app.listen(3000, () => console.log("listening.."));

app.put("/jokes/edit", (req, res) => {
  var jokeedit = jokes.find((c) => c.id == parseInt(req.body.id));
  if (!jokeedit) {
    res
      .status(404)
      .send("Dad hasn't said any such joke with the id you mentioned...");
  }
  jokeedit["joke"] = req.body.newjoke;
  res.send(jokeedit);
});
app.delete("/jokes/delete/:id", (req, res) => {
  var jokeedit = jokes.find((c) => c.id == parseInt(req.body.id));
  var ml = jokes.indexOf(jokeedit);
  jokes.splice(ml, 1);
  res.send(jokes);
});
