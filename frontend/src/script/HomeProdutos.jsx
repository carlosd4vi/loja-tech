import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function HomeProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch('https://loja-tech-44ns.onrender.com/api/produtos');
        
        if (!response.ok) {
          throw new Error('Falha ao conectar com o servidor');
        }

        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro no fetch:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  if (loading) return <div className="p-10 text-center text-blue-600 font-bold">Carregando produtos...</div>;
  if (erro) return <div className="p-10 text-center text-red-500">Erro: {erro}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {[...produtos].reverse().map((produto) => (
        <div 
            key={produto.id || produto._id}
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