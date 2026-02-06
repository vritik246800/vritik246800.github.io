/* =========================
   Configuration Manager
   Gerencia API keys e configurações
========================= */

class ConfigManager {
  constructor() {
    this.config = this.load();
  }

  load() {
    const saved = localStorage.getItem('osint-config');
    return saved ? JSON.parse(saved) : {
      googleApiKey: '',
      googleSearchId: '',
      preferredLanguage: 'pt',
      enableDeepSearch: false,
      maxResults: 10
    };
  }

  save(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem('osint-config', JSON.stringify(this.config));
    return this.config;
  }

  get(key) {
    return this.config[key];
  }

  hasApiKeys() {
    return !!(this.config.googleApiKey && this.config.googleSearchId);
  }

  reset() {
    localStorage.removeItem('osint-config');
    this.config = this.load();
  }
}

// Exportar instância global
window.configManager = new ConfigManager();
