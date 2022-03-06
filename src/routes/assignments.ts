import express from "express";
import { assignments } from "../../grades";
import { summary } from "../../summary";
// import { summary } from "../../summary";

const routes = express.Router();

routes.get("/api/assignments", (req, res) => {
  res.json(assignments);
});

routes.get("/api/summary", (req, res) => {
  let resultSummary = summary.map((assignment) => {
    var overallAverageFound;
    assignments.forEach((item) => item.completed === true);
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
    overallAverageFound = averageofAll;
    return {
      //   ...assignment,
      overallAverage: overallAverageFound,
      assignments: assignments,
    };
  });
  return res.json(resultSummary);
});

export default routes;
