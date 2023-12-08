import { PRICE } from '@prisma/client'
import React from 'react'

export default function Price({ price }: { price: PRICE }) {
    switch (price) {
        case PRICE.CHEAP:
            return <p className={"flex mr-3"}><span>$$</span><span className={"text-gray-400"}>$$</span></p>
        case PRICE.REGULAR:
            return <p className={"flex mr-3"}><span>$$$</span><span className={"text-gray-400"}>$</span></p>
        case PRICE.EXPENSIVE:
            return <p className={"flex mr-3"}><span>$$$$</span></p >
        default:
            return <p className={"flex mr-3"}><span className={"text-gray-400"}>$$</span></p >
    }
}
