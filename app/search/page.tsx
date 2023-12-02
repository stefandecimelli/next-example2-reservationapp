import Header from "./components/Header"
import NavBar from "../components/NavBar"
import SearchSidebar from "./components/SearchSidebar"
import RestaurantCard from "../components/RestaurantCard"

export default function Search() {
    return (
        <>
            <NavBar />
            <Header />
            <div className="flex items-start justify-between w-2/3 py-4 m-auto">
                <SearchSidebar />
                <div className="w-5/6">
                    <RestaurantCard />
                </div>
            </div>
        </>
    )
}