//#region src/GameModule.js
var e = class extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		let e = this.getAttribute("src"), t = this.attachShadow({ mode: "open" });
		t.innerHTML = "\n        <style>\n            .overlay {\n                position: fixed;\n                inset: 0;\n\n                width: 100%;\n                height: 100%;\n\n                background: rgba(0, 0, 0, 0.5);\n                backdrop-filter: blur(2px);\n\n                display: flex;\n                justify-content: center;\n                align-items: center;\n\n                overflow: hidden;\n                z-index: 10000;\n\n                animation: fadeIn 0.3s ease forwards;\n            }\n\n            .loader {\n                position: absolute;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                inset: 0;\n                transition: opacity 0.4s ease;\n            }\n            .spinner {\n                width: 50px;\n                height: 50px;\n                border: 3px solid #d6d6d6;;\n                border-radius: 50%;\n                border-top-color: #000;\n                animation: spin 1s ease-in-out infinite;\n            }\n            .gameFrame {\n                width: 100%;\n                height: 100%;\n                border: none;\n                border-radius: 12px;\n                box-shadow: 0 20px 40px rgba(0,0,0,0.4);\n\n                opacity: 0;\n                transition:opacity 0.3s ease;\n            }\n\n            .gameFrame.loaded {\n                opacity: 1;\n                transform: scale(1);\n            }\n\n            @keyframes spin {\n                to { transform: rotate(360deg); }\n            }\n            @keyframes fadeIn {\n                from { opacity: 0; }\n                to { opacity: 1; }\n            }\n        </style>\n\n\n        <section class='overlay'>\n            <div class='loader'>\n                <div class='spinner'></div>\n            </div>\n            <iframe class='gameFrame'></iframe>\n        </section>\n        ";
		let n = t.querySelector(".loader"), r = t.querySelector(".gameFrame");
		this.lockPage(), this.lockPageEvents(), r.src = e, this.handleMessage = (t) => {
			if (t.origin === new URL(e).origin) switch (t.data.type) {
				case "READY":
					n.style.opacity = "0", r.classList.add("loaded");
					break;
				case "CLOSE":
					this.remove();
					break;
			}
		}, window.addEventListener("message", this.handleMessage);
	}
	lockPageEvents() {
		this.preventScroll = (e) => {
			e.preventDefault();
		}, window.addEventListener("wheel", this.preventScroll, { passive: !1 }), window.addEventListener("touchmove", this.preventScroll, { passive: !1 }), window.addEventListener("gesturestart", this.preventScroll, { passive: !1 });
	}
	removePageEvents() {
		window.removeEventListener("wheel", this.preventScroll), window.removeEventListener("touchmove", this.preventScroll), window.removeEventListener("gesturestart", this.preventScroll);
	}
	lockPage() {
		let e = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = "hidden", document.body.style.paddingRight = `${e}px`;
	}
	unlockPage() {
		document.body.style.overflow = "", document.body.style.paddingRight = "";
	}
	disconnectedCallback() {
		this.unlockPage(), this.removePageEvents(), window.removeEventListener("message", this.handleMessage);
	}
};
customElements.define("game-module", e);
//#endregion
