import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import CheckoutModal from './componentes/pagamento';
import FavoriteButton from './componentes/favorite';
import Logo from "../img/logo/lojatech.png"

const ViewProduto = () => {
    const { id } = useParams();
    
    // Estados para guardar as informações da API e o status de carregamento
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                // 1. Inicia o carregamento
                setLoading(true);
                
                // 2. Faz a chamada real para a sua API usando o ID da URL
                const response = await fetch(`https://loja-tech-44ns.onrender.com/api/produtos/${id}`);
                
                // 3. Verifica se a API respondeu com sucesso
                if (!response.ok) {
                    throw new Error('Produto não encontrado na API');
                }

                // 4. Converte a resposta para JSON e salva na variável "produto"
                const data = await response.json();
                setProduto(data);

            } catch (error) {
                console.error("Erro ao buscar produto da API:", error);
                setProduto(null);
            } finally {
                // 5. Finaliza o status de carregamento, dando erro ou sucesso
                setLoading(false);
            }
        };

        // Só faz a busca se o ID existir na URL
        if (id) {
            buscarProduto();
        }
    }, [id]);

    // Telinha de carregamento enquanto a API busca os dados
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:text-white dark:bg-[#1a202c]">
                <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                    <p>Carregando produto...</p>
                </div>
            </div>
        );
    }

    // Telinha de erro caso a API não encontre o ID
    if (!produto) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:text-white dark:bg-[#1a202c]">
                <div className="flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-4xl text-red-500">error</span>
                    <p>Produto não encontrado.</p>
                    <Link to="/" className="text-primary hover:underline mt-4">Voltar para a loja</Link>
                </div>
            </div>
        );
    }

    // Tela principal com os dados do produto!
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <Link to="/">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] dark:border-b-[#2a3441] bg-white dark:bg-[#1a202c] px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-[#111418] dark:text-white">
                        <div className="size-8 text-primary flex items-center justify-center">
                        <img src={Logo} />
                        </div>
                        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Loja Tech</h2>
                    </div>
                </div>
            </header>
            </Link>
            <div className="layout-container flex h-full grow flex-col dark:bg-[#111827]">
                <div className="px-6 md:px-20 lg:px-40 flex flex-1 justify-center py-8">
                    <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                        
                        <nav className="flex flex-wrap gap-2 pb-6 text-sm">
                            <Link to="/" className="text-[#617289] font-medium hover:text-primary transition-colors">Inicio</Link>
                            <span className="text-[#617289] font-medium">/</span>
                            <span className="text-[#111418] dark:text-white font-medium">{produto.nomeProduto || 'Nome não encontrado'}</span>
                        </nav>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12">
                            <div className="lg:col-span-7 flex flex-col gap-4">
                                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-[#1a202c] border border-[#e5e7eb] dark:border-[#2a3441] shadow-sm group cursor-pointer">
                                    <img 
                                        className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" 
                                        src={produto.Imagem || ''} 
                                        alt="Produto"
                                    />
                                </div>
                            </div>
                            
                            <div className="lg:col-span-5 flex flex-col h-full">
                                <div className="border-b border-[#f0f2f4] dark:border-[#2a3441] pb-6 mb-6">
                                    <h1 className="text-[#111418] dark:text-white tracking-tight text-3xl lg:text-4xl font-bold leading-tight mb-2">
                                        {produto.nomeProduto || 'Nome não encontrado'}
                                    </h1>
                                    
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-0.5 text-amber-400">
                                            <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                                            <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                                            <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                                            <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                                            <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                                        </div>
                                        <a className="text-primary text-sm font-medium hover:underline" href="#reviews">
                                            ({produto.avaliacoes?.length || 0} avaliações)
                                        </a>
                                    </div>
                                    
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-[#111418] dark:text-white text-3xl font-bold">R$ {produto.Preco || 'Preço não encontrado'}</span>
                                    </div>
                                    
                                    <p className="text-[#617289] dark:text-gray-300 text-base leading-relaxed">
                                        {produto.DescricaoCurta || 'Descrição não encontrado'}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col gap-6 mb-8">
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <CheckoutModal productId={id}/>
                                        <FavoriteButton />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f7f8] dark:bg-[#212936]">
                                        <span className="material-symbols-outlined text-primary">local_shipping</span>
                                        <div className="text-sm">
                                            <p className="font-bold text-[#111418] dark:text-white">Frete Grátis</p>
                                            <p className="text-[#617289] text-xs">Acima de R$120.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="md:col-span-2 space-y-6 text-[#111418] dark:text-gray-200">
                                    <h3 className="text-lg font-bold mb-4 text-[#111418] dark:text-white border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">Descrição</h3>
                                    <p className="leading-relaxed text-[#617289] dark:text-gray-300 whitespace-pre-line">
                                        {produto.DescricaoLonga || "Descrição não encontrada"}
                                    </p>
                                </div>
                                
                                <div className="md:col-span-1 bg-[#f6f7f8] dark:bg-[#1a202c] rounded-xl p-6 h-fit border border-[#e5e7eb] dark:border-[#2a3441]">
                                    <h3 className="text-lg font-bold mb-4 text-[#111418] dark:text-white">Especificações</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">
                                            <span className="text-sm text-[#617289]">Tela</span>
                                            <span className="text-sm font-medium text-[#111418] dark:text-white">{produto.Tela || '-'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">
                                            <span className="text-sm text-[#617289]">Câmera</span>
                                            <span className="text-sm font-medium text-[#111418] dark:text-white">{produto.Camera || '-'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">
                                            <span className="text-sm text-[#617289]">Processador</span>
                                            <span className="text-sm font-medium text-[#111418] dark:text-white">{produto.Processador || '-'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">
                                            <span className="text-sm text-[#617289]">Bateria</span>
                                            <span className="text-sm font-medium text-[#111418] dark:text-white">{produto.Bateria || '-'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">
                                            <span className="text-sm text-[#617289]">SO</span>
                                            <span className="text-sm font-medium text-[#111418] dark:text-white">{produto.SistemaOperacional || '-'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#e5e7eb] dark:border-[#2a3441] pb-2">
                                            <span className="text-sm text-[#617289]">Conexão</span>
                                            <span className="text-sm font-medium text-[#111418] dark:text-white">{produto.Conectividade || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avaliações Dinâmicas usando MAP */}
                        <div className="border-t border-[#f0f2f4] dark:border-[#2a3441] py-12" id="reviews">
                            <h3 className="text-2xl font-bold text-[#111418] dark:text-white mb-8">Avaliações</h3>
                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="lg:w-2/3 flex flex-col gap-6">
                                    
                                    {produto.avaliacoes && produto.avaliacoes.length > 0 ? (
                                        produto.avaliacoes.map((avaliacao, index) => (
                                            <div key={index} className="border-b border-[#f0f2f4] dark:border-[#2a3441] pb-6 last:border-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                            {avaliacao.sigla || (avaliacao.nome ? avaliacao.nome.charAt(0) : '-')}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#111418] dark:text-white text-sm">{avaliacao.nome}</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-[#617289]">Compra Verificada</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-[#617289]">{avaliacao.tempo || 'Recente'}</span>
                                                </div>
                                                <h4 className="font-bold text-[#111418] dark:text-white mb-2">{avaliacao.titulo}</h4>
                                                <p className="text-[#617289] dark:text-gray-300 text-sm leading-relaxed">
                                                    {avaliacao.comentario}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[#617289] dark:text-gray-400">Este produto ainda não possui avaliações.</p>
                                    )}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <footer className="bg-white dark:bg-[#1a202c] border-t border-[#f0f2f4] dark:border-[#2a3441] py-10 px-6 md:px-20 lg:px-40">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-[#111418] dark:text-white">
                        <img src={Logo} width="35px" />
                        <h2 className="text-[#111418] dark:text-white text-lg font-bold">Loja Tech</h2>
                    </div>
                    <p className="text-[#617289] text-sm">© 2026 Loja Tech LTDA. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default ViewProduto;