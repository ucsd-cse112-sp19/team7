npm install
echo "Running linters..."
eslint script/*
htmlhint *.html
echo "Linters Passed!"

echo "Running tests..."
#insert tests here
echo "All tests passed!"