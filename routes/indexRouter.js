const express = require("express");
const indexRouter = express.Router()

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    id: crypto.randomUUID(),
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    id: crypto.randomUUID(),
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { messages }); 
});

indexRouter.get("/:user/:id",(req,res) => {
  const {user, id} = req.params;
  console.log("Params:", req.params);
  const message = messages.find(m => m.id == id && m.user == user);
  console.log(message)
  res.render("detailMessage",{ message})
})

module.exports = { router: indexRouter, messages };
