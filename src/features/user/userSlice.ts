import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { fetchUsers } from "../../utils/fetchAPI";
import { User, UserState, UserWithScore } from "../../utils/models";

const initialState: UserState = {
    users: {
        byId: {},
        allIds: [],
    },
    status: 'idle',
}

export const getUsersAsync = createAsyncThunk(
    'user/fetchUsers',
    async () => await fetchUsers(),
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.users.byId = action.payload;
                state.users.allIds = Object.keys(action.payload);
            })
            .addCase(getUsersAsync.rejected, (state) => {
                state.status = 'failed';
            })
        ;
    },
});

const calculateUserPoints = (user: User): number => (
    user.questions.length + Object.keys(user.answers).length
);

export const userSelector = (state: RootState): UserState => state.user;
export const leaderSelector = (state: RootState): Array<UserWithScore> => {
  const {users} = userSelector(state);

  return users.allIds.reduce((usersWithScores: Array<UserWithScore>, userId: string): Array<UserWithScore> => ([
      ...usersWithScores,
      {
          ...users.byId[userId],
          score: calculateUserPoints(users.byId[userId]),
      }
  ]), []).sort((userA, userB) => userB.score - userA.score);
};

export default userSlice.reducer;