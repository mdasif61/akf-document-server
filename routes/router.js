const express = require('express');
const { addMember, getMember, deleteMember, updateMember, deleteAllMember } = require('../controllers/memberControll');
const { fullPageWithData, allPages, chartAccount, searchPage} = require('../controllers/pageControll');
const { monthRemoveRow, updateMonth } = require('../controllers/monthControll');
const { registerUser, loginUser, getLoggedUser, logoutUser } = require('../controllers/userControll');
const verifyUser = require('../middleware/verifyUser');

const router = express.Router();

router.route('/members').post(addMember).get(getMember);
router.delete('/delete-member/:id',deleteMember)
router.delete('/delete-all',deleteAllMember)
router.patch('/update-member/:id',updateMember)
router.post('/pages',verifyUser,fullPageWithData);
router.get('/all-page',verifyUser,allPages)
router.get('/all-page/:id',verifyUser,allPages)
router.get('/search',verifyUser,searchPage)
router.get('/chart-total',chartAccount)
router.delete('/month-delete/:id',monthRemoveRow);
router.patch('/update-month/:id',updateMonth);
router.post('/signup',registerUser)
router.post('/login',loginUser)
router.post('/logout',verifyUser,logoutUser)
router.get('/user',verifyUser,getLoggedUser)
module.exports=router;