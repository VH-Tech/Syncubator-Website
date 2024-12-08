const API_BASE_URL = import.meta.env.PROD 
    ? 'https://e3fa685a-116e-4e27-8d71-211dcb0c1d41-00-1ojqlzcgxo88j.pike.replit.dev'
    : 'http://localhost:3000';

console.log('Using API URL:', API_BASE_URL);
export default API_BASE_URL; 