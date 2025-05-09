#  MyMessenger Web App

**MyMessenger** is a real-time chat web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.IO** for live communication. It provides a secure and interactive messaging experience between registered users.

## Application Link : https://mymessanger-cgdy.onrender.com

##  Features

###  User Authentication
- Register / Login / Logout
- Displays user profile photo after login at top right corner

###  Chat Functionality
- Enter the email of a registered recipient to view past chats between you and entered recipient
- Real-time chatting enabled using **Socket.IO**
- View recipient details (name, email, profile photo) on chat screen
- Delete all chat messages between a sender and a receiver (removes from both ends)
- All messages are stored in the MongoDB database

###  Interface
- Clean two-pane layout: left panel for recipient info, right panel for chat
- Live chat works if both users are connected at the same time

##  Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
