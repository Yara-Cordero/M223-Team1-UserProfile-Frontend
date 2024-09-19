import api from '../config/Api';

import {UserProfile} from "../types/models/UserProfile.model";
import {Page} from "../types/models/Page.model";

const UserProfileService = {
    getUserProfile: async (id : string): Promise<UserProfile> => {
        const response = await api.get<UserProfile>(`/userprofile/${id}`);
        return response.data;
    },
    getAllUserProfiles: async (offset: number, limit: number, sort?: string): Promise<Page<UserProfile>> => {
        sort = sort === "" ? "" : "&sort=" + sort;
        const response = await api.get<Page<UserProfile>>(`/userprofile?limit=${limit}&offset=${offset}${sort}`);
        return response.data;
    },
    addUserProfile: async (userProfile: UserProfile) => {
       const response = await api.post(`/userprofile`, userProfile);
       return response.data;
    },

    deleteUser: (id: string) => {
        return api.delete(`/userprofile/${id}`);
    },

    getAllUsers: () => {
        return api.get(`/userprofile`);
    },

    updateUserProfile: (userProfile: UserProfile) => {
        return api.put(`/userprofile/${userProfile.id}`, userProfile);
    },
};

export default UserProfileService;
