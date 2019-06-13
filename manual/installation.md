# Installation

To import these web components, call `import "pandoras-box";` from a JavaScript module.

For example, you could have a Javascript module **index.js** which contains `import "pandoras-box";`, and an HTML file with `<script type="module" src="index.js"></script>` in the **head** section.

The upload and comment components also require the following code in the **head** section:

```
<script src="https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-storage.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-database.js"></script>
```

### Running Code with JS Modules

If you aren't familiar with how to run code with JS modules, this is for you.

One way of running code with JS modules is by using owc-dev-server. Run `npm i owc-dev-server`. 

Then add `"start": "owc-dev-server -o"` to the **"scripts"** object in your **package.json**. The **"scripts"** object in the default **package.json** with this line added should look like this:

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "owc-dev-server -o"
}
```
Whenever you want to run your code, run `npm start` .
