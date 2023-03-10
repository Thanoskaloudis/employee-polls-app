import React, { ReactNode } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import pollSlice from '../features/poll/pollSlice';
import userSlice from '../features/user/userSlice';
import { Provider } from 'react-redux';
export * from '@testing-library/react';

function render(
    ui: React.ReactElement,
    {
        store = configureStore({
            reducer: {
                auth: authReducer,
                poll: pollSlice,
                user: userSlice,
            },
        }),
        ...renderOptions
    } = {}
) {
    type Props = { children?: ReactNode };
    const Wrapper: React.FC = ({ children }: Props) => (
        <Provider store={store}>{children}</Provider>
    )
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export { render }
