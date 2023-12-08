import { Item, PrismaClient } from "@prisma/client"
import RestaurantNavBar from "../components/RestaurantNavBar"
import Menu from "./components/Menu"

const db = new PrismaClient();

const fetchItems = async (slug: string): Promise<Item[]> => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            items: true
        }
    })

    if (!restaurant) {
        throw new Error;
    }

    return restaurant.items;
}

export default async function RestaurantMenu({ params }: { params: { slug: string } }) {
    const items = await fetchItems(params.slug);

    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar slug={params.slug} />
                <Menu items={items} />
            </div>
        </>
    )
}