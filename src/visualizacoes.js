// Cada item aponta para public/viz/<tipo>/<id>.html (copiado por scripts/copiar-visualizacoes.mjs).
// O menu agrupa pelo tipo, na ordem em que os tipos aparecem aqui.
export const visualizacoes = [
  { tipo: 'geospatial', id: 'geospatial_raca_ies', titulo: 'Raça/cor nas IES por estado' },
  { tipo: 'geospatial', id: 'geospatial_bubble_ies', titulo: 'IES no mapa (bolhas)', pesado: true },

  { tipo: 'streamgraph', id: 'streamgraph_sexo', titulo: 'Docentes por sexo' },
  { tipo: 'streamgraph', id: 'streamgraph_sexo_homens', titulo: 'Docentes homens' },
  { tipo: 'streamgraph', id: 'streamgraph_sexo_mulheres', titulo: 'Docentes mulheres' },
  { tipo: 'streamgraph', id: 'streamgraph_raca_docentes', titulo: 'Docentes por raça/cor' },
  {
    tipo: 'streamgraph',
    id: 'streamgraph_raca_docentes_preta_amarela_indigena',
    titulo: 'Docentes pretos, amarelos e indígenas',
  },
]

export const tipos = [...new Set(visualizacoes.map((v) => v.tipo))]

export const caminho = (v) => `/viz/${v.tipo}/${v.id}.html`
