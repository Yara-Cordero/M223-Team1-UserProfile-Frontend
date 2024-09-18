import {createContext, useState} from "react";
import {Page} from "../types/models/Page.model";
import {UserProfile} from "../types/models/UserProfile.model";

export type UserProfileOverviewContextState = {
    sort: string;
    setSort: (filter: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageInfo: Page<UserProfile>;
    setPageInfo: (pageInfo: Page<UserProfile>) => void;
};

const contextDefaultValues: UserProfileOverviewContextState = {

    sort: "",
    setSort: () => {
    },
    currentPage: 1,
    setCurrentPage: () => {
    },
    setPageInfo: () => {
    },
    pageInfo: {
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

    },
};

export const UserProfileOverviewContext =
    createContext<UserProfileOverviewContextState>(contextDefaultValues);

// TODO remove any
const UserProfileOverviewContextProvider = ({children}: any) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<string>("");

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

    return <UserProfileOverviewContext.Provider value={{
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        pageInfo,
        setPageInfo,
    }}>
        {children}
    </UserProfileOverviewContext.Provider>
}

export default UserProfileOverviewContextProvider;