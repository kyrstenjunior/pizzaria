import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';

import { router } from "./routes";

// setando express como app
const app = express();

// definindo o tipo de dado que será utilizado
app.use(express.json());

// Libera para qualquer ip fazer as requisições nesta API
app.use(cors());

// usa as rotas definidas no router
app.use(router);

// Middleware para criar excessões para erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    // se for uma instancia do tipo Error
    if(err instanceof Error) {
        return res.status(400).json({ error: err.message })
    }

    return res.status(500).json({ status: 'error', message: 'Internal server error' })

})

// inicia o servidor na porta 3333
app.listen(3333, () => console.log('Servidor online'));