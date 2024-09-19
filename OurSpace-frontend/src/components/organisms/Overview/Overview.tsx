import React, {useContext, useEffect} from 'react';
import UserProfileService from "../../../Services/UserProfileService";
import {UserProfileOverviewContext} from "../../../Contexts/UserProfileOverviewContext";
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";

function Overview() {

    const {sort, currentPage, setPageInfo, pageInfo} = useContext(UserProfileOverviewContext);

    useEffect(() => {
        UserProfileService.getAllUserProfiles(currentPage - 1, pageInfo.pageable.pageSize, sort).then((value) => {
            setPageInfo({...value});
        })
    }, [setPageInfo, currentPage, sort, pageInfo.pageable.pageSize]);


    return (
        <div data-cy="people-list-item">
            {pageInfo.content.map((userProfile) => (<UserProfileForm key={userProfile.username} userProfile={userProfile} isDisabled={true} />))}
        </div>

    );
}

export default Overview;