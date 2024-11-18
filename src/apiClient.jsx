// apiClient.js
import axios from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFhMTRmNDZkMDUwODg0MjNlZWFiOTEiLCJpcCI6Ijo6MSIsImlhdCI6MTczMDQ2MDgxN30._dqyZS4blv-60Ii18LOfGNzkutur_fXJy80H1NKJyRE';

// Create an axios instance
const apiClient = axios.create({
    baseURL: 'https://social-media-z5a2.onrender.com/api', // Base URL for your API
    headers: {
        Authorization: `Bearer ${API_TOKEN}`, // Add token here
    },
});

export default apiClient;
