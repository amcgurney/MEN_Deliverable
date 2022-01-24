const express = require('express');
const router = express.Router();
const { Cereal } = require('../models')

router.get('/',(req,res) => {
    Cereal.find({}, (error, foundCereal) => {
        res.render("index.ejs", {cereal: 
        foundCereal})
    })
})
router.post('/', (req, res) => {
    
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

 router.delete('/:cerealId', (req, res) => {
    cereal.findByIdAndDelete( req.params.productId, (error, deletedCereal) => {
        if (error) return console.log(error);
    
        console.log(deletedCereal);
        return res.redirect('/cereal');
    });
});

router.get('/:productId/edit', (req, res) => {
    products.findById(req.params.productId, (error, updatedProduct) => {
        if(error) console.log(error);
        console.log(updatedProduct);
        res.render('edit.ejs', { product: updatedProduct})
    })
})
router.put('/:cerealId', (req, res) => {
    console.log(`The request is ${req}`)
    // console.log(`The request's body is ${req.body}`)
    cereal.findByIdAndUpdate(req.params.productId, req.body,(error, updatedCereal) => {
        if (error) return console.log(error);
        console.log(updatedCereal);
        return res.redirect(`/cereal`);
    });
});
module.exports = router;