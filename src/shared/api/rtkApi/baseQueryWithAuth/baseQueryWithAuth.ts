import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: async (headers) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
    credentials: 'include',
});

export { baseQueryWithAuth };
