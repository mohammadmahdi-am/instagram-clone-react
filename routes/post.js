const router = require("express").Router()
const mongoose = require("mongoose")
const Post = mongoose.model('Post')
const User = mongoose.model('User')
const requireLogin = require('../middleware/requireLogin')

router.post ("/createpost",requireLogin,(req,res)=>{
    const {title,body,pic} = req.body

    if(!title || !body || !pic){
        return res.status(422).json({error:"please add all the fields"})
    }

    req.user.password = undefined
    
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy :  req.user._id
    }) 
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
    
    

})
router.get("/allposts",requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.status(200).json({posts})
    }).catch(err=>{
        console.log(err)
    })
    
    

})

router.get("/singlepost/:postid",requireLogin,(req,res)=>{

    Post.findById(req.params.postid)
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.json(err)
        }
        return res.json(result)
    })
})

router.get("/myposts",requireLogin,(req,res)=>{
    
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myposts=>{
        res.status(200).json({myposts,user:req.user}) 
    })
})

router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json(result)
    })

})

router.put("/unlike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json(result)
    })

})


router.put("/addcomment",requireLogin,(req,res)=>{
    const comment = {
        text : req.body.text,
        postedBy : req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json(result)
    })

})

router.delete("/deletepost/:postid",requireLogin,(req,res)=>{
    console.log(req.params.postid) 
    Post.findOne({_id:req.params.postid})
    .populate("postedBy","_id")
    .then((post,err)=>{
      console.log(post.postedBy)
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                return res.json({message:"post successfully deleted"})
            })

        }
    })

})
router.get("/followingposts",requireLogin,(req,res)=>{
    
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{ 
        res.status(200).json({posts})
    }).catch(err=>{
        console.log(err)
    })

})

router.delete("/deletecomment/:commentid/:postid",requireLogin,(req,res)=>{
    const comment = { _id: req.params.commentid };
    Post.findByIdAndUpdate(
      req.params.postid,
      {
        $pull: { comments: comment },
      },
      {
        new: true, 
      }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name ")
      .exec((err, postComment) => {
        if (err || !postComment) {
          return res.status(422).json({ error: err });
        } else {
         
          const result = postComment;
          res.json(result);
        }
      });

})

module.exports = router