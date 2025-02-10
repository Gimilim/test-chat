export function isNullOrEmpty(value: string): boolean {
   return value == null || value.length === 0 || !value.trim();
}
