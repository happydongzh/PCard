class Card {
    constructor(con, options = {
        cardNum: 7,
        size: {
            w: 400,
            h: 570
        }
    }) {
        this.container = typeof con === 'string' ? document.getElementById(con) : con;
        this.options = options;
        this.yesTune = new Audio('./sd_0.wav');
        this.noTune = new Audio('./1.ogg');
        this.init();

    }

    static randomChar() {
        let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        return chars[Math.floor(Math.random() * 1000) % chars.length];
    }
    static randomColor() {
        let colors = [
            'rgba(255, 0, 0, 1)',
            'rgba(255, 165, 0,1)',
            'rgba(255, 255, 0, 1)', 
            'rgba(0, 255, 0, 1)', 
            'rgba(0, 127, 255, 1)', 
            'rgba(0, 0, 255, 1)', 
            'rgba(139, 0, 255, 1)'
        ];
        return colors[Math.floor(Math.random() * 100) % colors.length];
    }

    init() {
        //this.audio = window.
        this.createDom();
    }

    createDom() {
        if (!this.container.classList.contains('cards')) {
            this.container.classList.add('cards');
        }
        this.cards = [];
        for (let i = 0; i < this.options.cardNum; i++) {
            let c = document.createElement('DIV');
            c.classList.add('card');
            c.classList.add('container');
            c.style.width = this.options.w + 'px';
            c.style.height = this.options.h + 'px';
            c.style.backgroundColor = Card.randomColor();
            c.innerHTML = '<div>' + Card.randomChar() + '</div>';
            this.container.appendChild(c);
            this.cards.push(c);
        }

        document.addEventListener('keydown', (e) => {
            console.log(String.fromCharCode(e.keyCode));
            let targetChar = this.container.firstElementChild.firstElementChild.textContent.trim().toUpperCase(),
                inputChar = String.fromCharCode(e.keyCode).toUpperCase();
            if (targetChar === inputChar) {
                let t = this.cards.find(elmt => { return elmt == this.container.firstElementChild });
                t.addEventListener('animationend', e => {
                    this.container.parentElement.classList.remove('right');
                    t.classList.remove('turnRight');
                    t.firstElementChild.textContent = Card.randomChar();
                    t.style.backgroundColor = Card.randomColor();
                    this.container.appendChild(t);
                });
                this.yesTune.play();
                this.container.parentElement.classList.add('right');
                t.classList.add('turnRight');
            } else {
                let t = this.cards.find(elmt => { return elmt == this.container.firstElementChild });
                t.addEventListener('animationend', e => {
                    this.container.parentElement.classList.remove('wrong');
                    t.classList.remove('turnLeft');
                    t.firstElementChild.textContent = Card.randomChar();
                    t.style.backgroundColor = Card.randomColor();
                    this.container.appendChild(t);
                });
                this.noTune.play();
                this.container.parentElement.classList.add('wrong');
                t.classList.add('turnLeft');
            }

        }, false);
    }

}