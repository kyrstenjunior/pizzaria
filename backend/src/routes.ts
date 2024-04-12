// General Imports
import { Router, Request, Response } from "express";
import multer from "multer";
import uploadConfig from './config/multer';

// controllers users
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// controllers categories
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

// controllers products
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

// Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

/* ---------- Rotas User ---------- */ 
// Rota chama o Controller, Controller chama o Service que executa a requisição e vem devolvendo os retornos
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

/* ---------- Rotas Category ---------- */ 
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

/* ---------- Rotas Product ---------- */ 
// Rota com middleware para envio de arquivo (upload.single())
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

export { router };