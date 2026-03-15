import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Link } from "react-router-dom";

export default function DashboardProdutos() {
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

const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

const confirmarExclusao = (id) => {
  setProdutoParaExcluir(id);
  setIsDeleteModalOpen(true);
};

const executarExclusao = async () => {
  if (!produtoParaExcluir) return;

  try {
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', produtoParaExcluir);

    if (error) throw error;

    setIsDeleteModalOpen(false);
    setProdutoParaExcluir(null);

  } catch (error) {
    console.error("Erro ao excluir produto:", error.message);
    alert("Falha ao excluir. Verifique o console.");
  }
};

const cancelarExclusao = () => {
  setIsDeleteModalOpen(false);
  setProdutoParaExcluir(null);
};
  if (loading) return <div className="p-10 text-center text-blue-600 font-bold">Carregando produtos...</div>;
  if (erro) return <div className="p-10 text-center text-red-500">Erro: {erro}</div>;

  return (
    <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-[#374151]/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 uppercase font-medium">
                    <tr>
                      <th className="px-6 py-4"></th>
                      <th className="px-6 py-4">Descrição</th>
                      <th className="px-6 py-4">Preço</th>
                      <th className="px-6 py-4">Editar</th>
                      <th className="px-6 py-4 text-right">Excluir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {[...produtos].reverse().map((produto) => (
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#374151]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                            <img src={produto.Imagem} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-white">{produto.nomeProduto}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">ID: {produto.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white max-w-[200px] truncate">{produto.DescricaoCurta}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{produto.Preco}</td>
                      <td className="px-6 py-4 text-right">
  <Link 
    to={`form/${produto.id}`} 
    state={{ produtoAtual: produto }} 
    className="text-gray-500 hover:text-blue-600 transition-colors p-1 inline-block"
  >
    <span className="material-symbols-outlined text-[20px]">edit</span>
  </Link>
</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-500 hover:text-blue-600 transition-colors p-1" onClick={() => confirmarExclusao(produto.id)}>
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
      ))}
      </tbody>
      </table>
{isDeleteModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={cancelarExclusao}
    ></div>

    <div className="relative bg-white dark:bg-[#1a202c] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#2a3441] flex flex-col animate-fade-in">
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
          <span className="material-symbols-outlined text-[24px]">warning</span>
        </div>
        <h3 className="text-xl font-bold text-[#111418] dark:text-white mb-2">Excluir Produto</h3>
        <p className="text-[#617289] dark:text-gray-400 text-sm">
          Tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita e o produto será removido permanentemente da sua loja.
        </p>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-[#212936] flex justify-end gap-3 border-t border-[#e5e7eb] dark:border-[#2a3441]">
        <button 
          onClick={cancelarExclusao}
          className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-[#1a202c] dark:text-gray-300 dark:border-[#2a3441] dark:hover:bg-[#2a3441] transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={executarExclusao}
          className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
          Excluir Produto
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}