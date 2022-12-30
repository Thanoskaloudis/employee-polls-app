import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchLogin } from '../../utils/fetchAPI';
import { AuthState, User } from '../../utils/models';

export const loginAsync = createAsyncThunk(
    'auth/fetchLogin',
    async (args: { username: string, password: string }) => {
        const res = await fetchLogin(args.username, args.password);
        return res.data;
    },
);

const initialState: AuthState = {
    isAuthenticated: false,
    userId: undefined,
    status: 'idle',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<User>) => ({
            ...state,
            isAuthenticated: true,
            userId: action.payload.id,
        }),
        logout: (state: AuthState) => ({
            ...state,
            userId: undefined,
            isAuthenticated: false,
        }),
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isAuthenticated = true;
                state.userId = action.payload.id;
            })
            .addCase(loginAsync.rejected, (state) => {
                state.status = 'failed';
            })
        ;
    },
})

export const {logout, login} = authSlice.actions;

export const authSelector = (state: RootState): AuthState => state.auth;
export const authUserSelector = (state: RootState): User | null => (
    state.auth.userId ? state.user.users.byId[state.auth.userId] : null
);

export default authSlice.reducer;