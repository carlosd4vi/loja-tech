import React, { useState, useEffect } from 'react';
// ✨ Importe os dados estáticos
import { produtosEstaticos } from '../../dados/produtosStatic';

export default function CheckoutModal({ productId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const buscarProdutoModal = () => {
      setLoading(true);

      // ✨ Simula o tempo de resposta da API
      setTimeout(() => {
        // Procura o produto no arquivo local
        const produtoEncontrado = produtosEstaticos.find(
          (p) => p.id.toString() === productId.toString()
        );

        if (produtoEncontrado) {
          setProdutoSelecionado(produtoEncontrado);
        } else {
          setProdutoSelecionado({ 
            nomeProduto: 'Produto não encontrado', 
            Preco: '0.00' 
          });
        }
        
        setLoading(false);
      }, 500); // Meio segundo de loading
    };

    buscarProdutoModal();
  }, [productId]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button 
        onClick={openModal}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-6 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
      >
        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
        Comprar agora
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            onClick={closeModal}
          ></div>
          
          <div className="relative bg-white dark:bg-[#1a202c] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-[#e5e7eb] dark:border-[#2a3441]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f4] dark:border-[#2a3441]">
              <h3 className="text-xl font-bold text-[#111418] dark:text-white">Pagamento via PIX</h3>
              <button onClick={closeModal} className="text-[#617289] hover:text-[#111418] dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-[#f6f7f8] dark:bg-[#212936] rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-[#617289] dark:text-gray-400">
                    {loading ? 'Carregando...' : (produtoSelecionado?.nomeProduto || produtoSelecionado?.nome)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-[#e5e7eb] dark:border-[#2a3441] pt-2 mt-2">
                  <span className="text-base font-bold text-[#111418] dark:text-white">Total</span>
                  <span className="text-xl font-black text-blue-600">
                    R$ {loading ? '...' : (produtoSelecionado?.Preco || produtoSelecionado?.preco || '0.00')}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="p-4 bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
                    {/* Dica: Usei a URL de um QR code genérico real para ficar bonito no portfólio */}
                    <img 
                        alt="QR Code PIX" 
                        className="w-48 h-48 mx-auto" 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                    />
                 </div>
                 <p className="text-sm text-[#617289] dark:text-gray-400">Escaneie o QR Code acima ou copie a chave PIX abaixo para pagar.</p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}