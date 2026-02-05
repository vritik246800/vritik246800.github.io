# Sistema Genérico de Efeitos de Texto

Sistema modular e reutilizável para aplicar efeitos de digitação e magnético em textos HTML.

## 🎯 Funcionalidades

1. **Efeito de Digitação** - Texto aparece caractere por caractere
2. **Efeito Magnético** - Letras reagem ao movimento do mouse
3. **Combinado** - Digitação seguida de efeito magnético

## 🚀 Uso Rápido

### 1. Incluir o script

```html
<script src="text-effects.js"></script>
```

### 2. Usar classes automáticas

```html
<!-- Apenas digitação -->
<div class="escrever">Texto que será digitado</div>

<!-- Apenas efeito magnético -->
<div class="letra-iman">Texto com efeito de ímã</div>

<!-- Digitação + Magnético -->
<div class="escrever letra-iman">Primeiro digita, depois vira ímã</div>
```

## 📖 Uso Manual (JavaScript)

### Typing

```javascript
// Seletor CSS
TextEffects.manual.typing('.meu-elemento');

// Elemento direto
const elemento = document.getElementById('titulo');
TextEffects.manual.typing(elemento);

// Com opções
TextEffects.manual.typing('#titulo', {
    typingSpeed: 50  // Mais rápido
});
```

### Magnet

```javascript
// Básico
TextEffects.manual.magnet('.meu-texto');

// Com opções customizadas
TextEffects.manual.magnet('#hero', {
    magnetRange: 400,      // Maior alcance
    magnetStrength: 1.5    // Mais forte
});
```

### Typing + Magnet

```javascript
// Combina os dois efeitos
TextEffects.manual.typingAndMagnet('#titulo-principal', {
    typingSpeed: 80,
    magnetRange: 350,
    magnetStrength: 1
});
```

## ⚙️ Opções Disponíveis

| Opção | Descrição | Padrão |
|-------|-----------|--------|
| `typingSpeed` | Velocidade de digitação (ms por caractere) | 100 |
| `magnetRange` | Raio de influência do mouse (px) | 350 |
| `magnetStrength` | Intensidade do efeito magnético | 1 |
| `magnetTransition` | Transição CSS do movimento | '0.1s ease-out' |
| `magnetResetTransition` | Transição CSS do reset | '0.3s ease-out' |
| `touchRange` | Raio no mobile (px) | 120 |
| `touchStrength` | Força no mobile | 0.25 |

## 💡 Exemplos Práticos

### Hero Section com Typing + Magnet

```html
<div class="hero">
    <h1 class="escrever letra-iman">Seu Nome Aqui</h1>
</div>
```

### Título que só aparece com efeito magnético

```html
<h2 class="letra-iman">Passe o mouse aqui!</h2>
```

### Controle manual com evento

```javascript
document.getElementById('botao').addEventListener('click', () => {
    TextEffects.manual.typing('#mensagem', {
        typingSpeed: 50
    });
});
```

### Efeito magnético personalizado

```javascript
// Efeito suave
TextEffects.manual.magnet('.suave', {
    magnetRange: 200,
    magnetStrength: 0.3
});

// Efeito intenso
TextEffects.manual.magnet('.intenso', {
    magnetRange: 500,
    magnetStrength: 2
});
```

## 📱 Suporte Mobile

O sistema detecta automaticamente toque em dispositivos mobile:
- **Touch Move**: Efeito magnético ao arrastar o dedo
- **Touch End**: Reset automático das posições
- Configurações mais suaves para melhor experiência

## 🎨 CSS Recomendado

```css
/* Para elementos com efeito magnético */
.letra-iman,
.escrever.letra-iman {
    cursor: default;
    user-select: none;
}

/* Caracteres individuais */
.char {
    display: inline-block;
    transition: transform 0.1s ease-out;
}
```

## 🔧 API Avançada

### Remover efeitos de um elemento

```javascript
const elemento = document.getElementById('meu-texto');
TextEffects.destroy(elemento);
```

### Verificar instâncias ativas

```javascript
console.log(TextEffects.instances);
```

### Reinicializar todos os efeitos

```javascript
TextEffects.init();
```

## 🌟 Casos de Uso

### Portfolio/Landing Page
```html
<header>
    <h1 class="escrever letra-iman">Designer Criativo</h1>
    <p class="letra-iman">Especialista em UX/UI</p>
</header>
```

### Apresentações Interativas
```html
<div class="slide">
    <h2 class="escrever">Título que aparece gradualmente</h2>
    <p class="letra-iman">Texto interativo com mouse</p>
</div>
```

### CTAs Dinâmicos
```javascript
// Ativa efeito quando entra na viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            TextEffects.manual.typingAndMagnet(entry.target);
        }
    });
});

document.querySelectorAll('.cta').forEach(el => observer.observe(el));
```

## 🔄 Compatibilidade

- ✅ Chrome, Firefox, Safari, Edge (versões modernas)
- ✅ Mobile (iOS Safari, Chrome Android)
- ✅ Touch events
- ✅ Responsive

## 📦 Estrutura de Arquivos

```
projeto/
├── text-effects.js      # Sistema principal
├── exemplo.html         # Demonstração completa
└── README.md           # Esta documentação
```

## 🎓 Como Funciona

1. **Auto-detecção**: Ao carregar, o script busca elementos com classes específicas
2. **Split de caracteres**: Texto é dividido em `<span>` individuais
3. **Event Listeners**: Mouse/touch events calculam distância e aplicam transformações
4. **CSS Transform**: Movimento suave via `translate()`

## 🐛 Troubleshooting

**Efeito não funciona:**
- Verifique se o script foi carregado
- Confirme que as classes estão corretas
- Veja o console para erros

**Performance lenta:**
- Reduza `magnetRange`
- Use menos elementos com efeito
- Aumente o tempo de `transition`

**Mobile muito sensível:**
- Reduza `touchStrength`
- Diminua `touchRange`

## 📝 Licença

Livre para uso pessoal e comercial.

---

**Desenvolvido para criar experiências web interativas e memoráveis** ✨
