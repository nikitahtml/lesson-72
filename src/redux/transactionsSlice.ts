import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../api/axiosApi';

interface Transaction {
    id: string;
    amount: number;
    description: string | undefined;
    date: string;
    type: 'income' | 'expense';
}

interface TransactionsState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    transactions: [],
    loading: false,
    error: null,
};

// Async thunk for fetching transactions
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {
        const response = await axiosApi.get('/transactions.json');
        return Object.entries(response.data).map(([id, transaction]: any) => ({
            id,
            ...transaction,
        }));
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id: string) => {
        await axiosApi.delete(`/transactions/${id}.json`);
        return id;
    }
);

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (transaction: Transaction) => {
        await axiosApi.put(`/transactions/${transaction.id}.json`, transaction);
        return transaction;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const { amount, description, date, type } = action.payload;
            const newTransaction = {
                id: Date.now().toString(),
                amount,
                description,
                date,
                type,
            };
            state.transactions.push(newTransaction);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch transactions';
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.transactions = state.transactions.filter(t => t.id !== action.payload);
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const updatedTransaction = action.payload;
                const index = state.transactions.findIndex(t => t.id === updatedTransaction.id);
                if (index !== -1) {
                    state.transactions[index] = updatedTransaction;
                }
            });
    },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
