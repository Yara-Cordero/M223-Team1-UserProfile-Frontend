import React from 'react';
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";

function UserProfilePage() {

    /*
    useEffect(() => {
        return (() => {
            UserInfoService.getUserProfile(loadActiveUser)
                .then((userProfile) => {
                    console.log(userProfile);
                    return userProfile;
                })
        })
    }, []);

     */


    return (
        <div>
            <UserProfileForm/>

        </div>
    );
}

export default UserProfilePage;