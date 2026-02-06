/* =========================
   UI Manager
   Gerencia toda a interface do usuário
========================= */

class UIManager {
  constructor() {
    this.elements = {
      // Inputs
      fullName: document.getElementById('fullName'),
      searchBtn: document.getElementById('searchBtn'),
      clearBtn: document.getElementById('clearBtn'),
      deepSearch: document.getElementById('deepSearch'),
      includeImages: document.getElementById('includeImages'),

      // Config
      configBtn: document.getElementById('configBtn'),
      configPanel: document.getElementById('configPanel'),
      googleApiKey: document.getElementById('googleApiKey'),
      googleSearchId: document.getElementById('googleSearchId'),
      saveConfigBtn: document.getElementById('saveConfigBtn'),

      // Results
      loadingIndicator: document.getElementById('loadingIndicator'),
      personInfoContent: document.getElementById('personInfoContent'),
      profileList: document.querySelector('.profile-list'),
      webResultsList: document.querySelector('.web-results-list'),
      imageGrid: document.querySelector('.image-grid'),
      sourceList: document.querySelector('.source-list'),
      exportBtn: document.getElementById('exportBtn'),

      // History
      historyList: document.getElementById('historyList'),
      historyCount: document.getElementById('historyCount'),
      clearHistoryBtn: document.getElementById('clearHistoryBtn')
    };

    this.currentResults = null;
  }

  /**
   * Mostra indicador de carregamento
   */
  showLoading() {
    this.elements.loadingIndicator.classList.remove('hidden');
    this.elements.searchBtn.disabled = true;
    this.elements.searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Pesquisando...';
  }

  /**
   * Esconde indicador de carregamento
   */
  hideLoading() {
    this.elements.loadingIndicator.classList.add('hidden');
    this.elements.searchBtn.disabled = false;
    this.elements.searchBtn.innerHTML = '<i class="fas fa-search"></i> Pesquisar';
  }

