import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../api/axiosApi';

interface Transaction {
    id: string;
    amount: number;
    description: string | undefined; // Обновляем тип
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

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const { amount, description } = action.payload;
            const newTransaction = {
                id: Date.now().toString(),
                amount,
                description,
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
            });
    },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
