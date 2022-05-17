const router = require('express').Router();
let Buying = require('../models/buying.model');

router.route('/').get((req,res) => {
    Buying.find()
        .then(buying => res.json(buying))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/add').post((req,res) => {
    const year = Number(req.body.year);
    const month = Number(req.body.month);
    const day = Number(req.body.day);
    const item = req.body.item;
    const amount = Number(req.body.amount);
    const issuedPerson = req.body.issuedPerson;
    

    const newBuying = new Buying({
        year,
        month,
        day,
        item,
        amount,
        issuedPerson,
       
    });
    newBuying.save()
        .then(() => res.json('New Item added!'))
        .catch(err => res.status(400).json('Error : ' +err));
});
router.route('/:id').get((req,res) => {
   Buying.findById(req.params.id)
        .then(buying => res.json(buying))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/:id').delete((req,res) => {
  Buying.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted'))
        .catch(err => res.status(400).json('Error : ' +err));
});

router.route('/update/:id').post((req,res) => {
   Item.findById(req.params.id)
        .then(buying => {
            buying.year = Number(req.body.year);
            buying.month = Number(req.body.month);
            buying.day = Number(req.body.day);
            buying.item = req.body.item;
            buying.amount = Number(req.body.amount);
            buying.issuedPerson = req.body.issuedPerson;

           buying.save()
                .then(() => res.json('Item updated'))
                .catch(err => res.status(400).json('Error : ' +err));
        })

        .catch(err => res.status(400).json('Error : ' +err));
});
module.exports = router;

