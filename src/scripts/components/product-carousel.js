class ProductCarousel extends HTMLElement {
    constructor() {
        super();
        this.handleHorizontalScroll();
    }

    handleHorizontalScroll(){
        const races = this.querySelector(".carousel");
        console.log(races.offsetWidth)
        function getScrollAmount() {
            let racesWidth = races.scrollWidth + 50;
            return -(racesWidth - window.innerWidth);
        }

        const tween = gsap.to(races, {
            x: getScrollAmount,
            duration: 3,
            ease: "none",
        });


        ScrollTrigger.create({
            trigger: `[data-section-id="${this.dataset.sectionId}"] .product-carousel__wrapper`,
            start:`top 10%`,
            end: () => `+=${(getScrollAmount() + 120) * -1}`,
            pin:true,
            animation: tween,
            scrub:1,
            invalidateOnRefresh:true,
            markers: false
        })
    }
}

customElements.define("product-carousel", ProductCarousel)