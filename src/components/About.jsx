import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/profile'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const [activeTab, setActiveTab] = React.useState('experience')
  const aboutRef = useRef(null)
  const stRefs = useRef([])

  const handleTabChange = (key) => {
    setActiveTab(key)
    setTimeout(() => ScrollTrigger.refresh(), 60)
  }

  useEffect(() => {
    const el = aboutRef.current
    if (!el) return
    const sts = []

    // Eyebrow fly-in
    sts.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.about-copy .eyebrow'),
          { scale: 2, opacity: 0, x: -60 },
          { scale: 1, opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
      }
    }))

    // Section heading h2 + bio paragraph (staggered)
    sts.push(ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.about-copy h2, .about-copy p:last-child'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }
        )
      }
    }))

    // Stats panel: count-up numbers
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.about-panel'),
      start: 'top 80%',
      onEnter: () => {
        const metrics = el.querySelectorAll('.metric strong')
        metrics.forEach(metric => {
          const targetText = metric.textContent.trim()
          const targetValue = parseFloat(targetText)
          if (isNaN(targetValue)) return
          const suffix = targetText.replace(/[\d.]/g, '')
          const obj = { val: 0 }
          gsap.to(obj, {
            val: targetValue, duration: 1.6, ease: 'power3.out',
            onUpdate: () => { metric.textContent = Math.round(obj.val) + suffix }
          })
        })
      }
    }))

    // Metric cards stagger
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.about-panel'),
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.metric'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
        )
      }
    }))

    // Tab bar
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.about-tabs'),
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.tab-bar'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        )
      }
    }))

    // Timeline items stagger
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.tab-content'),
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.timeline-item'),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
        )
      }
    }))

    // Award strip cards stagger
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.tab-content'),
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.strip-card'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
        )
      }
    }))

    // Education card
    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.tab-content'),
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.edu-card'),
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
        )
      }
    }))

    return () => sts.forEach(s => s.kill())
  }, [])

  return (
    <section id="about" className="section-block about-section" ref={aboutRef}>
      <div className="about-copy">
        <p className="eyebrow">关于我</p>
        <h2>自动化专业应届毕业生，<br />嵌入式开发实战经验。</h2>
        <p>{profile.bio}</p>
      </div>

      <div className="about-panel">
        <div className="metric">
          <span>项目</span>
          <strong>{profile.stats.projects}</strong>
        </div>
        <div className="metric">
          <span>获奖</span>
          <strong>{profile.stats.awards}</strong>
        </div>
        <div className="metric">
          <span>专利</span>
          <strong>{profile.stats.patents}</strong>
        </div>
        <div className="metric">
          <span>实习经历</span>
          <strong>{profile.stats.experience}</strong>
        </div>
      </div>

      <div className="about-tabs" style={{ gridColumn: '1 / -1', marginTop: 32 }}>
        <div className="tab-bar">
          {[
            { key: 'experience', label: '实习经历' },
            { key: 'awards', label: '获奖 & 专利' },
            { key: 'education', label: '教育背景' }
          ].map(tab => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'experience' && (
            <div className="timeline">
              {profile.experiences.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="card-3d"
                    onMouseMove={(e) => {
                      const card = e.currentTarget
                      const r = card.getBoundingClientRect()
                      const x = (e.clientX - r.left) / r.width - 0.5
                      const y = (e.clientY - r.top) / r.height - 0.5
                      card.style.setProperty('--rx', `${-y * 20}deg`)
                      card.style.setProperty('--ry', `${x * 20}deg`)
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty('--rx', '0deg')
                      e.currentTarget.style.setProperty('--ry', '0deg')
                    }}
                  >
                    <div className="card-3d-glow" />
                    <div className="timeline-card card-3d-content">
                      <div className="timeline-header">
                        <h4>{exp.company}</h4>
                        <span className="timeline-period">{exp.period}</span>
                      </div>
                      <p className="timeline-position">{exp.position}</p>
                      <ul className="timeline-details">
                        {exp.details.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'awards' && (
            <div className="awards-strip">
              <h4 className="award-category-title">竞赛奖项</h4>
              {profile.awards.map((award, i) => {
                const dates = ['2023.10', '2023.08', '2023.12', '2024.05']
                const awardImgs = ['/award-1.jpg', '/award-2.jpg', '/award-3.png', '/award-4.png']
                return (
                  <div key={i} className="strip-card"
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add('hover')
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
                      e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px')
                    }}
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
                      e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px')
                    }}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
                  >
                    <div className="strip-card-bg" />
                    <img className="strip-card-img" src={awardImgs[i]} alt="" draggable={false} />
                    <div className="strip-card-content">
                      <span className="strip-badge">{award.level}</span>
                      <div className="strip-card-text">
                        <h5>{award.name}</h5>
                        <p>{award.role}</p>
                      </div>
                      <span className="strip-date">{dates[i]}</span>
                    </div>
                  </div>
                )
              })}
              <h4 className="award-category-title" style={{ marginTop: 28 }}>专利</h4>
              {profile.patents.map((patent, i) => (
                <div key={`p${i}`} className="strip-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add('hover')
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
                    e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px')
                  }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px')
                    e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px')
                  }}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
                >
                  <div className="strip-card-bg" />
                  <img className="strip-card-img" src="/award-5.png" alt="" draggable={false} />
                  <div className="strip-card-content">
                    <span className="strip-icon-wrap">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </span>
                    <div className="strip-card-text">
                      <h5>{patent.name}</h5>
                      <p>{patent.type}</p>
                    </div>
                    <span className="strip-date">2025.06</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="card-3d edu-3d"
              onMouseMove={(e) => {
                const card = e.currentTarget
                const r = card.getBoundingClientRect()
                const x = (e.clientX - r.left) / r.width - 0.5
                const y = (e.clientY - r.top) / r.height - 0.5
                card.style.setProperty('--rx', `${-y * 15}deg`)
                card.style.setProperty('--ry', `${x * 15}deg`)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--rx', '0deg')
                e.currentTarget.style.setProperty('--ry', '0deg')
              }}
            >
              <div className="card-3d-glow" />
              <div className="edu-card card-3d-content">
                <div className="edu-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </div>
                <div className="edu-info">
                  <h4>{profile.education.school}</h4>
                  <p className="edu-major">{profile.education.major} · {profile.education.degree}</p>
                  <p className="edu-period">{profile.education.period}</p>
                  <div className="edu-courses">
                    {profile.education.courses.map((c, i) => (
                      <span key={i} className="course-tag">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
