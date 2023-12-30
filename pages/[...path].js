import GetSitemapLinks from 'sitemap-links'
import DynamicPath, { getStaticProps } from './index'

export default DynamicPath

export { getStaticProps }

export async function getStaticPaths() {
	// Fetch links from Webflow sitemap
	const sitemapLink = "https://weave-bento-box.webflow.io" + `/sitemap.xml`
	const links = await GetSitemapLinks(sitemapLink).catch(err => {
		console.error(err)
	})

	// Extract paths from absolute links
	const paths = []
	for(let link of links){
		let url = new URL(link)
		const path = url.pathname.replace(`/`, ``).split(`/`)
		if(!path.length || !path[0]) continue
		paths.push({
			params: { path }
		})
	}

	return {
	  paths: paths,
	  fallback: `blocking`,
	}
 }
