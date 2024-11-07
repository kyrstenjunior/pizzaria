"use client"

import { ChangeEvent, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import Image from "next/image";
import { Button } from "../../../components/ui/Button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface CategoryProps {
    id: string;
    name: string;
}

interface Props {
    categories: CategoryProps[];
}

export default function Form({ categories }: Props) {
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleRegisterProduct(formData: FormData) {
        const categoryIndex = formData.get("category");
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");

        if(!categoryIndex || !name || !price || !description || !image) {
            toast.warning("Preencha todos os campos");
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
            toast.warning("Falha ao cadastrar este produto")
            return;
        });

        toast.success("Cadastrado com sucesso");
        redirect("/dashboard");
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato não permitido");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }


    return (
        <main className="max-w-720 my-5 mx-auto flex flex-col">
            <h1 className="text-2xl font-bold">Novo produto</h1>

            <form className="flex flex-col gap-4 my-4" action={handleRegisterProduct}>
                <label className="w-full h-72 relative bg-slate-950 rounded-lg flex items-center justify-center cursor-pointer flex-col mb-4 border border-gray-500">
                    <span className="z-50 opacity-10 transition-all hover:scale-110 hover:opacity-100">
                        <LuUploadCloud size={30} color="#fff" />
                    </span>

                    <input className="hidden" type="file" accept="image/png, image/jpg" required onChange={handleFile} />

                    {previewImage && (
                        <Image className="w-full h-full rounded-lg object-cover" alt="Imagem de preview" src={previewImage} fill={true} quality={100} priority={true} />
                    )}
                </label>

                <select
                    name="category"
                    className="border border-gray-500 rounded-lg px-2 h-10 bg-slate-900"
                >
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>{category.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto..."
                    required
                    className="border border-gray-500 rounded-lg px-2 h-10 bg-slate-900"
                />

                <input
                    type="text"
                    name="price"
                    placeholder="Preço do produto..." 
                    required
                    className="border border-gray-500 rounded-lg px-2 h-10 bg-slate-900"
                />

                <textarea
                    name="description"
                    placeholder="Digite a descrição do produto..."
                    required
                    className=" w-full min-h-32 resize-none border border-gray-500 rounded-lg p-2 bg-slate-900"
                ></textarea>

                <Button children="Cadastrar produto" bgButton="green" />
            </form>
        </main>
    )
}