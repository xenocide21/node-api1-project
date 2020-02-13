const express = require("express")
const server = express()
const db = require('./data/db')
//Middleware
server.use(express.json())
//Root get response
server.get('/', (req, res) =>{
    res.json({message: 'Server is live'})
});
// Port and Listening information
const port = process.env.PORT || 5000;
server.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
})
//Get list of users
server.get('/api/users', (req, res) => {
    db.find()
        .then(e => res.status(200).json(e))
        .catch(err =>{res.status(500).send({ errorMessage: "The users information could not be retrieved." }, err)})
})
//Get user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(user => {res.status(200).json(user)})
        .catch(err =>{res.status(404).send({ message: "The user with the specified ID does not exist." }, err)})
})
//Edit user
server.put('/api/users/:id', (req, res) =>{
    const id = req.params.id
    const user = req.body
    db.update(id, user)
        .then(updated => {res.status(204).json(updated)})
        .catch(err =>{res.status(404).send({ message: "The user with the specified ID does not exist." }, err)})
})
//Delete user
server.delete('/api/users/:id', (req, res) =>{
    const id = req.params.id
    db.remove(id)
        .then(deleted => {res.status(200).json(deleted)})
        .catch(err =>{res.status(500).send({ errorMessage: "The user could not be removed" },err)})
})