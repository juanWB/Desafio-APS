import z from "zod";

const CnpjClientSchema = z.object({
    cnpj: z.string().length(14, "CNPJ deve ter 14 caracteres.")
        .regex(/^\d{14}$/, "CNPJ deve ter 14 caracteres.")
});

export default CnpjClientSchema;