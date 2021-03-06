const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/keys")
const User = mongoose.model("User");
const router = express.Router();
const bcrypt = require("bcryptjs")
const requireLogin = require("../middleware/requireLogin")



router.get("/protected", requireLogin,(req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password ,pic} = req.body;
  if (!email || !password || !name || !pic) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }

      bcrypt.hash(password,12).then(hashedpassword=>{
          const user = new User({
        email,
        name,
        password:hashedpassword,
        pic:pic
      });

      user
        .save()
        .then((user) => {
          res.json({ message: "saved successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
      })
      
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin",(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"please provide email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
    
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
              const {_id,name,email,following,followers,pic} = savedUser
                return res.json({ token,user:{_id,name,email,following,followers,pic} });
            }
            return res.status(422).json({error:"Invalid Email or password"})
    
        })
        .catch(err=>{console.log(err)})
    })

})

module.exports = router;
