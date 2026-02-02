const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const FILE = "./students.json";

app.get("/", (req, res) => {
  res.send("Student Record Management API is running 🚀");
});



const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(FILE));
  } catch {
    return [];
  }
};
const writeData = (data) =>
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));


app.post("/students", (req, res) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    return res.status(400).json({ message: "All fields required" });

  const students = readData();
  const newStudent = { id: Date.now(), name, email, course };
  students.push(newStudent);
  writeData(students);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(readData());
});

app.get("/students/:id", (req, res) => {
  const students = readData();
  const student = students.find(s => s.id == req.params.id);
  student ? res.json(student) : res.status(404).json({ message: "Not Found" });
});

app.put("/students/:id", (req, res) => {
  const students = readData();
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Not Found" });

  students[index] = { ...students[index], ...req.body };
  writeData(students);
  res.json(students[index]);
});

/* DELETE - Remove student */
app.delete("/students/:id", (req, res) => {
  let students = readData();
  students = students.filter(s => s.id != req.params.id);
  writeData(students);
  res.json({ message: "Student Deleted" });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
