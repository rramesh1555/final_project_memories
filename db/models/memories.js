const mongoose = require("mongoose");

const memoriesSchema = new mongoose.Schema({
    type : {
        type: String,
        required : true,
        trim : true
    },
    tags : {
        type : String,
        trim : true
    },
    feedType : {
        type: String,
        trim : true,
        default : "private"
    },
    title : {
        type : String,
        required: true,
    },
    description : {
        type: String
    },
    timestamp : {
        type: Date,
        required: true,
        trim : true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    pics : [
        {
            url : {
                type: String,
                required: true
            },
            caption : {
                type: String,
            }
           

    }],
    comments : [
        {
            commenter : {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            comment: {
                type: String,
                required : true
            },
            createdAt : {
                type: Date,
                required: true,
                trim : true
            }
        }

        
        
    ]
})

// reactions : [ {
//     reactionType : {
//         type: String,
//         required: false
//     },
//     reactorProfile : {
//         type: String,
//         required: false
//     }
// }]

memoriesSchema.methods.validateId = async function(user) {
    const memory = this;
    console.log('CURRRRRRRR');
    console.log(this.owner);
    console.log(user);
    try {

    } catch(err) {

    }

};

memoriesSchema.statics.validateCommentToDel = async(memoryId, commentId, curUserId) => {
  try {
    const memory = await Memories.findById(memoryId);

    let comments = [...memory.comments];

    const commentIndex =  comments.findIndex( comment => comment._id.equals(commentId) );

    const isValid = memory.owner.equals(curUserId) || comments[commentIndex].commenter.equals(curUserId);


    if(!isValid) {
        throw new Error("Not authorized to delete")
    }

     comments.splice(commentIndex, 1);


    memory.comments = [...comments];


    return memory;
  } catch( err) {
      return err;
  }

}

const Memories = mongoose.model("Memories", memoriesSchema);


module.exports = Memories;