import {User} from "./User.model";


export type UserProfile = {
    username: string;
    address ?: string;
    birthdate ?: Date | undefined;
    profilePicture ?: string;
    user: User;
}