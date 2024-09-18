import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {UserProfile} from "../../../types/models/UserProfile.model";
import {Page} from "../../../types/models/Page.model";
import UserProfileService from "../../../Services/UserProfileService";
import {UserProfileOverviewContext} from "../../../Contexts/UserProfileOverviewContext";
import UserProfileForm from "../../molecules/UserProfileForm/UserProfileForm";

function Overview() {

/*
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>()
*/
    const [pageInfo, setPageInfo] = useState<Page<UserProfile>>({
        totalPages: 0,
        totalElements: 0,
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: {
                sorted: false,
                unsorted: false,
                empty: true
            },
            offset: 0,
            paged: false,
            unpaged: false
        },
        size: 0,
        content: [],
        number: 0,
        sort: {
            sorted: false,
            unsorted: false,
            empty: true
        },
        numberOfElements: 0,
        first: false,
        last: false,
        empty: true

    });

    const {sort, currentPage} = useContext(UserProfileOverviewContext);

    useEffect(() => {
        UserProfileService.getAllUserProfiles(currentPage - 1, pageInfo.pageable.pageSize, sort).then((value) => {
            setPageInfo(value);
        })
    }, [currentPage, sort]);


    return (
        <div>
            {pageInfo.content.map((userProfile) => (<UserProfileForm activeUser={...userProfile} isDisabled={true} />))}
        </div>

    );
}

export default Overview;