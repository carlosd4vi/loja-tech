import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import UploadImagemProduto from './componentes/uploadImage';
import { supabase } from '../script/supabase';
import Logo from "../img/logo/lojatech.png"
import adm from "../img/logo/adm.jpg"

export default function EditarProduto() {

  const location = useLocation();
  const { id } = useParams(); // Pega o ID da URL (ex: /editar/123)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  // Controle do Toast (Aviso flutuante)
  const [feedback, setFeedback] = useState(null);
  
  // Aqui pega os dados que vieram do Link
  const produtoQueVeioDaRota = location.state?.produtoAtual;

  // Estado de dados já feitos
  const [formData, setFormData] = useState({
    nomeProduto: produtoQueVeioDaRota?.nomeProduto || '',
    DescricaoCurta: produtoQueVeioDaRota?.DescricaoCurta || '',
    DescricaoLonga: produtoQueVeioDaRota?.DescricaoLonga || '',
    Tela: produtoQueVeioDaRota?.Tela || '',
    Camera: produtoQueVeioDaRota?.Camera || '',
    Processador: produtoQueVeioDaRota?.Processador || '',
    Bateria: produtoQueVeioDaRota?.Bateria || '',
    SistemaOperacional: produtoQueVeioDaRota?.SistemaOperacional || '',
    Conectividade: produtoQueVeioDaRota?.Conectividade || '',
    Preco: produtoQueVeioDaRota?.Preco || '',
    Imagem: produtoQueVeioDaRota?.Imagem || ''
  });

  useEffect(() => {
    if (!produtoQueVeioDaRota) {
      console.log("Fazer fetch do produto com ID:", id);
    }
  }, [id, produtoQueVeioDaRota]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica Campos
    if (!formData.nomeProduto || !formData.Preco) {
      setFeedback({ tipo: 'erro', texto: 'Preencha os campos obrigatórios.' });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    setIsSaveModalOpen(true); // Abre o modal se tem certeza
  };

  const executarSalvar = async () => {
    setIsSaveModalOpen(false); // Fecha o modal primeiro
    
    // Mostra o carregamento
    setFeedback({ tipo: 'loading', texto: 'Salvando produto...' });

    const dadosDoProduto = {
      nomeProduto: formData.nomeProduto,
      DescricaoCurta: formData.DescricaoCurta,
      DescricaoLonga: formData.DescricaoLonga,
      Preco: formData.Preco,
      Imagem: formData.Imagem, 
      Tela: formData.Tela || null,
      Camera: formData.Camera || null,
      Processador: formData.Processador || null,
      Bateria: formData.Bateria || null,
      SistemaOperacional: formData.SistemaOperacional || null,
      Conectividade: formData.Conectividade || null
    };

    try {
      let resposta;
      if (id && id !== 'new') {
        resposta = await supabase.from('produtos').update(dadosDoProduto).eq('id', id);
      } else {
        resposta = await supabase.from('produtos').insert([dadosDoProduto]);
      }

      if (resposta.error) throw resposta.error;

      setFeedback({ tipo: 'sucesso', texto: id !== 'new' ? 'Produto atualizado!' : 'Novo produto criado!' });
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500);

    } catch (error) {
      console.error("Erro ao salvar produto:", error.message);
      setFeedback({ tipo: 'erro', texto: 'Falha ao salvar. Verifique as informações.' });
      setTimeout(() => setFeedback(null), 3000); // Some 3 segundos
    }
  };

const navigate = useNavigate();

const handleLogout = async () => {
  try {
    // Encerrar a sessão atual
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    // Volta para o login
    navigate('/login'); 
    
  } catch (error) {
    console.error("Erro ao sair:", error.message);
    alert("Não foi possível encerrar a sessão.");
  }
};

  return (
    <main className="flex h-screen w-full font-sans text-slate-800 bg-gray-50 dark:bg-[#111827]">
      <aside className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1f2937] border-r border-gray-200 dark:border-gray-700 h-full transition-colors duration-200">
              <div className="p-6 flex flex-col gap-1">
                <Link to='/'>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-600 flex items-center justify-center text-white">
                    <img src={Logo} title='Logo' />
      
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-base font-bold leading-none dark:text-white">Loja Tech</h1>
                  </div>
                </div>
                </Link>
          
          <nav className="flex flex-col gap-1">
            <Link to="/dashboard"><button
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group w-full text-left bg-blue-600/10 text-blue-600`}
            >
              <span className={`material-symbols-outlined fill-1`}>inventory_2</span>
              <span className="text-sm font-medium">Painel</span>
            </button>
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <img title="IEL CE" className="h-10 w-10 rounded-full bg-gray-200 object-cover" src={adm}/>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Administrativo</p>
      </div>
    </div>
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
      <div className="flex-1 h-full overflow-y-auto">
        
        <div className="w-full max-w-[1000px] mx-auto p-6 md:p-10 flex flex-col gap-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/dashboard"> <button className="hover:text-blue-600 transition-colors">Produtos</button> </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-medium text-gray-900 dark:text-white">Formulário</span>
          </nav>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Detalhes do Produto</h1>
            <p className="text-gray-500 dark:text-gray-400">Preencha os detalhes para registrar um item.</p>
          </div>

          <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-10">
            <form className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700" onSubmit={handleSubmit}>
              
              <div className="p-6 md:p-8 flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Informações Gerais</h2>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="product-name">Nome do Produto:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="product-name" placeholder="IPhone 17 Pro Max 1TB" type="text" value={formData.nomeProduto} onChange={(e) => setFormData({...formData, nomeProduto: e.target.value})} required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="desc-curta">Descrição Curta:</label>
                    <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="desc-curta" placeholder="Descrição curta do produto" type="text" value={formData.DescricaoCurta} onChange={(e) => setFormData({...formData, DescricaoCurta: e.target.value})} required/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="price">Preço:</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400">R$</span>
                      </div>
                      <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 pl-8 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="price" placeholder="0.00" type="number" value={formData.Preco} onChange={(e) => setFormData({...formData, Preco: e.target.value})} required/>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="description">Descrição completa:</label>
                  <textarea className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white p-4 focus:ring-2 focus:ring-blue-600 focus:outline-none resize-y min-h-[120px] transition-shadow" id="description" placeholder="Descrição completa do produto" rows="5" value={formData.DescricaoLonga || ''} onChange={(e) => setFormData({...formData, DescricaoLonga: e.target.value})} required></textarea>
                </div>
              </div>
              {formData.Imagem && (
  <div className="p-6 md:p-8 flex flex-col gap-6 w-full">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
      Imagem Atual do Produto:
    </h2>
    <div className="flex justify-center w-full">
      <img 
        src={formData.Imagem}
        alt="Preview do produto"
        className="w-64 h-64 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700" 
      />
    </div>
  </div>
)}

<UploadImagemProduto 
  onUploadSuccess={(urlDaImagem) => {
    setFormData(prev => ({ ...prev, Imagem: urlDaImagem })); 
  }} 
/>

              <div className="p-6 md:p-8 flex flex-col gap-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Especificações (Opcional):</h2>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="tela">Tela:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="tela" placeholder="6.7 polegadas" type="text" value={formData.Tela || ''} onChange={(e) => setFormData({...formData, Tela: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="camera">Camera:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="camera" placeholder="48Mp" type="text" value={formData.Camera || ''} onChange={(e) => setFormData({...formData, Camera: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="proc">Processador:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="proc" placeholder="Exynos 2400" type="text" value={formData.Processador || ''} onChange={(e) => setFormData({...formData, Processador: e.target.value})}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="bat">Bateria:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="bat" placeholder="5000mAh" type="text" value={formData.Bateria || ''} onChange={(e) => setFormData({...formData, Bateria: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="so">Sistema Operacional:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="so" placeholder="Android" type="text" value={formData.SistemaOperacional || ''} onChange={(e) => setFormData({...formData, SistemaOperacional: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white" htmlFor="con">Conexão:</label>
                  <input className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111827] text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-shadow" id="con" placeholder="5G" type="text" value={formData.Conectividade || ''} onChange={(e) => setFormData({...formData, Conectividade: e.target.value})} />
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gray-50/30 dark:bg-[#111827]/30 flex items-center justify-end gap-4">
                <Link to="/dashboard"><button 
                  className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-[#1f2937] hover:bg-gray-50 dark:hover:bg-[#374151] font-medium text-sm transition-colors" 
                  type="button"
                >
                  Cancel
                </button>
                </Link>
                <button 
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm shadow-sm shadow-blue-600/30 transition-all transform active:scale-95 flex items-center gap-2" 
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsSaveModalOpen(false)}
          ></div>

          <div className="relative bg-white dark:bg-[#1a202c] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#2a3441] flex flex-col animate-fade-in">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined text-[24px]">save</span>
              </div>
              <h3 className="text-xl font-bold text-[#111418] dark:text-white mb-2">Salvar Produto</h3>
              <p className="text-[#617289] dark:text-gray-400 text-sm">
                Tem certeza que deseja salvar?
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-[#212936] flex justify-end gap-3 border-t border-[#e5e7eb] dark:border-[#2a3441]">
              <button 
                onClick={() => setIsSaveModalOpen(false)}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-[#1a202c] dark:text-gray-300 dark:border-[#2a3441] dark:hover:bg-[#2a3441] transition-colors"
                type="button"
              >
                Revisar
              </button>
              <button 
                onClick={executarSalvar}
                className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      {feedback && (
        <div 
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 text-white z-[200] animate-fade-in transition-all transform ${
            feedback.tipo === 'sucesso' ? 'bg-green-600' : 
            feedback.tipo === 'erro' ? 'bg-red-600' : 
            'bg-blue-600'
          }`}
        >
          <span className={`material-symbols-outlined text-[24px] ${feedback.tipo === 'loading' ? 'animate-spin' : ''}`}>
            {feedback.tipo === 'sucesso' ? 'check_circle' : 
             feedback.tipo === 'erro' ? 'error' : 
             'progress_activity'}
          </span>
          <p className="font-medium">{feedback.texto}</p>
        </div>
      )}
    </main>
  );
}