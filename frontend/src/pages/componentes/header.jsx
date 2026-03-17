import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../img/logo/banner.webp';
import Logo from "../../img/logo/lojatech.png"

const Header = () => {

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  // Busca informações de Pesquisa na API.

  useEffect(() => {
    const buscarProdutosParaPesquisa = async () => {
      try {
        const response = await fetch('https://loja-tech-44ns.onrender.com/api/produtos');
        if (response.ok) {
          const data = await response.json();
          setProdutos(data);
        }
      } catch (error) {
        console.error("Erro ao carregar pesquisa:", error);
      }
    };
    buscarProdutosParaPesquisa();
  }, []);
  
  const lidarComPesquisa = (e) => {
    const texto = e.target.value;
    setTermoPesquisa(texto);

    if (texto.trim() === '') {
      setResultados([]);
      setMostrarDropdown(false);
      return;
    }

    const produtosFiltrados = produtos.filter((produto) => {
      const nome = produto.nomeProduto || produto.nome || '';
      return nome.toLowerCase().includes(texto.toLowerCase());
    });

    setResultados(produtosFiltrados);
    setMostrarDropdown(true);
  };

  const fecharPesquisa = () => {
    setTermoPesquisa('');
    setMostrarDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1a2634] border-b border-solid border-[#f0f2f4] dark:border-[#2a3b4d]">
      <div className="px-4 md:px-10 py-3 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="size-8 text-primary flex items-center justify-center">
                <img src={Logo} alt="Logo" />
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block dark:text-white">Loja Tech</h2>
            </div>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4 md:gap-8">
            <label className="hidden md:flex flex-col w-full max-w-[320px] h-10 relative">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full relative group z-40">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#617289] dark:text-[#9ca3af]">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input 
                  className="block w-full rounded-lg border-0 bg-[#f0f2f4] dark:bg-[#2a3b4d] py-1.5 pl-10 pr-3 text-sm placeholder:text-[#617289] dark:text-white dark:placeholder:text-[#9ca3af] focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-[#1a2634] transition-all" 
                  placeholder="Busque no Loja Tech" 
                  type="text"
                  value={termoPesquisa}
                  onChange={lidarComPesquisa}
                />
              </div>
              { /* Pesquisa de Produtos */}
              {mostrarDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a202c] border border-gray-200 dark:border-[#2a3441] rounded-xl shadow-xl z-[100] overflow-hidden flex flex-col max-h-[400px]">
                  {resultados.length > 0 ? (
                    <div className="overflow-y-auto flex flex-col py-2">
                      {resultados.map((produto) => (
                        // Caso Encontre o Produto
                        <Link 
                          key={produto.id} 
                          to={`/produto/categoria/celular/${produto.id}`} 
                          onClick={fecharPesquisa}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2a3441] transition-colors border-b border-gray-100 dark:border-[#2a3441] last:border-0"
                        >
                          <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                            {produto.Imagem || produto.imagem ? (
                              <img src={produto.Imagem || produto.imagem} alt="miniatura" className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-gray-400 m-2">image</span>
                            )}
                          </div>
                          
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              {produto.nomeProduto || produto.nome}
                            </span>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              R$ {produto.Preco || produto.preco}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    // Caso não encontre nada
                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      Nenhum produto encontrado.
                    </div>
                  )}
                </div>
              )}
            </label>
            { /* Link que redireciona para o Dashboard */}
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center justify-center rounded-lg h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
                <span className="truncate">Entrar</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

// Card Inicial do Produto de "Lançamento"

const Section = () => {
    return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-12">
<section className="@container my-8">
<div className="flex flex-col gap-6 lg:flex-row lg:items-center overflow-hidden rounded-xl bg-white dark:bg-[#1a2634] shadow-sm border border-[#e5e7eb] dark:border-[#2a3b4d]">
<div className="w-full lg:w-1/2 aspect-video lg:aspect-auto lg:h-[560px] bg-center bg-cover" data-alt="Modern summer fashion collection banner" style={{ backgroundImage: `url(${Banner})` }}>
</div>
<div className="flex flex-col justify-center gap-6 p-6 lg:p-12 lg:w-1/2">
<div className="flex flex-col gap-3 text-left">
<span className="text-primary font-bold tracking-wider uppercase text-xs">Lançamento</span>
<h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl dark:text-white">
                            Fone De Ouvido Sem Fio Baseus Bowie E20 Bluetooth 5.3
                        </h1>
<p className="text-[#617289] dark:text-[#9ca3af] text-lg leading-relaxed max-w-md">
                            Mais um Lançamento incrível da Baseus, o Fone De Ouvido Sem Fio Baseus Bowie E20 Bluetooth 5.3 Preto
                        </p>
</div>
{ /* Link que irá redirecionar para o Produto */}
<div className="flex flex-wrap gap-4">
<Link to="produto/categoria/celular/6">  
<button className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-md hover:bg-blue-600 transition-colors">
                            Comprar Agora
                        </button>
                        </Link>
</div>
</div>
</div>
</section>
<div className="flex items-center justify-between py-6">
<h2 className="text-2xl font-bold leading-tight tracking-tight dark:text-white">Explore e Aproveite</h2>
  <div className="relative inline-block">
    <select 
      className="appearance-none bg-white dark:bg-[#1a2634] border border-[#e5e7eb] dark:border-[#2a3b4d] text-[#111418] dark:text-white rounded-lg h-10 pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a3441] transition-colors shadow-sm"
      defaultValue=""
    >
      { /* Categorias de Produtos (Filtros) Apenas Visual */}
      <option value="" disabled>Ordenar por</option>
      <option value="celular">Celulares</option>
      <option value="monitor">Monitores</option>
      <option value="fone">Fones de Ouvido</option>
      <option value="outros">Outros</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 dark:text-gray-400">
      <span className="material-symbols-outlined text-[20px]">expand_more</span>
    </div>
  </div>
</div>
</main>
 );
}
 
export { Header, Section };