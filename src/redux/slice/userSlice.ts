import { getUsers } from '../../service/user';
import { REDUX_STATUS } from "@/constant";
import { User } from "@/interface/user";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [] as User[],
        apiStatus: REDUX_STATUS.IDLE
    },
    reducers: {
        getUser: state => {

            return state;
        },
        updateUser: (state, action) => {
            state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
            return state;
        },
    },
    extraReducers(builder) {
        builder
           .addCase(getUsers.pending, (state) => {
                state.apiStatus = REDUX_STATUS.LOADING;
            })
           .addCase(getUsers.fulfilled, (state, action) => {
                console.log(action.payload);
                state.users = action.payload;
                state.apiStatus = REDUX_STATUS.SUCCEEDED;
            })
           .addCase(getUsers.rejected, (state) => {
                state.apiStatus = REDUX_STATUS.FAILED;
            });
    },
});


export default userSlice.reducer;