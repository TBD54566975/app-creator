#!/usr/bin/env node
import main from '../dist/index.js';
import buildWebUI from '../dist/build-webui.js';

if (process.argv.length > 2 && process.argv[2] == "build-web-ui") {
    buildWebUI(process.argv[3] || '.');
} else {
    main('https://github.com/TBD54566975/tbd-examples.git', 'app-creator');
}