import api from '../config/Api';

import {UserProfile} from "../types/models/UserProfile.model";
import {User} from "../types/models/User.model";

const UserProfileService = {
    getUserProfile: async (user: User): Promise<UserProfile> => {
        const response = await api.get<UserProfile>(`/userprofile/$[{user.id}`);
        return response.data;
    },
    addUserProfile: (userProfile: UserProfile) => {
        return api.post('/userprofile', userProfile).then((response) => {
            return response.data;
        });
    },

    deleteUser: (id: string) => {
        return api.delete(`/userprofile/${id}`);
    },

    getAllUsers: () => {
        return api.get(`/userprofile`);
    },

    updateUserProfile: (userProfile: UserProfile) => {
        return api.put(`/userprofile/${userProfile.user?.id}`, userProfile);
    },
};

export default UserProfileService;
