// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://web-server.grounding.site', // API 서버의 기본 URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
