const express = require("express");
const app = express();
const indexRouter = require('./routes/indexRouter');
const newRouter = require("./routes/newRouter");
const path = require("node:path");


// Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse form data (should be before routes)
app.use(express.urlencoded({ extended: true }));

// Use routers
app.use("/", indexRouter); 
app.use("/new", newRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
