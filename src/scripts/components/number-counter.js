const CountUp = window.CountUp;

class NumberCounter extends HTMLElement {
    constructor() {
        super();
        this.countNumber();
    
    }

    countNumber(){
        let section_counter = document.querySelector('.achieved__card-wrapper');


        let CounterObserver = new IntersectionObserver((entries, observer) => {
                let [entry] = entries;
                if (!entry.isIntersecting) return;
            
                const counter = this.firstElementChild;
                function UpdateCounter() {
                    const targetNumber = +counter.dataset.targetNumber;
                    const initialNumber = +counter.innerText;
                    const incPerCount = targetNumber / (targetNumber > 500 ? 50 : 200);
                    if (initialNumber < targetNumber) {
                        counter.innerText = Math.ceil(initialNumber + incPerCount);
                        setTimeout(UpdateCounter, targetNumber > 500 ? 40 : targetNumber < 10 ? 350 : 120);
                    }
                    else {
                        counter.innerText = targetNumber;
                    }
                }
                UpdateCounter();
                observer.unobserve(section_counter)

            },
            {
                root: null,
                threshold: window.innerWidth > 768 ? 0.4 : 0.3,
            }
        ); 
        CounterObserver.observe(section_counter);
    }
}

customElements.define("number-counter", NumberCounter)
