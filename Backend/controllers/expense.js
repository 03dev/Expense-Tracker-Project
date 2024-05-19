const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { tittle, amount, category, description, date, user } = req.body;

  const income = ExpenseSchema({
    tittle,
    amount,
    category,
    description,
    date,
    user,
  });

  try {
    // validations
    if (!tittle || !category || !date || !user) {
      return res.status(400).json({ message: "All filds are reqired!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense added" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expense deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error" });
    });
};
