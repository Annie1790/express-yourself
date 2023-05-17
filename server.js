const express = require("express");
const app = express();
const PORT = 4001;

const fs = require("fs");
let id = 0;
let createTxtFile = fs.createWriteStream("database.txt");

//Path resolver 
const resolve = require("path").resolve;
//middleware that parses user input and makes it available through the req.body property.
const bodyParser = require("body-parser");
//encodes the data from the body 
//extended lets you choose which which library we wish to use to parse the encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//route parameters: route path segments begin with : . They act as wildcards, matching any text at that path segment
//express parses any parameters, extract their values, and attaches them as an object to the request object: req.params
//this object’s keys are any parameter names in the route, and each key’s value is the actual value of that field per request.

app.post("/", (req, res, next) => {
    console.log(req.body)
    let username = req.body.username;
    let password = req.body.password;
    id++;
    let result = JSON.stringify({
        [id]: {
            username: username,
            password: password
        }
    })
    createTxtFile.write(`${result}\n`);
})

app.get("/", (req, res, next) => {
    res.sendFile(resolve("./index.html"));
})

app.listen(PORT, () => {
    console.log("server is listening on " + PORT);
})