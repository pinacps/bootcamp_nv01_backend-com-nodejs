const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  return response.status(200).send(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex(item => item.id == id);
  if (index < 0)
    return response.status(400).json({ message: "Register not found." });
  const repositorie = repositories[index];
  repositorie.title = title;
  repositorie.url = url;
  repositorie.techs = techs;
  return response.status(200).send(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(item => item.id == id);
  if (index < 0)
    return response.status(400).json({ message: "Register not found." });
  repositories.splice(index, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(item => item.id == id);
  if (index < 0)
    return response.status(400).json({ message: "Register not found." });
  const repositorie = repositories[index];
  repositorie.likes++;
  return response.status(200).send(repositorie);
});

module.exports = app;
