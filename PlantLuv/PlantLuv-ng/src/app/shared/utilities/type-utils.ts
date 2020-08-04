
export const clientGuidPrefix = '00000000';
export function createClientGuid() {
  // prefix of 0000 tells backend to replace the GUID with a server generated one
  //  and indicates this is an insert.
  return '00000000-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line: no-bitwise
    const r = Math.random() * 16 | 0;
    // tslint:disable-next-line: no-bitwise
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
