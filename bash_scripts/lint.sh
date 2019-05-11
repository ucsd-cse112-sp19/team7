echo "linting JS"
if !(npx eslint script/*;) then
    echo "please run the following command to autofix errors (or go manually fix them) and re-commit:"
    echo "  npx eslint script/* --fix"
    exit -1
else
    echo "JS lint succeeded!"
    echo "linting HTML"
    if !(npx htmlhint *.html;) then
        echo "please go manually fix errors and re-commit"
        exit -1
    else
        echo "HTML lint succeeded!"
    fi
fi