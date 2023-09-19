const express = require('express');
const { addMember, getMember, deleteMember } = require('../controllers/memberControll');

const router = express.Router();

router.route('/members').post(addMember).get(getMember);
router.delete('/delete-member/:id',deleteMember)

module.exports=router;