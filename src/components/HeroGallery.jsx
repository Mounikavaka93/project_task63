import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { sports } from "../data/sports"
import Photo from "./Photo"

const STEP = 360 / sports.length

function sportIndex(angle) {
  const turns = ((-angle % 360) + 360) % 360
  return Math.round(turns / STEP) % sports.length
}

export default function HeroGallery() {
  const sceneRef = useRef(null)
  const tiltRef = useRef(null)
  const ringRef = useRef(null)
  const angleRef = useRef(0)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return undefined

    const setDepth = () => {
      const depth = window.innerWidth < 640 ? 148 : 220
      scene.style.setProperty("--hero-depth", `${depth}px`)
    }

    setDepth()
    window.addEventListener("resize", setDepth)
    return () => window.removeEventListener("resize", setDepth)
  }, [])

  useEffect(() => {
    let frame = 0
    let last = performance.now()

    const tick = (now) => {
      const delta = Math.min(32, now - last)
      last = now
      if (!pausedRef.current) {
        angleRef.current = (angleRef.current + delta * 0.012) % 360
        const next = sportIndex(angleRef.current)
        setIndex((current) => (current === next ? current : next))
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${angleRef.current}deg)`
      }
      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function applyAngle(nextAngle) {
    angleRef.current = nextAngle
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${nextAngle}deg)`
    }
    setIndex(sportIndex(nextAngle))
  }

  function turn(direction) {
    setPaused(true)
    applyAngle(angleRef.current + direction * STEP)
  }

  function goTo(nextIndex) {
    setPaused(true)
    applyAngle(-nextIndex * STEP)
  }

  function tiltFromPointer(event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !tiltRef.current || !sceneRef.current) return
    const rect = sceneRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    tiltRef.current.style.transform = `rotateX(${(8 - y * 14).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg)`
  }

  function resetTilt() {
    if (tiltRef.current) tiltRef.current.style.transform = "rotateX(8deg)"
  }

  const current = sports[index]

  return (
    <div>
      <div
        ref={sceneRef}
        className="hero-scene"
        role="region"
        aria-roledescription="carousel"
        aria-label="Club sports in 3D"
        onPointerMove={tiltFromPointer}
        onPointerLeave={resetTilt}
      >
        <div ref={tiltRef} className="hero-tilt">
          <div ref={ringRef} className="hero-ring">
            {sports.map((sport, sportIndex) => (
              <Link
                key={sport.slug}
                to={`/sports#${sport.slug}`}
                className="hero-card"
                style={{ transform: `rotateY(${sportIndex * STEP}deg) translateZ(var(--hero-depth, 210px))` }}
                aria-current={sportIndex === index ? "true" : undefined}
              >
                <span className="hero-face">
                  <Photo
                    src={sport.image}
                    alt=""
                    eager={sportIndex === 0}
                    className="h-full w-full object-cover"
                  />
                  <span className="hero-card-label">{sport.name}</span>
                </span>
                <span className="hero-face hero-face-back" aria-hidden="true">
                  {sport.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">On the campus</p>
          <p className="font-display text-3xl font-bold leading-none text-white">{current.name}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => turn(1)}
            className="cursor-pointer rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-cream"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => turn(-1)}
            className="cursor-pointer rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-cream"
          >
            Next
          </button>
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
            className="cursor-pointer rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-cream"
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
      <div className="mt-3 flex gap-2" role="group" aria-label="Choose a sport">
        {sports.map((sport, sportIndex) => (
          <button
            key={sport.slug}
            type="button"
            aria-label={`Show ${sport.name}`}
            aria-current={sportIndex === index ? "true" : undefined}
            onClick={() => goTo(sportIndex)}
            className={`h-2.5 cursor-pointer rounded-full transition ${
              sportIndex === index ? "w-8 bg-ember" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
