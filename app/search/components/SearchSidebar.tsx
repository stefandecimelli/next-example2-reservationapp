import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export default function SearchSidebar({
    searchParams,
    locations,
    cuisines
}: {
    locations: Location[],
    cuisines: Cuisine[],
    searchParams: { city?: string, cuising?: string, price?: PRICE }
}) {
    return (
        <div className="w-1/5">
            <div className="flex flex-col pb-4 border-b">
                <h1 className="mb-2">Region</h1>
                {
                    locations.map(location => {
                        return <Link href={{
                            pathname: "/search",
                            query: {
                                ...searchParams, city: location.name
                            }
                        }} key={location.id} className="font-light capitalize text-reg">
                            {location.name}
                        </Link>
                    })
                }
            </div>
            <div className="flex flex-col pb-4 mt-3 border-b">
                <h1 className="mb-2">Cuisine</h1>
                {
                    cuisines.map(cuisine => {
                        return <Link href={{
                            pathname: "/search",
                            query: {
                                ...searchParams, cuisine: cuisine.name
                            }
                        }} key={cuisine.id} className="font-light capitalize text-reg">
                            {cuisine.name}
                        </Link>
                    })
                }
            </div>
            <p className="font-light text-reg">Chinese</p>
            <div className="pb-4 mt-3">
                <h1 className="mb-2">Price</h1>
                <div className="flex">
                    {[
                        { symbol: "$", price: PRICE.CHEAP, className: "rounded-l" },
                        { symbol: "$$", price: PRICE.REGULAR, classs: "" },
                        { symbol: "$$$", price: PRICE.EXPENSIVE, classs: "rounded-r" }
                    ].map(({price, symbol, classs}) => {
                        return <Link className={"text-center w-full p-1 font-light border text-reg " + classs} href={{
                            pathname: "/search",
                            query: {
                                ...searchParams, price: price
                            }
                        }}>
                            {symbol}
                        </Link>
                    })}
                </div>
            </div>
        </div>
    )
}