const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "out")));

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PATCH"],
    // origin: "http://localhost:3001", //frontend origin
    origin: "*", //frontend origin
    credentials: true, //for cookies and header
  })
);

app.get("/api/todo/get", async function (req, res) {
  try {
    const newTodo = await todoModel.find();
    res
      .status(200)
      .json({ success: true, message: "All Todos", data: newTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
});

app.post("/api/todo/create", async function (req, res) {
  try {
    const { title } = req.body;
    const newTodo = await todoModel.create({ title: title });
    if (newTodo) {
      res
        .status(201)
        .json({ success: true, message: "Todo is created", data: newTodo });
    } else {
      res.status(400).json({ success: false, message: "", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.delete("/api/todo/delete/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if (deletedTodo) {
      res
        .status(200)
        .json({ success: true, message: "Todo is deleted", data: deletedTodo });
    } else {
      res
        .status(400)
        .json({ success: false, message: "todo not found", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.patch("/api/todo/edit/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body || "";
    const editedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title: title },
      { new: true }
    );
    if (editedTodo) {
      res
        .status(201)
        .json({ success: true, message: "Todo is edited", data: editedTodo });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Todo is not edited", data: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, (e) => {
  console.log("server started");
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("db connected"))
    .catch(() => console.log("db not connected"));
});

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    unique: true,
  },
  createdAt: { type: String, default: Date.now() },
});

const todoModel = mongoose.model("Todo", schema);
