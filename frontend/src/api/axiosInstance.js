import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:5000' });
instance.interceptors.request.use(cfg=>{ const t = localStorage.getItem('token'); if(t) cfg.headers.Authorization = `Bearer ${t}`; return cfg; });
export default instance;
