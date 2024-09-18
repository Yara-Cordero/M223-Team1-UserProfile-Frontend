import api from '../config/Api';

import {UserProfile} from "../types/models/UserProfile.model";
import {User} from "../types/models/User.model";

const UserProfileService = {
    getUserProfile: async (id : string): Promise<UserProfile> => {
        const response = await api.get<UserProfile>(`/userprofile/${id}`);
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
        console.log("updated userProfile");
    },
};

export default UserProfileService;
