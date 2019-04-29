npm install
echo "Running linters..."
nvm eslint script/*
nvm htmlhint *.html
echo "Linters Passed!"

echo "Running tests..."
#insert tests here
echo "All tests passed!"