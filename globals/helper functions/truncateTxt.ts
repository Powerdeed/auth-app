export const truncateTxt = (text: string, textLength: number) => {
  if (text.length < textLength) return text;

  return text.slice(0, textLength);
};
