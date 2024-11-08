import Orders from "@/app/dashboard/components/orders";

import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/order.type";

import { api } from "@/services/api";

async function getOrders(): Promise<OrderProps[] | []> {
    try {
        const token = await getCookieServer();

        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data || [];
    } catch(err) {
        console.error(err);
        return [];
    }
}

export default async function Dashboard() {

    const orders = await getOrders();

    return (
        <>
            <div className="container">
                <Orders orders={orders} />
            </div>
        </>
    )
}