# 🔍 People Web Search (OSINT Light)

Projeto web que permite **pesquisar informações públicas sobre pessoas na internet**, a partir do **nome completo**, retornando **links, imagens e fontes públicas**, além de **guardar histórico em JSON**, com arquitetura preparada para futura migração para base de dados.

> ⚠️ **Nota legal:** este projeto utiliza **apenas informações públicas** disponíveis na web. Não coleta dados privados, autenticados ou protegidos por login.

---

## 🎯 Objetivo
Criar um **motor de pesquisa de pessoas** usando **HTML, CSS e JavaScript**, com foco em:
- OSINT (Open-Source Intelligence)
- Boas práticas de arquitetura
- Facilidade de evolução (JSON → Database)

---

## 🧠 Como funciona
1. O utilizador insere o **nome completo**
2. O sistema pesquisa informações públicas usando **APIs gratuitas**
3. São retornados:
   - Links de perfis públicos (Instagram, Facebook, TikTok, X)
   - Resultados do Google
   - Imagens associadas
   - Fontes encontradas
4. A pesquisa é **armazenada no histórico (JSON)**

---

## 🌐 Fontes de Pesquisa
As redes sociais **não são acessadas diretamente**. A busca é feita através de **motores de pesquisa públicos**, garantindo conformidade legal.

Exemplos de consultas:
```
"Nome Completo" site:instagram.com
"Nome Completo" site:facebook.com
"Nome Completo" site:tiktok.com
"Nome Completo" site:x.com
```

---

## 🔌 APIs Utilizadas (Free)
| Finalidade | API |
|---------|-----|
| Pesquisa Web | Google Custom Search API |
| Pesquisa Geral | SerpAPI (Free Tier) |
| Imagens | SerpAPI / Bing Image Trial |
| Informação Enciclopédica | Wikipedia API |

---

## 🗂️ Estrutura do Projeto
```
/people-search
 ├── index.html
 ├── css/
 │   └── style.css
 ├── js/
 │   ├── app.js
 │   ├── search.js
 │   ├── storage.js
 │   └── adapters/
 │       ├── google.js
 │       ├── images.js
 │       └── socials.js
 ├── data/
 │   └── history.json
 └── README.md
```

---

## 💾 Histórico de Pesquisas
As pesquisas são armazenadas em **JSON**, com estrutura preparada para futura migração:
- SQLite
- Firebase
- MongoDB

Exemplo:
```json
{
  "name": "João Silva",
  "profiles": [],
  "images": [],
  "sources": [],
  "timestamp": "2026-01-28T12:00:00Z"
}
```

---

## ⚖️ Ética & Legalidade
- Apenas dados **públicos**
- Sem scraping direto
- Sem autenticação em redes sociais
- Respeito aos Termos de Serviço

---

## 🚀 Evoluções Futuras
- Migração para base de dados
- Exportação PDF
- Filtros por país
- Score de confiança
- Backend Node.js
- Dashboard OSINT

---

## 📌 Checklist de Implementação
- [x] README do projeto
- [ ] Estrutura HTML
- [ ] Layout CSS
- [ ] Motor de pesquisa Google
- [ ] Pesquisa de imagens
- [ ] Histórico em JSON
- [ ] Preparação para base de dados

---

## 👨‍💻 Autor
Projeto desenvolvido para fins **académicos e de portfólio**, com foco em boas práticas e arquitetura escalável.

