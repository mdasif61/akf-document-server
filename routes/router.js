const express = require('express');
const { addMember, getMember, deleteMember, updateMember, deleteAllMember } = require('../controllers/memberControll');
const { fullPageWithData, allPages, chartAccount} = require('../controllers/pageControll');
const { monthRemoveRow } = require('../controllers/monthControll');

const router = express.Router();

router.route('/members').post(addMember).get(getMember);
router.delete('/delete-member/:id',deleteMember)
router.delete('/delete-all',deleteAllMember)
router.patch('/update-member/:id',updateMember)
router.post('/pages',fullPageWithData);
router.get('/all-page',allPages)
router.get('/all-page/:id',allPages)
router.get('/chart-total',chartAccount)
router.delete('/month-delete/:id',monthRemoveRow)
module.exports=router;