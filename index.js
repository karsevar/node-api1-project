const express = require('express');

const {find,
        findById,
        insert,
        update,
        remove} = require('./data/db.js');

const server = express();
server.use(express.json()); // teaches express how to parse json from the body

server.post('/api/users', (req, res) => {
    // read information sent by client
    const userInfo = req.body;

    // check that information is valid.
    // console.log(req.body) 

    if (userInfo.name && userInfo.bio) {

        // save to database
        insert(userInfo)
            .then(result => {
                res.json(result)
            })
            .catch(error => {
                res.json(error)
            })
        } else {
            res
                .status(400) 
                .json({ error: "There was an error while saving the user to the database" })
        }
});


server.listen(8000, () => {
    console.log('\nApi listening on port 8000')
});
