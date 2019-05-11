npm install
echo "Running linters..."
eslint script/*
htmlhint *.html
echo "Linters Passed!"

echo "Running tests..."
npm tests
echo "All tests passed!"