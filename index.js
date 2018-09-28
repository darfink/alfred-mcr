const path = require('path');
const alfy = require('alfy');
const globby = require('globby');

async function getRecipes() {
  return (await globby('./recipes/*.png'))
    .map(recipe => ({
      type: 'file',
      title: path.basename(recipe, '.png'),
      arg: recipe,
      quicklookurl: path.resolve(recipe),
      icon: {
        path: './icons/' + path.basename(recipe),
      },
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

(async () => {
  const recipes = await getRecipes();
  alfy.output(alfy.inputMatches(recipes, 'title'));
})();
