package br.com.api.produtos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.repository.ProdutoRepositorio;
import br.com.api.produtos.model.ProdutoModelo;
import br.com.api.produtos.model.RespostaModelo;;

@Service
public class ProdutoServico {
    
    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    @Autowired
    private RespostaModelo respostaModelo;

    // Método para listar todos os produtos
    public Iterable<ProdutoModelo> listarProdutos() {
        // Retorna todos os produtos do banco de dados
        return produtoRepositorio.findAll();
    }

    // Método para cadastrar ou alterar um produto
    public ResponseEntity<?> cadastrarEditarProduto(ProdutoModelo produtoModelo, String acao) {
        // Validação dos campos do produto
        if(produtoModelo.getNome().equals("")){
            respostaModelo.setMensagem("O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        }else if(produtoModelo.getMarca().equals("")){
            respostaModelo.setMensagem("O nome da marca é obrigatório!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        } else if (produtoModelo.getPreco() == 0) {  
            respostaModelo.setMensagem("O preço do produto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        } else {
            // Verifica se é uma ação de cadastro ou edição
            if(acao.equals("cadastrar")){
                // Cadastra o produto
                respostaModelo.setMensagem("Produto cadastrado com sucesso!");
                return new ResponseEntity<ProdutoModelo>(produtoRepositorio.save(produtoModelo), HttpStatus.CREATED);
            } else {
                // Editar o produto
                respostaModelo.setMensagem("Produto editado com sucesso!");
                return new ResponseEntity<ProdutoModelo>(produtoRepositorio.save(produtoModelo), HttpStatus.OK);
            }
        }
    }

    // Método para deletar um produto
    public ResponseEntity<RespostaModelo> deletarProduto(Long id) {
        // Verifica se o produto existe no banco de dados
        if(produtoRepositorio.findById(id).isPresent()){
            // Deleta o produto do banco de dados
            produtoRepositorio.deleteById(id);
            respostaModelo.setMensagem("Produto deletado com sucesso!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.OK);
        } else {
            // Retorna uma mensagem de erro caso o produto não exista
            respostaModelo.setMensagem("Produto não encontrado!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.NOT_FOUND);
        }
    }
}