var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Anatolii:teapot@ds113455.mlab.com:13455/cars-and-owners', ['cars']);

// Get All Cars
router.get('/cars', function (req, res, next) {
    db.cars.find(function (err, cars) {
        if(err) {
            res.send(err);
        }
        res.json(cars);
    });
});

// Get Single Car
router.get('/car/:id', function (req, res, next) {
    db.cars.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, car) {
        if(err) {
            res.send(err);
        }
        res.json(car);
    });
});

// Save Car
router.post('/car', function (req, res, next) {
    var car = req.body;

    if (!car.model || !car.price || !car.run || !car.color || !car.owner || !car.city || !(car.isSold + '')) {
        res.status(400);
        res.json({
           "error": "Bad Data"
        });
    } else {
        db.cars.save(car, function (err, car) {
            if(err) {
                res.send(err);
            }
            res.json(car);
        });
    }
});

// Delete Car
router.delete('/car/:id', function (req, res, next) {
    db.cars.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, car) {
        if(err) {
            res.send(err);
        }
        res.json(car);
    });
});

// Update Car
router.put('/car/:id', function (req, res, next) {
    var car = req.body;
    var updCar = {};

    if(car.isSold) {
        updCar.isSold = car.isSold;
    }

    if(car.model) {
        updCar.model = car.model;
    }

    if(car.price) {
        updCar.price = car.price;
    }

    if(car.run) {
        updCar.run = car.run;
    }

    if(car.color) {
        updCar.color = car.color;
    }

    if(car.owner) {
        updCar.owner = car.owner;
    }

    if(car.city) {
        updCar.city = car.city;
    }

    if(!updCar) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.cars.update({_id: mongojs.ObjectId(req.params.id)}, updCar, {}, function (err, car) {
            if(err) {
                res.send(err);
            }
            res.json(car);
        });
    }

});


module.exports = router;