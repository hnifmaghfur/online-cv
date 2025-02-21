import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/utils/remarkReadingTime.ts';
import remarkUnwrapImages from 'remark-unwrap-images';
import rehypeExternalLinks from 'rehype-external-links';
import expressiveCode from 'astro-expressive-code';
import { expressiveCodeOptions } from './src/site.config';
import icon from 'astro-icon';
import cloudeflare from '@astrojs/cloudflare';

// import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site: 'https://maghfur.dev',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		tailwind({
			applyBaseStyles: false
		}),
		sitemap(),
		mdx(),
		icon()
	],
	markdown: {
		remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					target: '_blank',
					rel: ['nofollow, noopener, noreferrer']
				}
			]
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ['']
			}
		}
	},
	output: 'static',
	adapter: cloudeflare()
	// prefetch: true,
	// outDir: './dist',
});
