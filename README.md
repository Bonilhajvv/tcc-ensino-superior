# TCC – Docentes no Ensino Superior

Site em React + Vite que reúne as visualizações interativas do TCC.
Cada visualização é um HTML do Plotly em `public/viz/<tipo>/`, exibido em um `<iframe>`.

## Rodar localmente

```bash
npm install
npm run dev
```

## Atualizar as visualizações

Depois de gerar os HTMLs de novo nos notebooks do projeto `visu`:

```bash
npm run sincronizar   # copia ../visu/visualizacoes/**/output/*.html para public/viz/
```

Se for uma visualização nova, adicione também uma linha em `src/visualizacoes.js`.

## Deploy

Publicado na Vercel: cada push na branch `main` gera um novo deploy.
