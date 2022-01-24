const express = require('express');
const { cereal } = require('.');
const router = express.Router();
const { Cereal } = require('../models')

router.get('/',(req,res) => {
    Cereal.find({}, (error, foundCereal) => {
        res.render("index.ejs", {cereal: 
        foundCereal})
    })
})
router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    cereal.create(req.body, (error, createdCereal) => {
        if(error) console.log(error);
        console.log(createdCereal);
        res.redirect("/cereal");
    })
})

router.get('/:cerealId', (req, res) => {
    cereal.findById(req.params.cerealId, (error, foundCereal) => {
        if (error) {
           console.log(error);
           res.status(404).render('404.ejs', {error: error});
        };
        return res.render('show.ejs', {cereal: foundCereal});
    });
 });