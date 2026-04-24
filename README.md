# PeggleFlash2

The Adobe Flash version of Peggle running in Ruffle with custom level support.

[![Play PeggleFlash2](https://img.shields.io/badge/Play%20PeggleFlash2-orange)](https://sinceohsix.github.io/PeggleFlash2)

This site features a custom loader that lets you override level data and backgrounds, allowing you to load custom levels.

Level backgrounds are 440x378 `.jpg` images. Level data files are XML formatted files compressed into a .zip archive. The game loads levels from the names set in the [`stages.cfg`](./stages.cfg) file. In this instance, every level 'id' is set to `funnel` so any level you upload will always be loaded.

In the future, I hope to add:
- Level Editor
- Level Browser
- Ability to replace multiple levels at once
- .zip level packs
- and more, maybe...
