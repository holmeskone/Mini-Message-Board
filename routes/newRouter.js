const {Router} = require("express");
const db = require("../db/queries")
const messageController = require("../controllers/messageController")
const newRouter = Router();



newRouter.get("/", messageController.messagesGet);

// newRouter.post("/", messageController.messagePost);

module.exports = newRouter;