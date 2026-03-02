export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `tsvetomir${timestamp}-${random}@abv.bg`;
}
