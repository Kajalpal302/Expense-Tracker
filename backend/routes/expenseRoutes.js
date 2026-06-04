const express = require("express");
const upload = require("../middleware/uploadMiddleware")
const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} =  require("../controllers/expenseController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, upload.single("receipt"), addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadExcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
  

module.exports = router;