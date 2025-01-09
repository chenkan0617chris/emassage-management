import { server } from './index';

export function listUsers() {
    return fetch(server+'/users').then((res) => {
        return res.json();
    })
}