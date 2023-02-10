package br.com.api.produtos.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.model.ProdutoModelo;
import br.com.api.produtos.services.ProdutoServico;

@RestController
// Permite que a API seja acessada por qualquer domínio
@CrossOrigin(origins = "*")
public class ProdutoControle {
    
    @Autowired
    private ProdutoServico produtoServico;

    @GetMapping("/")
    public String index() {
        return "Hello World!";
    }

    // Rota de listagem de produtos
    @GetMapping("/listarProdutos")
    public Iterable<ProdutoModelo> listarProdutos() {
        return produtoServico.listarProdutos();
    }

    // Rota de cadastro de produtos
    @PostMapping("/cadastrarProduto")
    public ResponseEntity<?> cadastrarProduto(@RequestBody ProdutoModelo produtoModelo) {
        return produtoServico.cadastrarEditarProduto(produtoModelo, "cadastrar");
    }

    // Rota de edição de produtos
    @PutMapping("/editarProduto")
    public ResponseEntity<?> editarProduto(@RequestBody ProdutoModelo produtoModelo) {
        return produtoServico.cadastrarEditarProduto(produtoModelo, "editar");
    }

    // Rota de deleção de produtos
    @DeleteMapping("/deletarProduto")
    public ResponseEntity<?> deletarProduto(@RequestBody ProdutoModelo produtoModelo) {
        return produtoServico.deletarProduto(produtoModelo.getId());
    }

}
