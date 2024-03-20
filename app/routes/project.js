const express = require("express");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// dotenv load
require("dotenv").config();

const router = express.Router();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((e) => {
    console.log(`Unable to connect to MongoDB.\nError: ${e}`);
  });

const Project = model(
  "project",
  new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/projects", async (req, res) => {
  console.log(req.body);

  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

router.put("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.set(req.body);
  await project.save();
  res.json(project);
});

router.get("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

router.delete("/projects/:id", async (req, res) => {
  await Project.deleteOne({ _id: req.params.id });
  res.json({ message: "Project deleted" });
});

module.exports = router;
