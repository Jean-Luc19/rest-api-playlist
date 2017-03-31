const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get a list of ninjas from db
router.get('/ninjas', (req, res, next) => {
    Ninja.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000000, spherical: true}
    ).then(ninjas => res.send(ninjas))
});

//adds ninja to db
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body)
        .then(ninja => res.send(ninja))
        .catch(next)
})

//update ninja in db
router.put('/ninjas/:id', (req, res, next) => {
    Ninja
        .findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(() => {
            Ninja.findOne({_id: req.params.id})
            .then(data => res.send(data))
        })
});

//delete a ninija from db
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja
        .findByIdAndRemove({_id: req.params.id})
        .then(data => res.send(data))
});

module.exports = router;
