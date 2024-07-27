import React, { useState } from 'react';
import { Transaction } from '../redux/transactionsSlice';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filter, setFilter] = useState<string>('');

    const filteredTransactions = transactions
        .filter((transaction) => {
            const description = transaction.description || '';
            return description.toLowerCase().includes(filter.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.amount - b.amount;
            } else {
                return b.amount - a.amount;
            }
        });

    return (
        <div className="transaction-list">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by description"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="desc">Sort by amount (desc)</option>
                    <option value="asc">Sort by amount (asc)</option>
                </select>
            </div>
            {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                ))
            ) : (
                <p>No transactions available</p>
            )}
        </div>
    );
};

export default TransactionList;
