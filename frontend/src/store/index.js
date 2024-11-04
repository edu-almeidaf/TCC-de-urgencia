import { createStore } from 'vuex';
import axios from 'axios'; // Importando axios

// Configurar a URL base do Axios, se necessário
axios.defaults.baseURL = 'http://localhost:8000/api';

// Adicionar o interceptor para incluir o token em todas as requisições
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    },
    setRole(state, role) {
      state.role = role;
      localStorage.setItem('role', role);
    },
  },
  actions: {
    async login({ commit }, { cpf, password }) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          cpf: cpf.replace(/\D/g, ''),
          password,
        });

        commit('setToken', response.data.token);
        commit('setRole', response.data.role);
        return response.data; // Retorne os dados para uso no componente
      } catch (error) {
        throw error; // Lançar o erro para ser tratado no componente
      }
    },
  },
});

export default store;
