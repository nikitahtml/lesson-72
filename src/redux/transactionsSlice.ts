import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
    id: string;
    description: string;
    amount: number;
}

interface TransactionsState {
    list: Transaction[];
}

const initialState: TransactionsState = {
    list: []
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.list = action.payload;
        }
    }
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
