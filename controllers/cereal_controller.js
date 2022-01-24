const express = require('express');
const { cereal } = require('.');
const router = express.Router();
const { Cereal } = require('../models')

Cereal.deleteMany({}, (error, deletedCereal) => {
    if(error) console.log(error);
    Cereal.insertMany(
        [
            {
                name: "Lucky Charms",
                price: 5,
                image: "https://www.google.com/aclk?sa=l&ai=DChcSEwjX_r7ihMv1AhWC5rMKHaiqABMYABAJGgJxbg&sig=AOD64_3ISNQ1NimNe7LbHLBba0Z4vJD2BA&adurl&ctype=5&ved=2ahUKEwj0na3ihMv1AhXWgHIEHUG6DCYQvhd6BAgBEH8",
                description: "Their magically delicious!",
            },
            {
                name: "Chocolate Chex",
                price: 4,
                image: "https://images.albertsons-media.com/is/image/ABS/960111252?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available",
                description: "Another one!",
            },
            {
                name: "Kix",
                price: 6,
                image: "https://www.kixcereal.com/wp-content/uploads/2021/03/Kix-Mid-FOP-1.png",
                description: "Kid-tested, Mother approved!",
            },
        ],
          function (error, createdCereal) {
            if (error) {
              return console.log(error);
            }
            console.log("=== Seed Complete ===");
            console.log(createdCereal);
          }
    )
    console.log(deletedCereal)
}
)

router.get('/cereal', (req, res) => {
    
    Cereal.find({}, (error, foundCereal) => {
        if(error) return console.log(error);

        console.log(foundCereal)
        context = {
            cereal: foundCereal
        }
        res.render('index.ejs', context);
    })
    /* 
    1. the first param of render() is the .ejs file 
    that we want to inject data into.
    
    2. the second param is the data that we want 
    to inject into the .ejs file (it must be an object)
    */

    /*	
    there will be a variable available inside
    the show.ejs file called cereal, 
    and its value the foundItem
   */

});

router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    cereal.create(req.body, (error, createdCereal) => {
        if(error) console.log(error);
        console.log(createdCereal);


        res.redirect("/cereal");
    })
})

router.get("/new", function(req, res) {
    res.render("new.ejs")
})

// show route
// this route will catch GET requests to /cereal/index/ and respond with a single cereal
router.get('/:cerealId', (req, res) => {
    
    cereal.findById(req.params.cerealId, (error, foundCereal) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
        }
        
        res.render('show.ejs', {cereal: foundCereal});
    });
    
});

router.delete('/:cerealId', (req, res) => {
    cereal.findByIdAndDelete(req.params.cerealId, (error, deletedCereal) => {
        if(error) {
            console.log(error);
            res.send(error);
        }

        console.log(deleteCereal);
        res.redirect('/cereal')
    })
})

router.get('/:cerealId/edit', (req, res) => {
    cereal.findById(req.params.cerrealId, (error, updatedCereal) => {
        if(error) console.log(error);

        console.log(updatedCereal);
        res.render('edit.ejs', { cereal: updatedCereal})
    })
})

router.put('/:cerealId', (req, res) => {
    console.log(`The request is ${req}`)
    // console.log(`The request's body is ${req.body}`)

    cereal.findByIdAndUpdate(req.params.cerealId, req.body,(error, updatedCereal) => {
        if (error) return console.log(error);

        console.log(updatedCereal);

        return res.redirect(`/cereal`);
    });
});

module.exports = router;

// router.get('/',(req,res) => {
//     Cereal.find({}, (error, foundCereal) => {
//         res.render("index.ejs", {cereal: 
//         foundCereal})
//     })
// })
// router.post('/', (req, res) => {
    
//     cereal.create(req.body, (error, createdCereal) => {
//         if(error) console.log(error);
//         console.log(createdCereal);
//         res.redirect("/cereal");
//     })
// })

// router.get('/:cerealId', (req, res) => {
//     cereal.findById(req.params.cerealId, (error, foundCereal) => {
//         if (error) {
//            console.log(error);
//            res.status(404).render('404.ejs', {error: error});
//         };
//         return res.render('show.ejs', {cereal: foundCereal});
//     });
//  });

//  router.delete('/:cerealId', (req, res) => {
//     cereal.findByIdAndDelete( req.params.productId, (error, deletedCereal) => {
//         if (error) return console.log(error);
    
//         console.log(deletedCereal);
//         return res.redirect('/cereal');
//     });
// });

// router.get('/:cerealId/edit', (req, res) => {
//     cereal.findById(req.params.productId, (error, updatedCereal) => {
//         if(error) console.log(error);
//         console.log(updatedCereal);
//         res.render('edit.ejs', { cereal: updatedProduct})
//     })
// })
// router.put('/:cerealId', (req, res) => {
//     console.log(`The request is ${req}`)
//     // console.log(`The request's body is ${req.body}`)
//     cereal.findByIdAndUpdate(req.params.productId, req.body,(error, updatedCereal) => {
//         if (error) return console.log(error);
//         console.log(updatedCereal);
//         return res.redirect(`/cereal`);
//     });
// });
// module.exports = router;