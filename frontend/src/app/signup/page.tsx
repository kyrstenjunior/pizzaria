import Image from "next/image";

import logo from '../../../public/logo.svg';

import { Input } from "@/app/dashboard/components/ui/Input";
import { Button } from "@/app/dashboard/components/ui/Button";

import Link from "next/link";
import { toast } from "sonner";

import { redirect } from "next/navigation";
import { api } from "@/services/api";

export default function Signup() {

  async function handleRegister(formData: FormData) {
    "use server"

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if(name === "" || email === "" || password === "") {
      toast.warning("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/users", { name, email, password });
    } catch(err) {
      console.error("Error: " + err);
    }

    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image src={ logo } priority={true} alt="SujeitoPizzaria" />

      <div className="mt-8 w-full sm:w-600 flex flex-col items-center justify-center px-8 py-6">
        <h1 className="text-white text-3xl font-bold pb-2">Criando sua conta</h1>
        <form className="w-11/12 flex flex-col" action={handleRegister}>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            required
          />
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
          <Button
            className="my-4 h-10 bg-red-500 p-2 flex items-center justify-center text-xl text-white border-0 rounded-lg transition-all hover:brightness-110"
            type="submit"
          >Cadastrar</Button>
        </form>
        <Link href="/" className="mt-4 text-white cursor-pointer">
          Já possui uma conta? Faça login
        </Link>
      </div>
    </div>
  );
}
