const express = require("express");
const app = express();

const http = require("http")

const cors = require("cors");
const mongoose = require("mongoose");
const clusterURL = "mongodb+srv://admin:i5T3X5lWOSCj32ii@cluster0.5oe0dnt.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());

const server = http.createServer(app)
const chatRoom = require("./Routings/ChatData_Route")
chatRoom(server)

//Connect Database
mongoose.connect(clusterURL)  

//API paths
app.use("/", require("./Routings/UserData_Route"));
app.use("/", require("./Routings/CropData_Route"));
app.use("/", require("./Routings/Cultivation_Route"));
app.use("/", require("./Routings/HarvestRecord_Route"));

//Testing Back-End
app.listen(8000, '192.168.1.2', function() {
    console.log("ok running")
})

server.listen(3001, '192.168.1.2', function() {
    console.log("chat accepted")
})