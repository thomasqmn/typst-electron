const fs = require("fs");
const path = require("path");
const exec = require("util").promisify(require("node:child_process").exec);

const NAMES = {
  nameProject: "_is-file_1ibfh_26",
  nameFile: "_active_18p1p_230", // I've tracked every piece of the CodeMirror editor and I can't find the active name, if someone has an idea, submit it
  editor: "cm-content",
  warn: "_warn_1ibfh_110", // for css purpose only
};

const dir = "./projects";

const shortcuts = {
  e: () => saveToPng(),
  s: () => saveToFile(),
  q: () => saveToPdf(),
};

function handleKeyPress(event) {
  if (!event.ctrlKey) return;
  shortcuts[event.key.toLowerCase()]?.();
}

function getNameProject() {
  return document
    .getElementsByClassName(NAMES.nameProject)?.[0]
    ?.textContent?.trim();
}

function getNameFile() {
  return document
    .getElementsByClassName(NAMES.nameFile)?.[0]
    ?.textContent?.trim();
}

function saveToPng() {
  const canvas = document.getElementsByTagName("canvas")?.[0];
  if (!canvas) return;
  const data = Buffer.from(
    canvas.toDataURL().replace("data:image/png;base64,", ""),
    "base64"
  );
  const filename = getNameFile();
  if (!filename) {
    errorExplorer();
  }
  const projectName = getNameProject();
  if (!projectName) return;
  const pathToDir = `${dir}/${projectName}`;
  fs.mkdirSync(pathToDir, { recursive: true });
  const pathToFile = `${pathToDir}/${filename}.png`;
  fs.writeFileSync(pathToFile, data);
  snackbar(`File exported to ${path.join(__dirname, pathToFile)}`);
}

function exportCode() {
  const text = document.getElementsByClassName(NAMES.editor)[0].outerText;
  const projectName = getNameProject();
  if (!projectName) return;
  const filename = getNameFile();
  if (!filename) errorExplorer();
  const pathToDir = `${dir}/${projectName}`;
  fs.mkdirSync(pathToDir, { recursive: true });
  const pathToFile = `${pathToDir}/${filename}`;
  fs.writeFileSync(pathToFile, text);
  return pathToFile;
}

async function saveToPdf() {
  const pathToFile = exportCode();
  const { stdout, stderr } = await exec(`typst c "${pathToFile}"`);
  if (stderr) return console.log(stderr);
  console.log(stdout);
  snackbar(`File save and exported in ${path.join(pathToFile, "../")}`);
}

function saveToFile() {
  const pathToFile = exportCode();
  snackbar(`File save to ${path.join(__dirname, pathToFile)}`);
}

function errorExplorer() {
  throw snackbar(
    "To save a file, you need to open the file explorer (drawer button on the left)"
  );
}

window.addEventListener("keyup", handleKeyPress, true);

// Snack bar from https://www.w3schools.com/howto/howto_js_snackbar.asp (simple use and vanilla)

let lastTimeout;
function snackbar(msg) {
  const x = document.getElementById("snackbar");
  x.className = "show";
  x.innerText = msg;
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

const div = document.createElement("div");
div.id = "snackbar";
document.body.appendChild(div);
