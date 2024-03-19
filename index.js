const express = require("express");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({message:" Welcome to my Blog!"});
});
connectToDb();

app.listen(port, () => {
    console.console.log(`server listening on port ${port}`);
});