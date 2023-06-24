const execSync = require('child_process').execSync;
const settings = require('./settings.json');
const { username } = require('os').userInfo();

function getTemaAtual() {
  const result = execSync(
    `gsettings get org.gnome.desktop.interface color-scheme`
  ).toString();
  return result.toLowerCase().includes('dark') ? 'dark' : 'light';
}

function mudaTema(temaProp) {
  const tema = temaProp === 'dark' ? 'light' : 'dark';
  const codigoBase = 'gsettings set org.gnome.desktop.interface';
  if (settings.enables.changeAppTheme) {
    const appTheme = ` gtk-theme ${settings.appTheme[tema]}`;
    execSync(codigoBase + appTheme);
  }
  if (settings.enables.changeIconTheme) {
    const iconTheme = ` icon-theme ${settings.iconTheme[tema]}`;
    execSync(codigoBase + iconTheme);
  }
  const prefer = tema === 'dark' ? 'prefer-dark' : 'default';
  execSync(`${codigoBase} color-scheme ${prefer}`);
  execSync(`${codigoBase} gtk-color-scheme ${prefer}`);
}

function changeExtensionTheme(configName, opacity, temaProp) {
  const config = settings.config[configName];
  if (!config) return;
  const tema = temaProp === 'dark' ? 'white' : 'black';
  let codigoTema = config.syntax.replaceAll('$COLOR', config[tema].toFixed(1));
  const dconfBase = `dconf write /org/gnome/shell/extensions/${config.extensionName}`;
  if (config.opacityOnColor) {
    codigoTema = codigoTema.replaceAll('$OPACITY', opacity);
  } else {
    execSync(`${dconfBase}/${config.keys.opacity} "${opacity}"`);
  }
  execSync(`${dconfBase}/${config.keys.backgroundColor} "${codigoTema}"`);
}

function changeBackground(temaProp) {
  const backgroundObject = settings.backgroundImage;
  const tema = temaProp === 'dark' ? 'light' : 'dark';
  const command = `gsettings set org.gnome.desktop.background picture-uri${
    tema === 'dark' ? '-dark' : ''
  } '${backgroundObject.path.replaceAll('$USERNAME', username)}${
    backgroundObject[tema + 'Image']
  }'`;
  execSync(command);
}

module.exports = {
  getTemaAtual,
  mudaTema,
  changeExtensionTheme,
  changeBackground,
};
