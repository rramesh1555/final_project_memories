const mongoose = require("mongoose");
require("../db/mongoose");


const Memories = require("../db/models/memories");  

exports.getMemories = async(req, res) => {
    
    try {
      const user = req.user;

      const { publicFeeds, search } = req.query;

      const feedType = publicFeeds ? "public" : "";

      let memories = [];

      let memoryParams = {};

      if(publicFeeds === "true" ) {
        memoryParams = {owner: { "$ne": user._id }, feedType : "public",  $or: [
          { 'title': {"$regex": search.toLowerCase() ,"$options": "i"} },
          { 'description': {"$regex": search.toLowerCase() ,"$options": "i"} }
        ] }
      } else {
        memoryParams = {owner: user._id ,  $or: [
          { 'title': {"$regex": search.toLowerCase() ,"$options": "i"} },
          { 'description': {"$regex": search.toLowerCase() ,"$options": "i"} }
        ]}
      }

      memories = await 
      Memories.find( memoryParams , 
        null, 
        { sort : {timestamp : "desc"} } )
        .populate({ path : "owner", select: 'name email'  })
        .populate({ path : "comments.commenter", select: 'name'  })
        .exec();

     
       if(!memories) {
           res.status(400).send();
       }
       res.send(memories)
       console.log(memories);

      
    } catch(err) {
        res.status(400).send(err);
    }
};


exports.createMemory = async(req, res) => {
    const body = req.body;
    console.log(req.body);

    if(!body.timestamp) {
        body.timestamp = new Date().toISOString();
    };
    
    try {
      const user = req.user;
      
       const memory = new Memories({...body, owner : user._id});

       await memory.save();
       
       res.send(memory)

      
    } catch(err) {
        res.status(400).send(err);
    }
};

exports.deleteMemory = async (req, res) => {
  try {
    const { id } = req.query;
   
    
    const memory = await Memories.findOneAndDelete({_id : id, owner: req.user._id});
  
    
    if(!memory) {
      res.status(400).send("Unauthorized to delete the memory");
    }

      res.send("Memory Deleted");

  } catch(err) {
    res.status(400).send(err);
  }
}

exports.postComments = async( req, res) => {
  try {
    const { comment, postId} = req.body;
   
    const memory = await Memories.findById(postId);

    const newComment = {
      comment : comment,
      commenter: req.user._id,
      createdAt : new Date().toISOString()
    }

    memory.comments.push(newComment);

    await memory.save();

    res.status(200).send("success")

  } catch(err) {
    res.status(400).send(err);
  }
}

exports.deleteComments = async( req, res) => {
  try {
    const { memoryId, commentId} = req.query;
  
    const memory  = await Memories.validateCommentToDel(memoryId, commentId, req.user._id);    

    await memory.save();

    res.status(200).send("success")

  } catch(err) {
    res.status(400).send(err);
  }
}