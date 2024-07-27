import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTransaction } from '../redux/transactionsSlice';

interface TransactionFormState {
    type: 'income' | 'expense';
    category: string;
    amount: string;
    error: string;
}

const TransactionForm: React.FC = () => {
    const [formState, setFormState] = useState<TransactionFormState>({
        type: 'income',
        category: '',
        amount: '',
        error: ''
    });

    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { category, amount, type } = formState;

        if (!category || !amount || !type) {
            setFormState(prevState => ({
                ...prevState,
                error: 'All fields are required'
            }));
            return;
        }

        const now = new Date();
        const createdAt = now.toISOString();

        dispatch(addTransaction({ amount: Number(amount), category, createdAt }));

        // Reset form
        setFormState({
            type: 'income',
            category: '',
            amount: '',
            error: ''
        });
    };

    return (
        <form className="transaction-form" onSubmit={handleSubmit}>
            {formState.error && <div className="error">{formState.error}</div>}
            <select
                name="type"
                value={formState.type}
                onChange={handleInputChange}
            >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formState.category}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formState.amount}
                onChange={handleInputChange}
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default TransactionForm;
