const express = require("express");


const app = express();
app.use(express.json());

let user = {
  id: 1,
  name: "Aman",
  age: 20,
  isActive: true
};

app.get("/user", (req, res) => {
  res.json(user);
});

app.post("/user", (req, res) => {
  user.id += 1;
  res.send(`New user created with id ${user.id}`);
});

app.put("/user", (req, res) => {
  user = {
    id: 1,
    name: req.body.name,
    age: req.body.age,
    isActive: req.body.isActive
  };
  res.send("User replaced completely");
});

app.patch("/user/age", (req, res) => {
  user.age += 1;
  res.send(`Age increased to ${user.age}`);
});

app.patch("/user/toggle", (req, res) => {
  user.isActive = !user.isActive;
  res.send(`isActive is now ${user.isActive}`);
});

app.patch("/user/name", (req, res) => {
  user.name = req.body.name;
  res.send(`Name set to ${user.name}`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
