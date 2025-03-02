import express from "express";
import { addClient, listClients, editClient, removeClient, searchCnpj } from "../controllers/ClientController";

const router = express.Router();

router.post("/cliente", addClient);
router.get("/", listClients);
router.get("/search-cnpj/:cnpj", searchCnpj); 
router.put("/cliente/:cnpj", editClient);
router.delete("/:cnpj", removeClient);



export default router;