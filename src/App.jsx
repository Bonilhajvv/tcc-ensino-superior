import { useEffect, useState } from 'react'
import { caminho, tipos, visualizacoes } from './visualizacoes'

function idDaUrl() {
  const id = window.location.hash.slice(1)
  return visualizacoes.some((v) => v.id === id) ? id : visualizacoes[0].id
}

const gruposDe = (tipo) => [
  ...new Set(visualizacoes.filter((v) => v.tipo === tipo && v.grupo).map((v) => v.grupo)),
]

// Botão de sanfona: a seta gira quando a seção está aberta.
function Sanfona({ nivel, aberta, aoClicar, children }) {
  return (
    <button type="button" className={`sanfona ${nivel}`} aria-expanded={aberta} onClick={aoClicar}>
      <span className="seta" aria-hidden="true">▸</span>
      {children}
    </button>
  )
}

export default function App() {
  const [ativa, setAtiva] = useState(idDaUrl)
  const [carregada, setCarregada] = useState(null)
  // Só uma categoria fica aberta por vez; nas que têm grupos (UTFPR), só um grupo por vez.
  const [aberto, setAberto] = useState(() => {
    const v = visualizacoes.find((item) => item.id === idDaUrl())
    return { tipo: v.tipo, grupo: v.grupo ?? null }
  })

  useEffect(() => {
    const aoMudarHash = () => {
      const v = visualizacoes.find((item) => item.id === idDaUrl())
      setAtiva(v.id)
      setAberto({ tipo: v.tipo, grupo: v.grupo ?? null })
    }
    window.addEventListener('hashchange', aoMudarHash)
    return () => window.removeEventListener('hashchange', aoMudarHash)
  }, [])

  const atual = visualizacoes.find((v) => v.id === ativa)
  const carregando = carregada !== ativa

  const alternarTipo = (tipo) =>
    setAberto(
      aberto.tipo === tipo
        ? { tipo: null, grupo: null }
        : { tipo, grupo: atual.tipo === tipo ? (atual.grupo ?? null) : (gruposDe(tipo)[0] ?? null) },
    )
  const alternarGrupo = (grupo) => setAberto({ ...aberto, grupo: aberto.grupo === grupo ? null : grupo })
  const link = (v) => (
    <a key={v.id} href={`#${v.id}`} className={v.id === ativa ? 'ativo' : ''}>
      {v.titulo}
    </a>
  )

  return (
    <div className="layout">
      <aside className="menu">
        <h1>Visualizações</h1>
        {tipos.map((tipo) => {
          const itens = visualizacoes.filter((v) => v.tipo === tipo)
          const grupos = gruposDe(tipo)
          return (
            <nav key={tipo}>
              <Sanfona nivel="tipo" aberta={aberto.tipo === tipo} aoClicar={() => alternarTipo(tipo)}>
                {tipo}
              </Sanfona>
              {aberto.tipo === tipo &&
                (grupos.length === 0
                  ? itens.map(link)
                  : grupos.map((grupo) => (
                      <div key={grupo} className="grupo">
                        <Sanfona nivel="grupo" aberta={aberto.grupo === grupo} aoClicar={() => alternarGrupo(grupo)}>
                          {grupo}
                        </Sanfona>
                        {aberto.grupo === grupo && itens.filter((v) => v.grupo === grupo).map(link)}
                      </div>
                    )))}
            </nav>
          )
        })}
      </aside>

      <main className="conteudo">
        <header>
          <h2>{atual.grupo ? `${atual.grupo}: ${atual.titulo}` : atual.titulo}</h2>
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
