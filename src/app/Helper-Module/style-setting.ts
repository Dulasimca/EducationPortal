export class StyleSetting {
    constructor() { }
    setNavLayoutAtLogin() {
        if (document.getElementById('side-nav-bar') !== null && document.getElementById('main-layout') !== undefined
            && document.getElementById('side-nav-bar') !== undefined && document.getElementById('main-layout') !== null) {
            document.getElementById('side-nav-bar').style.display = 'none';
            document.getElementById('main-layout').className = 'layout-wrapper-initial';
            // document.getElementById('main-top-bar').className = 'menubar-bar-text-set';
            // document.getElementById('main-top-bar-user').className = 'menubar-bar-info-set';
        }
    }

    setMainLayout() {
        if (document.getElementById('side-nav-bar') !== null && document.getElementById('main-layout') !== undefined
            && document.getElementById('side-nav-bar') !== undefined && document.getElementById('main-layout') !== null) {
            document.getElementById('side-nav-bar').style.display = 'flex';
            document.getElementById('main-layout').className = 'layout-wrapper-main';
        }
    }
}