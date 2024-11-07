"use client"

import { use } from "react"
import { OrderProps } from "@/lib/order.type"
import { FiRefreshCw } from "react-icons/fi"
import ModalOrder from "@/app/dashboard/components/modal"
import { OrderContext } from "@/app/providers/order"

interface Props {
    orders: OrderProps[];
}

function Orders({ orders }: Props) {

    const { isOpen, onRequestOpen } = use(OrderContext);

    async function handleDetailOrder(order_id: string) {
        await onRequestOpen(order_id);
    }

  return (
    <>
        <main className="max-w-720 my-5 mx-auto px-4 flex flex-col justify-between">
            <section className="flex gap-3 items-center mb-4 mt-6">
                <h1>Últimos pedidos</h1>
                <button>
                    <FiRefreshCw size={24} color="#3fffa3" />
                </button>
            </section>

            <section className="flex flex-col gap-4">
                { 
                    orders ? (
                        orders.map(order => {
                            return (
                                <button
                                    key={order.id}
                                    className="bg-slate-950 flex items-center text-lg rounded-lg transition-all duration-500 hover:brightness-150"
                                    onClick={() => handleDetailOrder(order.id)}
                                >
                                    <div className="bg-emerald-400 w-2 h-14 rounded-es-lg rounded-ss-lg mr-4"></div>
                                    <span>Mesa {order.table}</span>
                                </button>
                            )
                        })
                    ) : (
                        <>
                            <span>Sem pedidos!</span>

                            <button
                                className="bg-slate-950 flex items-center text-lg rounded-lg transition-all duration-500 hover:brightness-150"
                                onClick={() => handleDetailOrder("Mesa 10")}
                            >
                                <div className="bg-emerald-400 w-2 h-14 rounded-es-lg rounded-ss-lg mr-4"></div>
                                <span>Mesa 10</span>
                            </button>
                        </>
                    )
                }
            </section>
        </main>
        
        { isOpen && <ModalOrder /> }
    </>
  )
}

export default Orders