import cors from "cors";
import express from "express";
import mongoose, { Schema, model } from "mongoose";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((e) => {
    console.log(`Unable to connect to MongoDB.\nError: ${e}`);
  });

app.use(
  cors({
    origin: "http://localhost:5500",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/projects", async (req, res) => {
  console.log(req.body);

  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

app.put("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.set(req.body);
  await project.save();
  res.json(project);
});

app.get("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

app.delete("/projects/:id", async (req, res) => {
  await Project.deleteOne({ _id: req.params.id });
  res.json({ message: "Project deleted" });
});

app.listen(3000, (req, res) => {
  console.log("Server Initialized!");
});
