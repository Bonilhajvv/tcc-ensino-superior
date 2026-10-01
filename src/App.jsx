import { useEffect, useState } from 'react'
import { caminho, tipos, visualizacoes } from './visualizacoes'

function idDaUrl() {
  const id = window.location.hash.slice(1)
  return visualizacoes.some((v) => v.id === id) ? id : visualizacoes[0].id
}

export default function App() {
  const [ativa, setAtiva] = useState(idDaUrl)
  const [carregada, setCarregada] = useState(null)

  useEffect(() => {
    const aoMudarHash = () => setAtiva(idDaUrl())
    window.addEventListener('hashchange', aoMudarHash)
    return () => window.removeEventListener('hashchange', aoMudarHash)
  }, [])

  const atual = visualizacoes.find((v) => v.id === ativa)
  const carregando = carregada !== ativa

  return (
    <div className="layout">
      <aside className="menu">
        <h1>Visualizações</h1>
        {tipos.map((tipo) => (
          <nav key={tipo}>
            <h2>{tipo}</h2>
            {visualizacoes
              .filter((v) => v.tipo === tipo)
              .map((v) => (
                <a key={v.id} href={`#${v.id}`} className={v.id === ativa ? 'ativo' : ''}>
                  {v.titulo}
                </a>
              ))}
          </nav>
        ))}
      </aside>

      <main className="conteudo">
        <header>
          <h2>{atual.titulo}</h2>
          <a href={caminho(atual)} target="_blank" rel="noreferrer">
            Abrir em tela cheia ↗
          </a>
        </header>
        <div className="quadro">
          {carregando && (
            <p className="aviso">Carregando{atual.pesado ? ' (arquivo grande, pode demorar)' : ''}…</p>
          )}
          <iframe
            key={atual.id}
            src={caminho(atual)}
            title={atual.titulo}
            onLoad={() => setCarregada(atual.id)}
          />
        </div>
      </main>
    </div>
  )
}
