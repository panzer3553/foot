import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../api/axios';
import config from '../../api/config';

export const getConfig = createAsyncThunk(
  'config/fetch',
  async (params, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get(`${config.API_URL}/appConfig`);
      const data = response?.data?.data;
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      // notification.error({ message: err.response.data.message });
      return rejectWithValue(err.response.data);
    }
  },
);
