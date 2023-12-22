export const proxy = {
	'/dev/': {
		target: 'http://127.0.0.1:8001',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, ''),
	},
	'/haolong/': {
		target: 'http://192.168.11.73:8001',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/haolong/, ''),
	},
	'/local/': {
		target: 'http://192.168.11.73:8003/',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/local/, ''),
	},
	'/prod/': {
		target: 'https://linye.yingxiaoli.com',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, '/api'),
	},
}
