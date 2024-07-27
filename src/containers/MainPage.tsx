import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transactionsSlice';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: RootState) => state.transactions.loading);
    const error = useSelector((state: RootState) => state.transactions.error);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    let content;

    if (status) {
        content = <div>Loading...</div>;
    } else if (error) {
        content = <div>{error}</div>;
    } else {
        content = <TransactionList />;
    }

    return (
        <div>
            <TransactionForm />
            {content}
        </div>
    );
};

export default MainPage;
