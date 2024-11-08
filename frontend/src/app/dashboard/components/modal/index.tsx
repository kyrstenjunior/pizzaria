"use client"

import { FiX } from "react-icons/fi";
import { OrderContext } from "@/app/providers/order";
import { use } from "react";

function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder() {
    await finishOrder(order[0].order.id);
  }

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center px-4 backdrop-blur-sm">
      <section className="bg-slate-900 m-auto p-4 rounded-lg w-full max-w-600 relative text-white">
        <button onClick={onRequestClose} className="bg-transparent border-0">
          <FiX size={40} color="#ff3f4b" />
        </button>

        <article>
          <h2 className="mb-4 mt-2 text-2xl font-bold">Detalhes do pedido</h2>
          
          <span className="bg-slate-950 p-2 rounded-md">
            Mesa <strong>{order[0].order.table}</strong>
          </span>

          {order[0].order?.name && (
            <span className="inline-block ms-4 font-bold">{ order[0].order.name }</span>
          )}

          {order.map(item => (
            <section className="flex flex-col my-4 text-base" key={item.id}>
              <span>{item.amount} - <strong>{ item.product.name }</strong></span>
              <span className="text-gray-300 mt-1">{ item.product.description }</span>
            </section>
          ))}

          <button className="bg-emerald-400 p-2 rounded-md border-0 font-bold" onClick={handleFinishOrder}>
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  )
}

export default ModalOrder