import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  // 开发或生产环境服务的公共基础路径
  // base: '/foo/',
  plugins: [
    vue(),
    vueJsx(),
    // gzip压缩 生产环境生成 .gz 文件
    // viteCompression({
    //   verbose: true,
    //   disable: false,
    //   threshold: 10240,
    //   algorithm: 'gzip',
    //   ext: '.gz',
    // }),
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "/src/styles/main.scss";',
      },
    },
  },
  //启动服务配置
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,

    // 配置代理帮我们转发请求，解决跨域问题
    proxy: {
      // api/开头的请求将被转发到下面的target的地址
      'api/': {
        target: 'https://mock.com',
        // 改变请求头的origin
        changeOrigin: true,
        // 支持代理websocket
        ws: true,
        // 路径重写 相当于把api/去掉
        rewrite: (path) => path.replace(new RegExp(`^api/`), ''),
      },
    },
  },
  // 打包配置
  build: {
    // outDir: 'build', // 打包文件的输出目录,默认为dist
    // assetsDir: 'static', // 静态资源的存放目录,默认为assets
    // assetsInlineLimit: 4096, // 图片转 base64 编码的阈值,Vite 会将小于此阈值的图片转为 base64 格式
    // 我们的构建产物需要兼容到es6
    target: 'es2015',
    // 假如要兼容安卓微信的webview
    cssTarget: 'chrome61',
    // 非生产环境下生成sourcemap
    sourcemap: false,
    // 禁用gzip 压缩大小报告，因为压缩大型文件可能会很慢
    reportCompressedSize: false,
    // chunk大小超过1500kb是触发警告
    chunkSizeWarningLimit: 1500,
    // 摇树优化
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    force: true, // 强制进行依赖预构建
  },
});
