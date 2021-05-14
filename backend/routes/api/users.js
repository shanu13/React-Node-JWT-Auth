const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const usersController = require('../../controllers/usersController')

const User = require("../../models/users");

router.post('/register', usersController.postRegister);

router.post('/login',usersController.postLogin )


module.exports = router