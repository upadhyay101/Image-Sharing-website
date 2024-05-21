var express = require('express');
var router = express.Router();
const userModel = require("./users");
//const postModel = require("./posts");
const passport = require('passport');
const localStrategy =require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login",function(req,res){
  console.log(req.flash("error"));
  res.render('login',{error:req.flash('error')})
});

router.get('/profile',isLoggedIn,function(req,res){
  res.render('profile')
});

router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

router.post("/login",passport.authenticate("local",{        //post is used in order to not reflect the information in url
  successRedirect:"/profile" ,
  failureRedirect:"/login",
  failureFlash: true
}),function(req,res){
});

router.get('/feed',isLoggedIn,function(req,res){
  res.render('feed')
})

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/")
}

module.exports = router;
