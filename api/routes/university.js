const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const RegExp = require('../middleware/regex-escape');
const Uni = require('../models/univesity');

router.post('/',(req,res,next)=>{
    const uni = new Uni({
        _id: new mongoose.Types.ObjectId(),
        uniname: req.body.uniname,
        uniwebsite: req.body.uniwebsite,
        uniphone: req.body.uniphone,
        uniaddress: req.body.uniaddress,
        uniabout: req.body.uniabout,
        uniimg: req.body.uniimg
    });

    uni
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message:'uni created',
            createduniversity: result
        });
    })
    .catch(err=>{
        res.status(500).json(
            {
                error: err
            }
        )
    });


});

///////////////////////////////////////////////normal get(/) ///////////////////////////


router.get('/',(req,res,next)=>{

Uni.find()
.select(' _id uniname uniwebsite uniphone uniaddress uniabout uniimg')
.populate('Uni')
.exec()
.then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
      uniname: doc.uniname,
      uniwebsite: doc.uniwebsite,
      uniphone: doc.uniphone,
      uniaddress: doc.uniaddress,
      uniabout: doc.uniabout,
      uniimg: doc.uniimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d l uni , 2000000IQ shit
          type:'GET',
          url:'http://localhost:6000/university/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });


});

///////////////////////////////////////////// search pagenation/////////////////////////////////////////////
router.get('/search/:uniname/:page',(req, res, next)=>{


    const resPerPage =5;
    const page = req.params.page || 1;
  console.log(page);
    var regex = new RegExp(req.params.bookName, 'i');
    Uni.find({'uniname': regex })
     //.sort({'createdAt':-1})
     .skip((resPerPage * page) - resPerPage)
    .limit(resPerPage)
    .select(' _id uniname uniwebsite uniphone uniaddress uniabout uniimg')
    .populate('Uni')
    .exec()
    .then(docs =>{
    const response={
     count:docs.length,
      products: docs.map(doc=>{
        return{
          _id: doc._id,
        uniname: doc.uniname,
        uniwebsite: doc.uniwebsite,
        uniphone: doc.uniphone,
        uniaddress: doc.uniaddress,
        uniabout: doc.uniabout,
        uniimg: doc.uniimg,
          request:{
            //hna kay3tik link w methode li tdir bach tjbed
            //gha wa7d l uni , 2000000IQ shit
            type:'GET',
            url:'http://localhost:6000/university/' +doc._id
          }
        }
      })
    };
  
      res.status(200).json(response);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
  });

////////////////////////////////////////////////////////get product by id////////////////////////////////
router.get('/:uniId', (req, res, next)=>{
  const id = req.params.uniId;
  Uni.findById(id)
  .exec()
  .then(doc =>{
    console.log("from database",doc);
    if(doc){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message: 'No valid entry found for provided ID'
      });
    }

  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});

  });
});
/////////////////////////////search by name ////////////////////////////////////////////
router.get('/search/:uniname',(req, res, next)=>{

  var regex = new RegExp(req.params.uniname, 'i');
  Uni.find({'uniname': regex })
  // .sort({'createdAt':-1})
  //.limit(5)
  .select(' _id uniname uniwebsite uniphone uniaddress uniabout uniimg')
  .populate('Uni')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        uniname: doc.uniname,
        uniwebsite: doc.uniwebsite,
        uniphone: doc.uniphone,
        uniaddress: doc.uniaddress,
        uniabout: doc.uniabout,
        uniimg: doc.uniimg,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:6000/university/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});









module.exports= router;
