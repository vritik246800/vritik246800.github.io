# ⚡ Guia Rápido - People Web Search

## 🏃 Início Rápido (2 minutos)

### 1. Abrir no Navegador
```
Abra o arquivo index.html no seu navegador
```

### 2. Primeira Pesquisa
```
1. Digite um nome completo no campo de busca
2. Clique em "Pesquisar"
3. Veja os resultados!
```

**Pronto!** Você já pode usar o app em modo básico.

## 🚀 Configuração Completa (10 minutos)

### Obter API Keys GRATUITAS

#### Google Custom Search API

**1. Criar API Key (3 minutos)**
```
→ Acesse: https://console.cloud.google.com/
→ Novo Projeto > Nome: "OSINT Search"
→ Menu ≡ > APIs & Services > Credentials
→ Create Credentials > API Key
→ Copie a chave: AIza...
```

**2. Habilitar API (1 minuto)**
```
→ Menu ≡ > APIs & Services > Library
→ Busque: "Custom Search API"
→ Clique em "Enable"
```

**3. Criar Search Engine (5 minutos)**
```
→ Acesse: https://programmablesearchengine.google.com/
→ Clique em "Add"
→ What to search: "Search the entire web"
→ Name of search engine: "People Search"
→ Create
→ Copie o Search engine ID: abc123...
```

**4. Configurar no App (1 minuto)**
```
→ Clique em "⚙️ Configurações API"
→ Cole API Key
→ Cole Search Engine ID
→ Salvar Configuração
```

## 📖 Uso Diário

### Pesquisa Simples
```
1. Nome completo
2. Pesquisar
3. Ver resultados
```

### Pesquisa Profunda
```
1. Nome completo
2. ✓ Marcar "Pesquisa Profunda"
3. ✓ Marcar "Incluir Imagens"
4. Pesquisar (pode demorar mais)
```

### Ver Histórico
```
→ Barra lateral direita
→ Clique em qualquer pesquisa anterior
→ Resultados aparecem novamente
```

### Exportar Dados
```
→ Após pesquisar
→ Clique "📥 Exportar JSON"
→ Arquivo baixa automaticamente
```

## 🎯 Dicas de Uso

### ✅ Melhores Práticas

**Nome Completo:**
```
✓ "João Silva Santos"
✓ "Maria da Silva"
✗ "João" (muito genérico)
```

**Para Mais Resultados:**
```
→ Use pesquisa profunda
→ Tente variações do nome
→ Adicione cidade/profissão se souber
```

**Economizar Quota API:**
```
→ Use pesquisa básica primeiro
→ Pesquisa profunda só se necessário
→ Limite: 100 pesquisas/dia (grátis)
```

### 🔍 Interpretando Resultados

**Perfis em Redes Sociais:**
- **Perfil**: Link direto (pode não existir)
- **Pesquisar**: Busca dentro da plataforma

**Resultados da Web:**
- Com API: Páginas reais relacionadas
- Sem API: Links de busca

**Imagens:**
- Apenas com API configurada
- Clique para abrir em tamanho real

## ⚡ Comandos do Console

Abra Console (F12) e experimente:

```javascript
// Ver estatísticas
OSINT.stats()

// Exportar histórico completo
OSINT.export()

// Limpar tudo (cuidado!)
OSINT.clear()

// Acessar configuração
OSINT.config.config

// Ver histórico
OSINT.storage.load().then(console.table)
```

## ❓ Problemas Comuns

### "Nenhum resultado encontrado"
```
✓ Verifique se nome está correto
✓ Tente sem acentos
✓ Configure API keys
✓ Verifique internet
```

### "API Error"
```
✓ Verifique API key
✓ Habilite Custom Search API
✓ Pode ter excedido quota
✓ Aguarde 24h para reset
```

### "Histórico não salva"
```
✓ Não use modo anônimo
✓ Permita localStorage
✓ Limpe cache se muito cheio
```

## 📊 Limites Gratuitos

**Google Custom Search API:**
```
✓ 100 pesquisas/dia
✓ 10.000/mês (com billing*)
✓ Sem custo até o limite

*billing = cadastro cartão, mas não cobra se não exceder
```

**localStorage (navegador):**
```
✓ ~5-10MB de dados
✓ ~100-200 pesquisas
✓ Exporte e limpe periodicamente
```

## 🎓 Próximos Passos

**Nível Iniciante:**
```
→ Faça 10 pesquisas diferentes
→ Explore o histórico
→ Exporte um resultado
```

**Nível Intermediário:**
```
→ Configure Google API
→ Teste pesquisa profunda
→ Use comandos do console
```

**Nível Avançado:**
```
→ Edite search.js para novas fontes
→ Customize CSS
→ Integre com banco de dados
```

## 📞 Onde Buscar Ajuda

**Documentação Completa:**
```
→ Leia README.md
```

**Console do Navegador:**
```
→ F12 > Console
→ Veja erros em vermelho
→ Use OSINT.stats() para debug
```

**Comunidade OSINT:**
```
→ https://osintframework.com/
→ Reddit: r/OSINT
→ GitHub: awesome-osint
```

---

## 🎉 Pronto para Começar!

```
1. Abra index.html
2. Digite um nome
3. Clique Pesquisar
4. Explore os resultados!
```

**É isso! Simples assim. 🚀**
