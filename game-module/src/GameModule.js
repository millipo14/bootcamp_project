class GameModule extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const srcGame = this.getAttribute('src')
        const shadow = this.attachShadow({ mode: 'open' })

        shadow.innerHTML = `
        <style>
            .overlay {
                position: fixed;
                inset: 0;

                width: 100%;
                height: 100%;

                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(2px);

                display: flex;
                justify-content: center;
                align-items: center;

                overflow: hidden;
                z-index: 10000;

                animation: fadeIn 0.3s ease forwards;
            }

            .loader {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                inset: 0;
                transition: opacity 0.4s ease;
            }
            .spinner {
                width: 50px;
                height: 50px;
                border: 3px solid #d6d6d6;;
                border-radius: 50%;
                border-top-color: #000;
                animation: spin 1s ease-in-out infinite;
            }
            .gameFrame {
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);

                opacity: 0;
                transition:opacity 0.3s ease;
            }

            .gameFrame.loaded {
                opacity: 1;
                transform: scale(1);
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        </style>


        <section class='overlay'>
            <div class='loader'>
                <div class='spinner'></div>
            </div>
            <iframe class='gameFrame'></iframe>
        </section>
        `

        const loader = shadow.querySelector('.loader')
        const iframe = shadow.querySelector('.gameFrame')

        this.lockPage()
        this.lockPageEvents()
        iframe.src = srcGame

        this.handleMessage = (e) => {
            if (e.origin !== new URL(srcGame).origin) return
            switch (e.data.type) {
                case 'READY':
                    loader.style.opacity = '0'
                    iframe.classList.add('loaded')
                    break
                case 'CLOSE':
                    this.remove()
                    break
            }
        }

        window.addEventListener('message', this.handleMessage)
    }

    lockPageEvents() {
        this.preventScroll = (e) => {
            e.preventDefault()
        }

        window.addEventListener('wheel', this.preventScroll, {
            passive: false
        })

        window.addEventListener('touchmove', this.preventScroll, {
            passive: false
        })

        window.addEventListener('gesturestart', this.preventScroll, {
            passive: false
        })
    }

    removePageEvents() {
        window.removeEventListener('wheel', this.preventScroll)
        window.removeEventListener('touchmove', this.preventScroll)
        window.removeEventListener('gesturestart', this.preventScroll)
    }

    lockPage() {
        const scrollWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollWidth}px`
    }

    unlockPage() {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
    }

    disconnectedCallback() {
        this.unlockPage()
        this.removePageEvents()

        window.removeEventListener(
            'message',
            this.handleMessage
        )
    }
}

customElements.define('game-module', GameModule)