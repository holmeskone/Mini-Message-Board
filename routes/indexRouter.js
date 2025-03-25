const { Router } = require("express");
const indexRouter = Router();
const messageController = require("../controllers/messageController");


indexRouter.get("/", messageController.messagesGet);

module.exports = indexRouter;
