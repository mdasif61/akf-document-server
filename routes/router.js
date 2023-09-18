const express = require('express');
const { addMember, getMember } = require('../controllers/memberControll');

const router = express.Router();

router.route('/members').post(addMember).get(getMember);

module.exports=router;