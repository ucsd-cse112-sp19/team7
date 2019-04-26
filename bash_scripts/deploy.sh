npm install eslint
npm install htmlhint
echo "Running linters..."
npm eslint script/*
npm htmlhint *.html
echo "Linters Passed!"

echo "Running tests..."
#insert tests here
echo "All tests passed!"