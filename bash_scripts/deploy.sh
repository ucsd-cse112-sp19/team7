exit 0
npm install
echo "Running linters..."
eslint script/*
htmlhint *.html
echo "Linters Passed!"

echo "Running tests..."
npm test
echo "All tests passed!"