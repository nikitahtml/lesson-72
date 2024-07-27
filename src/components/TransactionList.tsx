import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteTransaction, Transaction } from '../redux/transactionsSlice';
import EditTransactionModal from './EditTransactionModal';

interface TransactionListState {
    filterDate: string;
    editingTransaction: Transaction | null;
}

const TransactionList: React.FC = () => {
    const [state, setState] = useState<TransactionListState>({
        filterDate: '',
        editingTransaction: null
    });

    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const dispatch = useDispatch();

    const filteredTransactions = state.filterDate
        ? transactions.filter(transaction => transaction.date === state.filterDate)
        : transactions;

    const handleEdit = (transaction: Transaction) => {
        setState(prevState => ({ ...prevState, editingTransaction: transaction }));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            dispatch(deleteTransaction(id));
        }
    };

    const closeModal = () => {
        setState(prevState => ({ ...prevState, editingTransaction: null }));
    };

    return (
        <div>
            <input
                type="date"
                value={state.filterDate}
                onChange={(e) => setState(prevState => ({ ...prevState, filterDate: e.target.value }))}
            />
            <ul className="transaction-list">
                {filteredTransactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        onEdit={() => handleEdit(transaction)}
                        onDelete={() => handleDelete(transaction.id)}
                    />
                ))}
            </ul>
            {state.editingTransaction && (
                <EditTransactionModal
                    transaction={state.editingTransaction}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default TransactionList;
