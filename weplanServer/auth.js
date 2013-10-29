module.exports.ensureAuthenticated = function (req, res, next){
  if (req.isAuthenticated() == false){

    res.redirect('/login')

  } else {
    next()
  }
}