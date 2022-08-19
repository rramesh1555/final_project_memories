const jwt = require("jsonwebtoken");
const User = require("../db/models/user")


const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ","");
        const decoded = jwt.verify(token , "myn@ewM@@!mori*es@crea(tingAPP@%on");

        const user = await User.findOne({ _id : decoded._id, "tokens.token" : token});

        if(!user) {
            throw new Error("No user found")
        }


        req.token = token;
        req.user = user;
        next();
    } catch(err) {
        res.status(400).send({ error: "Please authenticateeeeee"})
    }
}


module.exports = auth; 