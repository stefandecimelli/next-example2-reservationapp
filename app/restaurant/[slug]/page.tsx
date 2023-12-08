import { PrismaClient } from "@prisma/client"
import { error } from "console"
import Description from "./components/Description"
import Images from "./components/Images"
import Rating from "./components/Rating"
import ReservationCard from "./components/ReservationCard"
import RestaurantNavBar from "./components/RestaurantNavBar"
import Reviews from "./components/Reviews"
import Title from "./components/Title"

const db = new PrismaClient();

interface Restaurant {
    id: number,
    name: string,
    slug: string,
    images: string[],
    description: string,
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            id: true,
            name: true,
            slug: true,
            images: true,
            description: true,
        }
    });

    if (!restaurant) {
        throw error();
    }

    return restaurant;
}

export default async function RestaurantDetails({ params }: { params: { slug: string } }) {
    const restaurant = await fetchRestaurantBySlug(params.slug);

    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={restaurant.slug} />
                <Title name={restaurant.name} />
                <Rating />
                <Description description={restaurant.description} />
                <Images images={restaurant.images} />
                <Reviews />
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard />
            </div>
        </>
    )
}