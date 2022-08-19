const mongoose = require("mongoose");
require("../db/mongoose");




const User = require("../db/models/user");  

exports.registerUser = async( req, res) => {
    try {
     
      const newUser =new User ({
         name : req.body.data.name,
         age: req.body.data.age,
        email:req.body.data.email,
         gender:req.body.data.gender,
         password:req.body.data.password,
         token:"",
     
      })

      await newUser.save();
        res.send({user : newUser});

  } 
  catch(err) 
    {
      res.status(400).send(err);
    }
  }


  exports.myDetails  = async( req, res) => {
    const { name, email , age, gender, about, avatar, hobbies } = req.user;
      res.send({ name, email , age, gender, about, avatar, hobbies } );
  };

  exports.updateDetails  = async( req, res) => {

    const updates = Object.keys(req.body);
    try {
      const id = req.user.id;
      const data = req.body;

        const user = await User.findById(id);

         updates.forEach( updateItem => user[updateItem] = req.body[updateItem]);

         await user.save();

        if(!user) {
            return res.status(404).send(user);
        }

        res.send(user);
     
    } catch(err) {
      res.status(400).send(err);
    }

   
  }

exports.login = async(req, res) => {
    const { username, password } = req.body;

    try {
       const user = await User.findUserByCredentials(username, password);

       if(!user) {
           res.status(400).send();
       }

       const token = await user.getAuthToken(user._id);

       req.user = user;

       res.send({user , token});
    } catch(err) {
        res.status(400).send(err);
    }
};

exports.forgotpassword = async(req, res) => {

  console.log(req.query.email);
    
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'projectmemories2022@gmail.com',
        pass: 'mnqooulucflnobrx'
      }
    }));
    
    var mailOptions = {
      from: 'projectmemories2022@gmail.com',
      to: req.query.email,
      subject: 'Temperory Password',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){ 
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
};