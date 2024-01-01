const express = require("express");
const {
  addMember,
  getMember,
  deleteMember,
  updateMember,
  deleteAllMember,
} = require("../controllers/memberControll");
const {
  fullPageWithData,
  allPages,
  chartAccount,
  searchPage,
} = require("../controllers/pageControll");
const { monthRemoveRow, updateMonth } = require("../controllers/monthControll");
const {
  registerUser,
  loginUser,
  getLoggedUser,
  logoutUser,
  getAllUser,
  getSearchUser,
} = require("../controllers/userControll");
const verifyUser = require("../middleware/verifyUser");
const { getAdmin, roleChangeAdmin } = require("../controllers/adminControll");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

router.route("/members").post(addMember).get(getMember);
router.delete("/delete-member/:id", deleteMember);
router.delete("/delete-all", deleteAllMember);
router.patch("/update-member/:id", updateMember);
router.post("/pages", fullPageWithData);
router.get("/all-page", verifyUser, allPages);
router.get("/all-page/:id", verifyUser, allPages);
router.get("/search", verifyUser, searchPage);
router.get("/chart-total", verifyUser, chartAccount);
router.delete("/month-delete/:id", verifyUser, monthRemoveRow);
router.patch("/update-month/:id", verifyUser, updateMonth);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyUser, logoutUser);
router.get("/user", verifyUser, getLoggedUser);
router.get("/isAdmin", verifyUser, getAdmin);
router.get("/all-user", verifyUser, verifyAdmin, getAllUser);
router.patch("/change-role/:id", verifyUser, verifyAdmin, roleChangeAdmin);
router.get("/search-user/:text", verifyUser, getSearchUser);
module.exports = router;
