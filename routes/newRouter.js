const {Router} = require("express");
const db = require("../db/queries")
const messageController = require("../controllers/messageController")
const newRouter = Router();



newRouter.get("/", messageController.createMessageGet);

newRouter.post("/", messageController.createMessagePost);

module.exports = newRouter;