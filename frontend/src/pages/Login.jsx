import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../script/supabase';
import Logo from "../img/logo/lojatech.png"

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        throw error;
      }
      console.log("Login realizado:", data);
      
      navigate('/dashboard');

    } catch (error) {
      console.error("Erro no login:", error.message);
      if (error.message.includes("Invalid login credentials")) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro("Ocorreu um erro ao tentar fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-4 py-8"> 
      <div className="w-full max-w-md">         
        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-10">
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4">
              <Link to="/">
                <img src={Logo} title='Logo' alt="Logo Loja Tech" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Bem-vindo</h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1">Usuário: adm@gt3.com Senha:123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {erro && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400 text-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px]">error</span>
                <p>{erro}</p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark" htmlFor="usuario">Usuário:</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-[20px]">account_box</span>
                <input 
                  className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark h-12 pl-10 pr-4 focus:ring-primary focus:border-primary placeholder:text-text-secondary-light/50 transition-shadow outline-none" 
                  id="usuario" 
                  name="usuario" 
                  placeholder="adm@gt3.com" 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark" htmlFor="senha">Senha:</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-[20px]">lock</span>
                <input 
                  className="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark h-12 pl-10 pr-4 focus:ring-primary focus:border-primary placeholder:text-text-secondary-light/50 transition-shadow outline-none" 
                  id="password" 
                  name="password" 
                  placeholder="123" 
                  required 
                  type="password" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-lg shadow-lg shadow-primary/30 transition-all transform flex items-center justify-center gap-2 
                ${loading ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'}`}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <span className="material-symbols-outlined text-[20px]">login</span>
                </>
              )}
            </button>
          </form>

        </div>
        <p className="mt-8 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest font-medium">
          © 2026 Loja Tech - Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}