const db = require ("../db/queries")

async function messagesGet(req, res) {
    const messages = await db.getAllMessages();
    res.render("index", {messages:messages});
}


// async function messagePost(req, res) {
//     console.log(req.body);
//     await db.insertMessage(req.body.messageUser, req.body.messageText)
//     messages.push({ text: req.body.messageText, user: req.body.messageUser, id: crypto.randomUUID(), added: new Date() });
//     res.redirect("/");
// }


module.exports = {
    messagesGet
}