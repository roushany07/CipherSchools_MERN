const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "./students.json";

app.get("/", (req, res) => {
  res.send("Student Record Management API is running 🚀");
});

const readData = () => JSON.parse(fs.readFileSync(FILE, "utf-8"));

const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

app.post("/students", (req, res) => {
  const students = readData();
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    course: req.body.course,
  };
  students.push(newStudent);
  writeData(students);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(readData());
});

app.get("/students/:id", (req, res) => {
  const students = readData();
  const student = students.find((s) => s.id == req.params.id);
  student ? res.json(student) : res.status(404).json({ message: "Not Found" });
});

app.put("/students/:id", (req, res) => {
  const students = readData();
  const index = students.findIndex((s) => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Not Found" });
  students[index] = { ...students[index], ...req.body };
  writeData(students);
  res.json(students[index]);
});

app.delete("/students/:id", (req, res) => {
  let students = readData();
  students = students.filter((s) => s.id != req.params.id);
  writeData(students);
  res.json({ message: "Student Deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
