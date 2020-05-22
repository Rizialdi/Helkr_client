export function inputSanitization(text) {
  return text.replace(/^\s+|\s+$/g, '');
}
