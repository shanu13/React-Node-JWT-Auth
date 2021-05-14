const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Users = require('../models/users')
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const keys = require('../config/keys')


const postRegister = (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.body)
  Users.findOne({rollNo : req.body.rollNo})
       .then(user => {
           if(user){
               return res.status(400).json({ email: "Email already exists"});
           }else{
                 newUser = new User({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  rollNo : req.body.rollNo
                });
              }
           

           // hashing password
           bcrypt.genSalt(10,(err,salt) => {
               bcrypt.hash(newUser.password, salt, (err,hashPassword) => {
                   if(err) throw err;

                   newUser.password = hashPassword
                   newUser.save()
                          .then((user) => res.json(user))
                          .catch(err => console.log(err))
               })
           })
       })
};


const postLogin = (req,res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } 

  console.log(req.body)
  // const email = req.body.email;
  const password = req.body.password;
  const rollNo = req.body.rollNo;
   
  User.findOne({ rollNo : rollNo })
      .then(user => {
        if(!user){
           return res.status(404).json({ userNotFount: "User not found" });
        }
        console.log(user)
          bcrypt.compare(password, user.password)
                .then(isMatch => {
                  if(isMatch){
                    const payload = {
                      id : user.id,
                      name : user.name
                    }

                    jwt.sign(payload,keys.secretOrKey,{ expiresIn : 31556926 },
                      (err,token)=>{
                          res.json({ success : true,
                          token : "bearer" + token })
                    } )
                  }else{
                    return res.status.json({
                      passwordincorrect: "Password incorrect",
                    });
                  }
                })

      })

}

module.exports = { postRegister,postLogin }