import {createSlice} from '@reduxjs/toolkit';
import * as operations from './operations';

const religionSlice = createSlice({
  name: 'config',
  initialState: {
    data: {},
  },
  reducers: {},
  extraReducers: {
    [operations.getConfig.fulfilled.toString()]: (state, {payload}) => {
      state.data = payload;
    },
  },
});

export const {reducer, actions} = religionSlice;
