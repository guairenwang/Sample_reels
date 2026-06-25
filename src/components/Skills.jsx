import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/profile'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const skillsRef = useRef(null)

  useEffect(() => {
    const el = skillsRef.current
    if (!el) return
    const sts = []

    sts.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.section-heading .eyebrow'),
          { scale: 2, opacity: 0, x: -60 },
          { scale: 1, opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.section-heading h2, .section-heading p'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.skill-cloud'),
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.skill-cloud-tag'),
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out', stagger: 0.04 }
        )
      }
    }))

    return () => sts.forEach(s => s.kill())
  }, [])

  return (
    <section id="skills" className="section-block skills-section" ref={skillsRef}>
      <div className="section-heading">
        <p className="eyebrow">Toolkit</p>
        <h2>技术能力</h2>
        <p>从 MCU 底层开发到上层应用，从硬件焊接调试到竞赛实战，构建完整的嵌入式工程师能力体系。</p>
      </div>

      <div className="skill-cloud">
        <span className="skill-cloud-tag">STM32全系列</span>
        <span className="skill-cloud-tag">FreeRTOS</span>
        <span className="skill-cloud-tag">嘉立创EDA</span>
        <span className="skill-cloud-tag">PCB焊接调试</span>
        <span className="skill-cloud-tag">C / C++</span>
        <span className="skill-cloud-tag">Python</span>
        <span className="skill-cloud-tag">Java</span>
        <span className="skill-cloud-tag">Django</span>
        <span className="skill-cloud-tag">SpringBoot</span>
        <span className="skill-cloud-tag">CSS</span>
        <span className="skill-cloud-tag">HTML</span>
        <span className="skill-cloud-tag">JavaScript</span>
        <span className="skill-cloud-tag">MyBatis</span>
        <span className="skill-cloud-tag">MySQL</span>
        <span className="skill-cloud-tag">SQL Server</span>
        <span className="skill-cloud-tag">Vue / Vite / React</span>
        <span className="skill-cloud-tag">UART / I2C / SPI</span>
        <span className="skill-cloud-tag">步进电机驱动</span>
        <span className="skill-cloud-tag">西门子S7-1200</span>
        <span className="skill-cloud-tag">AutoCAD电气图</span>
        <span className="skill-cloud-tag">Git</span>
        <span className="skill-cloud-tag">Altium Designer</span>
        <span className="skill-cloud-tag">SolidWorks基础</span>
        <span className="skill-cloud-tag">Linux基础</span>
      </div>
    </section>
  )
}
