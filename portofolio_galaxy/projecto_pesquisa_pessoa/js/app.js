/* =========================
   People Web Search - Main App
   Orquestra todos os módulos
========================= */

class App {
  constructor() {
    this.init();
  }

  /**
   * Inicializa a aplicação
   */
  async init() {
    console.log('🚀 Iniciando People Web Search...');

    // Carrega configurações nos inputs
    uiManager.loadConfigToInputs();

    // Carrega histórico
    await uiManager.renderHistory();

    // Registra event listeners
    this.registerEventListeners();

    // Verifica se há API keys configuradas
    this.checkAPIStatus();

    console.log('✅ App inicializado com sucesso!');
  }

  /**
   * Registra todos os event listeners
   */
  registerEventListeners() {
    // Botão de pesquisa
    uiManager.elements.searchBtn.addEventListener('click', () => {
      this.handleSearch();
    });

    // Enter no campo de busca
    uiManager.elements.fullName.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch();
      }
    });

    // Botão limpar
    uiManager.elements.clearBtn.addEventListener('click', () => {
      uiManager.clearSearch();
    });

    // Toggle painel de configuração
    uiManager.elements.configBtn.addEventListener('click', () => {
      uiManager.toggleConfigPanel();
    });

    // Salvar configurações
    uiManager.elements.saveConfigBtn.addEventListener('click', () => {
      uiManager.saveConfigFromInputs();
    });

    // Exportar resultados
    uiManager.elements.exportBtn.addEventListener('click', () => {
      uiManager.exportCurrentResults();
    });

    // Limpar histórico
    uiManager.elements.clearHistoryBtn.addEventListener('click', () => {
      uiManager.clearHistory();
    });

    // Auto-focus no campo de busca
    uiManager.elements.fullName.focus();
  }

  /**
   * Handler principal de pesquisa
   */
  async handleSearch() {
    const fullName = uiManager.elements.fullName.value.trim();

    // Validação
    const validation = searchEngine.validateName(fullName);
    if (!validation.valid) {
      uiManager.showError(validation.error);
      return;
    }

    try {
      // Mostra loading
      uiManager.showLoading();

      // Opções de pesquisa
      const options = {
        includeImages: uiManager.elements.includeImages.checked,
        deepSearch: uiManager.elements.deepSearch.checked,
        maxResults: 10
      };

      // Executa pesquisa
      console.log(`🔍 Pesquisando: ${fullName}`, options);
      const results = await searchEngine.search(fullName, options);

      // Salva no histórico
      await storageManager.save(results);

      // Renderiza resultados
      uiManager.renderResults(results);

      // Atualiza histórico
      await uiManager.renderHistory();

      // Notifica sucesso
      uiManager.showNotification('Pesquisa concluída com sucesso!', 'success');

      console.log('✅ Pesquisa concluída:', results);

    } catch (error) {
      console.error('❌ Erro na pesquisa:', error);
      uiManager.showError('Erro ao realizar pesquisa. Tente novamente.');
    } finally {
      uiManager.hideLoading();
    }
  }

  /**
   * Verifica status das API keys
   */
  checkAPIStatus() {
    const hasKeys = configManager.hasApiKeys();
    
    if (!hasKeys) {
      console.warn('⚠️ Rodando em modo básico (sem API keys)');
      
      // Mostra aviso discreto ao usuário
      setTimeout(() => {
        const notice = document.createElement('div');
        notice.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-card);
          border: 2px solid var(--warning);
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: var(--shadow-lg);
          z-index: 1000;
          max-width: 500px;
          text-align: center;
        `;
        notice.innerHTML = `
          <p style="margin-bottom: 0.5rem; color: var(--text-primary);">
            <i class="fas fa-info-circle" style="color: var(--warning);"></i>
            <strong>Modo Básico Ativo</strong>
          </p>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
            Configure as API keys para resultados mais completos
          </p>
          <button 
            onclick="uiManager.toggleConfigPanel(); this.parentElement.remove();"
            style="
              background: var(--accent-gradient);
              color: white;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
            "
          >
            Configurar Agora
          </button>
          <button 
            onclick="this.parentElement.remove();"
            style="
              background: transparent;
              border: 1px solid var(--border-color);
              color: var(--text-secondary);
              padding: 0.5rem 1rem;
              border-radius: 6px;
              cursor: pointer;
              margin-left: 0.5rem;
            "
          >
            Fechar
          </button>
        `;
        document.body.appendChild(notice);

        // Remove automaticamente após 10 segundos
        setTimeout(() => notice.remove(), 10000);
      }, 2000);
    } else {
      console.log('✅ API keys configuradas');
    }
  }

  /**
   * Exporta todo o histórico
   */
  async exportHistory() {
    await storageManager.exportToJSON();
    uiManager.showNotification('Histórico exportado com sucesso!', 'success');
  }

  /**
   * Importa histórico de arquivo
   */
  async importHistory(file) {
    try {
      await storageManager.importFromJSON(file);
      await uiManager.renderHistory();
      uiManager.showNotification('Histórico importado com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao importar:', error);
      uiManager.showError('Erro ao importar arquivo. Verifique o formato.');
    }
  }

  /**
   * Obtém estatísticas do histórico
   */
  async getStats() {
    return await storageManager.getStats();
  }
}

// ===================================
// Inicialização
// ===================================

// Aguarda DOM carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
  });
} else {
  window.app = new App();
}

// Exporta para console (útil para debug)
window.OSINT = {
  app: () => window.app,
  search: (name) => window.app.handleSearch(),
  config: configManager,
  storage: storageManager,
  searchEngine: searchEngine,
  ui: uiManager,
  stats: async () => {
    const stats = await storageManager.getStats();
    console.table(stats);
    return stats;
  },
  export: async () => {
    await storageManager.exportToJSON();
  },
  clear: async () => {
    if (confirm('Limpar TUDO?')) {
      await storageManager.clear();
      configManager.reset();
      location.reload();
    }
  }
};

console.log('%c🔍 People Web Search OSINT Tool', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cDigite OSINT no console para ver comandos disponíveis', 'color: #9ca3af;');
