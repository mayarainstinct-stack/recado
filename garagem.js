(function () {
const CSS = `
#p-corpo:has(> .gr-tela) { padding: 0; gap: 0; }
.p-corpo > .tela.gr-tela { display: flex; flex-direction: column; flex: 1; min-height: 0; position: relative; overflow: hidden; background: #1E1F23; color: #F2F2F0; --gr-palco: 268px; --gr-am: #F5C400; --gr-imp: 'DIN Condensed', Impact, Haettenschweiler, 'Arial Narrow', sans-serif; --gr-mono: Menlo, Consolas, 'Courier New', monospace; }
.p-corpo > .tela.gr-tela > * { flex: none; min-width: 0; }
.gr-tela .gr-msg { margin: 24px 16px; font-weight: 700; color: #C9CCD2; }
.gr-tela .gr-portao { position: absolute; inset: 0; z-index: 9; background: repeating-linear-gradient(to bottom, #8E949C 0 2px, #B7BCC3 2px 9px, #9AA0A8 9px 15px, #5E636B 15px 18px, #3A3D43 18px 20px); box-shadow: 0 10px 22px rgba(0,0,0,.6); display: grid; place-items: center; transform: translateY(0); }
.gr-tela .gr-portao::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 26px; background: linear-gradient(#4A4E55, #2B2E33); border-top: 2px solid #C9CED5; }
.gr-tela .gr-portao-placa { padding: 10px 18px 8px; background: var(--gr-am); color: #111; font: 700 30px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .06em; text-transform: uppercase; border: 3px solid #111; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
.gr-tela .gr-portao-puxa { position: absolute; bottom: 6px; left: 50%; width: 70px; height: 12px; margin-left: -35px; z-index: 1; border-radius: 3px; background: linear-gradient(#E3E6EA, #8E949C); box-shadow: 0 2px 0 #1A1B1E; }
.gr-tela .gr-portao.gr-sobe { animation: gr-portao 950ms cubic-bezier(.55,.06,.32,1) forwards; }
@keyframes gr-portao { 0% { transform: translateY(0); } 7% { transform: translateY(5px); } 100% { transform: translateY(-104%); } }
.p-corpo > .tela.gr-tela > .gr-pager { flex: 1 1 0; min-height: 0; display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.gr-tela .gr-pager::-webkit-scrollbar { display: none; }
.gr-tela .gr-pag { flex: 0 0 100%; width: 100%; min-width: 0; height: 100%; scroll-snap-align: start; scroll-snap-stop: always; display: flex; flex-direction: column; --v: #9AA1AB; }
.gr-tela .gr-palco { flex: none; position: relative; height: var(--gr-palco); overflow: hidden; background: #2A2C31; }
.gr-tela .gr-parede { position: absolute; left: 0; right: 0; top: 0; height: 190px; background: radial-gradient(ellipse 70% 55% at 50% 0, rgba(255,244,214,.16), transparent 70%), repeating-linear-gradient(90deg, transparent 0 96px, rgba(0,0,0,.34) 96px 97px, rgba(255,255,255,.045) 97px 98px), linear-gradient(#30333A, #25272C); }
.gr-tela .gr-lampada { position: absolute; top: 0; left: 50%; width: 120px; margin-left: -60px; height: 14px; }
.gr-tela .gr-lampada::before { content: ''; position: absolute; left: 0; right: 0; top: 4px; height: 7px; border-radius: 4px; background: linear-gradient(#FFFDF2, #E8E2CC); box-shadow: 0 0 14px rgba(255,248,220,.55), 0 3px 0 #4A4D53; }
.gr-tela .gr-lampada::after { content: ''; position: absolute; left: 14px; right: 14px; top: 0; height: 5px; background: #55585F; }
.gr-tela .gr-painel-f { position: absolute; left: 44px; top: 20px; width: 128px; height: 66px; background: radial-gradient(circle, #121316 1.3px, transparent 1.8px) 0 0 / 9px 9px, #3B3E45; border: 3px solid #4C5058; clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px); }
.gr-tela .gr-painel-f svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.gr-tela .gr-ferr { transform-box: fill-box; transform-origin: 50% 0; }
.gr-tela .gr-pag.gr-no-ar .gr-ferr { animation: gr-balanca 1.6s ease-out 1; }
.gr-tela .gr-pag.gr-no-ar .gr-ferr:nth-child(2n) { animation-delay: .12s; }
@keyframes gr-balanca { 0% { transform: rotate(0); } 18% { transform: rotate(7deg); } 40% { transform: rotate(-5deg); } 62% { transform: rotate(3deg); } 82% { transform: rotate(-1.2deg); } 100% { transform: rotate(0); } }
.gr-tela .gr-box { position: absolute; right: 46px; top: 22px; text-align: right; font: 700 13px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .14em; color: rgba(245,196,0,.9); }
.gr-tela .gr-box b { display: block; font-size: 40px; letter-spacing: .02em; color: rgba(242,242,240,.13); -webkit-text-stroke: 1.5px rgba(245,196,0,.75); margin-top: 2px; }
.gr-tela .gr-faixa { position: absolute; left: 0; right: 0; top: 178px; height: 14px; background: repeating-linear-gradient(-45deg, #F5C400 0 11px, #141414 11px 22px); box-shadow: 0 2px 0 rgba(0,0,0,.4) inset, 0 -1px 0 rgba(255,255,255,.08); }
.gr-tela .gr-chao { position: absolute; left: 0; right: 0; top: 192px; bottom: 0; background: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.6px) 0 0 / 7px 7px, radial-gradient(rgba(0,0,0,.22) 1px, transparent 1.7px) 3px 4px / 11px 13px, linear-gradient(90deg, transparent calc(33% - 1px), rgba(0,0,0,.35) 33%, transparent calc(33% + 1px), transparent calc(67% - 1px), rgba(0,0,0,.35) 67%, transparent calc(67% + 1px)), linear-gradient(#45474B, #5C5E61 60%, #535558); }
.gr-tela .gr-chao::after { content: ''; position: absolute; left: 16px; right: 16px; bottom: 14px; height: 4px; background: var(--gr-am); opacity: .55; }
.gr-tela .gr-sombra { position: absolute; left: 50%; bottom: 22px; width: 300px; height: 16px; margin-left: -150px; border-radius: 50%; background: radial-gradient(ellipse at center, rgba(0,0,0,.6), rgba(0,0,0,0) 70%); transform: scaleX(1); transition: transform 1.25s cubic-bezier(.5,0,.3,1); }
.gr-tela .gr-pag.gr-no-ar .gr-sombra { transform: scaleX(.78); }
.gr-tela .gr-coluna { position: absolute; bottom: 26px; width: 18px; height: 196px; background: repeating-linear-gradient(to bottom, transparent 0 8px, rgba(0,0,0,.45) 8px 11px) 5px 30px / 8px calc(100% - 40px) no-repeat, linear-gradient(90deg, #6E737B, #B9BEC5 40%, #7C818A); clip-path: polygon(0 4px, 4px 0, 100% 0, 100% 100%, 0 100%); }
.gr-tela .gr-coluna::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 22px; background: repeating-linear-gradient(-45deg, #F5C400 0 5px, #141414 5px 10px); }
.gr-tela .gr-coluna::after { content: ''; position: absolute; left: -5px; right: -5px; bottom: 0; height: 6px; background: #2C2E33; }
.gr-tela .gr-coluna.e { left: 14px; } .gr-tela .gr-coluna.d { right: 14px; }
.gr-tela .gr-carga { position: absolute; left: 30px; right: 30px; bottom: 26px; transform: translateY(0); transition: transform 1.25s cubic-bezier(.5,0,.3,1); }
.gr-tela .gr-pag.gr-no-ar .gr-carga { transform: translateY(-46px); }
.gr-tela .gr-carga svg { display: block; width: 100%; height: auto; overflow: visible; }
.gr-tela .gr-rampa { position: relative; height: 10px; margin: -1px 0 0; background: linear-gradient(#8A9098, #50545B); border-top: 2px solid #C9CED5; }
.gr-tela .gr-rampa::before { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 4px; background: repeating-linear-gradient(-45deg, #F5C400 0 6px, #141414 6px 12px); }
.gr-tela .gr-carro { position: absolute; bottom: -2px; width: 22px; height: 26px; background: linear-gradient(90deg, #3C3F45, #70757D); border: 2px solid #23252A; }
.gr-tela .gr-carro.e { left: -20px; } .gr-tela .gr-carro.d { right: -20px; }
.gr-tela .gr-pontos { position: absolute; left: 0; right: 0; top: calc(var(--gr-palco) - 16px); z-index: 3; display: flex; justify-content: center; gap: 8px; pointer-events: none; }
.gr-tela .gr-ponto { pointer-events: auto; width: 10px; height: 8px; padding: 0; border: 0; background: rgba(255,255,255,.35); clip-path: polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%); transition: width .35s cubic-bezier(.5,0,.3,1), background-color .35s; }
.gr-tela .gr-ponto.on { width: 30px; background: var(--gr-am); }
.gr-tela .gr-ponto::before { content: ''; display: block; margin: -18px -6px; height: 44px; }
.gr-tela .gr-nome { flex: none; position: relative; padding: 12px 16px 12px; background: #1E1F23; border-top: 3px solid var(--v); box-shadow: 0 -6px 0 #141518 inset; }
.gr-tela .gr-nome h3 { margin: 0; font: 700 40px/.9 var(--gr-imp); font-synthesis: none; text-transform: uppercase; letter-spacing: .03em; color: #F7F7F5; -webkit-mask-image: linear-gradient(to bottom, #000 47%, transparent 47%, transparent 53%, #000 53%); mask-image: linear-gradient(to bottom, #000 47%, transparent 47%, transparent 53%, #000 53%); }
.gr-tela .gr-modelo { margin-top: 6px; font: 600 12px/1.25 var(--gr-mono); color: #C9CCD2; letter-spacing: .02em; }
.gr-tela .gr-linha { display: flex; align-items: center; gap: 10px; margin-top: 9px; flex-wrap: wrap; }
.gr-tela .gr-fita { position: relative; padding: 4px 10px 4px; background: #E9DFC4; color: #2A2620; font: 700 13px/1.15 'Marker Felt', 'Segoe Print', 'Comic Sans MS', cursive; transform: rotate(-1.5deg); box-shadow: 0 2px 3px rgba(0,0,0,.35); clip-path: polygon(0 8%, 3% 0, 97% 4%, 100% 0, 99% 92%, 96% 100%, 4% 96%, 1% 100%); max-width: 100%; }
.gr-tela .gr-trena { display: inline-flex; align-items: stretch; font: 700 12px/1 var(--gr-mono); color: #111; }
.gr-tela .gr-trena i { width: 20px; background: radial-gradient(circle at 50% 50%, #F2F2F0 3px, transparent 3.5px), #2B2D32; border: 2px solid #111; border-radius: 6px 0 0 6px; }
.gr-tela .gr-trena span { padding: 5px 10px 4px; background: repeating-linear-gradient(90deg, #111 0 1px, transparent 1px 6px) 0 0 / 100% 4px no-repeat, repeating-linear-gradient(90deg, #111 0 1px, transparent 1px 30px) 0 0 / 100% 7px no-repeat, var(--gr-am); padding-top: 9px; border: 2px solid #111; border-left: 0; }
.gr-tela .gr-rola { flex: 1 1 0; min-height: 0; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; padding: 14px 16px calc(96px + env(safe-area-inset-bottom, 0px)); display: flex; flex-direction: column; gap: 12px; background: linear-gradient(#18191C, #1E1F23 24px); }
.gr-tela .gr-rola > * { flex: none; min-width: 0; }
.gr-tela .gr-cartao { position: relative; background: #2A2C31; border: 1px solid #3B3E45; padding: 12px; clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px); }
.gr-tela .gr-tit { display: flex; align-items: center; gap: 8px; margin: 0 0 10px; font: 700 17px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .1em; text-transform: uppercase; color: #F2F2F0; }
.gr-tela .gr-tit::before { content: ''; width: 6px; height: 16px; background: var(--gr-am); transform: skewX(-14deg); }
.gr-tela .gr-tit small { margin-left: 4px; padding: 3px 7px; border-radius: 3px; background: #F5C400; color: #1E1F23 !important; font: 700 12px/1 var(--gr-mono); letter-spacing: 0; color: #C9CCD2; text-transform: none; }
.gr-tela .gr-ad { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: #141518; touch-action: pan-y; user-select: none; -webkit-user-select: none; cursor: ew-resize; clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
.gr-tela .gr-ad img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; -webkit-user-drag: none; }
.gr-tela .gr-ad .gr-dep { clip-path: inset(0 0 0 var(--x, 50%)); }
.gr-tela .gr-ad-sem { position: absolute; inset: 0; display: grid; place-items: center; color: #8A8F98; font-weight: 700; font-size: 13px; }
.gr-tela .gr-div { position: absolute; top: 0; bottom: 0; left: var(--x, 50%); width: 4px; margin-left: -2px; background: var(--gr-am); box-shadow: 0 0 0 1px #111; pointer-events: none; }
.gr-tela .gr-div::after { content: ''; position: absolute; top: 50%; left: 50%; width: 38px; height: 38px; margin: -19px 0 0 -19px; background: var(--gr-am) no-repeat center / 22px 22px url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23111' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 6 3 12l6 6M15 6l6 6-6 6'/%3E%3C/svg%3E"); border: 2px solid #111; clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px); }
.gr-tela .gr-rot { position: absolute; top: 10px; padding: 4px 8px 3px; font: 700 14px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .12em; pointer-events: none; }
.gr-tela .gr-rot.a { left: 10px; background: #111; color: #F2F2F0; } .gr-tela .gr-rot.d { right: 10px; background: var(--gr-am); color: #111; }
.gr-tela .gr-ad input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.gr-tela .gr-ad:has(input:focus-visible) { outline: 3px solid var(--gr-am); outline-offset: -3px; }
.gr-tela .gr-barra { position: relative; height: 18px; margin: 0 0 12px; background: repeating-linear-gradient(-45deg, #2F3136 0 9px, #26282C 9px 18px); border: 2px solid #111; }
.gr-tela .gr-barra i { position: absolute; left: 0; top: 0; bottom: 0; width: var(--p, 0%); background: repeating-linear-gradient(-45deg, #F5C400 0 9px, #141414 9px 18px); transform-origin: 0 50%; transform: scaleX(0); transition: transform 1s cubic-bezier(.5,0,.3,1) .3s; }
.gr-tela .gr-pag.gr-no-ar .gr-barra i { transform: scaleX(1); }
.gr-tela .gr-lista { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.gr-tela .gr-item { display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 6px; background: #1E1F23; border-left: 4px solid var(--e, #6B6F78); transform: translateX(0); }
.gr-tela .gr-pag.gr-entra .gr-item { animation: gr-desliza .5s cubic-bezier(.3,.7,.3,1) both; animation-delay: calc(var(--i, 0) * 70ms + 200ms); }
@keyframes gr-desliza { from { transform: translateX(calc(100% + 24px)); } to { transform: translateX(0); } }
.gr-tela .gr-caixa { flex: none; width: 26px; height: 26px; display: grid; place-items: center; border: 2px solid #4C5058; background: #141518; color: var(--e); }
.gr-tela .gr-caixa svg { width: 18px; height: 18px; }
.gr-tela .gr-item.feito .gr-caixa { border-color: var(--e); background: color-mix(in srgb, var(--e) 18%, #141518); }
.gr-tela .gr-pag.gr-entra .gr-item.feito .gr-chave { animation: gr-gira .9s cubic-bezier(.4,0,.2,1) both; animation-delay: calc(var(--i, 0) * 70ms + 650ms); }
@keyframes gr-gira { from { transform: rotate(-360deg); } to { transform: rotate(0); } }
.gr-tela .gr-item.comecou .gr-caixa { background: linear-gradient(to top, color-mix(in srgb, var(--e) 55%, transparent) 50%, #141518 50%); }
.gr-tela .gr-peca { flex: 1; min-width: 0; font-size: 14px; line-height: 1.25; font-weight: 600; color: #ECECEA; }
.gr-tela .gr-item.feito .gr-peca { color: #fff; }
.gr-tela .gr-etq { flex: none; padding: 4px 7px 3px; font: 700 12px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .08em; text-transform: uppercase; color: #111; background: var(--e); clip-path: polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 50%); padding-left: 10px; }
.gr-tela .gr-datas { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.gr-tela .gr-tag { position: relative; padding: 18px 10px 10px; background: #E9E5D8; color: #1E1F23; transform-origin: 50% 7px; clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%, 0 10px); }
.gr-tela .gr-tag::before { content: ''; position: absolute; top: 4px; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: #2A2C31; box-shadow: 0 0 0 2px #B8B2A0; }
.gr-tela .gr-pag.gr-entra .gr-tag { animation: gr-pendula 1.3s ease-out both; animation-delay: calc(var(--i, 0) * 90ms + 250ms); }
@keyframes gr-pendula { 0% { transform: rotate(-14deg); } 30% { transform: rotate(8deg); } 55% { transform: rotate(-4deg); } 78% { transform: rotate(1.5deg); } 100% { transform: rotate(0); } }
.gr-tela .gr-tag b { display: block; font: 700 15px/1.05 var(--gr-imp); font-synthesis: none; letter-spacing: .04em; text-transform: uppercase; }
.gr-tela .gr-tag .gr-val { display: block; margin-top: 7px; font: 700 13px/1.2 var(--gr-mono); color: #111; }
.gr-tela .gr-tag .gr-val.ok { color: #1F7A3A; }
.gr-tela .gr-tag .gr-val.falta { color: #8C8A82; font-style: italic; }
.gr-tela .gr-tag small { display: block; margin-top: 5px; font-size: 11px; line-height: 1.3; color: #5E5B52; }
.gr-tela .gr-pend { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; }
.gr-tela .gr-pend + .gr-pend { border-top: 1px dashed #4C5058; }
.gr-tela .gr-pend .gr-alerta { flex: none; width: 30px; height: 28px; display: grid; place-items: center; color: #111; background: var(--gr-am); clip-path: polygon(50% 0, 100% 100%, 0 100%); padding-top: 8px; }
.gr-tela .gr-pend .gr-alerta svg { width: 18px; height: 18px; stroke-width: 3.4; margin-top: -2px; }
.gr-tela .gr-pend .gr-alerta svg path:first-child { display: none; }
.gr-tela .gr-pend p { margin: 0; font-size: 14px; font-weight: 700; line-height: 1.3; }
.gr-tela .gr-pend small { display: block; margin-top: 2px; font-size: 12px; font-weight: 500; color: #9EA2AA; }
.gr-tela .gr-vazio { margin: 0; font-size: 13px; color: #8A8F98; font-style: italic; }
.gr-tela .gr-odo { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.gr-tela .gr-rolos { display: inline-flex; gap: 2px; padding: 4px; background: #0D0E10; border: 2px solid #4C5058; box-shadow: 0 0 0 2px #111 inset; }
.gr-tela .gr-rolo { width: 22px; height: 32px; overflow: hidden; background: linear-gradient(#0E0F11, #2A2C31 45%, #2A2C31 55%, #0E0F11); }
.gr-tela .gr-rolo.pt { width: 8px; background: none; color: #F2F2F0; font: 700 22px/32px var(--gr-mono); text-align: center; }
.gr-tela .gr-rolo span { display: block; transform: translateY(0); transition: transform 1.4s cubic-bezier(.3,0,.2,1); transition-delay: calc(var(--i, 0) * 120ms + 300ms); }
.gr-tela .gr-rolo span i { display: block; height: 32px; font: 700 22px/32px var(--gr-mono); font-style: normal; text-align: center; color: #F2F2F0; }
.gr-tela .gr-pag.gr-no-ar .gr-rolo span { transform: translateY(calc(var(--d) * -32px)); }
.gr-tela .gr-odo-km { font: 700 18px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .08em; color: var(--gr-am); }
.gr-tela .gr-odo-em { width: 100%; font: 600 12px/1.2 var(--gr-mono); color: #C9CCD2; }
.gr-tela .gr-fonte { margin: 2px 2px 0; font: 500 11px/1.35 var(--gr-mono); color: #7D828B; }
.gr-tela .gr-cornota { display: inline-block; margin-top: 8px; padding: 3px 7px; font: 600 11px/1.2 var(--gr-mono); color: #111; background: #E9E5D8; }
@media (prefers-reduced-motion: reduce) { .gr-tela .gr-portao.gr-sobe { animation-duration: 1ms; } .gr-tela .gr-carga, .gr-tela .gr-sombra, .gr-tela .gr-barra i, .gr-tela .gr-rolo span { transition-duration: 1ms; } .gr-tela .gr-pag.gr-entra .gr-item, .gr-tela .gr-pag.gr-entra .gr-tag, .gr-tela .gr-pag.gr-entra .gr-chave, .gr-tela .gr-pag.gr-no-ar .gr-ferr { animation: none; } }
`;
function injetaCss() { if (document.getElementById('garagem-css')) return; const s = document.createElement('style'); s.id = 'garagem-css'; s.textContent = CSS; document.head.append(s); }
const corOk = c => /^#[0-9a-f]{6}$/i.test(c || '') ? c : '#9AA1AB';
function tom(hex, f) { const n = parseInt(hex.slice(1), 16), a = [n >> 16, (n >> 8) & 255, n & 255], alvo = f < 0 ? 0 : 255, k = Math.abs(f); return '#' + a.map(v => Math.round(v + (alvo - v) * k).toString(16).padStart(2, '0')).join(''); }
const ESTADOS = { 'feito': ['#3FBF5F', 'feito'], 'começou': ['#F5C400', 'comecou'], 'escolhido': ['#4EA8DE', 'escolhido'], 'a comprar': ['#F08A24', 'comprar'], 'planejado': ['#B7BCC3', 'planejado'], 'desejo': ['#E879A6', 'desejo'], 'futuro': ['#7D828B', 'futuro'] };
const ORDEM = Object.keys(ESTADOS);
const CHAVE = '<svg class="gr-chave" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.7 6.3a5.5 5.5 0 0 1-7.4 6.9l-7.6 7.6a2.2 2.2 0 0 1-3.1-3.1l7.6-7.6a5.5 5.5 0 0 1 6.9-7.4l-3.4 3.4.6 2.9 2.9.6z"/></svg>';
const FERRAMENTAS = `<svg viewBox="0 0 128 66" aria-hidden="true">
<g fill="#9EA3AB"><circle cx="14" cy="6" r="1.6" fill="#0D0E10"/><circle cx="40" cy="6" r="1.6" fill="#0D0E10"/><circle cx="66" cy="6" r="1.6" fill="#0D0E10"/><circle cx="92" cy="6" r="1.6" fill="#0D0E10"/><circle cx="112" cy="6" r="1.6" fill="#0D0E10"/></g>
<g class="gr-ferr" fill="#A7ACB4"><path d="M14 6v2"/><path d="M8.5 10a6 6 0 0 1 11 0l-3 1-1.5-3h-2l-1.5 3zM12 13h4v38a2 2 0 0 1-4 0z"/><path d="M9.5 52a4.5 4.5 0 1 0 9 0l-2.5 0-1 2h-2l-1-2z"/></g>
<g class="gr-ferr" fill="#A7ACB4"><rect x="32" y="7" width="16" height="9" rx="1.5"/><rect x="38" y="16" width="4" height="40" rx="2" fill="#C98A3B"/></g>
<g class="gr-ferr" fill="#A7ACB4"><path d="M63 7h2l1 14h-4zM67 7h2l-1 14h-2z"/><circle cx="66" cy="22" r="2.4" fill="#6E737B"/><path d="M63.6 23 58 52a2 2 0 0 0 3.6 1l5.2-29zM68.4 23 74 52a2 2 0 0 1-3.6 1l-5.2-29z" fill="#C0392B"/></g>
<g class="gr-ferr" fill="#A7ACB4"><rect x="89" y="8" width="6" height="17" rx="2.5" fill="#F5C400"/><rect x="91" y="25" width="2" height="26"/><path d="M91 51h2l-1 4z"/></g>
<g class="gr-ferr" fill="#A7ACB4"><rect x="109" y="8" width="6" height="2"/><path d="M106 10h12v6l-3 2v28a3 3 0 0 1-6 0V18l-3-2z"/></g>
</svg>`;
function roda(x, y, r, id, moto, cor) {
  let miolo;
  if (moto) {
    let raios = '';
    for (let k = 0; k < 5; k++) { const a = k * 72 * Math.PI / 180, b = a + 0.18; raios += `<path d="M${(Math.cos(a) * 3.5).toFixed(1)} ${(Math.sin(a) * 3.5).toFixed(1)}L${(Math.cos(a) * (r - 6)).toFixed(1)} ${(Math.sin(a) * (r - 6)).toFixed(1)}M${(Math.cos(b) * 3.5).toFixed(1)} ${(Math.sin(b) * 3.5).toFixed(1)}L${(Math.cos(b + .2) * (r - 6)).toFixed(1)} ${(Math.sin(b + .2) * (r - 6)).toFixed(1)}"/>`; }
    miolo = `<circle r="${r - 5}" fill="#17181B" stroke="${cor}" stroke-width="1.2"/><g stroke="#3A3D43" stroke-width="2.2" stroke-linecap="round">${raios}</g><circle r="${r * .45}" fill="none" stroke="#5E636B" stroke-width="1.5"/><circle r="4.5" fill="#B7BCC3"/>`;
  } else {
    let furos = '';
    for (let k = 0; k < 6; k++) { const a = (k * 60 + 30) * Math.PI / 180; furos += `<circle cx="${(Math.cos(a) * r * .38).toFixed(1)}" cy="${(Math.sin(a) * r * .38).toFixed(1)}" r="${(r * .1).toFixed(1)}" fill="#3A3D43"/>`; }
    miolo = `<circle r="${r * .66}" fill="url(#aro-${id})" stroke="#5E636B" stroke-width="1"/>${furos}<circle r="${r * .16}" fill="#E3E6EA" stroke="#6E737B"/>`;
  }
  return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#111214"/><circle r="${r - 2.5}" fill="none" stroke="#25262A" stroke-width="2"/>${miolo}</g>`;
}
function defs(id, cor) {
  return `<defs><linearGradient id="lat-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tom(cor, .32)}"/><stop offset=".42" stop-color="${cor}"/><stop offset="1" stop-color="${tom(cor, -.42)}"/></linearGradient>
<linearGradient id="vid-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9FC3D6"/><stop offset=".45" stop-color="#3B5566"/><stop offset="1" stop-color="#1A2630"/></linearGradient>
<radialGradient id="aro-${id}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#F4F6F8"/><stop offset=".6" stop-color="#AEB4BC"/><stop offset="1" stop-color="#6E737B"/></radialGradient></defs>`;
}
function svgGol(id, c) {
  return `<svg viewBox="0 0 300 124" role="img" aria-label="Gol G2 de perfil">${defs(id, c)}
<path d="M26 96 L23 72 Q23 61 31 59 L46 33 Q50 26 60 25 L148 24 Q159 24 166 30 L196 55 L258 61 Q279 63 282 74 L284 91 Q284 97 278 97 L250 97 A22 22 0 0 0 206 97 L92 97 A22 22 0 0 0 48 97 L32 97 Q27 97 26 96Z" fill="url(#lat-${id})" stroke="${tom(c, -.6)}" stroke-width="1.2"/>
<path d="M60 57 L71 31 L117 31 L117 57Z M123 57 L123 31 L156 31 Q162 31 166 35 L188 57Z" fill="url(#vid-${id})" stroke="#111" stroke-width="1.4"/>
<path d="M33 58 L47 32 L53 30 L41 58Z" fill="#1A2630"/>
<path d="M162 31 L193 56 L198 56 L166 29Z" fill="#9FC3D6" opacity=".55"/>
<path d="M120 59 V95 M190 59 L192 92" stroke="${tom(c, -.55)}" stroke-width="1.3" fill="none"/>
<rect x="126" y="64" width="11" height="3" rx="1.5" fill="${tom(c, -.55)}"/><rect x="62" y="64" width="9" height="3" rx="1.5" fill="${tom(c, -.55)}"/>
<path d="M186 56 l10 -2 l2 6 l-9 1z" fill="#1A1B1E"/>
<path d="M30 79 H276" stroke="#1A1B1E" stroke-width="4"/>
<path d="M60 26 L148 25" stroke="#fff" stroke-opacity=".35" stroke-width="1.5" stroke-linecap="round"/>
<path d="M200 60 L258 64" stroke="#fff" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/>
<path d="M269 65 L281 67 L282 76 L270 75Z" fill="#FFF6D6" stroke="#2A2C31"/><path d="M279 79 L283 79 L283 84 L279 84Z" fill="#F5A623"/>
<path d="M23 63 L29 62 L29 76 L23 76Z" fill="#D7262E" stroke="#5A0E12"/><path d="M23 70 L29 70" stroke="#F5A623" stroke-width="2"/>
<path d="M24 86 Q24 92 30 92 L48 92 L48 86Z M250 86 L284 86 L284 91 Q284 95 279 95 L252 95Z" fill="#1A1B1E"/>
<path d="M249 97 A21 21 0 0 0 207 97 M91 97 A21 21 0 0 0 49 97" stroke="#0E0F11" stroke-width="3" fill="none"/>
${roda(70, 100, 18, id, false)}${roda(228, 100, 18, id, false)}</svg>`;
}
function svgSiena(id, c) {
  return `<svg viewBox="0 0 300 124" role="img" aria-label="Siena de perfil">${defs(id, c)}
<path d="M19 95 L16 71 Q16 61 25 60 L60 58 Q68 57 73 52 L94 31 Q99 27 107 27 L160 27 Q169 27 176 33 L206 57 L268 63 Q287 65 290 76 L292 91 Q292 97 286 97 L260 97 A22 22 0 0 0 216 97 L90 97 A22 22 0 0 0 46 97 L25 97 Q20 97 19 95Z" fill="url(#lat-${id})" stroke="${tom(c, -.6)}" stroke-width="1.2"/>
<path d="M83 56 L101 33 L140 32 L140 56Z M146 56 L146 32 L167 32 Q173 32 177 36 L198 56Z" fill="url(#vid-${id})" stroke="#111" stroke-width="1.4"/>
<path d="M75 54 L95 33 L99 33 L80 56Z" fill="#1A2630"/>
<path d="M172 33 L203 57 L208 57 L176 31Z" fill="#9FC3D6" opacity=".55"/>
<path d="M143 58 V95 M201 59 L203 92 M86 58 L84 92" stroke="${tom(c, -.55)}" stroke-width="1.3" fill="none"/>
<path d="M60 58 L62 66" stroke="${tom(c, -.55)}" stroke-width="1.2"/>
<rect x="150" y="63" width="11" height="3" rx="1.5" fill="${tom(c, -.55)}"/><rect x="92" y="63" width="10" height="3" rx="1.5" fill="${tom(c, -.55)}"/>
<path d="M196 57 l10 -2 l2 6 l-9 1z" fill="#1A1B1E"/>
<path d="M24 80 H286" stroke="${tom(c, -.35)}" stroke-width="2.5"/>
<path d="M108 28 L160 28" stroke="#fff" stroke-opacity=".45" stroke-width="1.5" stroke-linecap="round"/>
<path d="M210 61 L268 66" stroke="#fff" stroke-opacity=".32" stroke-width="2" stroke-linecap="round"/>
<path d="M276 66 L289 69 L290 77 L278 76Z" fill="#FFF6D6" stroke="#2A2C31"/><path d="M287 80 L291 80 L291 85 L287 85Z" fill="#F5A623"/>
<path d="M16 63 L27 62 L27 75 L16 75Z" fill="#D7262E" stroke="#5A0E12"/><path d="M16 69 H27" stroke="#F2F2F0" stroke-width="2"/>
<path d="M17 86 Q17 93 24 93 L46 93 L46 86Z M260 86 L292 86 L292 91 Q292 95 287 95 L262 95Z" fill="${tom(c, -.25)}" stroke="${tom(c, -.55)}"/>
<path d="M259 97 A21 21 0 0 0 217 97 M89 97 A21 21 0 0 0 47 97" stroke="#0E0F11" stroke-width="3" fill="none"/>
${roda(68, 100, 18, id, false)}${roda(238, 100, 18, id, false)}</svg>`;
}
function svgNinja(id, c) {
  const esc = tom(c, -.45);
  return `<svg viewBox="0 0 300 124" role="img" aria-label="Ninja 300 de perfil">${defs(id, c)}
<path d="M84 98 L134 80" stroke="#2A2C31" stroke-width="7" stroke-linecap="round"/>
<path d="M216 98 L192 40" stroke="#C9CED5" stroke-width="6" stroke-linecap="round"/><path d="M216 98 L203 66" stroke="#6E737B" stroke-width="8" stroke-linecap="round"/>
<path d="M126 64 L178 60 L186 92 L132 94Z" fill="#3A3D43" stroke="#1A1B1E"/>
<path d="M138 72 h36 M138 78 h38 M140 84 h36" stroke="#5E636B" stroke-width="2"/>
<path d="M150 95 Q120 96 104 86 L92 76 L104 70 L116 80 Q132 88 152 89Z" fill="#B7BCC3" stroke="#4C5058"/>
<path d="M88 70 L110 66 L114 82 L94 86Z" fill="#2A2C31" stroke="#4C5058"/>
<path d="M44 40 L88 50 L130 50 L132 60 L92 64 L66 56Z" fill="url(#lat-${id})" stroke="${esc}" stroke-width="1.2"/>
<path d="M42 39 L52 41 L50 46 L42 43Z" fill="#D7262E"/>
<path d="M86 49 L128 48 L136 58 L94 60Z" fill="#1A1B1E"/>
<path d="M128 50 Q140 34 170 36 L190 44 L184 60 L134 62Z" fill="url(#lat-${id})" stroke="${esc}" stroke-width="1.2"/>
<path d="M140 42 Q156 36 174 39" stroke="#fff" stroke-opacity=".45" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M180 42 L208 30 L240 52 L234 60 L214 64 L198 84 L170 90 L160 72 L184 60Z" fill="url(#lat-${id})" stroke="${esc}" stroke-width="1.2"/>
<path d="M198 34 L210 16 L224 22 L214 36Z" fill="#2B3C46" stroke="#111" stroke-width="1"/>
<path d="M216 44 L238 53 L232 57 L218 52Z" fill="#111"/><path d="M220 47 L233 53 L228 54 L221 51Z" fill="#FFF6D6"/>
<path d="M160 74 L198 80 L190 92 L160 92Z" fill="#1A1B1E"/>
<path d="M174 66 L204 62" stroke="#111" stroke-width="2.5"/>
<path d="M194 76 L206 66" stroke="#F2F2F0" stroke-width="2.5" stroke-linecap="round"/>
<path d="M196 72 Q216 64 236 74" fill="none" stroke="url(#lat-${id})" stroke-width="5" stroke-linecap="round"/>
<path d="M190 36 l-8 -6" stroke="#111" stroke-width="3" stroke-linecap="round"/>

${roda(84, 100, 20, id, true, c)}${roda(216, 100, 20, id, true, c)}
<circle cx="216" cy="100" r="8" fill="none" stroke="#9EA3AB" stroke-width="2.5"/></svg>`;
}
const SVG = { hatch: svgGol, sedan: svgSiena, moto: svgNinja };
const dataBr = s => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ''); return m ? m[3] + '/' + m[2] + '/' + m[1] : s; };
const parteDe = t => { const m = /^(.*?)\s*\((.*)\)\s*$/.exec(t || ''); return m ? [m[1], m[2]] : [t, '']; };
function cartao(titulo, extra) { const k = elD('section', 'gr-cartao'), h = elD('h4', 'gr-tit', titulo); if (extra) h.append(elD('small', null, extra)); k.append(h); return k; }
function antesDepois(v) {
  const k = cartao('Antes × depois'), ad = elD('div', 'gr-ad');
  const ia = elD('img'), idp = elD('img', 'gr-dep'); ia.alt = 'Antes'; idp.alt = 'Depois'; ia.decoding = idp.decoding = 'async';
  const sem = elD('div', 'gr-ad-sem', 'Abrindo as fotos…'), dv = elD('div', 'gr-div'), ra = elD('span', 'gr-rot a', 'ANTES'), rd = elD('span', 'gr-rot d', 'DEPOIS');
  const inp = elD('input'); inp.type = 'range'; inp.min = 0; inp.max = 100; inp.value = 50; inp.setAttribute('aria-label', 'Divisor entre antes e depois');
  ad.append(sem, ia, idp, dv, ra, rd, inp); k.append(ad);
  const poe = p => { p = Math.max(0, Math.min(100, p)); ad.style.setProperty('--x', p + '%'); inp.value = Math.round(p); };
  const daX = e => { const r = ad.getBoundingClientRect(); poe((e.clientX - r.left) / r.width * 100); };
  let arr = false;
  ad.addEventListener('pointerdown', e => { arr = true; try { ad.setPointerCapture(e.pointerId); } catch (x) {} daX(e); e.stopPropagation(); });
  ad.addEventListener('pointermove', e => { if (arr) { daX(e); e.preventDefault(); } });
  const solta = () => { arr = false; }; ad.addEventListener('pointerup', solta); ad.addEventListener('pointercancel', solta);
  inp.addEventListener('input', () => poe(+inp.value));
  const carrega = (img, cam) => cam ? fotoUrl(cam).then(u => new Promise((ok, erro) => { img.onload = ok; img.onerror = erro; img.src = u; })) : Promise.reject();
  Promise.allSettled([carrega(ia, v.antes), carrega(idp, v.depois)]).then(r => { const f = r.filter(x => x.status === 'rejected').length; if (!f) sem.remove(); else sem.textContent = f === 2 ? 'As fotos não abriram. Confere a internet.' : 'Uma das fotos não abriu.'; });
  return k;
}
function projeto(v) {
  const pec = (v.projeto || []).slice().sort((a, b) => { const x = ORDEM.indexOf(a.estado), y = ORDEM.indexOf(b.estado); return (x < 0 ? 99 : x) - (y < 0 ? 99 : y); });
  const feitos = pec.filter(p => p.estado === 'feito').length;
  const k = cartao('Projeto', feitos + ' de ' + pec.length + ' feito' + (feitos === 1 ? '' : 's'));
  const bar = elD('div', 'gr-barra'), fill = elD('i'); bar.style.setProperty('--p', (pec.length ? feitos / pec.length * 100 : 0) + '%'); bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-valuenow', feitos); bar.setAttribute('aria-valuemax', pec.length); bar.append(fill); k.append(bar);
  const ul = elD('ul', 'gr-lista');
  pec.forEach((p, i) => {
    const [cor, cl] = ESTADOS[p.estado] || ['#7D828B', 'outro'];
    const li = elD('li', 'gr-item ' + cl); li.style.setProperty('--e', cor); li.style.setProperty('--i', i);
    const cx = elD('span', 'gr-caixa'); if (p.estado === 'feito') cx.innerHTML = CHAVE;
    li.append(cx, elD('span', 'gr-peca', p.peca), elD('span', 'gr-etq', p.estado)); ul.append(li);
  });
  k.append(ul); return k;
}
function datas(v) {
  const k = cartao('Datas'), g = elD('div', 'gr-datas');
  (v.datas || []).forEach((d, i) => {
    const t = elD('div', 'gr-tag'); t.style.setProperty('--i', i); t.append(elD('b', null, d.o));
    if (d.feito) t.append(elD('span', 'gr-val ok', 'feito em ' + dataBr(d.feito)));
    else if (d.data) t.append(elD('span', 'gr-val', dataBr(d.data)));
    else t.append(elD('span', 'gr-val falta', 'falta anotar'));
    if (d.nota && d.nota !== 'falta anotar') t.append(elD('small', null, d.nota));
    g.append(t);
  });
  if (!g.children.length) k.append(elD('p', 'gr-vazio', 'Nenhuma data anotada.')); else k.append(g);
  return k;
}
function pendentes(v) {
  const l = v.pendente || [], k = cartao('Pendentes', l.length ? String(l.length) : '');
  if (!l.length) { k.append(elD('p', 'gr-vazio', 'Nada pendente anotado.')); return k; }
  l.forEach(t => { const [a, b] = parteDe(t), r = elD('div', 'gr-pend'), ic = elD('span', 'gr-alerta'), tx = elD('div'); ic.innerHTML = icone('warn'); tx.append(elD('p', null, a)); if (b) tx.append(elD('small', null, b)); r.append(ic, tx); k.append(r); });
  return k;
}
function odometro(v) {
  const k = cartao('Odômetro'), m = /^\s*([\d.]+)\s*km\b\s*(?:em\s+(.+))?$/i.exec(v.odometro || '');
  if (!m) { k.append(elD('p', 'gr-peca', v.odometro)); return k; }
  const w = elD('div', 'gr-odo'), rs = elD('div', 'gr-rolos'); let n = 0;
  rs.setAttribute('aria-label', m[1] + ' km');
  [...m[1]].forEach(ch => {
    if (!/\d/.test(ch)) { rs.append(elD('span', 'gr-rolo pt', ch)); return; }
    const r = elD('span', 'gr-rolo'), s = elD('span'); s.style.setProperty('--d', ch); s.style.setProperty('--i', n++);
    for (let q = 0; q <= 9; q++) s.append(elD('i', null, String(q)));
    r.append(s); rs.append(r);
  });
  w.append(rs, elD('span', 'gr-odo-km', 'KM'));
  if (m[2]) w.append(elD('span', 'gr-odo-em', 'anotado em ' + dataBr(m[2])));
  k.append(w); return k;
}
function pagina(v, i, tot) {
  const cor = corOk(v.cor), pg = elD('article', 'gr-pag'); pg.style.setProperty('--v', cor); pg.setAttribute('aria-label', v.nome);
  const pal = elD('div', 'gr-palco'), par = elD('div', 'gr-parede'), pf = elD('div', 'gr-painel-f'), box = elD('div', 'gr-box', 'BOX');
  pf.innerHTML = FERRAMENTAS; box.append(elD('b', null, String(i + 1).padStart(2, '0'))); box.setAttribute('aria-label', 'Vaga ' + (i + 1) + ' de ' + tot);
  par.append(elD('div', 'gr-lampada'), pf, box);
  const carga = elD('div', 'gr-carga'), id = (v.id || 'v' + i).replace(/[^a-z0-9]/gi, '');
  carga.innerHTML = (SVG[v.tipo] || svgSiena)(id, cor);
  const rampa = elD('div', 'gr-rampa'); rampa.append(elD('span', 'gr-carro e'), elD('span', 'gr-carro d')); carga.append(rampa);
  pal.append(par, elD('div', 'gr-faixa'), elD('div', 'gr-chao'), elD('div', 'gr-sombra'), elD('div', 'gr-coluna e'), elD('div', 'gr-coluna d'), carga);
  const nm = elD('div', 'gr-nome'); nm.append(elD('h3', null, v.nome), elD('div', 'gr-modelo', v.modelo));
  const ln = elD('div', 'gr-linha'); if (v.apelido) ln.append(elD('span', 'gr-fita', v.apelido));
  if (v.medida) { const tr = elD('span', 'gr-trena'); tr.setAttribute('aria-label', 'Medida ' + v.medida); tr.append(elD('i'), elD('span', null, v.medida)); ln.append(tr); }
  if (ln.children.length) nm.append(ln);
  const ro = elD('div', 'gr-rola');
  if (v.antes || v.depois) ro.append(antesDepois(v));
  if (v.projeto && v.projeto.length) ro.append(projeto(v));
  if (v.odometro) ro.append(odometro(v));
  ro.append(datas(v), pendentes(v));
  if (v.cor_nota) ro.append(elD('span', 'gr-cornota', v.cor_nota));
  if (v.fonte) ro.append(elD('p', 'gr-fonte', 'fonte: ' + v.fonte));
  pg.append(pal, nm, ro); return pg;
}
window.abreGaragem = function (m) {
  m = m || {}; const arq = m.arq || 'categorias/carros-moto/garagem.json';
  tela(m.nome || 'Garagem', async c => {
    injetaCss(); c.classList.add('gr-tela'); painel.style.setProperty('--c', '#F5C400');
    cabecalho({ icone: 'car', sub: 'Oficina da May' });
    const portao = elD('div', 'gr-portao'), pl = elD('div', 'gr-portao-placa', 'Garagem'); portao.append(pl, elD('span', 'gr-portao-puxa')); c.append(portao);
    const t0 = Date.now(); let d;
    try { d = JSON.parse(await lerArquivo(arq)); } catch (e) { d = null; }
    if (!c.isConnected) return;
    const vs = d && Array.isArray(d.veiculos) ? d.veiculos : [];
    if (!vs.length) { c.prepend(elD('p', 'gr-msg', d ? 'A garagem tá vazia.' : 'Não consegui abrir a garagem. Confere a internet.')); }
    else {
      cabecalho({ icone: 'car', sub: vs.length + (vs.length === 1 ? ' veículo' : ' veículos') + ' na oficina' });
      const pager = elD('div', 'gr-pager'), pts = elD('div', 'gr-pontos'), pgs = vs.map((v, i) => pagina(v, i, vs.length));
      pager.append(...pgs);
      pgs.forEach((p, i) => { const b = elD('button', 'gr-ponto' + (i ? '' : ' on')); b.type = 'button'; b.setAttribute('aria-label', vs[i].nome); b.onclick = () => pager.scrollTo({ left: i * pager.clientWidth, behavior: 'smooth' }); pts.append(b); });
      c.prepend(pager, pts);
      let aberto = false, atual = -1;
      const ativa = i => {
        if (i === atual) return; atual = i;
        [...pts.children].forEach((b, k) => b.classList.toggle('on', k === i));
        if (!aberto) return;
        pgs.forEach((p, k) => { if (k !== i) p.classList.remove('gr-no-ar', 'gr-entra'); });
        const p = pgs[i]; p.classList.remove('gr-entra'); void p.offsetWidth; p.classList.add('gr-no-ar', 'gr-entra');
      };
      let tq = 0; pager.addEventListener('scroll', () => { cancelAnimationFrame(tq); tq = requestAnimationFrame(() => { const w = pager.clientWidth || 1; ativa(Math.round(pager.scrollLeft / w)); }); }, { passive: true });
      ativa(0);
      const sobe = () => { aberto = true; const i = atual; atual = -1; ativa(i); };
      portao.addEventListener('animationend', () => { portao.remove(); }, { once: true });
      setTimeout(() => { if (!c.isConnected) return; portao.classList.add('gr-sobe'); setTimeout(sobe, 620); }, Math.max(0, 450 - (Date.now() - t0)));
      return;
    }
    setTimeout(() => { portao.classList.add('gr-sobe'); portao.addEventListener('animationend', () => portao.remove(), { once: true }); }, 300);
  });
};
})();
