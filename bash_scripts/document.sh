echo "Generating JS docs"

if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    if !(./node_modules/.bin/esdoc;) then
        echo "docs failed to generate"
        exit -1
    else
        echo "docs generated"
    fi
else 
    # for our purposes, windows
    if !(.\\node_modules\\.bin\\esdoc;) then
        echo "docs failed to generate"
        exit -1
    else
        echo "docs generated"
    fi
fi