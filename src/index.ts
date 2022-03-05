import express from "express";

// require the cors module
import cors from "cors";

import path from "path";
import routes from "./routes/assignments";
import { assignments, Grade } from "../grades";

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
  res.render("Homepage", { assignments: assignments });
});

app.get("/addAssignment", (req, res) => {
  res.render("AssignmentDetails", { assignments: assignments });
});

app.post("/submit", (req, res) => {
  console.log("assignment adding post here", req.body.assignment);
  const assignment = req.body.assignment;
  const score = +req.body.score;
  const total = +req.body.total;
  var complete = req.body.complete ? "yes" : "no";
  assignments.push({
    Assignment: assignment,
    Score: score,
    Total: total,
    Completed: complete,
  });
  console.log("assignments after push", assignments);
  res.render("AssignmentAdded", { assignment, score, total, complete });
});

app.get("/seeAllAssignments", (req, res) => {
  res.render("HomePage", { assignments: assignments });
});

app.get("/delete/:name", (req, res) => {
  const index = assignments.findIndex(
    (assgn) => assgn.Assignment === req.params.name
  );
  if (index === -1) {
    return res.status(404).json({ error: "The assignment could not be found" });
  }
  assignments.splice(index, 1);
  res.render("DeleteAssignment", { assignment: req.params.name });
});

app.listen(port, () => console.log(`Listening on port: ${port}.`));
