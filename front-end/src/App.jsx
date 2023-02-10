import { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import Logo from './components/Logo'
import Tabela from './components/Tabela'

function App() {

  // Objeto produto para armazenar os dados do formulário
  const produto = {
    id: '',
    nome: '',
    marca: '',
    preco: ''
  }

  // Estado para controlar o botão do formulário
  const [btnCadastrar, setBtnCadastrar] = useState(true)
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState([])
  // Estado para armazenar o objeto produto
  const [ObjProduto, setObjProduto] = useState(produto)

  useEffect(() => {
    fetch('http://localhost:8080/listarProdutos')
      .then(response => response.json())
      .then(data => setProdutos(data))
  }, [])

    // Obtendo dados do formulário
    const handleInputChange = (event) => {
      setObjProduto({
        ...ObjProduto,
        [event.target.name]: event.target.value
      })
    }

    // Função para cadastrar um produto
    const handleFormSubmit = () => {
      fetch('http://localhost:8080/cadastrarProduto', {
        method: 'POST',
        body: JSON.stringify(ObjProduto),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Verificando resposta do servidor e exibindo mensagem
          if(data.mensagem !== undefined){
            alert(data.mensagem)
          } else {
            setProdutos([...produtos, data])
            alert("Produto cadastrado com sucesso!")
            limparCampos()
          }
        })      
    }

    // Função para remover um produto
    const handleDelete = () => {
      // Confirmando exclusão do produto
      if(window.confirm("Deseja realmente excluir o produto?") === true){
        fetch('http://localhost:8080/deletarProduto', {
          method: 'DELETE',
          body: JSON.stringify(ObjProduto),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            alert(data.mensagem)
            limparCampos()
          })      
      } else {
        // Caso o usuário cancele a exclusão do produto
        limparCampos()
      }
    }

    // Função para editar um produto
    const handleFormEdit = () => {
      fetch('http://localhost:8080/editarProduto', {
        method: 'PUT',
        body: JSON.stringify(ObjProduto),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          // Verificando resposta do servidor e exibindo mensagem
          if(data.mensagem !== undefined){
            alert(data.mensagem)
          } else {
            alert("Produto editado com sucesso!")

            // Percorrendo a lista de produtos para atualizar o produto editado
            for(let i = 0; i < produtos.length; i++){
              if(produtos[i].id === data.id){ 
                produtos[i] = data
              }
            }

            // Atualizando a lista de produtos
            setProdutos(produtos)

            // Limpando os campos do formulário
            limparCampos()
          }
        })      
    }

    // Função para limpar os campos do formulário
    const limparCampos = () => {
      setObjProduto(produto)
      setBtnCadastrar(true)
    }

    // Função para selecionar um produto
    const selecionarProduto = (index) => {
      setObjProduto(produtos[index])
      setBtnCadastrar(false)
    }


  return (
    <> 
      <Logo/>
      <Formulario btn={btnCadastrar} handleInputChange={handleInputChange}  handleFormSubmit={handleFormSubmit} obj={ObjProduto} cancelar={limparCampos} excluir={handleDelete} editar={handleFormEdit} />
      <Tabela listaProdutos={produtos} selecionarProduto={selecionarProduto} />
    </>
  )
}

export default App
