const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const express = require('express');
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());

app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/login', async (req, res) => {
  const { email, password } = req.query;

  // Verifica se o Email e Senha foram fornecidos

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Erro de autenticação:', error.message);
    return res.status(401).json({ erro: 'Falha na autenticação', detalhes: error.message });
  }
  res.json(data);
});


app.get('/api/produtos', async (req, res) => { // 1. Adicione 'async' aqui
  try {
    // 2. O código espera (await) o Supabase responder
    const { data, error } = await supabase
      .from('produtos')
      .select('*');

    // 3. Verificação de erro
    if (error) {
      console.error('Erro do Supabase:', error.message);
      // Retorna erro 500 (Internal Server Error) para o frontend não ficar travado
      return res.status(500).json({ erro: 'Falha ao buscar dados', detalhes: error.message });
    }

    // 4. Sucesso
    return res.json(data);

  } catch (err) {
    // Captura erros de rede ou bugs no código
    console.error('Erro no servidor:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// Rota para buscar UM ÚNICO produto pelo ID
app.get('/api/produtos/:id', async (req, res) => {
  try {
    // 1. Pega o ID que veio na URL (ex: /api/produtos/5)
    const { id } = req.params;

    // 2. Pede pro Supabase buscar apenas o produto com esse ID
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)     // Filtra onde a coluna 'id' seja igual ao id da URL
      .single();        // O .single() avisa que queremos só 1 objeto, e não uma lista (Array)

    // 3. Verificação de erro
    if (error) {
      // Se o erro for "Não encontrou nenhuma linha" (código PGRST116 do Supabase)
      if (error.code === 'PGRST116') {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }
      
      console.error('Erro do Supabase:', error.message);
      return res.status(500).json({ erro: 'Falha ao buscar dados', detalhes: error.message });
    }

    // 4. Sucesso! Retorna os dados do produto
    return res.json(data);

  } catch (err) {
    console.error('Erro no servidor:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Exemplo de app rodando em http://localhost:${port}`)
})