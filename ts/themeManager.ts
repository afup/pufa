import Configuration from "./entites/configuration";
import { Theme } from "./entites/theme";

export default class ThemeManager {
  public constructor(config: Configuration) {
    this.changerCouleur(config.theme ?? Configuration.Default.theme);
  }

  public changerCouleur(theme: Theme): void {
    const root = document.documentElement;
    switch (theme) {
      case Theme.AFUP:
        root.style.setProperty("--couleur-bien-place", "#ed0678");
        root.style.setProperty("--couleur-mal-place", "#36a7df");
        root.style.setProperty("--couleur-fond-rgb", "29, 34, 65");
        root.style.setProperty("--couleur-police", "#fff");
        root.style.setProperty("--couleur-bordure", "#fff");
        root.style.setProperty("--couleur-icone", "#fff");
        break;
    }
  }
}
