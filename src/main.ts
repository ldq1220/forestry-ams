import { createApp } from 'vue'
import App from './App.vue'
import { bootstrap } from './cool'
// @ts-ignore
import print from 'vue3-print-nb'

const app = createApp(App)

app.use(print)

// 启动
bootstrap(app)
	.then(() => {
		app.mount('#app')
	})
	.catch((err) => {
		console.error('COOL-ADMIN 启动失败', err)
	})
