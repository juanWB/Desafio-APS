import React, { useState } from "react";
import styled from "styled-components";
import { createClient, updateClient } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #fff;
  padding: 25px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  margin: auto;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 12px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.3s;

  &:hover {
    background-color: #1f5bb5;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const ClientForm = ({ onSave }) => {
  const location = useLocation();
  const cliente = location.state?.cliente;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cnpj: cliente?.cnpj || "",
    nome: cliente?.nome || "",
    nome_fantasia: cliente?.nome_fantasia || "",
    cep: cliente?.cep || "",
    logradouro: cliente?.logradouro || "",
    bairro: cliente?.bairro || "",
    cidade: cliente?.cidade || "",
    uf: cliente?.uf || "",
    complemento: cliente?.complemento || "",
    email: cliente?.email || "",
    telefone: cliente?.telefone || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "cnpj" && value.length === 14) {
      fetchCnpjData(value);
    }

    setFormData({ ...formData, [name]: value });
  };


  const fetchCnpjData = async (cnpj) => {
    try {
      const response = await axios.get(`http://localhost:3001/search-cnpj/${cnpj}`);

      const data = response.data;

      setFormData((prevData) => ({
        ...prevData,
        nome: data.nome,
        nome_fantasia: data.nome_fantasia,
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        complemento: data.complemento || "",
        email: data.email,
        telefone: data.telefone,
      }));
    } catch (error) {
      console.error("Erro ao buscar dados do CNPJ:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnpj: "CNPJ não encontrado ou inválido.",
      }));
    }
  };

  const fetchAddressByCep = async () => {
    const cep = formData.cep.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setFormData((prevData) => ({
          ...prevData,
          logradouro: response.data.logradouro || "",
          bairro: response.data.bairro || "",
          cidade: response.data.localidade || "",
          uf: response.data.uf || "",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          cep: "CEP não encontrado",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        cep: "Erro ao buscar o CEP",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (cliente) {
        await updateClient(cliente.cnpj, formData);
      } else {
        await createClient(formData);
      }

      setErrors({});
      if (onSave) {
        onSave();
      }

      setIsSubmitting(false);
      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar cliente: ", error);
      if (error?.response?.data?.errors) {
        const errorMessages = error.response.data.errors.reduce(
          (acc, { path, message }) => {
            acc[path] = message;
            return acc;
          },
          {}
        );
        setErrors(errorMessages);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {[
        { label: "CNPJ", name: "cnpj" },
        { label: "Nome", name: "nome" },
        { label: "Nome Fantasia", name: "nome_fantasia" },
        { label: "Cep", name: "cep" },
        { label: "Logradouro", name: "logradouro" },
        { label: "Bairro", name: "bairro" },
        { label: "Cidade", name: "cidade" },
        { label: "UF", name: "uf" },
        { label: "Complemento", name: "complemento" },
        { label: "E-mail", name: "email", type: "email" },
        { label: "Telefone", name: "telefone" },
      ].map(({ label, name, type = "text" }) => (
        <InputArea key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={
              name === "cep"
                ? fetchAddressByCep
                : name === "cnpj"
                  ? () => {
                    if (formData.cnpj.replace(/\D/g, "").length === 14) {
                      fetchCnpjData(formData.cnpj);
                    }
                  }
                  : undefined
            }
          />
          {errors[name] && <ErrorText>{errors[name]}</ErrorText>}
        </InputArea>
      ))}

      <Button type="submit" disabled={isSubmitting}>
        Salvar
      </Button>
    </FormContainer>
  );
};

export default ClientForm;
