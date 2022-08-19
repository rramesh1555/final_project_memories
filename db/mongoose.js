const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://srijith:srijith123@cluster0.bswi1.mongodb.net/memories?retryWrites=true&w=majority", 
{
    useNewUrlParser: true
});