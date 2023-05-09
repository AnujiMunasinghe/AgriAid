const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const server = require("http").createServer(app);
const chatRoom = require("./routes/ChatData_Route");
chatRoom(server)

const clusterURL = "mongodb+srv://admin:i5T3X5lWOSCj32ii@cluster0.5oe0dnt.mongodb.net/?retryWrites=true&w=majority";
const PORT = 8000;
const CHAT_PORT = 3001;
const IP_ADDRESS = "192.168.1.2";

// Middleware
app.use(cors());
app.use(express.json());

// Set strictQuery option to false
mongoose.set('strictQuery', false);

// Connect Database
mongoose.connect(clusterURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// API paths
app.use("/", require("./routes/users.routes"));
app.use("/", require("./routes/CropData_Route"));
app.use("/", require("./routes/Cultivation_Route"));
app.use("/", require("./routes/HarvestRecord_Route"));

// Server listening
app.listen(PORT, IP_ADDRESS, () => console.log(`App running on http://${IP_ADDRESS}:${PORT}`));
server.listen(CHAT_PORT, IP_ADDRESS, () => console.log(`Chat server listening on http://${IP_ADDRESS}:${CHAT_PORT}`));