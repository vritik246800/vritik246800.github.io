# 📦 INSTRUÇÕES DE INSTALAÇÃO

## 🎯 Estrutura do Projeto

Após extrair os arquivos, organize-os nesta estrutura:

```
people-web-search/
│
├── index.html              # Página principal da aplicação
├── test.html              # Página de teste (opcional)
├── README.md              # Documentação completa
├── QUICK_START.md         # Guia rápido
├── example-history.json   # Dados de exemplo (opcional)
│
├── css/
│   └── style.css          # Estilos da aplicação
│
└── js/
    ├── config.js          # Gerenciador de configurações
    ├── storage.js         # Gerenciador de armazenamento
    ├── search.js          # Motor de busca
    ├── ui.js              # Gerenciador de interface
    └── app.js             # Aplicação principal
```

## ⚡ Instalação Rápida

### Opção 1: Uso Local (Recomendado para início)

1. **Extraia todos os arquivos** para uma pasta (ex: `people-web-search`)

2. **Mantenha a estrutura** de pastas conforme mostrado acima

3. **Abra o arquivo** `index.html` no seu navegador
   - Duplo clique no arquivo, ou
   - Clique com botão direito → Abrir com → Navegador

4. **Pronto!** A aplicação já está funcionando

### Opção 2: Servidor Local (Para desenvolvimento)

Se você tem Python instalado:

```bash
# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000
```

Depois acesse: `http://localhost:8000`

Se você tem Node.js:

```bash
# Instale http-server globalmente
npm install -g http-server

# Execute
http-server -p 8000
```

Depois acesse: `http://localhost:8000`

### Opção 3: Hospedagem Online (Para produção)

**GitHub Pages (Gratuito):**

1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. Acesse via: `https://seuusuario.github.io/repositorio`

**Netlify (Gratuito):**

1. Arraste a pasta para netlify.com/drop
2. Site publicado em segundos
3. URL personalizada disponível

**Vercel (Gratuito):**

1. `npm install -g vercel`
2. `vercel` na pasta do projeto
3. Deploy automático

## 🔧 Configuração Inicial

### 1. Teste Básico (SEM API - 1 minuto)

✅ Abra `index.html`
✅ Digite um nome
✅ Clique "Pesquisar"
✅ Veja links para redes sociais

**Funciona imediatamente!**

### 2. Configuração Completa (COM API - 10 minutos)

#### Passo 1: Google Cloud Console

1. Acesse: https://console.cloud.google.com/
2. Crie novo projeto: "OSINT Search"
3. Ative a billing (não será cobrado até exceder limites grátis)

#### Passo 2: Obter API Key

1. Menu → APIs & Services → Credentials
2. Create Credentials → API Key
3. Copie a chave: `AIzaSy...`

#### Passo 3: Habilitar Custom Search API

1. Menu → APIs & Services → Library
2. Busque: "Custom Search API"
3. Clique "Enable"

#### Passo 4: Criar Search Engine

1. Acesse: https://programmablesearchengine.google.com/
2. Clique "Add"
3. Configurações:
   - What to search: "Search the entire web"
   - Name: "People Search"
4. Create
5. Copie o Search Engine ID: `abc123...`

#### Passo 5: Configurar no App

1. Abra a aplicação
2. Clique "⚙️ Configurações API"
3. Cole API Key e Search Engine ID
4. Salvar

**Pronto! Agora tem acesso completo.**

## 🧪 Testando a Instalação

### Teste 1: Arquivo de Teste

1. Abra `test.html` no navegador
2. Verifique se todos os arquivos foram encontrados (✓ verdes)
3. Clique em "Abrir Aplicação"

### Teste 2: Primeira Pesquisa

1. Digite: "Elon Musk"
2. Clique "Pesquisar"
3. Deve ver:
   - 7+ perfis de redes sociais
   - Links de busca (modo básico)
   - OU resultados reais (com API)

### Teste 3: Histórico

1. Faça 2-3 pesquisas diferentes
2. Veja histórico na barra direita
3. Clique em uma pesquisa anterior
4. Resultados devem reaparecer

### Teste 4: Exportação

1. Após uma pesquisa
2. Clique "📥 Exportar JSON"
3. Arquivo deve baixar
4. Abra o JSON e veja os dados

## ❓ Resolução de Problemas

### "Página não carrega"

**Problema:** Arquivos não organizados corretamente

**Solução:**
```
✓ Verifique estrutura de pastas
✓ Confirme que css/ e js/ existem
✓ Todos os arquivos .js estão em js/
```

### "API não funciona"

**Problema:** Configuração incorreta

**Solução:**
```
✓ Verifique API Key copiada corretamente
✓ Custom Search API está habilitada?
✓ Search Engine ID está correto?
✓ Aguarde alguns minutos após criar
```

### "Histórico não salva"

**Problema:** localStorage bloqueado

**Solução:**
```
✓ Não use modo anônimo
✓ Permita cookies/localStorage
✓ Limpe cache do navegador
```

### "Erros no console"

**Problema:** Caminhos incorretos

**Solução:**
```
✓ Abra F12 → Console
✓ Veja qual arquivo não carregou
✓ Verifique caminho do arquivo
```

## 📊 Verificação Completa

Use esta checklist:

```
□ index.html abre no navegador
□ Estilo (CSS) está aplicado
□ Botão "Pesquisar" funciona
□ Histórico é salvo
□ Exportação funciona
□ (Opcional) API retorna resultados reais
□ Console (F12) sem erros
```

## 🎓 Próximos Passos

Após instalação bem-sucedida:

1. **Leia:** `QUICK_START.md` para uso diário
2. **Explore:** `README.md` para recursos avançados
3. **Customize:** Edite `css/style.css` para mudar cores
4. **Desenvolva:** Adicione novas fontes em `js/search.js`

## 💡 Dicas Importantes

### Organização
```
✓ Mantenha estrutura de pastas
✓ Não renomeie arquivos .js
✓ Backup antes de modificar código
```

### Segurança
```
✓ API keys são privadas
✓ Não compartilhe suas chaves
✓ Não commite .env com keys no GitHub
```

### Performance
```
✓ Use pesquisa profunda com moderação
✓ Exporte histórico periodicamente
✓ Limpe dados antigos
```

## 🆘 Suporte

**Documentação:**
- README.md (completo)
- QUICK_START.md (rápido)

**Debug:**
```javascript
// Console do navegador (F12)
OSINT.stats()  // Ver estatísticas
OSINT.config   // Ver configuração atual
```

**Online:**
- Google Custom Search API Docs
- Stack Overflow
- GitHub Issues

## ✅ Checklist Final

Antes de começar a usar:

```
✅ Arquivos extraídos
✅ Estrutura de pastas correta
✅ index.html abre
✅ CSS carregado (página colorida)
✅ Primeira pesquisa funciona
✅ (Opcional) API configurada
✅ Leu QUICK_START.md
```

---

## 🎉 Tudo Pronto!

Se chegou até aqui, sua instalação está completa.

**Próximo passo:** Abra `index.html` e faça sua primeira pesquisa!

**Dúvidas?** Consulte README.md ou QUICK_START.md

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript puro**
