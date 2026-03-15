import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../script/supabase'; // Importe o arquivo que criamos acima
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
      // --- A MÁGICA DO SUPABASE ACONTECE AQUI ---
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha,
      });

      if (error) {
        throw error; // Se o Supabase der erro, joga para o catch
      }

      // Sucesso!
      console.log("Login realizado:", data);
      
      // O Supabase gerencia o token sozinho, mas se quiser salvar algo extra:
      // localStorage.setItem('token', data.session.access_token);

      navigate('/dashboard'); // Redireciona para a Home

    } catch (error) {
      console.error("Erro no login:", error.message);
      // Traduzindo mensagens comuns do Supabase (opcional)
      if (error.message.includes("Invalid login credentials")) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro(error.message);
      }
    } finally {
      setLoading(false);
    }
  };


    return (
        <div class="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center px-4 py-8"> 
        <div class="w-full max-w-md">          
<div class="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark overflow-hidden p-8 md:p-10">
<div class="flex flex-col items-center mb-8">
<div class="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4">
 <Link to="/">
<img src={Logo} title='Logo' />
</Link>
</div>
<h1 class="text-2xl font-bold text-text-main-light dark:text-text-main-dark">Bem-vindo</h1>
<p class="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-1">Usuário: adm@gt3.com Senha:123</p>
</div>
<form onSubmit={handleSubmit} class="space-y-6">
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold text-text-main-light dark:text-text-main-dark" for="usuario">Usuário:</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-[20px]">account_box</span>
<input class="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark h-12 pl-10 pr-4 focus:ring-primary focus:border-primary placeholder:text-text-secondary-light/50 transition-shadow outline-none" id="usuario" name="usuario" placeholder="adm@gt3.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
</div>
</div>
<div class="flex flex-col gap-2">
<label class="text-sm font-semibold text-text-main-light dark:text-text-main-dark" for="senha">Senha:</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light/60 dark:text-text-secondary-dark/60 text-[20px]">lock</span>
<input class="form-input w-full rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark h-12 pl-10 pr-4 focus:ring-primary focus:border-primary placeholder:text-text-secondary-light/50 transition-shadow outline-none" id="password" name="password" placeholder="123" required type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
</div>
</div>
<button class="w-full bg-primary hover:bg-blue-600 text-white font-bold h-12 rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                    Entrar
                    <span class="material-symbols-outlined text-[20px]">login</span>
</button>
</form>
</div>
<p class="mt-8 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-widest font-medium">
            © 2026 Loja Tech - Todos os direitos reservados.
        </p>
</div>
</div>
     );
}