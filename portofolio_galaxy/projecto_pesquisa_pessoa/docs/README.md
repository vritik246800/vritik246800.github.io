# 🔍 People Web Search - OSINT Tool

Ferramenta OSINT (Open Source Intelligence) para pesquisa de informações públicas sobre pessoas na web.

## 📋 Características

- ✅ **Pesquisa Multi-Plataforma**: Instagram, Facebook, TikTok, X (Twitter), LinkedIn, YouTube, GitHub
- ✅ **Integração com APIs**: Google Custom Search API (opcional)
- ✅ **Histórico Completo**: Salva todas as pesquisas realizadas
- ✅ **Exportação de Dados**: Exporta resultados em JSON
- ✅ **Interface Moderna**: Design responsivo e intuitivo
- ✅ **Modo Offline**: Funciona sem API keys (modo básico)
- ✅ **Preparado para DB**: Arquitetura pronta para migração para banco de dados

## 🚀 Como Usar

### Instalação Básica

1. Baixe todos os arquivos do projeto
2. Organize a estrutura de pastas:

```
people-web-search/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── config.js
    ├── storage.js
    ├── search.js
    ├── ui.js
    └── app.js
```

3. Abra `index.html` no navegador

### Modo Básico (Sem API)

O app funciona imediatamente sem configuração, fornecendo:
- Links diretos para perfis em redes sociais
- Links de pesquisa em várias plataformas
- Histórico de pesquisas
- Exportação de dados

### Modo Avançado (Com API - Recomendado)

Para resultados mais completos, configure as APIs gratuitas:

#### 1. Google Custom Search API (Gratuito)

**Passo 1: Obter API Key**
1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto (ou selecione existente)
3. Vá em "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "API Key"
5. Copie a chave gerada

**Passo 2: Criar Search Engine**
1. Acesse: https://programmablesearchengine.google.com/
2. Clique em "Add" (Adicionar)
3. Configure:
   - **Sites to search**: Escolha "Search the entire web"
   - **Name**: "People Search"
4. Clique em "Create"
5. Copie o "Search engine ID"

**Passo 3: Configurar no App**
1. Clique no botão "⚙️ Configurações API"
2. Cole a API Key e Search Engine ID
3. Clique em "Salvar Configuração"

**Limites Gratuitos:**
- 100 pesquisas/dia
- 10.000 pesquisas/mês (com billing habilitado)

## 📖 Funcionalidades Detalhadas

### Pesquisa Básica

1. Digite o nome completo da pessoa
2. Clique em "Pesquisar"
3. Veja os resultados organizados em:
   - **Perfis em Redes Sociais**: Links diretos e busca
   - **Resultados da Web**: Páginas relacionadas (com API)
   - **Imagens**: Fotos relacionadas (com API)
   - **Fontes**: Todos os links encontrados

### Pesquisa Profunda

Marque "Pesquisa Profunda" para:
- Múltiplas consultas com variações
- Mais resultados (pode ser mais lento)
- Busca em diferentes contextos

### Histórico

- **Visualizar**: Todas as pesquisas ficam salvas
- **Recarregar**: Clique em qualquer item do histórico
- **Limpar**: Botão de lixeira no topo do histórico
- **Persistente**: Dados salvos no navegador

### Exportar Dados

**Exportar Resultado Atual:**
1. Faça uma pesquisa
2. Clique em "📥 Exportar JSON"
3. Arquivo será baixado

**Exportar Todo Histórico:**
Use o console do navegador:
```javascript
OSINT.export()
```

## 🛠️ Recursos Avançados

### Console de Debug

Abra o console do navegador (F12) e digite `OSINT` para ver comandos:

```javascript
// Ver estatísticas
OSINT.stats()

// Exportar histórico
OSINT.export()

// Limpar tudo
OSINT.clear()

// Acessar módulos
OSINT.storage  // Gerenciador de armazenamento
OSINT.config   // Configurações
OSINT.ui       // Interface
```

### Estrutura de Dados

Cada pesquisa é salva com esta estrutura:

```json
{
  "id": "1234567890-abc123",
  "name": "Nome da Pessoa",
  "timestamp": "2026-02-06T12:00:00.000Z",
  "profiles": [
    {
      "platform": "Instagram",
      "url": "https://instagram.com/...",
      "searchUrl": "https://instagram.com/explore/...",
      "icon": "fab fa-instagram"
    }
  ],
  "webResults": [
    {
      "title": "Título da página",
      "link": "https://...",
      "snippet": "Descrição..."
    }
  ],
  "images": [
    {
      "url": "https://...",
      "thumbnail": "https://...",
      "title": "..."
    }
  ],
  "sources": ["https://...", "https://..."]
}
```

