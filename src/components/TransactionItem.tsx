import React from 'react';

interface TransactionItemProps {
    id: string;
    description: string;
    amount: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ id, description, amount }) => {
    return (
        <li>
            <span>{description}</span> - <span>${amount}</span>
        </li>
    );
};

export default TransactionItem;
