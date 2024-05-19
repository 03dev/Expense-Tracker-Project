import React, { Children, useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [forgetPasswordClicked, setForgetPasswordClicked] = useState(false);

  // login functions
  const loginUser = async (username) => {
    const response = await axios
      .get(`${BASE_URL}get-user/${username}`)
      .catch((error) => {
        setError(error.response.data.message);
      });
    return response;
  };

  const updatePassword = async (userData) => {
    const response = await axios
      .post(`${BASE_URL}update-password`, userData)
      .catch((error) => {
        setError(error.response.data.message);
      });
    return response;
  };

  const RegisterUser = async (userData) => {
    const response = await axios
      .post(`${BASE_URL}add-user`, userData)
      .catch((error) => {
        setError(error.response.data.message);
      });
    return response;
  };

  // income functions
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((error) => {
        setError(error.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    const returnData = response.data.filter((data) => {
      return data.user === userId;
    });
    setIncomes(returnData);
  };

  const deleteIncome = async (id) => {
    const response = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      if (income.user === userId) {
        totalIncome += income.amount;
      }
    });
    return totalIncome;
  };

  // expenses functions
  const addExpenses = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, expense)
      .catch((error) => {
        setError(error.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    const returnData = response.data.filter((data) => {
      return data.user === userId;
    });
    setExpenses(returnData);
  };

  const deleteExpenses = async (id) => {
    const response = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpenses = 0;
    expenses.forEach((expense) => {
      if (expense.user === userId) {
        totalExpenses += expense.amount;
      }
    });
    return totalExpenses;
  };

  // total balance function
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  // history funciton
  const transcationsHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history;
  };

  return (
    <GlobalContext.Provider
      value={{
        loginUser,
        RegisterUser,
        setLoggedIn,
        updatePassword,
        loggedIn,
        userId,
        setUserId,
        addIncome,
        getIncomes,
        setIncomes,
        deleteIncome,
        totalIncome,
        incomes,
        addExpenses,
        getExpenses,
        setExpenses,
        deleteExpenses,
        totalExpenses,
        expenses,
        totalBalance,
        transcationsHistory,
        setError,
        error,
        forgetPasswordClicked,
        setForgetPasswordClicked,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
