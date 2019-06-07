const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// add your components here
const components = ["Checkbox", "Comment", "Rater"];
const componentsEntries = {};

componentsEntries["pages/core-hello/script/core-hello"] = "./pages/core-hello/script/core-hello.js";
components.forEach((component) => {
  componentsEntries[`pages/element/script/${component}`] = `./pages/element/script/${component}.js`;
});

module.exports = {
  entry: {
    ...componentsEntries
  },
  module: {
    rules: [
            
      // use the scss loaders (first compile into css, then use css and style loader)
      {
        test: /\.scss$/,
        loader: "raw-loader!sass-loader"
      },
      // use the css loaders (first load the css, then inject the style)
      {
        test: /\.css$/,
        loader: "raw-loader"
      },
      // use the url loaders
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        loader: "url-loader"
      },
      // use the html loader
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
};