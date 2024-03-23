import { Router, Request, Response } from "express";

// controllers
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

/* ---------- Rotas User ---------- */ 
// Rota chama o Controller, Controller chama o Service que executa a requisição e vem devolvendo os retornos
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

/* ---------- Rotas Category ---------- */ 

export { router };