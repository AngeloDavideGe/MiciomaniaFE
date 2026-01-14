export function getExtension(file: File): string {
  const extensions: { [key: string]: string } = {
    'application/pdf': 'pdf',
    'audio/mpeg': 'mp3',
  };

  return extensions[file.type] || '';
}
