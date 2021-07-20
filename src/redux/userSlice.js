import { createSlice } from '@reduxjs/toolkit';

import userData from '../users';
import userList from '../fatcat-users.js'


export const userSlice = createSlice({
    name: 'fields',
    initialState: userList,
    reducers: {
        editField: (state, action) => {
            const {id, fieldName, value} = action.payload;

            const index = state.findIndex((user) => user.id === id);
            state[index][fieldName] = value;
        },

    },
});


export const { editField } = userSlice.actions;

export default userSlice.reducer;