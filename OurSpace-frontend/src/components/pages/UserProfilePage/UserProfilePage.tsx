import React, {useContext} from 'react';
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

function UserProfilePage() {
    const {loadActiveUser} = useContext(ActiveUserContext);
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


        </div>
    );
}

export default UserProfilePage;