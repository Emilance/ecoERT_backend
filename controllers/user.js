const  bcrypt = require("bcrypt")
const { User } = require('../models/User')
const { generateToken } = require("../utils/generateToken")
const { generateCloudUrl } = require("../utils/saveToCloudinary")
const fs = require('fs');


const signUp = async (req, res) => {
    //get andd validate user input
    
    const { email, password, name} = req.body
    try {
       if (!( password, email)) {
        return  res.status(400).send("Kindly fill all required input")
       }
     console.log(req.body)
     
       //check if user already exist
       const existingUser = await User.findOne({ email })
       if (existingUser) {
          console.log(existingUser)
           res.status(409).json("User with this email already exist")
       } else {
 
 
          //Encrypt user password
          const encryptedPassword = await bcrypt.hash(password, 10)
 
          //add user to DB
          const user = await User.create({
             name: name,
             email: email.toLowerCase(),
             password: encryptedPassword,
          })
 
          //create a   token
          const token = generateToken({
            user_id: user._id,
            email
         })
 
          user.token = token
        
         console.log(token)
          res.status(201).json({
             user,
             token,
             message: "User created successfully",
          })
 
       }
 
    } catch (error) {
       res.status(400).send(error)
 }
}


 
const login = async (req, res) => {
    const { email, password } = req.body
    try {
       //validate
       if (!(email && password)) {
          res.status(400).send("Kindly fill all input")
       }
 
       //get user
       const user = await User.findOne({ email })
       if (user) {
          if (await bcrypt.compare(password, user.password)) {
             const token = generateToken( { user_id: user._id, email })
             user.token = token
             res.status(201).json({
                user, token,
                message: "Login Successfull",
             })
          } else {
             res.status(400).send("password Incorrect")
          }
       } else {
          res.status(404).send("No account with this email")
       }
    } catch (error) {
      console.log(error)
       res.status(400).send(error)
    }
 }


 const getAllUsers = async (req, res ) => {
    try {
       const resp = await User.find()
       res.status(200).send(resp)
    } catch (error) {
       res.status(400).send(error)
    }
 }


 const deleteUser = async (req, res) => {
   try {
     const user = await User.findByIdAndDelete(req.params.userId);
     if(!user) {
       res.status(404).send("no user found")
     }else{
       
       res.status(200).send(user);
     }
   } catch (error) {
     res.status(500).send(error);
   }
 }

 const uploadUserDisplayPicture = async(req, res) => {
   const mediaFile = req.file; 
     const userId = req.user.user_id
   
     try {
      const cloudinaryUrl = await generateCloudUrl(mediaFile.path)

      console.log(cloudinaryUrl)
      const updatedUser = await User.findByIdAndUpdate(userId, {displayPicture: cloudinaryUrl})
      console.log("saved success")
      res.status(200).json({
         message:"successfully uploaded",
         updatedUser
      })
     } catch (error) {
      console.log(error)
     }finally {
      // Delete the temporary file after it has been uploaded to Cloudinary
      if (mediaFile) {
        fs.unlinkSync(mediaFile.path);
      }
  }

 }

 module.exports ={signUp , login , getAllUsers, deleteUser, uploadUserDisplayPicture}