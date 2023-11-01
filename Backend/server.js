// 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('./config/db.js');
const path = require('path');
const State = require('./models/State.js');
const Bootcamp = require('./models/Bootcamp.js');
const PORT = 3200;
const app = express();

// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());


// will happen on every request (taking a way the /server part)
app.use((req, res, next)=> {
    if (req.path.startsWith('/server')) {
        req.url = req.url.replace('/server', ''); // strip /server from the path
    }
    next();
})

// END MIDDLEWARE //

// START ROUTES //

// create bootcamps

//read bootcamps



app.use(express.static(path.join(__dirname, "../client/dist")));

//read states
app.get("/states", async (req,res) => {
    try {
    let dbResponse = await State.find();
    res.send(dbResponse)
} catch(err) {
    res.status(400).send("error getting the states")
}
 })

// create route for adding camps
 app.post("/camps", async (req,res) => {
    try {
    let dbResponse = await Bootcamp.create(req.body);
    res.status(201).send(dbResponse)
} catch(err) {
    res.status(400).send("error getting the camps")
}
 })

// read
app.get("/camps", async (req,res) => {
    try {
    let dbResponse = await Bootcamp.find(req.body);
    res.status(201).send(dbResponse)
} catch(err) {
    res.status(400).send("error getting camps")
}
 })

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

// END ROUTES //
app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});