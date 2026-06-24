import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { profile } from '../data/profile'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(el.querySelector('.eyebrow'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(el.querySelector('h1'),
      { clipPath: 'inset(0 0 100% 0)', y: 50, scaleX: 0.75, transformOrigin: 'left center' },
      { clipPath: 'inset(0 0 0% 0)', y: 0, scaleX: 1, duration: 0.9, ease: 'power4.out' },
      0.2
    )
    .fromTo(el.querySelector('.copy'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.45
    )
    .fromTo(el.querySelectorAll('.hero-actions > *'),
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 },
      0.65
    )
    .fromTo(el.querySelectorAll('.hero-meta-item'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      0.9
    )
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.008
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.strokeStyle = 'rgba(21,21,21,0.07)'
      ctx.lineWidth = 1
      const gridSize = 36
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      const nodes = [
        { x: 0.15, y: 0.25, color: '#ff775f', r: 3 },
        { x: 0.35, y: 0.55, color: '#92cfff', r: 3 },
        { x: 0.62, y: 0.28, color: '#87e6c0', r: 3 },
        { x: 0.80, y: 0.65, color: '#f2d95c', r: 3 },
        { x: 0.22, y: 0.78, color: '#ff775f', r: 2.5 },
        { x: 0.70, y: 0.85, color: '#92cfff', r: 2.5 },
        { x: 0.88, y: 0.20, color: '#87e6c0', r: 2.5 },
        { x: 0.45, y: 0.12, color: '#f2d95c', r: 2.5 },
      ]

      nodes.forEach(n => {
        const nx = n.x * w + Math.sin(time + n.x * 10) * 8
        const ny = n.y * h + Math.cos(time + n.y * 10) * 6
        const dx = mx * w - nx
        const dy = my * h - ny
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repel = Math.max(0, 1 - dist / 200)
        const fx = nx - dx * repel * 0.3
        const fy = ny - dy * repel * 0.3

        ctx.beginPath()
        ctx.arc(fx, fy, n.r + repel * 3, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.globalAlpha = 0.5 + repel * 0.5
        ctx.fill()
        ctx.globalAlpha = 1

        nodes.forEach((m, j) => {
          if (j <= nodes.indexOf(n)) return
          const mx2 = m.x * w + Math.sin(time + m.x * 10) * 8
          const my2 = m.y * h + Math.cos(time + m.y * 10) * 6
          const d = Math.sqrt((fx - mx2) ** 2 + (fy - my2) ** 2)
          if (d < 250) {
            ctx.beginPath()
            ctx.moveTo(fx, fy)
            ctx.lineTo(mx2, my2)
            ctx.strokeStyle = `rgba(21,21,21,${0.03 * (1 - d / 250)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      const traces = [
        { x1: 0.1, y1: 0.3, x2: 0.4, y2: 0.5, color: 'rgba(255,119,95,' },
        { x1: 0.5, y1: 0.2, x2: 0.85, y2: 0.45, color: 'rgba(146,207,255,' },
        { x1: 0.3, y1: 0.7, x2: 0.75, y2: 0.8, color: 'rgba(135,230,192,' },
      ]

      traces.forEach(t => {
        const progress = (Math.sin(time * 0.6 + traces.indexOf(t)) + 1) / 2
        const lx = t.x1 * w + (t.x2 - t.x1) * w * progress
        const ly = t.y1 * h + (t.y2 - t.y1) * h * progress

        ctx.beginPath()
        ctx.arc(lx, ly, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = t.color + '0.6)'
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(t.x1 * w, t.y1 * h)
        ctx.lineTo(t.x2 * w, t.y2 * h)
        ctx.strokeStyle = t.color + '0.08)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const onMove = (e) => {
      const r = canvas.parentElement.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - r.left) / r.width
      mouseRef.current.y = (e.clientY - r.top) / r.height
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="motion-canvas" aria-hidden="true">
        <canvas ref={canvasRef} className="motion-canvas-canvas" />
      </div>

      <div className="hero-content">
        <p className="eyebrow">嵌入式工程师 / MCU 开发</p>
        <h1>
          <span className="hero-greeting">应届生</span>
          <span className="hero-name">{profile.name}</span>
        </h1>
        <p className="copy">
          熟悉 STM32 全系列开发 · FreeRTOS · 电机驱动 · 多次国家级机器人竞赛获奖
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href="#projects">查看作品</a>
          <a className="button button--ghost" href="#contact">联系合作</a>
        </div>
      </div>

      <div className="hero-meta" aria-label="Portfolio highlights">
        <div className="hero-meta-item">
          <span>覆盖方向</span>
          <strong>MCU开发 / 硬件设计 / PLC / 电气控制</strong>
        </div>
        <div className="hero-meta-item">
          <span>核心能力</span>
          <strong>嵌入式软硬件联调 + 竞赛实战经验</strong>
        </div>
      </div>
    </section>
  )
}
