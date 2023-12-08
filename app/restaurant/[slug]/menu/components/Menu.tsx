import { Item } from '@prisma/client'
import React from 'react'
import MenuCard from './MenuCard'

export default function Menu({ items }: { items: Item[] }) {
    return (
        <main className="mt-5 bg-white">
            <div>
                <div className="pb-1 mt-4 mb-1">
                    <h1 className="text-4xl font-bold">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {
                        items.map(item => <MenuCard key={item.id} item={item} />)
                    }
                </div>
                <div>
                    {
                        items?.length < 1 && <p>This restaurant does not have an online menu.</p>
                    }
                </div>
            </div>
        </main>
    )
}
