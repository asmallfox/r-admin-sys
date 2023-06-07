declare module 'vite-plugin-mock/client' {
  export function createProdMockServer(mockList: any[]): Promise<void>
}
