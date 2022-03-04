import express from "express";
import { assignments } from "../../grades";

const routes = express.Router();

routes.get("/api/assignments", (req, res) => {
  res.json(assignments);
});

export default routes;
