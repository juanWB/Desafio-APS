import axios from "axios";

export const fetchCnpjData = async (cnpj: string) => {
    try {
        const cnpjFormatted = cnpj.replace(/\D/g, '');

        const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpjFormatted}`, {
            headers: { Accept: "application/json" }
        });

        if (response.data.status === "ERROR") {
            throw new Error("CNPJ inválido ou não encontrado.");
        }

        return {
            nome: response.data.nome,
            nome_fantasia: response.data.fantasia,
            cep: response.data.cep.replace(/\D/g, ""),
            logradouro: response.data.logradouro,
            bairro: response.data.bairro,
            cidade: response.data.municipio,
            uf: response.data.uf,
            complemento: response.data.complemento ?? "",
            email: response.data.email ?? "",
            telefone: response.data.telefone ?? ""
        };
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar dados do CNPJ.");
    }
};

export default fetchCnpjData;
