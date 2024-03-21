const passport=require('passport')
exports.isAuth=(req,res,done)=>{
   return passport.authenticate('jwt');  
  };

  exports.sanitizeUser=(user)=>{
    return{id:user.id,role:user.role}
  }


  exports.cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTdlMTE3N2E0OWZkOGI1MGM5NDcxNyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzA5NzM5OTg2fQ.5Ab0feFd2sLX79d9dRWEg4D0NiuTffeEssACQIFbxxs';
    console.log(token);
    return token;
};


// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTdlMTE3N2E0OWZkOGI1MGM5NDcxNyIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzA5NzM5OTg2fQ.5Ab0feFd2sLX79d9dRWEg4D0NiuTffeEssACQIFbxxs'