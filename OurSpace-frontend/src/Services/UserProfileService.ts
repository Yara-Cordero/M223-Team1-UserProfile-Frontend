import api from '../config/Api';

import {UserProfile} from "../types/models/UserProfile.model";
import {User} from "../types/models/User.model";
import {Page} from "../types/models/Page.model";

const UserProfileService = {
    getUserProfile: async (userProfile_id : string): Promise<UserProfile> => {
        const response = await api.get<UserProfile>(`/userprofile/${userProfile_id}`);
        return response.data;
    },

    getAllUserProfiles: async (offset: number, limit: number, sort?: string): Promise<Page<UserProfile>> => {
        sort = sort === "" ? "" : "&sort=" + sort;
        const response = await api.get<Page<UserProfile>>(`/userprofile?limit=${limit}&offset=${offset}${sort}`);
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
