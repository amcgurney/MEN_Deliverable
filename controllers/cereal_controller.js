router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    cereal.create(req.body, (error, createdCereal) => {
        if(error) console.log(error);
        console.log(createdCereal);
        res.redirect("/cereal");
    })
})