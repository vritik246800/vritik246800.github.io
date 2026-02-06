/* =========================
   Search Engine
   Integração com APIs de pesquisa
========================= */

class SearchEngine {
  constructor() {
    this.apiEndpoints = {
      google: 'https://www.googleapis.com/customsearch/v1',
      // Adicionar outros endpoints conforme necessário
    };
  }

  /**
   * Pesquisa principal - orquestra todas as buscas
   */
  async search(fullName, options = {}) {
    const {
      includeImages = true,
      deepSearch = false,
      maxResults = 10
    } = options;

    try {
      const results = {
        name: fullName,
        timestamp: new Date().toISOString(),
        profiles: [],
        webResults: [],
        images: [],
        sources: []
      };

      // 1. Gera links para redes sociais
      results.profiles = this.generateSocialProfiles(fullName);

      // 2. Busca na web (Google Custom Search API se disponível)
      if (configManager.hasApiKeys()) {
        const webData = await this.googleCustomSearch(fullName, maxResults);
        results.webResults = webData.items || [];
        results.sources = webData.items?.map(item => item.link) || [];

        // 3. Busca imagens se habilitado
        if (includeImages) {
          const imageData = await this.googleImageSearch(fullName, 12);
          results.images = imageData.items || [];
        }
      } else {
        // Modo fallback sem API
        results.sources = this.generateBasicSearchLinks(fullName);
      }

      // 4. Busca profunda (adicional) se habilitado
      if (deepSearch) {
        const additionalData = await this.deepSearch(fullName);
        results.webResults = [...results.webResults, ...additionalData];
      }

      return results;

    } catch (error) {
      console.error('Erro na pesquisa:', error);
      throw error;
    }
  }

  /**
   * Gera perfis de redes sociais baseados no nome
   */
  generateSocialProfiles(fullName) {
    const slug = this.slugify(fullName);
    const encoded = encodeURIComponent(fullName);

    return [
      {
        platform: 'Instagram',
        url: `https://www.instagram.com/${slug}/`,
        searchUrl: `https://www.instagram.com/explore/search/keyword/?q=${encoded}`,
        icon: 'fab fa-instagram',
        color: '#E4405F'
      },
      {
        platform: 'Facebook',
        url: `https://www.facebook.com/${slug}`,
        searchUrl: `https://www.facebook.com/search/top?q=${encoded}`,
        icon: 'fab fa-facebook',
        color: '#1877F2'
      },
      {
        platform: 'TikTok',
        url: `https://www.tiktok.com/@${slug}`,
        searchUrl: `https://www.tiktok.com/search?q=${encoded}`,
        icon: 'fab fa-tiktok',
        color: '#000000'
      },
      {
        platform: 'X (Twitter)',
        url: `https://x.com/${slug}`,
        searchUrl: `https://x.com/search?q=${encoded}`,
        icon: 'fab fa-x-twitter',
        color: '#000000'
      },
      {
        platform: 'LinkedIn',
        url: `https://www.linkedin.com/in/${slug}`,
        searchUrl: `https://www.linkedin.com/search/results/all/?keywords=${encoded}`,
        icon: 'fab fa-linkedin',
        color: '#0A66C2'
      },
      {
        platform: 'YouTube',
        url: `https://www.youtube.com/@${slug}`,
        searchUrl: `https://www.youtube.com/results?search_query=${encoded}`,
        icon: 'fab fa-youtube',
        color: '#FF0000'
      },
      {
        platform: 'GitHub',
        url: `https://github.com/${slug}`,
        searchUrl: `https://github.com/search?q=${encoded}`,
        icon: 'fab fa-github',
        color: '#181717'
      }
    ];
  }

  /**
   * Google Custom Search API
   */
  async googleCustomSearch(query, maxResults = 10) {
    const apiKey = configManager.get('googleApiKey');
    const searchId = configManager.get('googleSearchId');

    if (!apiKey || !searchId) {
      console.warn('API keys não configuradas');
      return { items: [] };
    }

    try {
      const url = new URL(this.apiEndpoints.google);
      url.searchParams.set('key', apiKey);
      url.searchParams.set('cx', searchId);
      url.searchParams.set('q', query);
      url.searchParams.set('num', Math.min(maxResults, 10));

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Erro na Google Custom Search:', error);
      return { items: [] };
    }
  }

