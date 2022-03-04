import express from "express";

// require the cors module
import cors from "cors";

import path from "path";
import routes from "./routes/assignments";
import { assignments } from "../grades";

// creates an instance of an Express server
const app = express();

// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

// allow POST and PUT requests to use JSON bodies
app.use(express.json());

app.use("/", routes);

// define the port
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("images"));

app.get("/", (req, res) => {
  res.render("HomePage");
});

app.get("/Homepage", (req, res) => {
  res.render("HomePage", { assignments: assignments });
});

app.get("/assignDetails", (req, res) => {
  res.render("AssignmentDetails", { assignments: assignments });
});

app.get("/never-mind", (req, res) => {
  res.render("Homepage");
});

app.get("/addAssignment", (req, res) => {
  res.render("AssignmentDetails", { assignments: assignments });
});

app.post("/submit", (req, res) => {
  console.log("assignment adding post");
  const assignment = req.body.assignment;
  const score = +req.body.score;
  const total = +req.body.total;
  const complete = req.body.complete ? "yes" : "no";
  res.render("AssignmentAdded", { assignment, score, total, complete });
});

app.get("/seeAllAssignments", (req, res) => {
  res.render("HomePage", { assignments: assignments });
});

app.get("/delete", (req, res) => {
  res.render("Delete");
});

app.listen(port, () => console.log(`Listening on port: ${port}.`));
