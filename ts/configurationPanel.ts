import Configuration from "./entites/configuration";
import PanelManager from "./panelManager";
import Sauvegardeur from "./sauvegardeur";
import { VolumeSon } from "./entites/volumeSon";
import AudioPanel from "./audioPanel";
import { ClavierDisposition } from "./entites/clavierDisposition";
import Input from "./input";
import ThemeManager from "./themeManager";
import { Theme } from "./entites/theme";

export default class ConfigurationPanel {
  private readonly _panelManager: PanelManager;
  private readonly _audioPanel: AudioPanel;
  private readonly _themeManager: ThemeManager;

  private readonly _configBouton: HTMLElement;

  private _input: Input | undefined;

  public constructor(panelManager: PanelManager, audioPanel: AudioPanel, themeManager: ThemeManager) {
    this._panelManager = panelManager;
    this._audioPanel = audioPanel;
    this._themeManager = themeManager;

    this._configBouton = document.getElementById("configuration-config-bouton") as HTMLElement;

    this._configBouton.addEventListener(
      "click",
      (() => {
        this.afficher();
      }).bind(this)
    );
  }

  public afficher(): void {
    let titre = "Configuration";
    let contenu = document.createElement("div");
    let config = Sauvegardeur.chargerConfig() ?? Configuration.Default;
    contenu.appendChild(
      this.genererConfigItem(
        "Volume du son (si activé)",
        [
          { value: VolumeSon.Faible.toString(), label: "Faible" },
          { value: VolumeSon.Normal.toString(), label: "Normal" },
          { value: VolumeSon.Fort.toString(), label: "Fort" },
        ],
        (config.volumeSon ?? Configuration.Default.volumeSon).toString(),
        (event: Event) => {
          event.stopPropagation();
          let volumeSon: VolumeSon = parseInt((event.target as HTMLSelectElement).value);

          this._audioPanel.setVolumeSonore(volumeSon);

          Sauvegardeur.sauvegarderConfig({
            ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
            volumeSon,
          });
        }
      )
    );

    contenu.appendChild(
      this.genererConfigItem(
        "Disposition du clavier",
        [
          { value: ClavierDisposition.Azerty.toString(), label: "AZERTY" },
          { value: ClavierDisposition.Bépo.toString(), label: "BÉPO" },
          { value: ClavierDisposition.Qwerty.toString(), label: "QWERTY" },
          { value: ClavierDisposition.Qwertz.toString(), label: "QWERTZ" },
        ],
        (config.disposition ?? Configuration.Default.disposition).toString(),
        (event: Event) => {
          event.stopPropagation();
          let disposition: ClavierDisposition = parseInt((event.target as HTMLSelectElement).value);

          if (this._input) this._input.dessinerClavier(disposition);

          Sauvegardeur.sauvegarderConfig({
            ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
            disposition,
          });
        }
      )
    );

    contenu.appendChild(
      this.genererConfigItem(
        "Thème",
        [
          { value: Theme.AFUP.toString(), label: "AFUP" },
        ],
        (config.theme ?? Configuration.Default.theme).toString(),
        (event: Event) => {
          event.stopPropagation();
          let theme: Theme = parseInt((event.target as HTMLSelectElement).value);

          this._themeManager.changerCouleur(theme);

          Sauvegardeur.sauvegarderConfig({
            ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
            theme,
          });
        }
      )
    );

    contenu.appendChild(
      this.genererConfigItem(
        "Afficher le temps sur le résumé (à la prochaine partie)",
        [
          { value: false.toString(), label: "Non" },
          { value: true.toString(), label: "Oui" },
        ],
        (config.afficherChrono ?? Configuration.Default.afficherChrono).toString(),
        (event: Event) => {
          event.stopPropagation();
          let afficherChrono = (event.target as HTMLSelectElement).value === true.toString();

          Sauvegardeur.sauvegarderConfig({
            ...(Sauvegardeur.chargerConfig() ?? Configuration.Default),
            afficherChrono,
          });
        }
      )
    );

    this._panelManager.setContenuHtmlElement(titre, contenu);
    this._panelManager.setClasses(["config-panel"]);
    this._panelManager.afficherPanel();
  }

  private genererConfigItem(
    nomConfig: string,
    options: Array<{ value: string; label: string }>,
    valeurChoisie: string,
    onChange?: (event: Event) => void
  ): HTMLElement {
    let div = document.createElement("div");
    div.className = "config-item";

    let label = document.createElement("label");
    label.innerText = nomConfig;
    div.appendChild(label);

    let select = document.createElement("select");
    for (let optionItem of options) {
      let optionElement = document.createElement("option");
      optionElement.value = optionItem.value;
      optionElement.innerText = optionItem.label;
      if (optionItem.value === valeurChoisie) optionElement.selected = true;
      select.appendChild(optionElement);
    }
    if (onChange !== undefined) select.addEventListener("change", onChange);
    div.appendChild(select);

    return div;
  }

  public setInput(input: Input): void {
    this._input = input;
  }
}
