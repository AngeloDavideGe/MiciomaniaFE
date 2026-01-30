export function getExtension(file: File): string {
  const extensions: Record<string, string> = {
    'application/pdf': 'pdf',
    'audio/mpeg': 'mp3',
  };

  return extensions[file.type] || '';
}

export const titoloPulsantiSong: Record<string, string> = {
  song: 'Canzoni Miciomania',
  proposta: 'Proponi una canzone',
};
