// implement your API here
const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());
const port = 5000;
// root get
server.get('/', (req, res) => {
    res.status(200).send('Users API');
})
// users get
server.get('/api/users', (req, res) => {
    db.find()
        .then( resolve => {
            res.status(200).json(resolve)
        })
        .catch( err => {
            res.status(500).send('Could Not Get Data')
        })
})
// users get by id
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then( user => {
            res.status(200).json(user)
        })
        .catch( err => {
            res.status(500).send('Could Not Get Data')
        })
})
// users post
server.post('/api/users', (req, res) => {
    const user = req.body;
    db.insert(user)
        .then( users => {
            console.log(users);
            res.status(201).json(users);
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Could not add user');
        })
})
// users delete
server.delete(('/api/users/:id'), (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then( deleted => {
            console.log(deleted);
            res.status(200).json(deleted);
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Could not delete resource');
        })
})
// users put edit
server.put(('/api/users/:id'), (req, res) => {
    const id = req.params.id;
    const user = req.body;

    db.update(id, user)
        .then( updated => {
            console.log(updated);
            res.status(204).json(updated);
        })
        .catch( err => {
            console.log(err);
            res.status(500).send('Could not update resource');
        })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})