import { Helmet } from 'react-helmet'
import Hero from '~/components/Home/Hero'
import Specials from '~/components/Home/Specials'
import GetStarted from '~/components/Home/GetStarted'
import styles from '~/components/Home/styles.module.css'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);
export function Component() {
  const main = useRef(null)
  const hero = useRef(null)
  const aboutErden = useRef(null)
  const attractions = useRef(null)
  const specials = useRef(null)
  const journey = useRef(null)
  const gs = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
    })
    tl.from(hero.current, {
      opacity: 0
    })

    tl.from(aboutErden.current, {
      yPercent: 20,
      opacity: 0,
      scrollTrigger: {
        trigger: aboutErden.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    })

    tl.from(attractions.current, {
      yPercent: 20,
      opacity: 0,
      scrollTrigger: {
        trigger: attractions.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    })

    tl.from(specials.current, {
      xPercent: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: specials.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    })

    tl.from(journey.current, {
      yPercent: 20,
      opacity: 0,
      scrollTrigger: {
        trigger: journey.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    })

    tl.from(gs.current, {
      yPercent: 20,
      opacity: 0,
      scrollTrigger: {
        trigger: gs.current,
        start: "top bottom",
        end: "top center",
        scrub: 1,
      }
    })
  })

  return (
    <>
      <Helmet>
        <title>MOKSHA IX | Home</title>
      </Helmet>
      <main className={styles['home']} ref={main}>
        <div ref={hero}>
          <Hero />
        </div>
        <div ref={specials}>
          <Specials />
        </div>
        <div ref={gs}>
          <GetStarted />
        </div>
      </main>
    </>
  )
}

Component.displayName = 'Home'
