import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "../api/api";
import styled from "styled-components";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Table = styled.table`
  width: 100%;
  table-layout: auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;

  th, td {
    padding: 5px;
    min-width: 130px; 
    word-break: break-word; 
  }
`;



const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #218838;
  }

  svg {
    margin-right: 5px;
  }
`;

const ClientList = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes: ", error);
      setClientes([]);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (cnpj) => {
    try {
      await deleteClient(cnpj);
      fetchClients(); 
    } catch (error) {
      console.error("Erro ao deletar cliente: ", error);
    }
  };

  const handleEdit = (cliente) => {
    navigate("/cliente", { state: { cliente } });
  };

  const handleAdd = () => {
    navigate("/cliente");
  };

  return (
    <>
      <ButtonContainer>
        <AddButton onClick={handleAdd}>
          <FaPlus /> Adicionar Cliente
        </AddButton>
      </ButtonContainer>

      <Table>
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Nome Fantasia</th>
            <th>Cep</th>
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>UF</th>
            <th>Complemento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clientes) && clientes.length > 0 ? (
            clientes.map((item, i) => (
              <tr key={i}>
                <td>{item.cnpj}</td>
                <td>{item.nome}</td>
                <td>{item.nome_fantasia}</td>
                <td>{item.cep}</td>
                <td>{item.logradouro}</td>
                <td>{item.bairro}</td>
                <td>{item.cidade}</td>
                <td>{item.uf}</td>
                <td>{item.complemento}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>
                  <FaEdit
                    onClick={() => handleEdit(item)}
                    style={{ cursor: "pointer", marginRight: 10 }}
                  />
                  <FaTrash
                    onClick={() => handleDelete(item.cnpj)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12">Nenhum cliente encontrado.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ClientList;