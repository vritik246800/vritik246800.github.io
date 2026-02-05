// Separa letras de todos os elementos exceto botão
function splitText(element) {
    const text = element.textContent;
    element.textContent = "";
    const chars = [];

    [...text].forEach(char => {
        const span = document.createElement("span");
        span.className = "magnet-char";
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.transition = "transform 0.1s ease-out"; // Transição suave
        element.appendChild(span);
        chars.push(span);
    });

    return chars;
}

// Aplica efeito magnético SUAVE
function applyMagnet(chars, range = 350, strength = 1) {
    document.addEventListener("mousemove", e => {
        chars.forEach(char => {
            const rect = char.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < range) {
                const force = (1 - dist / range) * strength;
                char.style.transform = `translate(${dx * force}px, ${dy * force}px)`;
            } else {
                char.style.transform = "translate(0, 0)";
            }
        });
    });

    // Reset suave ao sair da tela
    document.addEventListener("mouseleave", () => {
        chars.forEach(char => {
            char.style.transition = "transform 0.3s ease-out";
            char.style.transform = "translate(0, 0)";
            setTimeout(() => {
                char.style.transition = "transform 0.1s ease-out";
            }, 300);
        });
    });
}

// Executa ao carregar
window.addEventListener("load", () => {
    const icon = document.querySelector(".unavailable-icon");
    const h2 = document.querySelector(".unavailable-section h2");
    const p = document.querySelector(".unavailable-section p");
    const badge = document.querySelector(".coming-soon-badge");

    let allChars = [];

    if (icon) allChars = allChars.concat(splitText(icon));
    if (h2) allChars = allChars.concat(splitText(h2));
    if (p) allChars = allChars.concat(splitText(p));
    if (badge) allChars = allChars.concat(splitText(badge));

    if (allChars.length > 0) {
        applyMagnet(allChars, 350, 1); // Mesmos valores do hero-effects
    }
});


// ============================================================
// Sistema de efeito magnético modular e generalizado (SMOOTH)
// ============================================================
const MagneticEffect = {
    instances: new Map(),
    
    // Configuração padrão SUAVIZADA
    defaults: {
        range: 350,
        strength: 1,
        transition: '0.1s ease-out',
        resetTransition: '0.3s ease-out'
    },

    // Inicializa efeito em um ou mais elementos
    init(selector, options = {}) {
        const config = { ...this.defaults, ...options };
        const elements = document.querySelectorAll(selector);
        
        if (!elements.length) return;

        const groupId = `group_${Date.now()}`;
        
        elements.forEach((el, index) => {
            // Aplica display inline-block se necessário
            if (window.getComputedStyle(el).display === 'inline') {
                el.style.display = 'inline-block';
            }
            
            const instanceId = `${groupId}_${index}`;
            this.instances.set(instanceId, {
                element: el,
                config: config,
                groupId: groupId
            });
        });

        this.attachListeners(groupId);
        return groupId;
    },

    // Listeners do grupo
    attachListeners(groupId) {
        const instances = Array.from(this.instances.values())
            .filter(inst => inst.groupId === groupId);

        const mousemove = (e) => {
            instances.forEach(({ element, config }) => {
                element.style.transition = config.transition;
                this.updatePosition(element, e, config);
            });
        };

        const mouseleave = () => {
            instances.forEach(({ element, config }) => {
                element.style.transition = config.resetTransition;
                element.style.transform = 'translate(0, 0)';
                setTimeout(() => {
                    element.style.transition = config.transition;
                }, 300);
            });
        };

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseleave', mouseleave);
    },

    // Calcula e aplica posição
    updatePosition(element, event, config) {
        const rect = element.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.range) {
            const force = (1 - dist / config.range) * config.strength;
            const moveX = dx * force;
            const moveY = dy * force;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            element.style.transform = 'translate(0, 0)';
        }
    },

    // Remove efeito de um grupo
    destroy(groupId) {
        const toRemove = [];
        this.instances.forEach((inst, id) => {
            if (inst.groupId === groupId) {
                inst.element.style.transform = '';
                inst.element.style.transition = '';
                toRemove.push(id);
            }
        });
        toRemove.forEach(id => this.instances.delete(id));
    }
};

// Executa quando o DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // EXEMPLOS DE USO COM EFEITO SUAVE:
    
    // 1. Grupo de divs com efeito suave (como hero)
    MagneticEffect.init('.divs', {
        range: 200,
        strength: 0.3
    });

    // 2. Cards com efeito médio
    MagneticEffect.init('.cards', {
        range: 180,
        strength: 0.6
    });

    // 3. Elemento individual suave
    MagneticEffect.init('#profile-pic', {
        range: 300,
        strength: 0.8
    });

    // 4. Efeito muito suave
    MagneticEffect.init('.subtle', {
        range: 200,
        strength: 0.3
    });

    // 5. Efeito intenso (mas ainda suave na transição)
    MagneticEffect.init('.intense', {
        range: 400,
        strength: 1.2
    });

    // 6. Header e footer com mesma suavidade
    MagneticEffect.init('.header-items');
    MagneticEffect.init('.footer-items');
}