import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTickets} from '../components/FakeApi/FakeApi.ts';
import {TicketsState} from '../types/types.ts'


export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async () => getTickets()
)

const initialState: TicketsState = {
    tickets: [],
    status: 'idle',
    error: null,
}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Что-то пошло не так';
            });
    },
});

export const ticketsReducer = ticketsSlice.reducer;


export const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
