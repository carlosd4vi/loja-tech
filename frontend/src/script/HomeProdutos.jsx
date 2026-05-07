import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// ✨ Importe os dados estáticos que você criou
import { produtosEstaticos } from '../dados/produtosStatic'; 

export default function HomeProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✨ Simula o tempo de uma API real (800 milissegundos)
    setTimeout(() => {
      // Ordena os produtos do maior ID (mais novo) para o menor (mais velho)
      // O spread [...] cria uma cópia para não alterar o array original
      const produtosRecentes = [...produtosEstaticos].sort((a, b) => b.id - a.id);
      
      setProdutos(produtosRecentes);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div className="p-10 text-center text-blue-600 font-bold">Carregando produtos...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {produtos.map((produto) => (
        <div 
            key={produto.id}
            className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1a2634] shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] border border-transparent hover:border-primary/20 transition-all duration-300"
        >
          <Link to={`/produto/categoria/celular/${produto.id}`}>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <div 
                className="h-full w-full bg-center bg-cover group-hover:scale-105 transition-transform duration-500" 
                style={{
                    backgroundImage: `url('${produto.Imagem}')`
                }}
            >
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="flex flex-col gap-1 mb-3">
              <div className="flex justify-between items-start">
                <p className="text-lg font-bold text-[#111418] dark:text-white line-clamp-1">
                    {produto.nomeProduto}
                </p>
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded">
                  <span>{produto.avaliacao || '4.9'}</span>
                  <span className="material-symbols-outlined text-[12px] fill-current">star</span>
                </div>
              </div>
              <p className="text-sm text-[#617289] dark:text-[#9ca3af] line-clamp-2">
                  {produto.DescricaoCurta}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xl font-bold text-[#111418] dark:text-white">
                  R${produto.Preco}
              </p>
              <a className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-semibold transition-all">
                Ver Detalhes
              </a>
            </div>
          </div>
          </Link> 
        </div>
      ))}
    </div>
  );
}