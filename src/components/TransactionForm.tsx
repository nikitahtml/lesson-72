import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/transactionsSlice';

const TransactionForm: React.FC = () => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount > 0 && description.trim() !== '') {
            dispatch(addTransaction({ amount, description }));
            setAmount(0);
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Amount"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;