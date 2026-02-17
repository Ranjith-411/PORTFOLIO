const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");


require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const Contact = require("./models/Contact");

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newMessage = new Contact({
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(200).json({ message: "Message saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
