import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserProfile} from "../../../types/models/UserProfile.model";
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";

function UserProfilePage() {
    const { username } = useParams();
    const userProfile = useState<UserProfile>({
        birthdate: undefined,
        profilePicture: "",
        username: "",
        address: "",
        user: null,
    });

    useEffect() => {
        return () => {
            UserInfoService.getUserProfile(username).then(userProfile => {
                return userProfile;
            })
        }
    }

    return (
        <div>
            <UserProfileForm submitActionHandler={} userProfile={userProfile}/>
        </div>
    );
}

export default UserProfilePage;