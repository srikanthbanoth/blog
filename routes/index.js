var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const mongoose = require("mongoose");
const fs=require("fs");
const matter = require('gray-matter');
const path=require("path"); 
const marked=require("marked");
const upload=require("../middleware/upload")
/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find()
  .then((result)=>{
    res.render('index',{result})
  })
  .catch((err)=>{
    res.send(err);
    res.render('error',{error:err});
  })
  

});
// 1624867737413.md
router.get('/blogs/:id',(req,res)=>{
  Post.findById(req.params.id)
  .then((result)=>{
    let filePath=path.join(path.resolve(),`${result.details}`)

    const rawFile = fs.readFileSync(filePath,'utf-8');
    const parsed=matter(rawFile);
    const html=marked(parsed.content);
    res.render('details',{result,html});
  })
 .catch((err)=>{
  res.send(err);
 })
})

router.get('/cat/:id',(req,res)=>{
  let tag=req.params.id;
  Post.find({tags:tag})
  .then((result)=>{
    res.render('index',{result})
  })
  .catch((err)=>{
    res.render('error',{error:err})
  })
})
router.post('/Babyiloveu@143',upload.single('avatar'),(req,res)=>{

  const post=new Post({
    title:req.body.title,
    tags:req.body.tags,
    image:req.body.image,
    author:req.body.author,
    details:req.file.path
  })
  post.save()
  .then((result)=>{
    res.redirect("/");
  })
  .catch((err)=>{
    console.log(err)
  })
})
router.get('/Babyiloveu@143',(req,res)=>{
  res.render('insert')
})

module.exports = router;
