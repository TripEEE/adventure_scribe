const express = require('express');
const router  = express.Router();

router.get('/me', (req, res) => {
  res.json({
    id: "user_id",
    name: "user_name",
    email: "user_email",
    dm: "true/false" })
});

router.post('/login', (req, res) => {
  res.json({
    username: req.body.users_name,
    email: req.body.users_email })
});

router.post('/register', (req, res) => {
  res.json({
    username: req.body.users_name,
    password: req.body.users_password,
    email: req.body.users_email })
});
