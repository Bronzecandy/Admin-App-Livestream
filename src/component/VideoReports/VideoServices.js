import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
let token = '';

const VideoServices = {
    login: async () => {
        token = import.meta.env.VITE_API_TOKEN;
        return token;
    },

    getNewUsersStats: async () => {
        try {
            await VideoServices.login();
            const response = await axios.get(`${API_URL}/api/statistics/users/new`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching new users data:', error);
            throw new Error('Unable to get new user information');
        }
    },
};

export default VideoServices;