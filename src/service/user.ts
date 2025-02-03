import { createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USERS_API } from '@/api/users';
import { GET_USERS_URI } from '@/constant';

export const getUsers = createAsyncThunk(GET_USERS_URI, async () => {
    const response = await fetch(GET_USERS_API);
    const data = await response.json();
    return data;
});