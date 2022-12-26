import {users} from '../data/_DATA';
import { User } from './models';

interface UsersResponse {
    [key: string]: User,
}

export function fetchUsers(): Promise<UsersResponse> {
    return new Promise((resolve) => {
        // @ts-ignore
        setTimeout(() => resolve(users), 1000);
    })
}