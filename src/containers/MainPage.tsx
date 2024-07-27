import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transactionsSlice';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const { transactions, loading, error } = useSelector((state: any) => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return (
        <div className="main-page">
            <h1>Transactions</h1>
            <TransactionForm />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default MainPage;
