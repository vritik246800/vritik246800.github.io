/* =========================
   Storage Manager
   Arquitetura preparada para migração para DB
========================= */

class StorageManager {
  constructor() {
    this.storageKey = 'vritik-search-history';
    this.dbReady = false; // Flag para futura migração para IndexedDB/Backend
  }

  /**
   * Carrega todo o histórico
   */
  async load() {
    try {
      // Futuramente: return await this.loadFromDB();
      return this.loadFromLocalStorage();
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      return [];
    }
  }

  /**
   * Salva uma nova pesquisa
   */
  async save(searchData) {
    try {
      const history = await this.load();
      
      // Adiciona timestamp se não existir
      if (!searchData.timestamp) {
        searchData.timestamp = new Date().toISOString();
      }

      // Adiciona ID único
      searchData.id = this.generateId();

      // Adiciona ao início do array
      history.unshift(searchData);

      // Limita a 100 resultados (economizar espaço)
      const limitedHistory = history.slice(0, 100);

      // Futuramente: await this.saveToDB(limitedHistory);
      this.saveToLocalStorage(limitedHistory);

      return searchData;
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
      throw error;
    }
  }

  /**
   * Busca uma pesquisa específica por ID
   */
  async findById(id) {
    const history = await this.load();
    return history.find(item => item.id === id);
  }

  /**
   * Busca pesquisas por nome
   */
  async findByName(name) {
    const history = await this.load();
    return history.filter(item => 
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Remove uma pesquisa específica
   */
  async remove(id) {
    const history = await this.load();
    const filtered = history.filter(item => item.id !== id);
    this.saveToLocalStorage(filtered);
    return filtered;
  }

  /**
   * Limpa todo o histórico
   */
  async clear() {
    // Futuramente: await this.clearDB();
    localStorage.removeItem(this.storageKey);
    return [];
  }

  /**
   * Exporta histórico como JSON
   */
  async exportToJSON() {
    const history = await this.load();
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `osint-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Importa histórico de JSON
   */
  async importFromJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          if (!Array.isArray(data)) {
            throw new Error('Formato inválido: esperado um array');
          }

          // Valida estrutura básica
          const isValid = data.every(item => 
            item.name && item.timestamp
          );

          if (!isValid) {
            throw new Error('Formato inválido: faltam campos obrigatórios');
          }

          this.saveToLocalStorage(data);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  }

  // ===================================
  // Métodos privados - LocalStorage
  // ===================================

  loadFromLocalStorage() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveToLocalStorage(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // ===================================
  // Métodos preparados para DB futura
  // ===================================

  async initDB() {
    // Implementar IndexedDB ou conexão com backend
    // return new Promise((resolve, reject) => {
    //   const request = indexedDB.open('OSINTDatabase', 1);
    //   request.onsuccess = () => {
    //     this.db = request.result;
    //     this.dbReady = true;
    //     resolve(this.db);
    //   };
    //   request.onerror = () => reject(request.error);
    // });
  }

  async loadFromDB() {
    // Implementar quando migrar para DB
    // if (!this.dbReady) await this.initDB();
    // const transaction = this.db.transaction(['searches'], 'readonly');
    // const store = transaction.objectStore('searches');
    // return new Promise((resolve, reject) => {
    //   const request = store.getAll();
    //   request.onsuccess = () => resolve(request.result);
    //   request.onerror = () => reject(request.error);
    // });
  }

  async saveToDB(data) {
    // Implementar quando migrar para DB
    // if (!this.dbReady) await this.initDB();
    // const transaction = this.db.transaction(['searches'], 'readwrite');
    // const store = transaction.objectStore('searches');
    // return new Promise((resolve, reject) => {
    //   const request = store.put(data);
    //   request.onsuccess = () => resolve(request.result);
    //   request.onerror = () => reject(request.error);
    // });
  }

  // ===================================
  // Helpers
  // ===================================

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Estatísticas do histórico
   */
  async getStats() {
    const history = await this.load();
    return {
      total: history.length,
      lastSearch: history[0]?.timestamp,
      mostSearched: this.getMostSearched(history),
      totalProfiles: history.reduce((sum, item) => sum + (item.profiles?.length || 0), 0),
      totalImages: history.reduce((sum, item) => sum + (item.images?.length || 0), 0)
    };
  }

  getMostSearched(history) {
    const counts = {};
    history.forEach(item => {
      const name = item.name.toLowerCase();
      counts[name] = (counts[name] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, 5).map(([name, count]) => ({ name, count }));
  }
}

// Exportar instância global
window.storageManager = new StorageManager();
