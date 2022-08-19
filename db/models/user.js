const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim : true
    },
    age : {
        type : String,
    },
    
    about : {
        type : String,
    },
    hobbies : {
        type : String,
    },
    gender : {
        type : String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        trim : true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    tokens : [{
       token : {
            type: String,
            required: false
        }
    }],
    avatar: {
        type: String
    }
})

userSchema.virtual("memories", {
    ref: "Memories",
    localField: "_id",
    foreignField: "owner"
});

userSchema.methods.getAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id : user.id.toString()} , "myn@ewM@@!mori*es@crea(tingAPP@%on");
    user.tokens = [];
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.pre("save" , async function (next)  {
    const user = this;

    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }


    next();
})


userSchema.statics.findUserByCredentials = async(email, password) => {

    const user = await User.findOne({ email });
   
    if(!user) {
        throw new Error("Unable to Login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error("Unable to Login");
    }

    return user;
}

const User = mongoose.model("User", userSchema);
 
module.exports = User;