let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let User = sequelize.import('../models/user');
const validateSession = require('../middleware/validate-session');
const userbars = require('../db').import('../models/userbars');

router.get('/', function(req, res) {
    res.send('Hey!! This is a test route!');
})

router.get('/test', function(req, res){
    res.send('Test generate');
})

router.post('/user/', function(req, res) {

    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10) // Store hash in database


    }).then(
        function createSuccess(user){

        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn :60*60*24});
            
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

//CREATING AND VERIFYING PASSWORD - HASH (MVP)
router.post('/login', function(req, res) {
;
    User.findOne( { where: { username: req.body.user.username } } ).then(

        //SYNCHRONOUS APPROACH 
        function(user){
            if (user) {
                
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                
                    if(matches) { //PASSWORDS MATCH 
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                });
                    }else { //PASSWORDS DO NOT MATCH 
                        res.status(502).send({ error: "Sign In Error"});
                    }
                });  
            } else {
                res.status(500).send({ error : "Failed to authenticate"});
            }
        },
        function(err) {
            res.status(501).send({error: "Login Error"});
        }
    );
});

router.post('/userbars', validateSession, function(req, res){
    const userbarsFromRequest = {
        name: req.body.name,
        rating: req.body.rating,
        owner: req.user.id
    }
    console.log(userbarsFromRequest)

    userbars.create(userbarsFromRequest)
        .then(userbars => res.status(200).json(userbars))
        .catch(err => res.json(req.errors));
})

router.put('/:id', validateSession, (req, res) => {
    userbars.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userbars => res.status(200).json(userbars))
    .catch(err => res.json({
        error: err
    }))
})


router.delete('/:id', validateSession, (req, res) => { /// validateSession, to be added back in 
    userbars.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userbars => res.status(200).json(userbars))
    .catch(err => res.json({
        error: err
    }))
})


router.get('/userbars', validateSession, function(req, res) {
    let user = req.user.id;

    userbars
    .findAll({
        where: {owner: user }
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});


module.exports = router;