const express = require("express");
const router = express.Router();
const cors = require("cors");
const auth = require("../middleware/auth")

const corsOptions = {
  "origin": 'http://localhost:3000',
  "methods": ['GET', 'PATCH', 'POST', 'DELETE'],
  "allowedHeaders" : "Accept",
}




const users = require("../controllers/usersController");
const memories = require("../controllers/memoriesController");


router.post("/login", users.login);
router.get("/getMyDetails",  auth,users.myDetails);
router.post("/updateDetails",  auth,users.updateDetails);
router.get("/memories", auth, memories.getMemories);
router.post("/memories", auth, memories.createMemory);
router.delete("/memories", auth, memories.deleteMemory);
router.post("/comments", auth, memories.postComments);
router.delete("/comments", auth, memories.deleteComments);
router.post("/register", users.registerUser);
router.post("/reset-password", users.forgotpassword);

module.exports = router; 
