import { RootState } from "../../store/store";
import { AuthState, PollState, UserState } from "../../utils/models";
import userReducer, {userSelector} from "./userSlice";

describe('poll reducer', () => {
    const initialPollState: PollState = {
        status: 'idle',
        questions: {
            byId: {},
            allIds: [],
        },
    };

    const initialAuthState: AuthState = {
        isAuthenticated: false,
        userId: undefined,
        status: 'idle',
    };

    const initialUserState: UserState = {
        status: 'idle',
        users: {
            byId: {},
            allIds: [],
        },
    };

    it('should handle initial state', () => {
        expect(userReducer(undefined, {type: 'unknown'})).toEqual({
            status: 'idle',
            users: {
                byId: {},
                allIds: [],
            },
        });
    });

    it('should select users', () => {
        const rootState: RootState = {
            auth: initialAuthState,
            poll: initialPollState,
            user: initialUserState,
        };
        const user = userSelector(rootState);

        expect(user.users).toEqual({byId: {}, allIds: []});
        expect(user.status).toEqual('idle');
    })
});

