import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUp } from "countup.js";
gsap.registerPlugin(ScrollTrigger)

window.gsap = gsap;
window.CountUp = CountUp;
window.ScrollTrigger = ScrollTrigger;