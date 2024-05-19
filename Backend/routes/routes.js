const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const { addIncome, getIncome, deleteIncome } = require("../controllers/income");
const {
  registerUser,
  getUser,
  updatePassword,
} = require("../controllers/users");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncome)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .post("/add-user", registerUser)
  .get("/get-user/:username", getUser)
  .post("/update-password", updatePassword);

module.exports = router;
