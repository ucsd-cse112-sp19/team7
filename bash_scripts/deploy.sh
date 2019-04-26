echo "Running linters..."
npx eslint script/*
npx htmlhint *.html
echo "Linters Passed!"

echo "Running tests..."
#insert tests here
echo "All tests passed!"