  /**
   * Renderiza informações básicas da pessoa
   */
  renderPersonInfo(data) {
    const content = this.elements.personInfoContent;
    content.innerHTML = `
      <div class="info-item">
        <i class="fas fa-user"></i>
        <div>
          <strong>Nome Pesquisado:</strong>
          <span>${this.escapeHtml(data.name)}</span>
        </div>
      </div>
      <div class="info-item">
        <i class="fas fa-calendar"></i>
        <div>
          <strong>Data da Pesquisa:</strong>
          <span>${new Date(data.timestamp).toLocaleString('pt-BR')}</span>
        </div>
      </div>
      <div class="info-item">
        <i class="fas fa-chart-bar"></i>
        <div>
          <strong>Resultados Encontrados:</strong>
          <span>${data.profiles?.length || 0} perfis, ${data.webResults?.length || 0} resultados web, ${data.images?.length || 0} imagens</span>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza perfis de redes sociais
   */
  renderProfiles(profiles) {
    const list = this.elements.profileList;
    
    if (!profiles || profiles.length === 0) {
      list.innerHTML = '<li class="empty-state">Nenhum perfil encontrado</li>';
      return;
    }

    list.innerHTML = profiles.map(profile => `
      <li>
        <i class="${profile.icon} platform-icon ${profile.platform.toLowerCase().replace(/\s+/g, '-')}"></i>
        <div style="flex: 1;">
          <strong>${this.escapeHtml(profile.platform)}</strong>
          <div style="display: flex; gap: 1rem; margin-top: 0.25rem;">
            <a href="${profile.url}" target="_blank" rel="noopener noreferrer" title="Perfil direto">
              <i class="fas fa-external-link-alt"></i> Perfil
            </a>
            <a href="${profile.searchUrl}" target="_blank" rel="noopener noreferrer" title="Pesquisar">
              <i class="fas fa-search"></i> Pesquisar
            </a>
          </div>
        </div>
      </li>
    `).join('');
  }

  /**
   * Renderiza resultados da web
   */
  renderWebResults(results) {
    const list = this.elements.webResultsList;
    
    if (!results || results.length === 0) {
      list.innerHTML = '<li class="empty-state">Nenhum resultado web encontrado</li>';
      return;
    }

    list.innerHTML = results.map(result => `
      <li>
        <a href="${result.link || result.url}" target="_blank" rel="noopener noreferrer" class="web-result-item">
          <span class="web-result-title">${this.escapeHtml(result.title)}</span>
          ${result.snippet ? `<p class="web-result-snippet">${this.escapeHtml(result.snippet)}</p>` : ''}
        </a>
      </li>
    `).join('');
  }

  /**
   * Renderiza grid de imagens
   */
  renderImages(images) {
    const grid = this.elements.imageGrid;
    
    if (!images || images.length === 0) {
      grid.innerHTML = '<p class="empty-state">Nenhuma imagem encontrada</p>';
      return;
    }

    grid.innerHTML = images.map(img => {
      const url = img.url || img.link;
      const thumbnail = img.thumbnail || url;
      const title = img.title || 'Imagem relacionada';
      
      return `
        <img 
          src="${thumbnail}" 
          alt="${this.escapeHtml(title)}"
          title="${this.escapeHtml(title)}"
          loading="lazy"
          onclick="window.open('${url}', '_blank')"
        />
      `;
    }).join('');
  }

  /**
   * Renderiza fontes e links
   */
  renderSources(sources) {
    const list = this.elements.sourceList;
    
    if (!sources || sources.length === 0) {
      list.innerHTML = '<li class="empty-state">Nenhuma fonte disponível</li>';
      return;
    }

    // Remove duplicatas
    const uniqueSources = [...new Set(sources.map(s => typeof s === 'string' ? s : s.url))];

    list.innerHTML = uniqueSources.map(source => `
      <li>
        <a href="${source}" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-link"></i>
          ${this.truncateUrl(source)}
        </a>
      </li>
    `).join('');
  }

  /**
   * Renderiza todos os resultados
   */
  renderResults(data) {
    this.currentResults = data;

    this.renderPersonInfo(data);
    this.renderProfiles(data.profiles);
    this.renderWebResults(data.webResults);
    this.renderImages(data.images);
    
    // Monta lista de sources
    const allSources = [
      ...(data.sources || []),
      ...(data.webResults?.map(r => r.link || r.url) || [])
    ];
    this.renderSources(allSources);

    // Mostra botão de exportar
    this.elements.exportBtn.classList.remove('hidden');

    // Scroll suave para resultados
    document.querySelector('.results').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }

  /**
   * Renderiza histórico
   */
  async renderHistory() {
    const history = await storageManager.load();
    const list = this.elements.historyList;
    const count = this.elements.historyCount;

    // Atualiza contador
    count.textContent = `${history.length} pesquisa${history.length !== 1 ? 's' : ''}`;

    if (history.length === 0) {
      list.innerHTML = '<li class="empty-state">Nenhuma pesquisa ainda</li>';
      return;
    }

    list.innerHTML = history.map(item => `
      <li data-id="${item.id}">
        <span class="history-name">${this.escapeHtml(item.name)}</span>
        <span class="history-date">${this.formatDate(item.timestamp)}</span>
      </li>
    `).join('');

    // Adiciona eventos de clique
    list.querySelectorAll('li[data-id]').forEach(li => {
      li.addEventListener('click', async () => {
        const id = li.dataset.id;
        const item = await storageManager.findById(id);
        if (item) {
          this.renderResults(item);
          this.elements.fullName.value = item.name;
        }
      });
    });
  }

  /**
   * Mostra/esconde painel de configuração
   */
  toggleConfigPanel() {
    this.elements.configPanel.classList.toggle('hidden');
  }

  /**
   * Carrega configurações salvas nos inputs
   */
  loadConfigToInputs() {
    const config = configManager.config;
    this.elements.googleApiKey.value = config.googleApiKey || '';
    this.elements.googleSearchId.value = config.googleSearchId || '';
  }

  /**
   * Salva configurações dos inputs
   */
  saveConfigFromInputs() {
    const newConfig = {
      googleApiKey: this.elements.googleApiKey.value.trim(),
      googleSearchId: this.elements.googleSearchId.value.trim()
    };

    configManager.save(newConfig);
    
    this.showNotification('Configurações salvas com sucesso!', 'success');
    
    // Fecha painel após 1 segundo
    setTimeout(() => {
      this.elements.configPanel.classList.add('hidden');
    }, 1000);
  }

  /**
   * Exporta resultados atuais
   */
  exportCurrentResults() {
    if (!this.currentResults) {
      this.showNotification('Nenhum resultado para exportar', 'warning');
      return;
    }

    const dataStr = JSON.stringify(this.currentResults, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-${this.slugify(this.currentResults.name)}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification('Resultados exportados com sucesso!', 'success');
  }

  /**
   * Limpa histórico com confirmação
   */
  async clearHistory() {
    if (!confirm('Tem certeza que deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
      return;
    }

    await storageManager.clear();
    await this.renderHistory();
    this.showNotification('Histórico limpo com sucesso!', 'info');
  }

  /**
   * Limpa campo de busca
   */
  clearSearch() {
    this.elements.fullName.value = '';
    this.elements.fullName.focus();
  }

  /**
   * Mostra notificação temporária
   */
  showNotification(message, type = 'info') {
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: var(--bg-card);
      border: 2px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'});
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 9999;
      animation: slideInRight 0.3s ease;
      max-width: 350px;
    `;

    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 type === 'warning' ? 'exclamation-triangle' : 
                 'info-circle';

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <i class="fas fa-${icon}" style="font-size: 1.5rem; color: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'});"></i>
        <span style="color: var(--text-primary);">${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Remove após 3 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  /**
   * Mostra erro
   */
  showError(message) {
    this.showNotification(message, 'error');
  }

  // ===================================
  // Helpers
  // ===================================

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  truncateUrl(url, maxLength = 60) {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength - 3) + '...';
  }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // Menos de 1 minuto
    if (diff < 60000) {
      return 'Agora mesmo';
    }

    // Menos de 1 hora
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} min atrás`;
    }

    // Menos de 24 horas
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours}h atrás`;
    }

    // Formato padrão
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// Adiciona animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Exportar instância global
window.uiManager = new UIManager();
