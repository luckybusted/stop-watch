const template = document.createElement('template');

template.innerHTML = `
  <style>
    .sw-container {
      padding: 8px 0;
    }
 
    .hrs {
        color: red;
    }

    .min {
        color: green;
    }

    .scd {
        color: blue;
    }
  </style>
 
  <div class="sw-container">
    <div class="sw-timer">
        <span class="hrs">00</span> :
        <span class="min">00</span> :
        <span class="scd">00</span>
    </div>

    <div class="sw-controlls">
        <button data-sw-toggle>Start</button>
        <button data-sw-reset>Reset</button> 
    </div>
  </div>
`;

class Stopwatch extends HTMLElement {
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$toggle = this._shadowRoot.querySelector('[data-sw-toggle]');
        this.$reset = this._shadowRoot.querySelector('[data-sw-reset]');

        this.$timer = this._shadowRoot.querySelector('.sw-container .sw-timer');
        this.$hrsTimer = this._shadowRoot.querySelector('.sw-container .sw-timer .hrs');
        this.$minTimer = this._shadowRoot.querySelector('.sw-container .sw-timer .min');
        this.$secTimer = this._shadowRoot.querySelector('.sw-container .sw-timer .scd');

        this.$running = false;

        this.$buildTimer = () => {

            let hours = Math.floor(this.$seconds / 3600),
                minutes = Math.floor((this.$seconds - hours * 3600)  / 60),
                seconds = this.$seconds - (minutes * 60) - (hours * 3600);
    
            this.$hrsTimer.innerHTML = hours;
            this.$secTimer.innerHTML = seconds;
            this.$minTimer.innerHTML = minutes;
        };

        this.$timerInterval;
        this.$seconds = 0;
    } 

    connectedCallback(){
        const initTime = this.getAttribute('time');
        this.$seconds = initTime ? initTime : 0;

        this.$buildTimer();

        this.$toggle.addEventListener('click', () => {
            this.$running === false ? this.startTimer() : this.stopTimer();
        });

        this.$reset.addEventListener('click', () => {
            this.stopTimer();
            this.$seconds = 0;
            this.$hrsTimer.innerHTML = '00';
            this.$secTimer.innerHTML = '00';
            this.$minTimer.innerHTML = '00';
        });
    }

    disconnectedCallback(){
        this.$toggle.removeEventListener('click');
        this.$reset.removeEventListener('click');
    }           

    changeTimer = () => {
        this.$seconds++;
        this.$buildTimer();
    }

    startTimer = () => {
        this.$timerInterval = setInterval(this.changeTimer, 1000);
        this.$running = true;
        this.$toggle.innerHTML = 'Stop';
    }

    stopTimer = () => {
        clearInterval(this.$timerInterval);
        this.$running = false;
        this.$toggle.innerHTML = 'Start';
    }
    
}

window.customElements.define('stop-watch', Stopwatch);