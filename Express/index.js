import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.sendStatus(201).send(newTea);
});

// get all teas data
app.get("/teas", (req, res) => {
  res.sendStatus(200).send(teaData);
});

// get tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.sendStatus(404).send("Tea not found");
  }
  res.sendStatus(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.sendStatus(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.sendStatus(200).send(tea);
});

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.sendStatus(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.sendStatus(204).send("tea deleted");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${port}...`);
});
