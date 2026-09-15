export async function gestisciCursore(
  icona: string,
  colore: string = '#000000',
): Promise<void> {
  const body = document.body;

  if (!icona) {
    body.classList.remove('cursore-personalizzato');
    body.style.removeProperty('--cursore-attivo');
    return;
  }

  const elemento = document.createElement('i');

  elemento.className = `${icona}`;
  elemento.style.cssText = 'position:fixed;visibility:hidden';
  body.appendChild(elemento);

  try {
    const stile = getComputedStyle(elemento, '::before');
    const carattere = stile.content.replace(/^["']|["']$/g, '');
    const fontFamily = stile.fontFamily;

    await document.fonts.load(`20px ${fontFamily}`, carattere);

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = `20px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 1;

    ctx.strokeStyle = '#101828';
    ctx.lineWidth = 3;
    ctx.strokeText(carattere, 16, 16);

    ctx.shadowColor = 'transparent';
    ctx.fillStyle = colore;
    ctx.fillText(carattere, 16, 16);

    body.style.setProperty(
      '--cursore-attivo',
      `url("${canvas.toDataURL('image/png')}") 16 16, auto`,
    );

    body.classList.add('cursore-personalizzato');
  } finally {
    elemento.remove();
  }
}
