import { users } from '../data/_DATA';
import { AuthResponse, UsersResponse } from './models';

export function fetchUsers(): Promise<UsersResponse> {
    return new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(users), 1000);
    })
}

export function fetchLogin(username: string, password: string): Promise<{ data: AuthResponse }> {
    return new Promise<{ data: AuthResponse }>((resolve, reject) =>
        setTimeout(() => {
            if (Object.keys(users).includes(username)) {
                // @ts-ignore
                const user = users[username];

                if (user.password !== password) {
                    reject('Wrong password.');
                }

                return resolve({data: user});
            }

            return reject('User not found.');
        }, 500)
    );
}