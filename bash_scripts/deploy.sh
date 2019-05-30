npm install
echo "Running linters..."
eslint pages/
htmlhint pages/ index.html
echo "Linters Passed!"

echo "Running tests..."
npm run btest
echo "All tests passed!"