import {User} from "./User.model";


export type UserProfile = {
    username: string;
    address ?: string | undefined;
    birthdate ?: Date | undefined;
    profilePicture ?: string | undefined;
    user: User | null | undefined;
}