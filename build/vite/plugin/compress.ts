import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin() {
  return compressPlugin({
    ext: '.gz',
    deleteOriginFile: false
  })
}
