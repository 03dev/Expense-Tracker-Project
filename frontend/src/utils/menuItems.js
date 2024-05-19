import { dashboard, expenses, transactions, trend } from "./icons";

export const menuItems = [
  {
    id: 1,
    tittle: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    tittle: "View Transactions",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    tittle: "Incomes",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    tittle: "Expenses",
    icon: expenses,
    link: "/dashboard",
  },
];
