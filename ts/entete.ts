export default class Entete {

  private readonly _idPartieEnCours: string;
  private readonly _notification: HTMLElement | null;

  public constructor(idPartieEnCours: string) {
    this._idPartieEnCours = idPartieEnCours;
    this._notification = document.getElementById("notification");

    this.majH1();
  }

  private majH1()
  {
    if (null === this._notification || !this._idPartieEnCours.startsWith('super-apero-2022')) {
      return;
    }

    let superAperoTitre = document.createElement('div');
    superAperoTitre.setAttribute('id', 'super-apero-title');

    superAperoTitre.innerHTML = `<a href="/super-apero.html">
        Super Apéro 2022
        #${this._idPartieEnCours.split('-').slice(-1)}`
    ;

    this._notification.parentNode?.insertBefore(superAperoTitre, this._notification);
  }
}
