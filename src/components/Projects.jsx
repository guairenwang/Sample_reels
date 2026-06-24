import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../data/profile'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const videoUrls = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
  'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'
]

const projectList = [
  {
    id: 0,
    title: profile.projects[0].title,
    type: '毕业设计 / 嵌入式系统',
    description: profile.projects[0].description,
    tags: profile.projects[0].tags,
    video: videoUrls[0],
    color: 'project-visual--sky',
    award: null,
    themeLabel: '双臂魔方机器人',
    themeBg: 'cube'
  },
  {
    id: 1,
    title: profile.awards[0].name,
    type: '竞赛项目',
    description: profile.awards[0].role,
    tags: ['STM32F1', 'HAL库', '下位机开发', '精准位置控制'],
    video: videoUrls[1],
    color: 'project-visual--mint',
    award: profile.awards[0].level,
    themeLabel: 'RoboCup 全国赛',
    themeBg: 'trophy'
  },
  {
    id: 2,
    title: profile.awards[3].name,
    type: '竞赛项目',
    description: profile.awards[3].role,
    tags: ['C板', 'HAL库', 'FreeRTOS', 'M2006无刷电机', '车辆遥控'],
    video: videoUrls[2],
    color: 'project-visual--coral',
    award: profile.awards[3].level,
    themeLabel: 'RoboMaster',
    themeBg: 'robot'
  }
]

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [slideOutIndex, setSlideOutIndex] = useState(null)
  const [videoPlaying, setVideoPlaying] = useState({})
  const projectsRef = useRef(null)

  const active = projectList[activeIndex]
  const others = projectList.filter((_, i) => i !== activeIndex)

  const switchTo = (index) => {
    if (index === activeIndex || animating) return
    setAnimating(true)
    setSlideOutIndex(activeIndex)
    setTimeout(() => {
      setActiveIndex(index)
      setSlideOutIndex(null)
      setAnimating(false)
      ScrollTrigger.refresh()
    }, 380)
  }

  const toggleVideo = (id, prefix = 'pv') => {
    const v = document.getElementById(`${prefix}-${id}`)
    if (!v) return
    if (v.paused) { v.play(); setVideoPlaying(p => ({...p, [id]: true})) }
    else { v.pause(); setVideoPlaying(p => ({...p, [id]: false})) }
  }

  useEffect(() => {
    const el = projectsRef.current
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
      trigger: el.querySelector('.project-showcase'),
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.project-card.featured'),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.project-showcase'),
      start: 'top 72%',
      onEnter: () => {
        gsap.fromTo(el.querySelector('.project-card.featured .project-visual'),
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 0.8, ease: 'power3.out' }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.project-card-body'),
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.project-card-body > *'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
        )
      }
    }))

    sts.push(ScrollTrigger.create({
      trigger: el.querySelector('.project-thumbnails'),
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(el.querySelectorAll('.project-thumb'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
        )
      }
    }))

    return () => sts.forEach(s => s.kill())
  }, [])

  return (
    <section id="projects" className="section-block" ref={projectsRef}>
      <div className="section-heading">
        <p className="eyebrow">Selected Work</p>
        <h2>代表作品</h2>
        <p>竞赛与毕设中的核心项目，涵盖嵌入式系统、机器人控制、计算机视觉等方向。</p>
      </div>

      {/* Featured showcase */}
      <div className="project-showcase">
        <div className={`project-card featured ${activeIndex === slideOutIndex ? 'slide-out' : ''}`}>
          <div className={`project-visual ${active.color}`} onClick={() => toggleVideo(active.id, 'featured')} style={{ cursor: 'pointer' }}>
            {!videoPlaying[active.id] && (
              <div className="project-theme">
                <div className="project-visual-badge">{String(activeIndex + 1).padStart(2, '0')}</div>
                <div className={`project-theme-bg project-theme-bg--${active.themeBg}`} />
                <span className="project-theme-label">{active.themeLabel}</span>
              </div>
            )}
            <div className="project-video-wrap" style={{ display: videoPlaying[active.id] ? 'block' : 'none' }}>
              <video
                id={`featured-${active.id}`}
                src={active.video}
                onEnded={() => setVideoPlaying(p => ({...p, [active.id]: false}))}
                style={{ display: videoPlaying[active.id] ? 'block' : 'none', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                playsInline
              />
            </div>
            {!videoPlaying[active.id] && (
              <div className="project-play-btn">
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="8,5 19,12 8,19" /></svg>
                </div>
              </div>
            )}
          </div>
          <div className="project-card-body">
            {active.award && <span className={`competition-badge level-${active.award}`} style={{ alignSelf: 'flex-start', marginBottom: 8 }}>{active.award}</span>}
            <p className="project-type">{active.type}</p>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            {active.tags.length > 0 && (
              <div className="project-tags">
                {active.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail picker */}
      <div className="project-thumbnails">
        {others.map((item, i) => {
          const realIndex = projectList.indexOf(item)
          return (
            <div key={item.id} className="project-thumb" onClick={() => switchTo(realIndex)}>
              <div className={`project-thumb-visual ${item.color}`}>
                <span className="project-thumb-num">{String(realIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className="project-thumb-body">
                <p className="project-thumb-type">{item.type}</p>
                <h4>{item.title.length > 28 ? item.title.slice(0, 28) + '…' : item.title}</h4>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
