import React, {useContext, useEffect, useState} from 'react';
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import {UserProfile} from "../../../types/models/UserProfile.model";
import UserProfileService from "../../../Services/UserProfileService";
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";

function UserProfilePage() {
    const {user} = useContext(ActiveUserContext);
    const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>();

    useEffect(() => {
        return (() => {
                if (user !== undefined && user !== null && typeof user.userProfile.id === "string") {
                    UserProfileService.getUserProfile(user.userProfile.id)
                        .then((userProfile) => {
                            setCurrentUserProfile(userProfile)
                            console.log(userProfile);
                        })
                }
        })
    }, []);




    return (
        <div>
            <UserProfileForm userProfile={currentUserProfile} isDisabled={false}/>
        </div>
    );

}

export default UserProfilePage;