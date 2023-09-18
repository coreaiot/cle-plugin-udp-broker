export function addColonToMac(mac: string) {
  if (!mac || mac.length !== 12) return mac;
  const arr = mac.split('');
  for (const i of [2, 5, 8, 11, 14]) {
    arr.splice(i, 0, ':');
  }
  return arr.join('');
}