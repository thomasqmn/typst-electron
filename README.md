# Typst-electron
An adapted version of [typst.app](https://typst.app/) with [nativefier](https://github.com/nativefier/nativefier).

## Install 
You need to build it with `nativefier`:
1. Install [Nodejs](https://nodejs.org)
2. Install `nativefier` with the command `npm i -g nativefier`
3. Download and build this code with the command : `nativefier "https://typst.app/" -n Typst --inject index.js --inject inject.css`
4. In the new dir, execute the typst app. That's it

To use the exportPdf function, you will need [typst cli](https://github.com/typst/typst).

## Why ?
I don't find any good editor of typst except the website itself but there is no offline version of it.

## Shortcuts to use locally
| shortcut | function |
| --- | --- |
| ctrl+s | saveToFile: Save a file in the projects directory |
| ctrl+e | saveToPng: Export the file into a png |
| ctrl+q | saveToPdf: Export the file into a pdf (need typst cli) |

## Config

To edit the config you'll need to edit variables in the start of the files:
- NAMES: give the object link to this class
- dir: the dir with all of your projects
- shortcuts: change the key to change the shortcut
