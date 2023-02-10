import React from "react";

export default function Tabela({ listaProdutos, selecionarProduto }) {
    return (
        <div>
            <h1>Produtos cadastrados</h1>

            <table className="table table-dark table-hover mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>

                <tbody>
                   {
                        listaProdutos.map((produto, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.marca}</td>
                                    <td>{produto.preco}</td>
                                    <td>
                                        <button className="btn-sm m-2" style={{backgroundColor: '#343A40'}} onClick={() => selecionarProduto(index)}>Selecionar</button>
                                    </td>
                                </tr>
                            )
                        }
                    )
                   }
                </tbody>
            </table>
        </div>
    );
}