## 🔄 Migração para Banco de Dados

O código está preparado para migração. Exemplo com MongoDB:

```javascript
// Em storage.js, descomente e adapte:

async loadFromDB() {
  const response = await fetch('/api/searches');
  return await response.json();
}

async saveToDB(data) {
  await fetch('/api/searches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
```

Backend Node.js exemplo:

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  name: String,
  timestamp: Date,
  profiles: Array,
  webResults: Array,
  images: Array,
  sources: Array
});

const Search = mongoose.model('Search', searchSchema);

app.get('/api/searches', async (req, res) => {
  const searches = await Search.find().sort({ timestamp: -1 });
  res.json(searches);
});

app.post('/api/searches', async (req, res) => {
  const search = new Search(req.body);
  await search.save();
  res.json(search);
});
```

## 🎨 Personalização

### Cores e Tema

Edite `css/style.css` na seção `:root`:

```css
:root {
  --bg-primary: #0a0e1a;        /* Fundo principal */
  --accent-primary: #6366f1;    /* Cor de destaque */
  --text-primary: #e5e7eb;      /* Texto principal */
}
```

### Adicionar Novas Plataformas

Em `js/search.js`, método `generateSocialProfiles()`:

```javascript
{
  platform: 'Nova Plataforma',
  url: `https://exemplo.com/${slug}`,
  searchUrl: `https://exemplo.com/search?q=${encoded}`,
  icon: 'fab fa-icon',
  color: '#HEXCOLOR'
}
```

## ⚠️ Considerações Éticas

Esta ferramenta é para fins educacionais e de pesquisa ética:

- ✅ Use apenas para informações públicas
- ✅ Respeite privacidade e leis locais
- ✅ Não use para assédio ou stalking
- ✅ Siga termos de serviço das plataformas
- ❌ Não faça scraping agressivo
- ❌ Não venda ou distribua dados pessoais

## 🐛 Troubleshooting

### API não funciona

**Erro "API key not valid":**
- Verifique se a API está ativada no Google Cloud Console
- Confirme que copiou a chave correta

**Erro "403 Forbidden":**
- Verifique se Custom Search API está habilitada
- Pode estar excedendo cota gratuita

**Sem resultados:**
- Tente pesquisa sem API (modo básico)
- Verifique conexão com internet

### Histórico não salva

**Limpar cache do navegador:**
- Pode ter atingido limite de localStorage
- Exporte histórico antes de limpar

**Modo privado:**
- localStorage não persiste em modo anônimo

## 📊 Estatísticas

Ver estatísticas do uso:

```javascript
// No console
OSINT.stats()

// Retorna:
// - Total de pesquisas
// - Última pesquisa
// - Pessoas mais pesquisadas
// - Total de perfis encontrados
```

## 🔐 Privacidade

- Todos os dados ficam **localmente** no navegador
- Nenhuma informação é enviada para servidores externos
- API keys ficam apenas no seu navegador
- Você controla totalmente seus dados

## 📝 Licença

Projeto educacional para fins de aprendizado em OSINT e desenvolvimento web.

## 🤝 Contribuições

Melhorias sugeridas:

- [ ] Integração com mais APIs (PeopleDataLabs, Hunter.io)
- [ ] Scraping ético de redes sociais
- [ ] Análise de sentimento em resultados
- [ ] Geração de relatórios PDF
- [ ] Modo escuro/claro
- [ ] Suporte multi-idioma
- [ ] PWA (Progressive Web App)

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique este README
2. Teste com API keys válidas
3. Abra console do navegador (F12) para ver erros
4. Use `OSINT` no console para debug

## 🎓 Recursos de Aprendizado

**OSINT:**
- https://osintframework.com/
- https://www.bellingcat.com/

**APIs Gratuitas:**
- Google Custom Search: https://developers.google.com/custom-search
- DuckDuckGo Instant Answer: https://duckduckgo.com/api

**Web Development:**
- MDN Web Docs: https://developer.mozilla.org/
- JavaScript.info: https://javascript.info/

---

**⚡ Desenvolvido com HTML, CSS e JavaScript puro - sem frameworks!**
