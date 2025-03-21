const express = require("express");
const crypto = require('crypto');
const newRouter = express.Router();
const { router: indexRouter, messages } = require("./indexRouter");



newRouter.get("/", (req,res) => {
    res.render("form");
});

newRouter.post("/", (req, res) => {
    console.log(req.body)
    messages.push({ text: req.body.messageText, user: req.body.messageUser, id: crypto.randomUUID(), added: new Date() });
    res.redirect("/");
  });

module.exports = newRouter;