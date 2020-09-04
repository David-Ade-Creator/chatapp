const express = require('express');
const {Chat} = require("../models/chatModel");
const { isAuth, getToken} = require('../util');

const router = express.Router();

router.get('/getchats', async (req, res) => {
  const chats = await Chat.find({});
  res.send(chats);
});




module.exports = router;