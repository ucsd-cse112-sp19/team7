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
