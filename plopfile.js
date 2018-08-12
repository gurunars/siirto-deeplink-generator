module.exports = function (plop) {
	// controller generator
	plop.setGenerator('StatelessComponent', {
		description: 'TypeScript based React component',
		prompts: [{
			type: 'input',
			name: 'name',
			message: 'component name'
		}],
		actions: [
			{
				type: 'add',
				path: 'src/{{name}}/index.tsx',
				templateFile: '.templates/StatelessComponent/index.hbs'
			}, {
				type: 'add',
				path: 'src/{{name}}/story.tsx',
				templateFile: '.templates/StatelessComponent/story.hbs'
			}
		]
	});
};