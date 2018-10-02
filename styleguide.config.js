let webpackConfig = require('./webpack.config.js')
module.exports = {
	title: 'react components',
	sections: [{
		name: 'Introduction',
		content: './docs/intro.md'
	}, {
		name: 'Component List',
		components: [
			'./src/examples/PaginatorUsage.jsx',
			'./src/examples/MarkdownPreview.jsx',
			'./src/examples/TreeShapeUsage.jsx'
		]
		// sections: [{
		// 	name: 'Paginator',
		// 	components: ['./src/examples/Paginator.usage.jsx']
		// }, {
		// 	name: 'Markdown Parser',
		// 	components: ['./src/examples/MarkdownParser.usage.jsx']
		// }, {
		// 	name: 'Tree List',
		// 	components: ['./src/examples/TreeShape.usage.jsx']
		// }]
	}]
}