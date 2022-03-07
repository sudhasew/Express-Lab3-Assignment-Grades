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
  res.render("HomePage", { assignments: assignments });
});

app.get("/Homepage", (req, res) => {
  res.render("HomePage", { assignments });
});

app.get("/assignDetails", (req, res) => {
  res.render("AssignmentDetails", { assignments });
});

app.get("/never-mind", (req, res) => {
  res.render("Homepage", { assignments });
});

app.get("/addAssignment", (req, res) => {
  res.render("AssignmentDetails");
});

app.post("/submit", (req, res) => {
  const assignment = req.body.assignment;
  const score = +req.body.score;
  const total = +req.body.total;
  var complete = req.body.complete ? "yes" : "no";
  assignments.push({
    name: assignment,
    score: score,
    total: total,
    completed: complete,
  });
  res.render("AssignmentAdded", { assignment, score, total, complete });
});

app.get("/seeAllAssignments", (req, res) => {
  var averageofAll = seeAllAverage();
  console.log("average here is", averageofAll);
  assignments.forEach(function (item) {
    if (item.completed === "no") {
      item.completed = "";
    } else if (item.completed || item.completed === "yes") {
      item.completed = "✔";
    } else {
      item.completed = "";
    }
  });
  res.render("HomePage", {
    assignments: assignments,
    averageofAll,
  });
});

app.get("/delete/:name", (req, res) => {
  const index = assignments.findIndex(
    (assgn) => assgn.name === req.params.name
  );
  if (index === -1) {
    return res.status(404).json({ error: "The assignment could not be found" });
  }
  assignments.splice(index, 1);
  res.render("DeleteAssignment", { assignment: req.params.name });
});

app.delete("/delete/:name", (req, res) => {
  console.log("here", req.params.name);
  const index = assignments.findIndex(
    (assgn) => assgn.name === req.params.name
  );
  if (index === -1) {
    return res.status(404).json({ error: "The assignment could not be found" });
  }
  assignments.splice(index, 1);
  res.render("DeleteAssignment", { assignment: req.params.name });
});

function seeAllAverage() {
  var totalAll = 0;
  var scoreAll = 0;
  var averageofAll = 0;
  assignments.forEach(function (item) {
    if (item.completed || item.completed === "yes") {
      scoreAll += item.score;
      totalAll += item.total;
      console.log("averageofAll", totalAll);
    }
  });
  averageofAll = (scoreAll / totalAll) * 100;
  return averageofAll.toFixed(1);
}

app.listen(port, () => console.log(`Listening on port: ${port}.`));
