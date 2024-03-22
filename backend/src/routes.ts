import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

const router = Router();

/* ---------- Rotas User ---------- */ 

// Rota chama o Controller, Controller chama o Service que executa a requisição e vem devolvendo os retornos
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

export { router };