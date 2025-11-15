import { useEffect, useState } from 'react'
import api from '../services/api'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'


export default function EstadisticasPersonales() {
  const [juegos, setJuegos] = useState([])
  const [resenas, setResenas] = useState([])
  const [stats, setStats] = useState({
    totalJuegos: 0,
    completados: 0,
    pendientes: 0,
    totalResenas: 0,
    promedioPuntuacion: 0,
    totalHorasJugadas: 0,
    recomendados: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resJuegos = await api.get('/juegos')
        const dataJuegos = resJuegos.data || []
        const resResenas = await api.get('/reviews')
        const dataResenas = resResenas.data || []
        const completados = dataJuegos.filter(j => j.completado).length
        const pendientes = dataJuegos.length - completados
        const totalResenas = dataResenas.length
        const promedioPuntuacion =
          totalResenas > 0
            ? (
                dataResenas.reduce((acc, r) => acc + (r.puntuacion || 0), 0) /
                totalResenas
              ).toFixed(2)
            : 0
        const totalHorasJugadas = dataResenas.reduce(
          (acc, r) => acc + (r.horasJugadas || 0),
          0
        )
        const recomendados = dataResenas.filter(r => r.recomendaria === true).length
        setJuegos(dataJuegos)
        setResenas(dataResenas)
        setStats({
          totalJuegos: dataJuegos.length,
          completados,
          pendientes,
          totalResenas,
          promedioPuntuacion,
          totalHorasJugadas,
          recomendados
        })
      } catch (err) {
        console.error('Error al cargar estadísticas:', err)
      }
    }
    fetchData()
  }, [])

  const chartData = [
    { name: 'Completados', value: stats.completados },
    { name: 'Pendientes', value: stats.pendientes }
  ]

  const COLORS_PASTEL = ['#B8E6B8', '#FFD4B3']

  return (
    <div className="estadisticas-container">
      <h2 className="estadisticas-titulo">Estadísticas Personales</h2>
      <div className="estadisticas-grid">
        <div className="stat-card">
          <h3>Total de juegos</h3>
          <p>{stats.totalJuegos}</p>
        </div>
        <div className="stat-card">
          <h3>Completados</h3>
          <p>{stats.completados}</p>
        </div>
        <div className="stat-card">
          <h3>Pendientes</h3>
          <p>{stats.pendientes}</p>
        </div>
        <div className="stat-card">
          <h3>Porcentaje completado</h3>
          <p>
            {stats.totalJuegos > 0
              ? ((stats.completados / stats.totalJuegos) * 100).toFixed(1)
              : 0}
            %
          </p>
        </div>
        <div className="stat-card">
          <h3>Reseñas totales</h3>
          <p>{stats.totalResenas}</p>
        </div>
        <div className="stat-card">
          <h3>Promedio puntuación</h3>
          <p>{stats.promedioPuntuacion} / 5</p>
        </div>
        <div className="stat-card">
          <h3>Horas jugadas</h3>
          <p>{stats.totalHorasJugadas}</p>
        </div>
        <div className="stat-card">
          <h3>Recomendados</h3>
          <p>{stats.recomendados}</p>
        </div>
      </div>
      <div className="estadisticas-chart">
        <PieChart width={350} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS_PASTEL[index]}
                stroke="#ffffff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              color: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}
          />
          <Legend />
        </PieChart>
      </div>

    </div>
  )
}
