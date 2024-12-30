import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import react from '@astrojs/react'
import node from '@astrojs/node'
import lottie from 'astro-integration-lottie'

export default defineConfig({
	site: 'https://atalaya.digital',
	output: 'static', // static, server or hybrid
	image: {
		domains: ['source.unsplash.com', 'images.unsplash.com']
	},
	integrations: [tailwind(), mdx(), icon(), sitemap(), react(), lottie()],
	adapter: node({
		mode: 'standalone'
	})
})
