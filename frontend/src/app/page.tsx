import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import logo from '../../public/logo.svg';

import { Input } from "@/app/dashboard/components/ui/Input";
import { Button } from "@/app/dashboard/components/ui/Button";

import { api } from "../services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token) {
        return
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000; // significa 30 dias
      cookies().set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" // quando estiver em produção, é só utilizar true nesta propriedade
      })
    } catch (error) {
      console.error(error);
      return;
    }

    redirect("/dashboard");
  }

  return (
    <>
      
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center">
        <Image src={ logo } priority={true} alt="SujeitoPizzaria" />

        <div className="mt-8 w-full sm:w-600 flex flex-col items-center justify-center px-8 py-6">
          <form action={handleLogin} className="w-11/12 flex flex-col">
            <Input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
            />
            <Button bgButton="red" type="submit" children="Acessar" />
          </form>
          <Link href="/signup" className="mt-4 text-white cursor-pointer">
            Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}
