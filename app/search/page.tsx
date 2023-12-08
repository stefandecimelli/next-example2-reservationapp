import Header from "./components/Header"
import NavBar from "../components/NavBar"
import SearchSidebar from "./components/SearchSidebar"
import RestaurantCard from "./components/RestaurantCard"
import { PRICE, PrismaClient } from "@prisma/client"

interface SearchParams { city?: string, cuisine?: string, price?: PRICE }

const prisma = new PrismaClient();

const fetchRestaurantsByCity = ({city, cuisine, price}: SearchParams) => {
    const where: any = {}
    if (city) {
        where.location = {
            name: {
                equals: city.toLowerCase()
            }
        }
    }
    if (cuisine) {
        where.cuisine = {
            name: {
                equals: cuisine.toLowerCase()
            }
        }
    }
    if (price) {
        where.price = {
            equals: price
        }
    }
    const select = {
        id: true,
        name: true,
        main_image: true,
        location: true,
        price: true,
        cuisine: true,
        slug: true
    }
    return prisma.restaurant.findMany({ where, select })
}

const fetchLocations = async () => {
    return prisma.location.findMany();
}

const fetchCuisines = async () => {
    return prisma.cuisine.findMany();
}

export default async function Search({ searchParams }: { searchParams: SearchParams }) {
    const restaurants = await fetchRestaurantsByCity(searchParams);
    const cuisine = await fetchCuisines();
    const locations = await fetchLocations();

    return (
        <>
            <NavBar />
            <Header />
            <div className="flex items-start justify-between w-2/3 py-4 m-auto">
                <SearchSidebar locations={locations} cuisines={cuisine} searchParams={searchParams} />
                <div className="w-5/6">
                    {
                        !restaurants.length
                            ? <p>Sorry, no restaurants match the search.</p>
                            : restaurants.map((restaurant => {
                                return <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            }))
                    }
                </div>
            </div>
        </>
    )
}