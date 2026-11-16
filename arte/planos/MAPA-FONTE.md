# Mapa do Brasil das Viagens: de onde vem

Arquivo: `arte/planos/mapa-brasil.svg` (aba Mapa da tela Viagens).

## Fonte dos contornos

- Natural Earth, "Admin 1 - States, Provinces", escala 1:50m (`ne_50m_admin_1_states_provinces`), só os 27 estados do Brasil.
- Site: https://www.naturalearthdata.com (cópia usada: repositório nvkelso/natural-earth-vector no GitHub, arquivo `geojson/ne_50m_admin_1_states_provinces.geojson`).
- Licença: domínio público. "All versions of Natural Earth raster + vector map data found on this website are in the public domain" (naturalearthdata.com/about/terms-of-use). Pode usar, mudar e publicar sem pedir; a citação é cortesia.

## O que foi mudado

- Projeção simples: `x = (lon + 74.5) * 24.15`, `y = (5.8 - lat) * 25` (viewBox `-30 -30 1030 1060`). A mesma conta está no app (`MAPA_PROJ`), e o campo `mapa: { x, y }` do `menu/viagens.json` usa essa medida.
- Contornos simplificados (Douglas-Peucker, tolerância 0,28 da medida acima, uns 1,2 km), ilhas muito pequenas tiradas.
- Redesenhado no estilo das cenas do app: contorno #3b2a4a, cores chapadas por região, Minas Gerais e Rio de Janeiro em destaque, lateral marrom de "peça de tabuleiro".
- Árvores, morros, lagos, ondas, nuvens e barquinhos são desenhados pelo app por cima (desenho próprio, sem fonte de terceiros).

## Cidades

A tabela `MAPA_CIDADES` do app tem latitude e longitude aproximadas de cidades (centro da cidade, dado geográfico público). A casa aparece só como "Paraíso", nunca endereço.
