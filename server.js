///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const { PORT = 3030, DATABASE_URL } = process.env;
const express = require("express"); 
const app = express();
const mongoose = require("mongoose");

// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const BookmarksSchema = new mongoose.Schema({
  title: String,
  url: String,
  
});

const Bookmarks = mongoose.model("Bookmarks", BookmarksSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); 
app.use(morgan("dev")); 
app.use(express.json()); 

///////////////////////////////
// ROUTES /controllers
////////////////////////////////
// test route
app.get("/", (req, res) => {
  res.send("hello Bookmarks");
});


//Index- Getting all bookmarks
app.get("/bookmarks", async (req, res) => {
  try {
    // find all from db
    res.json(await Bookmarks.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//Create- Posting a new bookmark
app.post("/bookmarks", async (req, res) => {
  try {
    // send all from db
    res.json(await Bookmarks.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//Update- Updating a bookmark
app.put("/bookmarks/:id", async (req, res) => {
  try {
    // send all from db
    res.json(
      await Bookmarks.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//Delete- Deleting a bookmark
app.delete("/bookmarks/:id", async (req, res) => {
  try {
    // send all from db
    res.json(await Bookmarks.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//Show- Show an individual book
app.get("/bookmarks/:id", async (req, res) => {
  try {
  
    res.json(await Bookmarks.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));