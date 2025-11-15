import { useState, useEffect } from 'react'

export default function Navegacion() {
  const [activo, setActivo] = useState('agregar')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['agregar', 'juegos', 'resenas', 'estadisticas']
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActivo(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    setActivo(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="navegacion-tabs">
      <button
        className={`tab-button ${activo === 'agregar' ? 'activo' : ''}`}
        onClick={() => scrollToSection('agregar')}
      >
        Agregar
      </button>
      <button
        className={`tab-button ${activo === 'juegos' ? 'activo' : ''}`}
        onClick={() => scrollToSection('juegos')}
      >
        Juegos
      </button>
      <button
        className={`tab-button ${activo === 'resenas' ? 'activo' : ''}`}
        onClick={() => scrollToSection('resenas')}
      >
        Reseñas
      </button>
      <button
        className={`tab-button ${activo === 'estadisticas' ? 'activo' : ''}`}
        onClick={() => scrollToSection('estadisticas')}
      >
        Estadísticas
      </button>
    </nav>
  )
}

