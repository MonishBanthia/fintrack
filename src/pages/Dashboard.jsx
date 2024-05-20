import { React, useState, useEffect } from 'react'
import Header from '/src/components/Header';
import Cards from '/src/components/Cards';
import AddExpense from '/src/components/Modals/addExpense';
import AddIncome from '/src/components/Modals/addIncome';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable  from "/src/components/TransactionsTable";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import ChartComponent from "/src/components/Charts";
import NoTransactions from "/src/components/NoTransaction";
import { doc, setDoc } from "firebase/firestore";

function Dashboard() {

  // sample 
  const transaction = [{
    type: "income",
    amount: 1200,
    tag: "salary",
    name: "income 1",
    date: "2024-4-5"
  },
  {
    type: "expense",
    amount: 200,
    tag: "food",
    name: "expense 1",
    date: "2024-4-5"
  },
  ];

  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income , setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalbalance,setTotalBalance] = useState(0);

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);


  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      let newarr = transactions;
      newarr.push(transaction);
      setTransactions(newarr);
      CalculateBalance();
      toast.success("Transaction Added!");

    } catch (e) {
      console.error("Error adding document: ", e);

      toast.error("Couldn't add transaction");

    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);


  useEffect(()=>{
    CalculateBalance();
  },[transactions]);


  function reset() {
    console.log("resetting");
    setTransactions([]);
    setIncome(0);
    setExpense(0);
    setTotalBalance(0);
  
    // Get the current user's document reference
    const userDocRef = doc(db, "users", auth.currentUser.uid);
  
    // Update the user's transactions field to an empty array
    setDoc(userDocRef, { transactions: [] }, { merge: true })
      .then(() => {
        console.log("Transactions successfully reset in Firebase");
        // toast.success("Data reset successfully");
      })
      .catch((error) => {
        console.error("Error resetting transactions in Firebase:", error);
        // toast.error("Error resetting data");
      });
  }
  



  function CalculateBalance(){
     let incomeTotal = 0;
     let ExpenseTotal = 0;

     transactions.forEach((transaction)=>{
        if(transaction.type==="income"){
          incomeTotal+= transaction.amount;
        }else{
          ExpenseTotal+= transaction.amount;
        }
     });

     setIncome(incomeTotal);
     setExpense(ExpenseTotal);
     setTotalBalance(incomeTotal - ExpenseTotal);
  }
   

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      // toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  let sortedTransaction = transactions.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date);
  });
  
  

  return (

    <div>
      <Header></Header>
      {loading ? (<p>Loading..</p>) : (<>
        <Cards income={income} expense={expense} totalbalance={totalbalance}
           showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} reset={reset} />
          
          {transactions && transactions.length!=0 ? <ChartComponent sortedTransaction={sortedTransaction} /> : <NoTransactions />}



        <AddExpense
          isExpenseModalVisible={isExpenseModalVisible}
          handleExpenseCancel={handleExpenseCancel}
          onFinish={onFinish}
        />

        <AddIncome
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}
        />
        <TransactionsTable transactions={transactions} addTransaction={addTransaction} 
         fetchTransactions = {fetchTransactions}
        />
        </>)}


    </div>
  )
}

export default Dashboard