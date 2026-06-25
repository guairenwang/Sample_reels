import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/profile'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const contactRef = useRef(null)

  useEffect(() => {
    const el = contactRef.current
    if (!el) return
    const sts = []

    sts.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.contact-copy .eyebrow'),
          { scale: 2, opacity: 0, x: -60 },
          { scale: 1, opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.contact-copy h2, .contact-copy p'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.contact-actions'),
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.contact-actions > *'),
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.site-footer'),
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.site-footer'),
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' }
        )
      }
    }))

    return () => sts.forEach(s => s.kill())
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      const t = document.getElementById('toast')
      if (t) { t.textContent = '已复制'; t.classList.add('is-visible'); setTimeout(() => t.classList.remove('is-visible'), 2000) }
    })
  }

  return (
    <section id="contact" className="section-block contact-section" ref={contactRef}>
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>一起做一个更好的嵌入式方案。</h2>
        <p>欢迎联系求职机会、项目合作或技术交流。</p>
      </div>

      <div className="contact-actions">
        <button className="button button--ghost" type="button" onClick={() => copyToClipboard(profile.email)}>
          QQ邮箱 {profile.email}
        </button>
        <a className="button button--ghost" href={`tel:${profile.phone}`}>
          电话 {profile.phone}
        </a>
      </div>

      <div className="site-footer">
        <span>&copy; 2026 吴明康</span>
        <span>本网页采用 Vite + React 使用 Claude Code + Deepseek V4 实现</span>
      </div>

      <div className="toast" id="toast" role="status" aria-live="polite"></div>
    </section>
  )
}
