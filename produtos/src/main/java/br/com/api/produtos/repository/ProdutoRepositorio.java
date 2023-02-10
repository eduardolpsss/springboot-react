package br.com.api.produtos.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.api.produtos.model.ProdutoModelo;

public interface ProdutoRepositorio extends CrudRepository<ProdutoModelo, Long>{

}