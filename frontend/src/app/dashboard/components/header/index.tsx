"use client"

import Link from "next/link";

import { FiLogOut } from "react-icons/fi";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
    const router = useRouter();

    async function handleLogout() {
        deleteCookie("session", { path: "/" });
        toast.success("Logout feito com sucesso");
        router.replace("/");
    }

    return (
        <header className="w-full mt-6">

            <div className="flex justify-between">
                <Link href="/dashboard">
                    <img src="/logo.svg" alt="logotipo" width={190} height={60} />
                </Link>

                <nav className="flex items-center">
                    <Link
                        className="inline-block px-2 relative transition-colors hover:text-red-500"
                        href="/dashboard/category"
                    >Categoria</Link>

                    <Link
                        className="inline-block px-2 ms-8 relative transition-colors hover:text-red-500"
                        href="/dashboard/product"
                    >Cardapio</Link>

                    <form action={handleLogout}>
                        <button type="submit" className="ms-8 transition-transform hover:scale-125">
                            <FiLogOut color="#fff" size={24} />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}
