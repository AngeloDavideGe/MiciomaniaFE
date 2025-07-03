import { inject, Renderer2 } from '@angular/core';

export class CursorUtilities {
  private renderer = inject(Renderer2);

  private setStyle(cursor: string, url: string): void {
    this.renderer.setStyle(document.body, cursor, url);
  }

  public setCursoreByStorage(): void {
    const dataUrl = localStorage.getItem('cursore');

    if (dataUrl) {
      this.setStyle('cursor', `url(${dataUrl}) 0 32, auto`);
    }
  }

  public removeCursor(): void {
    localStorage.removeItem('cursore');
    this.renderer.removeStyle(document.body, 'cursor');
  }

  public setCursoreByIcona(urlIcona: string, size: number): void {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = urlIcona;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/png');
        this.setStyle('cursor', `url(${dataUrl}) 0 32, auto`);
        localStorage.setItem('cursore', dataUrl);
      }
    };

    img.onerror = () => {
      console.error("Errore nel caricamento dell'icona.");
    };
  }
}
