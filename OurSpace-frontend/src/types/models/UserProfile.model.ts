import {User} from "./User.model";


export type UserProfile = {
    id: string
    username: string;
    address ?: string;
    birthday ?: Date | undefined;
    profilePicture ?: string;

}