const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

morgan.token("post-data", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) response.json(person);
  else response.status(404).end();
});

app.post("/api/persons", (request, response) => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;

  const newPerson = request.body;

  if (!newPerson.name || !newPerson.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }
  const nameExists = persons.some((p) => p.name === newPerson.name);
  if (nameExists) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  newPerson.id = String(maxId + 1);

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.put("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  const updatedPerson = request.body;

  if (!updatedPerson.name || !updatedPerson.number) {
    return response.status(400).json({ error: "Name or number is missing" });
  }

  const personIndex = persons.findIndex((p) => p.id === id);
  if (personIndex === -1) {
    return response.status(404).json({ error: "Person not found" });
  }

  persons[personIndex] = {
    ...persons[personIndex],
    number: updatedPerson.number,
  };

  response.json(persons[personIndex]);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  response.send(
    `<p>Phonebook has info of ${persons.length} people</p> 
    <p>${currentTime}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
