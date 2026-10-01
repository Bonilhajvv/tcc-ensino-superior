// Copia os HTMLs gerados pelos notebooks (visu/visualizacoes/**/output/*.html)
// para public/viz/<tipo>/, de onde o React carrega cada um em um <iframe>.
// Uso: npm run sincronizar [-- /caminho/para/visu/visualizacoes]
// O tipo vem da pasta de primeiro nível: geospatial_raca -> geospatial, streamgraph -> streamgraph.
import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { basename, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const origem = process.argv[2] ?? fileURLToPath(new URL('../../visu/visualizacoes/', import.meta.url))
const destino = fileURLToPath(new URL('../public/viz/', import.meta.url))

function buscarHtmls(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) return buscarHtmls(caminho)
    return caminho.includes('/output/') && nome.endsWith('.html') ? [caminho] : []
  })
}

rmSync(destino, { recursive: true, force: true })
mkdirSync(destino, { recursive: true })
for (const arquivo of buscarHtmls(origem)) {
  const tipo = relative(origem, arquivo).split(sep)[0].split('_')[0]
  cpSync(arquivo, join(destino, tipo, basename(arquivo)))
  console.log('copiado:', `${tipo}/${basename(arquivo)}`)
}
