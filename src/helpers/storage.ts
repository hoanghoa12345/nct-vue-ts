const PREFIX = "NCT_";

export function saveObject(key: string, val: any): void {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(val));
}

export function getObject(key: string): any {
  const data = localStorage.getItem(`${PREFIX}${key}`);
  try {
    if (data) return JSON.parse(data);
    return false;
  } catch {
    return false;
  }
}
