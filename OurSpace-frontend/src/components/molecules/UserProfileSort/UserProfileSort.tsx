import {useContext, useEffect, useMemo, useState} from "react";
import {UserProfileOverviewContext} from "../../../Contexts/UserProfileOverviewContext";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function UserProfileSort() {

    const {setSort} = useContext(UserProfileOverviewContext);

    const [selectedValue, setSelectedValue] = useState("creationdate_desc");


    useEffect(() => {
        setSort(selectedValue);
    }, [selectedValue]);


    return (
        <Select
            labelId="sort"
            id="sort"
            value={selectedValue}
            label="Sort"
            onChange={(value) => setSelectedValue(value.target.value)}
        >
            <MenuItem value={"creationdate_desc"}>Cool</MenuItem>
            <MenuItem value={"creationdate_asc"}>Twenty</MenuItem>
            <MenuItem value={"other"}>Thirty</MenuItem>
        </Select>
        )
}

export default UserProfileSort;
