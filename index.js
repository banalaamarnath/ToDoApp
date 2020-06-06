var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var validations = require("./validations");
var handlers = require("./handlers");
var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
var db = mongoose.connect('mongodb://localhost:27017/todoApp', { useNewUrlParser: true, useUnifiedTopology: true });

//empty Api
app.get("/", handlers.emptyApi);

//get data
app.get("/todo", handlers.handleGetUsers);

//insert in database
app.post("/todo", validations.validateNewUser, handlers.handleAddNewUser);

//update in database
app.put("/todo", validations.CheckID, validations.validateUpdateUser, handlers.handleUpdateUser);

//delete in database
app.delete("/todo", validations.CheckID, handlers.handleDeleteUser);






app.listen(2444, function () {
    console.log("2444 is listening");
})