let express = require('express'); //added by dtrip per recommendation of not putting all in same controller
let router = express.Router();
let sequelize = require('../db');

let Bars = require('../db').import('../models/bars');


router.get('/getDT', (req, res) => {
    Bars.findAll({
        where:{
            location: 'DT'
        }}
    )
    .then(json => res.status(200).json(json))
    .catch(err => res.status(500).json ({Error: err}))
})

router.get('/getFS', (req, res) => {
    Bars.findAll({
        where:{
            location: 'FS'
        }
    })
    .then(json => res.status(200).json(json))
    .catch(err => res.status(500).json ({Error: err.message}))
})

router.get('/getBR', (req, res) => {
    Bars.findAll({
        where:{
            location: 'BR'
        }
    })
    .then(json => res.status(200).json(json))
    .catch(err => res.status(500).json ({Error: err}))
})

module.exports = router; 