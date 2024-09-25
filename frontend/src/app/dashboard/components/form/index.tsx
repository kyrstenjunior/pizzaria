"use client"

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";

interface CategoryProps {
    id: string;
    name: string;
}

interface Props {
    categories: CategoryProps[]
}

export function Form({ categories }: Props) {

    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleRegisterProduct(formData: FormData) {
        const categoryIndex = formData.get("category");
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");

        if(!name || !categoryIndex || !price || !description || !image) {
            return;
        }

        const data = new FormData();

        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("category_id", categories[Number(categoryIndex)].id);
        data.append("file", image);

        const token = getCookieClient();

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => {
            console.error(err);
            toast.error("Erro ao cadastrar o produto");
        })

        toast.success("Cadastrado com sucesso");

    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                console.log("Formato proibido!");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }

    return (
        <main className="flex flex-col justify-between my-16 mx-auto px-8 max-w-3xl">
            <h1 className="text-white text-3xl">Novo Produto</h1>

            <form className="flex flex-col my-4" action={handleRegisterProduct}>

                <label className="w-full h-72 bg-slate-950 mb-4 rounded flex justify-center items-center cursor-pointer">
                    <span className="z-50 absolute opacity-70 transition-all hover:opacity-100 hover:scale-125">
                        <FiUploadCloud size={30} color="#fff" />
                    </span>

                    <input className="hidden" type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                    {previewImage && (
                        <Image 
                            alt="Foto do produto"
                            src={previewImage}
                            fill={true}
                            quality={100}
                            priority={true}
                            className="w-full h-full object-cover rounded"
                        />
                    )}
                </label>

                <select
                    className="w-full h-10 mb-4 px-2 text-white bg-slate-950 rounded border-gray-500"
                >
                    {
                        categories.map((category, index) => (
                            <option key={category.id} value={index}>{category.name}</option>
                        ))
                    }
                </select>

                <input
                    type="text"
                    placeholder="Digite o nome do produto"
                    className="h-10 mb-4 px-2 text-white bg-slate-950 rounded border-gray-500"
                    required
                />

                <input
                    type="text"
                    placeholder="Preço do produto"
                    className="h-10 mb-4 px-2 text-white bg-slate-950 rounded border-gray-500"
                    required
                />

                <textarea
                    className="w-full min-h-32 resize-none mb-4 p-2 text-white bg-slate-950 rounded border-gray-500"
                    placeholder="Descreva seu produto..."
                    required
                />

                <button
                    type="submit"
                    className="h-10 text-xl bg-emerald-400 font-bold rounded text-slate-900"
                >Cadastrar</button>
            </form>
        </main>
    )
}