  /**
   * Google Image Search API
   */
  async googleImageSearch(query, maxResults = 10) {
    const apiKey = configManager.get('googleApiKey');
    const searchId = configManager.get('googleSearchId');

    if (!apiKey || !searchId) {
      return { items: [] };
    }

    try {
      const url = new URL(this.apiEndpoints.google);
      url.searchParams.set('key', apiKey);
      url.searchParams.set('cx', searchId);
      url.searchParams.set('q', query);
      url.searchParams.set('searchType', 'image');
      url.searchParams.set('num', Math.min(maxResults, 10));

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Formata resultados de imagem
      if (data.items) {
        data.items = data.items.map(item => ({
          url: item.link,
          thumbnail: item.image?.thumbnailLink,
          title: item.title,
          source: item.displayLink
        }));
      }

      return data;

    } catch (error) {
      console.error('Erro na Google Image Search:', error);
      return { items: [] };
    }
  }

  /**
   * Pesquisa profunda (múltiplas consultas)
   */
  async deepSearch(fullName) {
    const queries = [
      `"${fullName}" profile`,
      `"${fullName}" social media`,
      `"${fullName}" contact`,
      `about "${fullName}"`
    ];

    const results = [];

    for (const query of queries) {
      try {
        const data = await this.googleCustomSearch(query, 5);
        if (data.items) {
          results.push(...data.items);
        }
        
        // Delay para não exceder rate limits
        await this.delay(500);
      } catch (error) {
        console.error(`Erro na query: ${query}`, error);
      }
    }

    // Remove duplicatas
    const unique = this.removeDuplicates(results, 'link');
    return unique;
  }

  /**
   * Gera links básicos de pesquisa (fallback sem API)
   */
  generateBasicSearchLinks(fullName) {
    const encoded = encodeURIComponent(fullName);
    
    return [
      {
        title: 'Google Search',
        url: `https://www.google.com/search?q=${encoded}`,
        snippet: 'Pesquisa geral no Google'
      },
      {
        title: 'Google Images',
        url: `https://www.google.com/search?q=${encoded}&tbm=isch`,
        snippet: 'Pesquisa de imagens no Google'
      },
      {
        title: 'DuckDuckGo',
        url: `https://duckduckgo.com/?q=${encoded}`,
        snippet: 'Pesquisa privada com DuckDuckGo'
      },
      {
        title: 'Bing',
        url: `https://www.bing.com/search?q=${encoded}`,
        snippet: 'Pesquisa no Bing'
      }
    ];
  }

  /**
   * Busca em APIs públicas adicionais
   */
  async searchPublicAPIs(fullName) {
    // Aqui podem ser adicionadas outras APIs públicas gratuitas
    // Exemplos: PeopleDataLabs (free tier), Hunter.io (free tier), etc.
    
    const results = {
      emails: [],
      phones: [],
      addresses: [],
      companies: []
    };

    // Implementar conforme APIs disponíveis

    return results;
  }

  // ===================================
  // Helpers
  // ===================================

  slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9]/g, '')
      .replace(/\s+/g, '');
  }

  removeDuplicates(array, key) {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Valida se um nome é válido para pesquisa
   */
  validateName(name) {
    if (!name || name.trim().length < 2) {
      return { valid: false, error: 'Nome muito curto' };
    }

    if (name.length > 100) {
      return { valid: false, error: 'Nome muito longo' };
    }

    // Verifica se tem pelo menos algumas letras
    if (!/[a-zA-Z]{2,}/.test(name)) {
      return { valid: false, error: 'Nome deve conter letras' };
    }

    return { valid: true };
  }
}

// Exportar instância global
window.searchEngine = new SearchEngine();
