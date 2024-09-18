import React, {useContext, useEffect, useState} from 'react';
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import {UserProfile} from "../../../types/models/UserProfile.model";
import UserProfileService from "../../../Services/UserProfileService";

function UserProfilePage() {
    const {user} = useContext(ActiveUserContext);
    const [userProfile, setUserProfile] = useState<UserProfile>();

    useEffect(() => {
        return (() => {
                if (user !== undefined && user !== null && typeof user.userProfile.id === "string") {
                    UserProfileService.getUserProfile(user.userProfile.id)
                        .then((userProfile) => {
                            setUserProfile(userProfile)
                            console.log(userProfile);
                        })
                }
        })
    }, []);




    return (
        <div>


        </div>
    );

}

export default UserProfilePage;