
# toggleTheme.js

## **Um script de mudança de tema entre claro/escuro no gnome.**

### **Guia** 
> [Guia do arquivo settings.json](#guiaSettings) <br>
> [Configurações necessárias](#requirements) <br>
> [Como conseguir a sintaxe da extensão](#getsyntax)

### **Uso** <br>
rode o script com o comando `node toggleTheme.js`


**<h3 name="guiaSettings">Guia do arquivo settings.json:</h3>**
```
{
  "enables": {                                            // esse objeto enables é para habilitar ou desabilitar algumas features
    "changeIconTheme": true,                              // mudar o tema de icones conforme o tema
    "changeAppTheme": true,                               // mudar o tema de aplicativos conforme o tema
    "changeDockTheme": true,                              // mudar o tema da dock conforme o tema (se você usa alguma extensão de dock, como o dash-to-dock)
    "changeBlurTheme": true,                              // mudar a cor do blur conforme o tema (se você usar o blur-my-shell)
    "changeBackgroundImage": false                        // mudar a imagem de fundo conforme o tema
  },
  "dockThemeOpacity": 0.2,                                // opacidade da dock
  "blurThemeOpacity": 0.2,                                // opacidade do blur
  "appTheme": {                                           // nome dos temas de aplicativos do modo escuro (dark) e do modo claro (light)
    "light": "Mint-Y-Blue",
    "dark": "Mint-Y-Dark-Blue"
  },
  "iconTheme": {                                          // nome dos temas de icones do modo escuro e do modo claro
    "light": "Mint-Y-Legacy-Blue",
    "dark": "Mint-Y-Legacy-Dark-Blue"
  },
  "backgroundImage": {                                    // caminho para as imagens de fundo
    "path": "/home/$USERNAME/Imagens/Auto Wallpapers/",
    "lightImage": "BigSur Light.jpeg",                    // nome da imagem do modo claro
    "darkImage": "BigSur Dark.jpeg"                       // nome da imagem do modo escuro
  },
  "config": {                                             // são algumas configurações
    "dockTheme": {
      "extensionName": "dash-to-dock",                    // nome da extensão da dock
      "opacityOnColor": false,                            // se a opacidade vai estar no mesmo comando da cor
      "syntax": "'rgb($COLOR,$COLOR,$COLOR)'",            // a sintaxe, como descubrir a sintaxe da extensão mais abaixo
      "white": 255,                                       // o valor da cor branca nessa extensão, no caso as cores vão de 0 a 255.
      "black": 0,                                         // o valor da cor preta nessa extensão
      "keys": {                                           // as chaves para mudar os valores, também será ensinado como descubrir abaixo.
        "backgroundColor": "background-color",            // key para mudar o fundo/background
        "opacity": "background-opacity"                   // key para mudar a opacidade
      }
    },
    "blurTheme": {
      "extensionName": "blur-my-shell",                   // nome da extensão do blur, provavelmente nunca irá mudar
      "opacityOnColor": true,                             // nesse caso a opacidade fica no mesmo comando de mudar a cor.
      "white": 1,                                         // o valor da cor branca nessa extensão, no caso as cores vão de 0 a 1.
      "black": 0,                                         // o valor da cor preta nessa extensão
      "syntax": "($COLOR, $COLOR, $COLOR, $OPACITY)",     // a sintaxe dessa extensão
      "keys": {
        "backgroundColor": "color"
      }
    }
  }
}
```

<br>

**<h3 name="requirements">Configurações necessárias/Requisitos</h3>**
#### Se você quiser ativar a troca de tema na dock:
* Nas configurações da sua dock, vá até a aba de aparência, ative a configuração de customizar a cor do dash e coloque em qualquer cor.
* Coloque a opção de customizar opacidade no fixo/fixed e coloque qualquer quantidade de opacidade.
#### Se você tiver a extensão [Blur my Shell](https://extensions.gnome.org/extension/3193/blur-my-shell/) e quiser ativar a troca de tema:
* Nas configurações do Blur my Shell, coloque o brilho em 1,00
* Na cor, troque para qualquer cor e mude a opacidade (fica na parte inferior do menu de trocar a cor) para qualquer quantidade desde que não seja totalmente transparente.

Depois de tudo isso, provavelmente sua interface estará feia/estranha, mas depois que rodar o script tudo ficará normal.

<br>

**<h3 name="getsyntax">Como conseguir a sintaxe e as chaves para mudar os valores</h3>**
Para conseguir a sintaxe, você deve rodar o seguinte comando no terminal: `dconf dump /org/gnome/shell/extensions/(nome da extensão)/` (substitua nome da extensão pela extensão e sem usar parênteses)

<br>

Um exemplo de retorno (fiz com a extensão blur my shell):
```
[/]
brightness=1.0
color=(1.0, 1.0, 1.0, 0.20000000000000001)
sigma=60
```
Como você pode ver, a key para mudar o fundo e a opacidade é `color`.<br>
A sintaxe é `($COLOR, $COLOR, $COLOR, $OPACITY)`, porque os três primeiros valores são as cores e o último é a opacidade.

<br>

Um outro exemplo de retorno, dessa vez com a extensão dash-to-dock:
```
[/]
background-color='rgb(255,255,255)'
background-opacity=0.20000000000000001
click-action='minimize-or-previews'
custom-background-color=true
custom-theme-shrink=true
dash-max-icon-size=32
disable-overview-on-startup=true
dock-fixed=true
dock-position='BOTTOM'
height-fraction=0.90000000000000002
hot-keys=false
preferred-monitor=-2
preferred-monitor-by-connector='HDMI-A-0'
preview-size-scale=0.10000000000000001
show-apps-at-top=true
show-mounts=false
transparency-mode='FIXED'
```
Dessa vez, a key para mudar a color é `background-color` e, como a opacidade não está no mesmo comando da cor, a chave da opacidade é `background-opacity`. <br>
A sintaxe é `'rgb($COLOR, $COLOR, $COLOR)'` **(se houver aspas, elas devem ser incluidas na chave do JSON)**, porque os valores são apenas as cores. <br>
Obs.: A chave `opacityOnColor` deve ser `false`, porque não tem a opção de opacidade na parte da cor.
