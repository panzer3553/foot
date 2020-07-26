import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import * as operations from './operations';

const religionSlice = createSlice({
  name: 'record',
  initialState: {
    data: [],
  },
  reducers: {
    add: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    remove: (state, action) => {
      state.data = state.data.filter((e) => e.id !== action.payload);
    },
    update: (state, {payload}) => {
      const index = _.findIndex(state.data, (e) => payload.id === e.id);
      state.data[index] = payload.data;
    },
  },
  extraReducers: {},
});

export const {reducer, actions} = religionSlice;
