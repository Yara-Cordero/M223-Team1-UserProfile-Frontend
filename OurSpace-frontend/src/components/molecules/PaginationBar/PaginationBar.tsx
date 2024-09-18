import {useContext, useEffect, useState} from "react";
import {UserProfileOverviewContext} from "../../../Contexts/UserProfileOverviewContext";
import {Button, Pagination} from "@mui/material";

function PaginationBar() {

    const {
        currentPage,
        setCurrentPage,
        pageInfo,
    } = useContext(UserProfileOverviewContext);

    return (
            <Pagination
                count={pageInfo.totalPages}
                color="primary"
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
            />
    )
}

export default PaginationBar;
