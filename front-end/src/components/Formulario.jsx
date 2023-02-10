import React from "react";

export default function Formulario({ btn, handleInputChange, handleFormSubmit, obj, cancelar, excluir, editar }) {
    return (
        <>
            {
                btn ? <h1>Cadastro de produtos</h1> : <h1>Edição de produtos</h1>
            }
            
            <form className="mt-4">
                <div className="form-group">
                    <input type="text" className="form-control mb-2" placeholder="Nome" name="nome" value={obj.nome} onChange={handleInputChange}/>

                    <input type="text" className="form-control mb-2" placeholder="Marca" name="marca" value={obj.marca} onChange={handleInputChange}/>
                    
                    <input type="number" className="form-control mb-4" placeholder="Preço" name="preco" value={obj.preco} onChange={handleInputChange}/>

                    {/* Controle dos botões do formulário de acordo com o estado do botão */}
                    {
                        btn ? <button className="btn-block" type="submit" onClick={handleFormSubmit}>Cadastrar</button> :
                        <div>
                            <button className="btn-block" onClick={editar}>Editar produto</button>
                            <button className="btn-block" onClick={excluir}>Excluir produto</button>
                            <button className="btn-block" onClick={cancelar}>Cancelar</button>
                        </div>
                    }
                </div>
            </form>
        </>
    );
}