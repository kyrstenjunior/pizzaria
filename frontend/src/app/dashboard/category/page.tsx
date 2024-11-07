import { Button } from "../components/ui/Button";

import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

import { redirect } from "next/navigation";


export default function Category() {

    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name");

        if(name === "") return;

        const data = {name: name};

        const token = await getCookieServer();

        await api.post("/category", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => {
            console.error(err);
            return;
        });

        redirect("/dashboard");
    }

    return (
        <main className="flex flex-col justify-between my-16 mx-auto px-8 max-w-3xl">
            <h1 className="text-white text-3xl">Cadastrar categorias</h1>

            <form className="flex flex-col my-4" action={ handleRegister }>
                <input
                    type="text"
                    name="name"
                    placeholder="Digite o nome da categoria"
                    className="bg-slate-950 p-4 h-10 rounded text-white border border-gray-500 mb-4"
                    required
                />
                <Button type="submit" bgButton="green" children="Cadastrar" />
            </form>
        </main>
    )
}