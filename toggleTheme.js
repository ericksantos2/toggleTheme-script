const {
  getTemaAtual,
  mudaTema,
  changeExtensionTheme,
  changeBackground
} = require('./functions.js');
const settings = require('./settings.json');

function app() {
  const temaAtual = getTemaAtual();
  mudaTema(temaAtual);
  settings.enables.changeDockTheme &&
    changeExtensionTheme('dockTheme', settings.dockThemeOpacity, temaAtual);
  settings.enables.changeBlurTheme && 
    changeExtensionTheme('blurTheme', settings.blurThemeOpacity, temaAtual);
  settings.enables.changeBackgroundImage &&
    changeBackground(temaAtual);
}

app();
