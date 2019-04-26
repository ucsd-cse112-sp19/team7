echo "linting JS"
npx eslint script/* --fix
echo "linting HTML"
npx htmlhint *.html
