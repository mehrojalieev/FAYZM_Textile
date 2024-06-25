const fs = require("fs");
const fsAsync = require("fs/promises");

const COMPONENTS_PATH = __dirname + "/src/scripts/components";
const SNIPPETS_PATH = __dirname + "/snippets";
const mode = process.env.NODE_ENV || "development";

populateComponents();
mode === "development" && watch();

function watch() {
  fs.watch(COMPONENTS_PATH, async (eventType, filename) => {
    if (eventType === "rename") {
      await populateComponents();
    }
  });
}

async function populateComponents() {
  const files = await getComponents();
  const components = {};

  files.forEach((file) => {
    components[file] = getAssetUrl(file);
  });

  writeSnippet(components);

  return components;
}

async function getComponents() {
  const files = await fsAsync.readdir(COMPONENTS_PATH);
  return files
    .filter((file) => file.includes("js"))
    .map((file) => file.replace(".js", ""));
}

function getAssetUrl(name) {
  return `{{ 'js-component-${name}.min.js' | asset_url }}`;
}

function writeSnippet(components) {
  const file = `
<script type="text/javascript">
  window.components = ${JSON.stringify(components, null, 2)}
</script>
  `;
  fs.writeFile(`${SNIPPETS_PATH}/components.liquid`, file, (err) => {
    if (err) console.log(err);
    else console.log("Components list is generated!");
  });
}
