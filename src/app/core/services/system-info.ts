import { Injectable } from '@angular/core';
declare global {
  interface Window {
    electronAPI: {
      getSystemInfo: () => Promise<{ username: string; hostname: string }>;
    };
  }
}
@Injectable({
  providedIn: 'root',
})
export class SystemInfo {
  constructor() {}
  async getSystemInfo() {
    console.log('window.electronAPI', window.electronAPI);
    if (!window.electronAPI) {
      console.warn('electronAPI não está disponível');
      return { username: 'N/A', hostname: 'N/A' };
    }
    return await window.electronAPI.getSystemInfo();
  }
}
