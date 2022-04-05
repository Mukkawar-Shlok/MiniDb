const { error } = require('console');
const express = require('express');
const { render } = require('express/lib/response');
const mongoose = require('mongoose');
const Task = require('./model/task');

const port = 3000;
const app = express()

//connecting to database
const dbURL = "mongodb+srv://@cluster0.gkqoe.mongodb.net/node?retryWrites=true&w=majority";
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbURL)
    .then((result) => app.listen(process.env.PORT || port))
    .catch((error) => console.log(error));




app.get('/home', (req, res) => {
    Task.find()
        .then((result) => {
            res.render('list', { maintitle: 'test', tasks: result })
        })
        .catch((error) => { console.log(error) })
})


app.get('/home/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Task.findById(id)
        .then(result => {
            res.render('details', { tasks: result, title: 'Details' });
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/null', (req, res) => {
    res.render('null')
})

app.delete('/home/:id', async (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then((result) => {
            console.log('in delete then');
            res.json({ redirect: '/home' })
        })
        .catch((err) => { console.log() })
})


app.get('/create', (req, res) => {
    res.render('home', { title: 'create' })
})

app.post('/create', (req, res) => {
    const task = new Task(req.body)

    task.save()
        .then((result) => {
            res.redirect('/home')
        })
        .catch((error) => {
            console.log(error);
        })
})


app.get('/', (req, res) => {
    const task = new Task({
        title: 'Testing 2 ',
        description: 'testing sec model',
        stat: false
    })
    task.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            console.log(error);
        })
})

app.get('/all-task', (req, res) => {
    Task.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        })
})

app.get('/sin')


app.set('view engine', 'ejs');
app.use(express.static('public'));
