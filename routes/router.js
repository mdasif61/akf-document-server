const express = require('express');
const { addMember, getMember, deleteMember, updateMember } = require('../controllers/memberControll');
const { fullPageWithData } = require('../controllers/pageControll');

const router = express.Router();

router.route('/members').post(addMember).get(getMember);
router.delete('/delete-member/:id',deleteMember)
router.patch('/update-member/:id',updateMember)
router.post('/pages',fullPageWithData)
module.exports=router;