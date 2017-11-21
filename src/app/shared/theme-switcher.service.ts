export class ThemeSwitcherService {
  themeLink: HTMLLinkElement;
  private baseHref = 'css/';
  private activeTheme: Theme;

  private deeppurpleAmber = new Theme('deeppurpleAmber', '#673ab7', '#ffd740');
  private purpleGreen = new Theme('purpleGreen', '#7b1fa2', '#69f0ae');

  constructor() {
    this.themeLink = document.createElement('link');
    this.themeLink.rel = 'stylesheet';
    const savedTheme = <any>localStorage.getItem('theme');
    this.setActiveTheme(savedTheme ? savedTheme : 'deeppurpleAmber');
  }

  setActiveTheme(themeName: 'deeppurpleAmber' | 'purpleGreen') {
    this.activeTheme = this[themeName];
    this.themeLink.href = this.baseHref + this.activeTheme.name + '.bundle.css';
    localStorage.setItem('theme', this.activeTheme.name);
  }

  getName() {
    return this.activeTheme.name;
  }

  getPrimaryColor() {
    return this.activeTheme.primary;
  }

  getAccentColor() {
    return this.activeTheme.accent;
  }

  appendToHead() {
    document.head.appendChild(this.themeLink);
  }
}

class Theme {
  constructor(public name: string, public primary: string, public accent: string) {}
}
