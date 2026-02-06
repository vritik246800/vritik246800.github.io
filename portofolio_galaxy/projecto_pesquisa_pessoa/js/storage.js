/* =========================
   Storage Adapter
   Grava em data/history.json
   Sem overwrite (acumula)
========================= */

class StorageAdapter {
  constructor() {
    this.dirHandle = null;
    this.fileHandle = null;
    this.history = [];
  }

  async requestProjectDirectory() {
    if (!this.dirHandle) {
      this.dirHandle = await window.showDirectoryPicker();
    }

    // garantir pasta data/
    const dataDir = await this.dirHandle.getDirectoryHandle('data', {
      create: true
    });

    // garantir history.json
    this.fileHandle = await dataDir.getFileHandle('history.json', {
      create: true
    });

    await this.load();
  }

  async load() {
    const file = await this.fileHandle.getFile();
    const text = await file.text();
    this.history = text ? JSON.parse(text) : [];
    return this.history;
  }

  async save(entry) {
    this.history.push(entry);

    const writable = await this.fileHandle.createWritable();
    await writable.write(JSON.stringify(this.history, null, 2));
    await writable.close();
  }
}

window.storage = new StorageAdapter();
