// const { readdirSync, readFileSync, existsSync, statSync } = require('node:fs')
import {
  mkdirSync,
  writeFileSync,
  readdirSync,
  readFileSync,
  existsSync,
  statSync,
} from "fs";

const dest = "webui/public/data";

export default async function buildWebUI(src: string) {
  mkdirSync(dest, { recursive: true });

  const templates = [];
  for (const language of readdirSync(src)) {
    const languageDirectory = src + "/" + language;

    if (!statSync(languageDirectory).isDirectory()) {
      continue;
    }

    const languageDest = dest + "/" + language;
    mkdirSync(languageDest, { recursive: true });

    for (const template of readdirSync(languageDirectory)) {
      const directory = languageDirectory + "/" + template;
      if (!existsSync(directory + "/.tbd-example.json")) {
        continue;
      }

      const config = JSON.parse(
        readFileSync(directory + "/.tbd-example.json", "utf8")
      );

      const name = config.name || template;
      const path = language + "/" + template;

      const readme = readFileSync(directory + "/README.md");
      writeFileSync(
        languageDest + "/" + template + ".json",
        JSON.stringify({
          name: name,
          path: path,
          language: language,
          description: readme.toString(),
        })
      );

      templates.push({
        path: path,
        name: name,
        language: language,
      });
    }
  }

  writeFileSync(dest + "/templates.json", JSON.stringify(templates));
}
