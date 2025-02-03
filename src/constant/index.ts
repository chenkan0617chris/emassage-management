
export enum REDUX_STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED ='succeeded',
    FAILED = 'failed',
}

const REDUX_URI = 'users';
export const GET_USERS_URI = REDUX_URI + '/getUsers';