export default class Entete {

  private readonly _idPartieEnCours: string;
  private readonly _title: HTMLElement | null;

  public constructor(idPartieEnCours: string) {
    this._idPartieEnCours = idPartieEnCours;
    this._title = document.querySelector("header h1");

    this.majH1();
  }

  private majH1()
  {
    if (null === this._title || !this._idPartieEnCours.startsWith('super-apero-2022')) {
      return;
    }

    this._title.innerHTML = 'PUFA <span class="hide-responsive">- Super Apéro 2022 </span>#' + this._idPartieEnCours.split('-').slice(-1);
  }
}
