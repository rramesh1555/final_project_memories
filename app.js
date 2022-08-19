const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();

const corsOptions = {
    "origin": 'https://team-5-capstone.netlify.app',
    "methods": ['GET', 'PATCH', 'POST', 'DELETE']
}
app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));

app.use("/api" , require("./routes/routes"))

const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log("LISTENING TO PORT ", port)
})
