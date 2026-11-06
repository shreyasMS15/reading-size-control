# Reading Size Control

A small JavaScript component that lets readers enlarge a section of text without changing the rest of the interface. It uses native radio buttons and can remember a choice in the current browser. It is intended for reading screens in educational web apps and Android apps that render lessons in a WebView.

## Try the demo

Run this command from the project folder, then open <http://localhost:8000>.

```sh
python3 -m http.server 8000
```

Choose a text size, or use Tab to reach the options and the arrow keys to change the selection. Reload the page to check that your preference persists. The sample lesson and component have no external dependencies.

## Add it to a reading screen

Copy `reading-size.js` and `reading-size.css` into your project. Use this markup as a starting point.

```html
<link rel="stylesheet" href="./reading-size.css">

<fieldset id="lesson-size" class="reading-options" hidden>
  <legend>Reading text size</legend>
  <div class="reading-options__choices">
    <label><input type="radio" name="lesson-size" value="100" checked> 100%</label>
    <label><input type="radio" name="lesson-size" value="150"> 150%</label>
    <label><input type="radio" name="lesson-size" value="200"> 200%</label>
  </div>
</fieldset>

<article id="lesson" class="reading-content">
  <p>Your lesson text goes here.</p>
</article>

<script type="module">
  import { mountReadingSize } from "./reading-size.js";

  const unmount = mountReadingSize({
    controls: document.querySelector("#lesson-size"),
    content: document.querySelector("#lesson"),
    storageKey: "my-app.lesson-size",
  });
</script>
```

- Give each group a unique radio name. Choose distinct whole-number values from 100 to 200 and mark one option as checked.
- Use relative sizes such as `em` for headings and other text inside the reading area so they scale with the surrounding text.
- Omit `storageKey` to keep the choice only for the current view. When provided, the key stores only the chosen percentage in local browser storage. The component sends no network requests.
- Call the returned cleanup function before removing the controls in a single-page app.
- In an Android WebView, use a page that can load JavaScript modules and enable JavaScript for your trusted content. Persistence also requires DOM storage. Test both the largest setting and the device's accessibility settings on your target devices.

## License

MIT. See [LICENSE](LICENSE).
