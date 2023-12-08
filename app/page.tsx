import NavBar from './components/NavBar'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { Cuisine, Location, PRICE, PrismaClient } from '@prisma/client'

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}

const db = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restsurants = await db.restaurant.findMany({
    select: {
        id: true,
        name: true,
        main_image: true,
        slug: true,
        cuisine: true,
        location: true,
        price: true
    }
  });
  return restsurants;
}

export default async function Home() {
  const restaurants = await fetchRestaurants();
  
  return (
    <>
      <NavBar />
      <main>
        <Header />
        <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
          {
            restaurants.map(restaurant => <RestaurantCard key={`${restaurant.slug}`} restaurant={restaurant} />)  
          }
        </div>
      </main>
    </>
  )
}
