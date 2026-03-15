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

// Api para mostrar Produtos

app.get('/api/produtos', async (req, res) => { 
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*');

    if (error) {
      console.error('Erro do Supabase:', error.message);
      return res.status(500).json({ erro: 'Falha ao buscar dados', detalhes: error.message });
    }

    return res.json(data);

  } catch (err) {
    console.error('Erro no servidor:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


// Api para exibir Cada Produto de maneira individual

app.get('/api/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }
      
      console.error('Erro do Supabase:', error.message);
      return res.status(500).json({ erro: 'Falha ao buscar dados', detalhes: error.message });
    }
    return res.json(data);

  } catch (err) {
    console.error('Erro no servidor:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Exemplo de app rodando em http://localhost:${port}`)
})