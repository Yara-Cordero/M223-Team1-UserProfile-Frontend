import {useContext, useEffect, useState} from "react";
import {UserProfileOverviewContext} from "../../../Contexts/UserProfileOverviewContext";
import {MenuItem, Select} from "@mui/material";

function UserProfileSort() {

    const {setSort} = useContext(UserProfileOverviewContext);

    const [selectedValue, setSelectedValue] = useState("username_asc");


    useEffect(() => {
        setSort(selectedValue);
    }, [selectedValue]);


    return (
        <Select
            labelId="sort"
            data-cy="sort-dropdown"
            id="sort"
            value={selectedValue}
            label="Sort"
            onChange={(value) => setSelectedValue(value.target.value)}
        >
            <MenuItem value={"address_desc"}>Address A-Z</MenuItem>
            <MenuItem value={"address_asc"}>Address Z-A</MenuItem>
            <MenuItem value={"birthday_desc"}>Birthday Z-A</MenuItem>
            <MenuItem value={"birthday_asc"}>Birthday A-Z</MenuItem>
            <MenuItem value={"username_asc"}>Username A-Z</MenuItem>
            <MenuItem value={"username_desc"}>Username Z-A</MenuItem>
        </Select>
    )
}

export default UserProfileSort;
