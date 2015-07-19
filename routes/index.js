var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/world");
mongoose.set('debug', true);

var countrySchema = new mongoose.Schema({
    name: String,
    flag: String,
    capital: String,
    population: Number
});
var Country =  mongoose.model("country", countrySchema);



router.get('/', function(req, res, next) {
  Country.find({}, function(err,data){
  res.render('index', {countries: data });
  })
});


router.get('/new', function(req,res,next){
  res.render('new')
})


router.post('/new', function(req,res,next){
  Country.create({
    name: req.body.name,
    flag: req.body.flagUrl,
    capital: req.body.capital,
    population: req.body.population
  },
  function(err, data){
    if(err){
      res.render('new', {warning: 'Information entered is invalid'})
    } else{
      res.redirect('/')
    }
  }
  )
})


router.get('/show/:id', function(req,res,next){
  Country.findById({
    _id: req.params.id
  },
  function(err,data){
    res.render('show', {id: req.params.id, name: data.name, captial: data.capital, population: data.population, flag: data.flag})
  })
})


router.get('/show/:id/update', function(req,res,next){
  Country.findById({
    _id: req.params.id
  },
  function(err,data){
    res.render('update',{id: req.params.id, name: data.name, capital: data.capital, population: data.population, flag: data.flag})
  })
})


router.post('/show/:id/update',function(req,res,next){
  Country.update({
      _id: req.params.id
    },
    {
      name: req.body.name, flag: req.body.flagUrl, population: req.body.population, capital: req.body.capital
    },
    function(err,ok){
      if(ok){
        res.redirect('/')
      } else{
        res.render('update')
      }
    }
  )
})


router.post('/show/:id/delete',function(req,res,next){
  Country.remove({
    _id: req.params.id
  },
   function(err,ok){
    if(ok){
      res.redirect('/')
    }
  })
})




module.exports = router;
