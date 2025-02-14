// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute=require("./routes/index")
// const ChatMessage = require("./mosdels/ChatMessage");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
// Middleware
app.use("/api",userRoute);
app.use(cors());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/chat");

// // Routes
// app.get("/messages", async (req, res) => {
// 	try {
// 		const messages = await ChatMessage.find();
// 		res.json(messages);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });

// app.post("/messages", async (req, res) => {
// 	try {
// 		const { user, message } = req.body;

// 		if (!user || !message) {
// 			return res
// 				.status(400)
// 				.json({ error: "User and message are required" });
// 		}

// 		const chatMessage = new ChatMessage({
// 			user,
// 			message,
// 		});

// 		await chatMessage.save();

// 		res.status(201).json(chatMessage);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
