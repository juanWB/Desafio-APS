import {Request, Response} from "express";
import {createClient, getClients, updateClient, deleteClient} from "../models/ClientModel";
import ClientSchema from "../schemas/ClientSchema";
import z from "zod";
import { fetchCnpjData } from "../service/CnpjService";


export const searchCnpj = async (req: Request, res: Response) => {
    try {
        const { cnpj } = req.params;
        const cnpjData = await fetchCnpjData(cnpj);

        res.status(200).json(cnpjData);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Erro desconhecido." });
    }
};

export const addClient = async (req: Request, res: Response) => {
    try{
        const validatedData = ClientSchema.parse(req.body);

        await createClient(validatedData);
        
        res.status(201).json({validatedData});
    }catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).json({ errors: err.errors });
        } else if (err instanceof Error) {
          res.status(500).json({ error: err.message });
        } else{
            res.status(500).json({
                status: 'error',
                message: 'Erro desconhecido.',
            });
        }
    }
}

export const listClients = async (req: Request, res: Response) => {
   try{
    const clients = await getClients();
    res.status(200).json(clients);
   }   catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ errors: err.errors });
    } else if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else{
        res.status(500).json({
            status: 'error',
            message: 'Erro desconhecido.',
        });
    }
}
}

export const editClient = async (req: Request, res: Response) => {
    try{
        const validatedData = ClientSchema.parse(req.body);
        await updateClient(validatedData.cnpj, validatedData);

        res.status(200).json({validatedData});
    } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).json({ errors: err.errors });
        } else if (err instanceof Error) {
          res.status(500).json({ error: err.message });
        } else{
            res.status(500).json({
                status: 'error',
                message: 'Erro desconhecido.',
            });
        }
    }
}

export const removeClient = async (req: Request, res: Response) => {
    try{
        const cnpj = req.params.cnpj;

        await deleteClient(cnpj);
        res.status(200).send();
    } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).json({ errors: err.errors });
        } else if (err instanceof Error) {
          res.status(500).json({ error: err.message });
        } else{
            res.status(500).json({
                status: 'error',
                message: 'Erro desconhecido.',
            });
        }
}
}

