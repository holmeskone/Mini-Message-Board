const db = require ("../db/queries")

async function messagesGet(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", {messages:messages});
}

async function createMessageGet(req, res) {
    res.render("form");
}

async function createMessagePost(req, res){
    console.log(req.body);
    await db.insertMessage(req.body.messageUser, req.body.messageText);
    res.redirect("/");

}


module.exports = {
    messagesGet,
    createMessageGet,
    createMessagePost
}