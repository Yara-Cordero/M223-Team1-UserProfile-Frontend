import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {Page} from "../../../types/models/Page.model";
import UserProfileService from "../../../Services/UserProfileService";
import userProfileOverviewContext, {UserProfileOverviewContext} from "../../../Contexts/UserProfileOverviewContext";
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";

function Overview() {

    const {sort, currentPage, setPageInfo, pageInfo} = useContext(UserProfileOverviewContext);

    useEffect(() => {
        UserProfileService.getAllUserProfiles(currentPage - 1, pageInfo.pageable.pageSize, sort).then((value) => {
            setPageInfo({...value});
        console.log(value);
        })
    }, [currentPage, sort]);


    return (
        <div>
            {pageInfo.content.map((userProfile) => (<UserProfileForm key={userProfile.username} userProfile={userProfile} isDisabled={true} />))}
        </div>

    );
}

export default Overview;