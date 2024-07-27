import React from 'react';

interface Transaction {
    id: string;
    amount: number;
    description: string | undefined;
    date: string;
    type: 'income' | 'expense';
}

interface TransactionItemProps {
    transaction: Transaction;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
    const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <li className={`transaction-item ${transaction.type}`}>
            <div className="date">{formattedDate}</div>
            <div className="category">{transaction.description}</div>
            <div className={`amount ${transaction.type}`}>
                {transaction.type === 'income' ? `+${transaction.amount}` : `-${transaction.amount}`} KGS
            </div>
            <div>
                <button className="edit" onClick={() => onEdit(transaction.id)}>Edit</button>
                <button className="delete" onClick={() => onDelete(transaction.id)}>Delete</button>
            </div>
        </li>
    );
};

export default TransactionItem;
