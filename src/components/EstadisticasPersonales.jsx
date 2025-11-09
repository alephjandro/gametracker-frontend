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

        const recomendados = dataResenas.filter(r => r.recomendacion).length

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

  const COLORS = ['#00C49F', '#FF8042']

  return (
    <div
      style={{
        margin: '20px auto',
        padding: '20px',
        maxWidth: 700,
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}
    >
      <h2>🎮 Estadísticas Personales</h2>
      <p>
        <strong>Total de juegos:</strong> {stats.totalJuegos}
      </p>
      <p>
        <strong>Completados:</strong> {stats.completados}
      </p>
      <p>
        <strong>Pendientes:</strong> {stats.pendientes}
      </p>
      <p>
        <strong>Porcentaje completado:</strong>{' '}
        {stats.totalJuegos > 0
          ? ((stats.completados / stats.totalJuegos) * 100).toFixed(1)
          : 0}
        %
      </p>

      <p>
        <strong>Total de reseñas:</strong> {stats.totalResenas}
      </p>
      <p>
        <strong>Promedio de puntuación:</strong> {stats.promedioPuntuacion} / 5
      </p>
      <p>
        <strong>Total horas jugadas:</strong> {stats.totalHorasJugadas}
      </p>
      <p>
        <strong>Reseñas recomendadas:</strong> {stats.recomendados}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <PieChart width={350} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}
