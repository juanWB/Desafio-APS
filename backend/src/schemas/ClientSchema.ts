import { z } from "zod";

const ClientSchema = z.object({
    cnpj: z.string().length(14, "CNPJ deve ter 14 caracteres."),
    nome: z.string().min(3, "Nome dever ter no mínimo 3 caracteres."),
    nome_fantasia: z.string().min(3, "Nome fantasia dever ter no mínimo 3 caracteres."),
    cep: z.string().length(9, "CEP deve ter 9 caracteres."),
    logradouro: z.string().min(3, "Logradouro inválido."),
    bairro: z.string().min(3, "Bairro inválido."),
    cidade: z.string().min(3, "Cidade inválida."),
    uf: z.string().length(2, "UF inválida."),
    complemento: z.string().optional(),
    email: z.string().email("E-mail inválido."),
    telefone: z.string().min(10, "Telefone inválido.")
});


export default ClientSchema; 