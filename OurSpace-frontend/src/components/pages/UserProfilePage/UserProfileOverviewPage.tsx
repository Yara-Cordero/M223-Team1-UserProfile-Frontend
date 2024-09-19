import UserProfileOverviewContextProvider from "../../../Contexts/UserProfileOverviewContext";
import PaginationBar from "../../molecules/PaginationBar/PaginationBar";
import Overview from "../../organisms/Overview/Overview";
import UserProfileSort from "../../molecules/UserProfileSort/UserProfileSort";

function Homepage() {

    return (
        <UserProfileOverviewContextProvider>
            <UserProfileSort></UserProfileSort>
            <Overview></Overview>
            <PaginationBar/>
        </UserProfileOverviewContextProvider>

    )
}

export default Homepage;
