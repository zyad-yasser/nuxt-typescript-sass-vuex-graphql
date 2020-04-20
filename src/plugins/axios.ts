import { StorageService } from '../services/stoarage-service';
const storageService = new StorageService();

import * as Vue from 'vue';
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const authToken = storageService.getData('authToken', 'local') || storageService.getData('authToken', 'session');
    const refreshToken = storageService.getData('refreshToken', 'local') || storageService.getData('refreshToken', 'session');
    config.headers.common['authorization'] = 'ZZ';
    config.headers.common['x-refresh-token'] = refreshToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// @ts-ignore
Vue.use(axios);
