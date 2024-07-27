import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../redux/transactionsSlice';

interface Transaction {
    id: string;
    amount: number;
    description?: string;
    date: string;
    type: 'income' | 'expense';
}


interface EditTransactionModalProps {
    transaction: Transaction;
    onClose: () => void;
}

interface EditTransactionFormState {
    amount: number;
    description: string;
    type: 'income' | 'expense';
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, onClose }) => {
    const [formState, setFormState] = useState<EditTransactionFormState>({
        amount: transaction.amount,
        description: transaction.description || '',
        type: transaction.type
    });

    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: name === 'amount' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTransaction: Transaction = {
            ...transaction,
            ...formState
        };
        dispatch(updateTransaction(updatedTransaction));
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Transaction</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Type:
                        <select
                            name="type"
                            value={formState.type}
                            onChange={handleChange}
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <input
                            name="description"
                            type="text"
                            placeholder="Description"
                            value={formState.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Amount:
                        <input
                            name="amount"
                            type="number"
                            placeholder="Amount"
                            value={formState.amount}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionModal;
