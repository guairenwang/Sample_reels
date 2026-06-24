import React from 'react'
import { profile } from '../data/profile'
import './Navbar.css'

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#skills' },
  { label: '联系', href: '#contact' }
]

export default function Navbar({ scrolled }) {
  const [active, setActive] = React.useState('#hero')
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive('#' + entry.target.id)
        }
      })
    }, { rootMargin: '-40% 0px -55% 0px' })

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`site-header ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
      <a className="brand-mark" href="#hero">
        <span className="brand-dot"></span>
        <span>{profile.englishName}</span>
      </a>
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link ${active === link.href ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>联系我</a>
      </nav>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="菜单">
        <span className={`menu-bar ${menuOpen ? 'open' : ''}`} />
      </button>
    </header>
  )
}
