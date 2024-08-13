export function formatStatusText(status: any) {
  if (typeof status !== 'string') {
    return '';
  }

  return status
    .toLowerCase()
    .split('_')
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
