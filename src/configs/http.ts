import axios from 'axios';
import { API_URL } from '@/configs/env';

const Http = axios.create({
   baseURL: API_URL,
   timeout: 3000,
});

export { Http }