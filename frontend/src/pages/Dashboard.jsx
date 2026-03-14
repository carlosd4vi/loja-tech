import React, { useState } from 'react';
import { supabase } from '../script/supabase';
import DashboardProdutos from '../script/DashboardProdutos';
import EditarProduto from './form';
import { Link, useNavigate } from 'react-router-dom';


export default function AdminPanel() {
  // Estado para controlar qual tela está visível: 'list' (tabela) ou 'form' (adicionar)
  const [currentView, setCurrentView] = useState('list');
  const [activeTab, setActiveTab] = useState('products');

  // Verificar se existe o Token de acesso do Supabase no localStorage
  // Evitando fazer requisições desnecessárias para o backend se o usuário não estiver logando

  if (localStorage.getItem('sb-tmbvjvaqjvrfklmbnqud-auth-token') === null) {
    window.location.href = '/login';
    return null;
  }

  // 
supabase.auth.getSession().then(({ data: { session } }) => {
  if (!session) {
    // Não tem sessão, manda de volta pro login
    window.location.href = '/login';
  }
})

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    // Pede para o Supabase encerrar a sessão atual
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    // Se deu tudo certo, manda o usuário de volta para a tela de login
    navigate('/login'); 
    
  } catch (error) {
    console.error("Erro ao sair:", error.message);
    alert("Não foi possível encerrar a sessão.");
  }
};

  // Função para navegar para a lista de produtos
  const goToList = () => {
    setCurrentView('list');
    setActiveTab('products');
  };

  // Função para navegar para o formulário de adição
  const goToAdd = () => {
    setCurrentView('list');
    // Mantém a aba produtos ativa, pois é uma sub-ação
  };

  return (
    <div className="flex h-screen w-full font-sans text-slate-800 bg-gray-50 dark:bg-[#111827]">
      
      {/* --- SIDEBAR (Fixa e Compartilhada) --- */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1f2937] border-r border-gray-200 dark:border-gray-700 h-full transition-colors duration-200">
        <div className="p-6 flex flex-col gap-1">
          <Link to='/'>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-600 flex items-center justify-center text-white">
              <img src="src\img\logo\lojatech.png" title='Logo' />

            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-none dark:text-white">Loja Tech</h1>
            </div>
          </div>
          </Link>
          <nav className="flex flex-col gap-1">

            {/* Aba Products (Ativa a Lista) */}
            <button 
              onClick={goToList}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group w-full text-left
              ${activeTab === 'products' 
                ? 'bg-blue-600/10 text-blue-600' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-500 dark:text-gray-400'}`}
            >
              <span className={`material-symbols-outlined ${activeTab === 'products' ? 'fill-1' : ''}`}>inventory_2</span>
              <span className="text-sm font-medium">Painel</span>
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
  <div className="flex items-center justify-between gap-3">
    
    {/* Info do Usuário (Esquerda) */}
    <div className="flex items-center gap-3">
      <img alt="User Avatar" className="h-10 w-10 rounded-full bg-gray-200 object-cover" src="/src/img/logo/adm.jpg"/>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Administrativo</p>
      </div>
    </div>

    {/* Botão de Sair (Direita) */}
    <button 
      onClick={handleLogout}
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex items-center justify-center"
      title="Sair da conta"
    >Sair
      <span className="material-symbols-outlined text-[20px]">logout</span>
    </button>
    
  </div>
</div>
      </aside>

      {/* --- CONTEÚDO PRINCIPAL (Muda dinamicamente) --- */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-gray-50 dark:bg-[#111827]">
        
        {/* VIEW 1: LISTA DE PRODUTOS (Overview) */}
        {currentView === 'list' && (
          <div className="w-full max-w-[1200px] mx-auto p-6 md:p-10 flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/">
              <a className="hover:text-blue-600 transition-colors" href="#">Inicio</a> </Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="font-medium text-gray-900 dark:text-white">Produtos</span>
            </nav>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Lista de Produtos</h1>
                <p className="text-gray-500 dark:text-gray-400">Gerencie seus produtos:</p>
              </div>
              
              {/* BOTÃO QUE LEVA PARA O FORMULÁRIO */}
               <Link to="form/new"><button 
                onClick={goToAdd}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm shadow-sm shadow-blue-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                Adicionar Produto
              </button>
              </Link>
            </div>
            <DashboardProdutos />
          </div>
        )}

        {/* VIEW 2: FORMULÁRIO DE ADIÇÃO (Add Product) */}
        {currentView === 'form' && (
        <EditarProduto />
        )}
      </main>
    </div>
  );
}