const { appName } = require('../../environment');

export class StorageService {

  private getStorage(storage: string): any {
    switch (storage) {
      case 'local':
        return localStorage;
      case 'session':
        return sessionStorage;
      default:
        return localStorage;
    }
  }

  public getData(key: string, storage: string): any {
    const storageInstance: any = this.getStorage(storage);
    const data = storageInstance.getItem(appName + key);
    return JSON.parse(data);
  }

  public setData(key: string, data: any, storage: string): void {
    const storageInstance: any = this.getStorage(storage);
    const dataToSave = JSON.stringify(data);
    storageInstance.setItem(appName + key, dataToSave);
  }

  public removeData(key: string, storage: string): void {
    const storageInstance: any = this.getStorage(storage);
    storageInstance.removeItem(appName + key);
  }

  public clearAll(storage: string): void {
    const storageInstance: any = this.getStorage(storage);
    storageInstance.clear();
  }
}
