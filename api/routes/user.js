const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');



router.post('/',(req,res,next)=>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        prenom: req.body.prenom,
        nom: req.body.nom,
        country: req.body.country,
        address: req.body.address,
        phone: req.body.phone
    });

    user
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
          message:'user created',
          createdprudct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        })
      });
});















module.exports= router;
