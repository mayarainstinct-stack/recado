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
.gr-tela .gr-vet > svg { position: absolute; left: 0; bottom: 0; display: block; width: 100%; height: auto; overflow: visible; }
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
.gr-tela .gr-abas { display: flex; gap: 0; border: 2px solid #111; background: #141518; }
.gr-tela .gr-aba { flex: 1; padding: 11px 2px 9px; border: 0; background: transparent; color: #9EA2AA; font: 700 14px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .05em; text-transform: uppercase; }
.gr-tela .gr-aba + .gr-aba { border-left: 2px solid #111; }
.gr-tela .gr-aba.on { background: repeating-linear-gradient(-45deg, #F5C400 0 9px, #E0B300 9px 18px); color: #111; }
.gr-tela .gr-corpo { display: flex; flex-direction: column; gap: 12px; }
.gr-tela .gr-corpo > * { flex: none; min-width: 0; }
.gr-tela .gr-fases { display: flex; gap: 6px; margin: 0 0 8px; flex-wrap: wrap; }
.gr-tela .gr-chip, .gr-tela .gr-aba, .gr-tela .gr-ang { border-radius: 0; }
.gr-tela .gr-chip { flex: 1 1 auto; padding: 8px 4px 6px; white-space: nowrap; border: 2px solid #4C5058; background: #1E1F23; color: #C9CCD2; font: 700 13px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .04em; text-transform: uppercase; clip-path: polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%); }
.gr-tela .gr-chip.on { background: var(--gr-am); border-color: #111; color: #111; }
.gr-tela .gr-angs { display: flex; gap: 6px; margin: 0 0 10px; overflow-x: auto; scrollbar-width: none; }
.gr-tela .gr-angs::-webkit-scrollbar { display: none; }
.gr-tela .gr-ang { flex: none; padding: 6px 9px 5px; border: 1px solid #4C5058; background: #1E1F23; color: #C9CCD2; font: 600 12px/1 var(--gr-mono); }
.gr-tela .gr-ang.on { border-color: var(--gr-am); color: var(--gr-am); background: #26282C; }
.gr-tela .gr-olho { flex: none; width: 40px; height: 32px; border-radius: 0; display: grid; place-items: center; border: 2px solid #111; background: var(--gr-am); color: #111; padding: 0; margin-left: 2px; }
.gr-tela .gr-olho svg { width: 22px; height: 22px; }
.gr-tela .gr-olho.off { background: #3A3D43; color: #C9CCD2; border-color: #4C5058; }
.gr-tela .gr-legenda { margin: 8px 0 0; font: 500 12px/1.35 var(--gr-mono); color: #C9CCD2; }
.gr-tela .gr-opcoes, .gr-tela .gr-ideia { display: block; margin-top: 3px; font: 500 12px/1.3 var(--gr-mono); color: #9EA2AA; }
.gr-tela .gr-mes { display: flex; justify-content: space-between; align-items: baseline; margin: 10px 0 4px; padding-bottom: 4px; border-bottom: 2px solid #111; font: 700 14px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .1em; text-transform: uppercase; color: var(--gr-am); }
.gr-tela .gr-reg { display: flex; gap: 10px; align-items: baseline; padding: 7px 0; font-size: 13px; }
.gr-tela .gr-reg + .gr-reg { border-top: 1px dashed #4C5058; }
.gr-tela .gr-reg b { flex: none; min-width: 78px; font: 700 12px/1.2 var(--gr-mono); color: #F2F2F0; }
.gr-tela .gr-reg .gr-rs { flex: none; font: 700 13px/1.2 var(--gr-mono); color: var(--gr-am); }
.gr-tela .gr-reg .gr-nt { flex: 1; min-width: 0; color: #C9CCD2; font-weight: 500; }
.gr-tela .gr-sub { margin: 14px 0 6px; font: 700 13px/1 var(--gr-mono); letter-spacing: .08em; text-transform: uppercase; color: #9EA2AA; }
.gr-tela .gr-vet { position: relative; height: 138px; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
.gr-tela .gr-vet.cmp { cursor: ew-resize; touch-action: pan-y; }
.gr-tela .gr-vet img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: 50% 100%; pointer-events: none; -webkit-user-drag: none; filter: drop-shadow(0 6px 5px rgba(0,0,0,.45)); }
.gr-tela .gr-vet .gr-dep { clip-path: inset(0 0 0 var(--x, 50%)); }
.gr-tela .gr-vet .gr-div { top: -8px; bottom: -4px; }
.gr-tela .gr-vet .gr-rot { top: auto; bottom: -38px; }
.gr-tela .gr-vet-msg { position: absolute; left: 0; right: 0; bottom: 48%; text-align: center; font: 700 12px/1.3 var(--gr-mono); color: #9EA2AA; }
.gr-tela .gr-ctl { padding: 12px 16px 0; background: #18191C; }
.gr-tela .gr-ctl .gr-fases { align-items: center; flex-wrap: nowrap; }
.gr-tela .gr-ctl .gr-chip { padding-left: 2px; padding-right: 2px; }
.gr-tela .gr-ctl .gr-angs { margin: 0; }
.gr-tela .gr-ctl .gr-legenda { margin: 6px 0 0; font-size: 11px; }
.gr-tela .gr-mais { flex: none; width: 34px; height: 30px; min-width: 0; border-radius: 0; margin-left: auto; padding: 0; border: 2px solid #111; background: var(--gr-am); color: #111; font: 700 24px/1 var(--gr-imp); font-synthesis: none; display: grid; place-items: center; clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px); }
.gr-tela .gr-tit .gr-mais { margin-left: auto; }
.gr-tela .gr-tit small:empty { display: none; }
.gr-tela .gr-man-g { margin: 12px 0 6px; font: 700 13px/1 var(--gr-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--e); }
.gr-tela .gr-man-g:first-of-type { margin-top: 0; }
.gr-tela .gr-man-dt { flex: none; font: 600 11px/1.2 var(--gr-mono); color: #C9CCD2; text-align: right; }
.gr-tela .gr-feito-bt { flex: none; width: auto; height: auto; min-width: 0; border-radius: 0; padding: 6px 8px 5px; border: 2px solid #111; background: var(--gr-am); color: #111; font: 700 12px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .06em; text-transform: uppercase; }
.gr-tela .gr-folha { position: absolute; inset: 0; z-index: 8; display: flex; flex-direction: column; justify-content: flex-end; background: rgba(0,0,0,.6); }
.gr-tela .gr-form { background: #2A2C31; border-top: 4px solid var(--gr-am); padding: 14px 16px calc(84px + env(safe-area-inset-bottom, 0px)); display: flex; flex-direction: column; gap: 10px; max-height: 92%; overflow-y: auto; }
.gr-tela .gr-form h4 { margin: 0; display: flex; align-items: center; gap: 8px; font: 700 18px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .1em; text-transform: uppercase; }
.gr-tela .gr-form h4 button { margin-left: auto; width: 34px; height: 30px; border: 2px solid #4C5058; background: #1E1F23; color: #F2F2F0; font-size: 18px; padding: 0; }
.gr-tela .gr-form label { display: flex; flex-direction: column; gap: 4px; font: 600 11px/1 var(--gr-mono); letter-spacing: .06em; text-transform: uppercase; color: #9EA2AA; }
.gr-tela .gr-form input, .gr-tela .gr-form select { width: 100%; box-sizing: border-box; padding: 10px; border: 2px solid #4C5058; border-radius: 0; background: #141518; color: #F2F2F0; font: 600 16px/1.2 var(--gr-mono); }
.gr-tela .gr-form .gr-ok { align-self: stretch; width: 100%; height: auto; border-radius: 0; padding: 13px; border: 2px solid #111; background: var(--gr-am); color: #111; font: 700 18px/1 var(--gr-imp); font-synthesis: none; letter-spacing: .1em; text-transform: uppercase; }
.gr-tela .gr-form .gr-ok:disabled { opacity: .6; }
.gr-tela .gr-form .gr-erro { margin: 0; font: 600 12px/1.3 var(--gr-mono); color: #F08A24; }
@media (prefers-reduced-motion: reduce) { .gr-tela .gr-portao.gr-sobe { animation-duration: 1ms; } .gr-tela .gr-carga, .gr-tela .gr-sombra, .gr-tela .gr-barra i, .gr-tela .gr-rolo span { transition-duration: 1ms; } .gr-tela .gr-pag.gr-entra .gr-item, .gr-tela .gr-pag.gr-entra .gr-tag, .gr-tela .gr-pag.gr-entra .gr-chave, .gr-tela .gr-pag.gr-no-ar .gr-ferr { animation: none; } }
`;
function injetaCss() { if (document.getElementById('garagem-css')) return; const s = document.createElement('style'); s.id = 'garagem-css'; s.textContent = CSS; document.head.append(s); }
const corOk = c => /^#[0-9a-f]{6}$/i.test(c || '') ? c : '#9AA1AB';
function tom(hex, f) { const n = parseInt(hex.slice(1), 16), a = [n >> 16, (n >> 8) & 255, n & 255], alvo = f < 0 ? 0 : 255, k = Math.abs(f); return '#' + a.map(v => Math.round(v + (alvo - v) * k).toString(16).padStart(2, '0')).join(''); }
const ESTADOS = { 'feito': ['#3FBF5F', 'feito'], 'começou': ['#F5C400', 'comecou'], 'escolhido': ['#4EA8DE', 'escolhido'], 'a comprar': ['#F08A24', 'comprar'], 'planejado': ['#B7BCC3', 'planejado'], 'desejo': ['#E879A6', 'desejo'], 'futuro': ['#7D828B', 'futuro'], 'escolhendo': ['#4EA8DE', 'escolhendo'], 'a decidir': ['#A98BE0', 'decidir'] };
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
  const k = cartao('Tunar', feitos + ' de ' + pec.length + ' feito' + (feitos === 1 ? '' : 's'));
  const bar = elD('div', 'gr-barra'), fill = elD('i'); bar.style.setProperty('--p', (pec.length ? feitos / pec.length * 100 : 0) + '%'); bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-valuenow', feitos); bar.setAttribute('aria-valuemax', pec.length); bar.append(fill); k.append(bar);
  const ul = elD('ul', 'gr-lista');
  pec.forEach((p, i) => {
    const [cor, cl] = ESTADOS[p.estado] || ['#7D828B', 'outro'];
    const li = elD('li', 'gr-item ' + cl); li.style.setProperty('--e', cor); li.style.setProperty('--i', i);
    const cx = elD('span', 'gr-caixa'); if (p.estado === 'feito') cx.innerHTML = CHAVE;
    const tx = elD('span', 'gr-peca', p.peca); if (p.ideia) tx.append(elD('span', 'gr-ideia', p.ideia));
    const op = (p.opcoes || []).map(o => typeof o === 'string' ? o : (o && (o.nome || o.peca || o.titulo)) || '').filter(Boolean); if (op.length) tx.append(elD('span', 'gr-opcoes', 'opções: ' + op.join(' · ')));
    li.append(cx, tx, elD('span', 'gr-etq', p.estado)); ul.append(li);
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
const PASTA = 'categorias/carros-moto/vetores/';
const ANGS = [['lado-esquerdo', 'Lado esq.'], ['lado-direito', 'Lado dir.'], ['frente', 'Frente'], ['traseira', 'Trás'], ['cima', 'Cima'], ['farol', 'Farol']];
const FASES = { original: ['Original', '-original'], agora: ['Agora', ''], meta: ['Meta', '-tunado'] };
const svgCache = {};
const lePlaca = () => { try { return localStorage.getItem('gr-placa') !== '0'; } catch (e) { return true; } };
const gravaPlaca = on => { try { localStorage.setItem('gr-placa', on ? '1' : '0'); } catch (e) {} };
function desenho(id, fase, ang, placa) {
  const cam = PASTA + id + FASES[fase][1] + '/' + ang + '.svg';
  const prom = svgCache[cam] || (svgCache[cam] = lerArquivo(cam).then(t => { if (!/<svg[\s>]/.test(t)) throw new Error('sem svg'); return t; }).catch(e => { delete svgCache[cam]; throw e; }));
  return prom.then(t => {
    if (!placa) { try { const dc = new DOMParser().parseFromString(t, 'image/svg+xml'), g = dc.getElementById('placa'); if (g) { g.remove(); t = new XMLSerializer().serializeToString(dc.documentElement); } } catch (e) {} }
    return URL.createObjectURL(new Blob([t], { type: 'image/svg+xml' }));
  });
}
const OLHO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const OLHO_X = OLHO.replace('</svg>', '<path d="M4 4l16 16"/></svg>');
function elevador(v, vet) {
  const id = v.id, angs = ANGS.filter(a => a[0] !== 'farol' || id === 'gol');
  let fase = 'agora', ang = angs[0][0], placa = lePlaca(), tok = 0;
  const ctl = elD('div', 'gr-ctl'), fases = elD('div', 'gr-fases'), ags = elD('div', 'gr-angs'), leg = elD('p', 'gr-legenda');
  const olho = elD('button', 'gr-olho'); olho.type = 'button';
  const chips = [['original', 'Original'], ['agora', 'Agora'], ['meta', 'Meta'], ['comparar', 'Comparar']].map(([f, t]) => { const b = elD('button', 'gr-chip', t); b.type = 'button'; b.onclick = () => { fase = f; desenha(); }; fases.append(b); return [f, b]; });
  fases.append(olho);
  const abas = angs.map(([a, t]) => { const b = elD('button', 'gr-ang', t); b.type = 'button'; b.onclick = () => { ang = a; desenha(); }; ags.append(b); return [a, b]; });
  olho.onclick = e => { e.stopPropagation(); placa = !placa; gravaPlaca(placa); desenha(); };
  const poe = p => { p = Math.max(0, Math.min(100, p)); vet.style.setProperty('--x', p + '%'); };
  const daX = e => { const r = vet.getBoundingClientRect(); poe((e.clientX - r.left) / r.width * 100); };
  let arr = false;
  vet.addEventListener('pointerdown', e => { if (!vet.classList.contains('cmp')) return; arr = true; try { vet.setPointerCapture(e.pointerId); } catch (x) {} daX(e); e.stopPropagation(); });
  vet.addEventListener('pointermove', e => { if (arr) { daX(e); e.preventDefault(); } });
  const solta = () => { arr = false; }; vet.addEventListener('pointerup', solta); vet.addEventListener('pointercancel', solta);
  const img = (url, cls, alt) => { const i = elD('img', cls); i.alt = alt; i.decoding = 'async'; i.src = url; return i; };
  const velho = vet.innerHTML;   // o desenho antigo do veículo fica de reserva se o vetor não abrir
  function desenha() {
    const meu = ++tok;
    chips.forEach(([f, b]) => b.classList.toggle('on', f === fase)); abas.forEach(([a, b]) => b.classList.toggle('on', a === ang));
    olho.classList.toggle('off', !placa); olho.innerHTML = placa ? OLHO : OLHO_X; olho.setAttribute('aria-label', placa ? 'Esconder a placa' : 'Mostrar a placa'); olho.setAttribute('aria-pressed', String(placa));
    const cmp = fase === 'comparar'; vet.classList.toggle('cmp', cmp);
    const pedidos = cmp ? ['agora', 'meta'] : [fase], o = v.original && v.original.descricao;
    leg.textContent = fase === 'original' ? (o ? 'Original: ' + o : 'Como saiu de fábrica.') : fase === 'meta' ? 'Meta: como ela quer deixar.' : fase === 'agora' ? 'Agora: como está hoje.' : 'Arraste a linha: de um lado o Agora, do outro a Meta.';
    Promise.allSettled(pedidos.map(f => desenho(id, f, ang, placa))).then(r => {
      if (meu !== tok) return;
      if (r.some(x => x.status === 'rejected')) { const falta = pedidos.filter((f, i) => r[i].status === 'rejected').map(f => FASES[f][0]); vet.innerHTML = velho; vet.append(elD('div', 'gr-vet-msg', 'desenho chegando' + (cmp ? ' (' + falta.join(' e ') + ')' : ''))); return; }
      if (!cmp) { vet.replaceChildren(img(r[0].value, '', FASES[fase][0])); return; }
      vet.replaceChildren(img(r[0].value, '', 'Agora'), img(r[1].value, 'gr-dep', 'Meta'), elD('div', 'gr-div'), elD('span', 'gr-rot a', 'AGORA'), elD('span', 'gr-rot d', 'META'));
    });
  }
  ctl.append(fases, ags, leg); desenha(); return ctl;
}
const moeda = n => 'R$ ' + (Number(n) || 0).toFixed(2).replace('.', ',');
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
function chaveData(s) { const m = [...String(s || '').matchAll(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g)].pop(); if (m) return [+m[3], +m[2], +m[1]]; const q = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || ''); return q ? [+q[1], +q[2], +q[3]] : null; }
const ord = (a, b) => { const x = chaveData(a.data), y = chaveData(b.data); if (!x || !y) return x ? -1 : y ? 1 : 0; return (y[0] - x[0]) || (y[1] - x[1]) || (y[2] - x[2]); };
const ARQ_LANC = 'categorias/carros-moto/LANCAMENTOS.md';
const numBr = t => { const n = parseFloat(String(t || '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')); return isNaN(n) ? 0 : n; };
const chaveItem = t => String(t || '').trim().toLowerCase();
function somaLancamentos(vs, texto) {   // soma as linhas do LANCAMENTOS.md por cima do garagem.json (a última linha de um item vale)
  String(texto || '').split(/\r?\n/).forEach(ln => {
    const m = /^\s*-\s*\[(\d{2}\/\d{2}\/\d{4})[^\]]*\]\s*(.+)$/.exec(ln); if (!m) return;
    const c = m[2].split(' · ').map(x => x.trim()), v = vs.find(x => x.id === c[1]); if (!v) return;
    aplicaLanc(v, c[0], c.slice(2), m[1]);
  });
}
function aplicaLanc(v, tipo, c, quando) {
  if (tipo === 'abastecimento') (v.abastecimentos = v.abastecimentos || []).push({ data: c[0] || quando, valor: numBr(c[1]), nota: c[2] || '' });
  else if (tipo === 'oleo') (v.trocas_oleo = v.trocas_oleo || []).push({ data: c[0] || quando, km: c[1] || '', nota: c[2] || '' });
  else if (tipo === 'manutencao') {
    const l = v.manutencao = v.manutencao || [], k = chaveItem(c[0]), n = { id: 'lanc-' + k, item: c[0], estado: c[1] || 'a fazer', desde: quando, data: c[2] || '' }, i = l.findIndex(x => chaveItem(x.item) === k);
    if (i >= 0) l[i] = Object.assign({}, l[i], n, { id: l[i].id, desde: l[i].desde || quando }); else l.push(n);
  }
}
const ESTMAN = [['a fazer', '#F08A24'], ['agendado', '#4EA8DE'], ['feito', '#3FBF5F']];
function botaoMais(rot, fn) { const b = elD('button', 'gr-mais', '+'); b.type = 'button'; b.setAttribute('aria-label', rot); b.onclick = fn; return b; }
function manutencao(v, lanca) {
  const l = v.manutencao || [], k = cartao('Manutenção', l.length ? String(l.length) : '');
  k.firstChild.append(botaoMais('Lançar manutenção, abastecimento ou óleo', () => lanca('manutencao')));
  if (!l.length) k.append(elD('p', 'gr-vazio', 'nada anotado ainda'));
  ESTMAN.forEach(([est, cor]) => {
    const g = l.filter(x => (x.estado || 'a fazer') === est).sort((a, b) => ord({ data: b.data || b.desde }, { data: a.data || a.desde })); if (!g.length) return;
    const h = elD('div', 'gr-man-g', est + ' · ' + g.length); h.style.setProperty('--e', cor); k.append(h);
    const ul = elD('ul', 'gr-lista');
    g.forEach(x => {
      const li = elD('li', 'gr-item ' + (est === 'feito' ? 'feito' : '')); li.style.setProperty('--e', cor);
      const cx = elD('span', 'gr-caixa'); if (est === 'feito') cx.innerHTML = CHAVE;
      const dt = est === 'agendado' ? 'para ' + dataBr(x.data || '') : est === 'feito' ? 'feito em ' + dataBr(x.data || x.desde || '') : 'desde ' + dataBr(x.desde || '');
      li.append(cx, elD('span', 'gr-peca', x.item), elD('span', 'gr-man-dt', dt));
      if (est !== 'feito') { const bt = elD('button', 'gr-feito-bt', 'Feito'); bt.type = 'button'; bt.onclick = () => lanca('feito', x); li.append(bt); }
      ul.append(li);
    });
    k.append(ul);
  });
  return k;
}
function diario(v, lanca) {
  const k = cartao('Diário'), ab = (v.abastecimentos || []).slice().sort(ord);
  k.firstChild.append(botaoMais('Lançar abastecimento ou troca de óleo', () => lanca('abastecimento')));
  k.append(elD('div', 'gr-sub', 'Abastecimentos'));
  if (!ab.length) k.append(elD('p', 'gr-vazio', 'nada anotado ainda'));
  else {
    const grupos = [];
    ab.forEach(a => { const c = chaveData(a.data), nome = c ? MESES[c[1] - 1] + ' ' + c[0] : 'sem data'; let g = grupos.find(x => x.nome === nome); if (!g) grupos.push(g = { nome, tot: 0, l: [] }); g.tot += Number(a.valor) || 0; g.l.push(a); });
    grupos.forEach(g => {
      const h = elD('div', 'gr-mes'); h.append(elD('span', null, g.nome), elD('span', null, 'total ' + moeda(g.tot))); k.append(h);
      g.l.forEach(a => { const r = elD('div', 'gr-reg'); r.append(elD('b', null, dataBr(a.data)), elD('span', 'gr-rs', moeda(a.valor)), elD('span', 'gr-nt', a.nota || '')); k.append(r); });
    });
  }
  const lista = (tit, l, fmt) => { k.append(elD('div', 'gr-sub', tit)); if (!l.length) { k.append(elD('p', 'gr-vazio', 'nada anotado ainda')); return; } l.forEach(x => { const r = elD('div', 'gr-reg'); r.append(elD('b', null, dataBr(x.data || x.feito || '') || '-'), elD('span', 'gr-nt', fmt(x))); k.append(r); }); };
  lista('Trocas de óleo', (v.trocas_oleo || []).slice().sort(ord), x => [x.km ? x.km + ' km' : '', x.nota || ''].filter(Boolean).join(' · '));
  lista('Usos', (v.usos || []).slice().sort(ord), x => x.nota || '');
  return k;
}
const hojeBr = () => stamp(new Date()).slice(0, 10);
function folhaLancar(raiz, v, tipo0, item0, grava, depois) {   // o formulário do "+": manutenção, abastecimento ou troca de óleo
  const fo = elD('div', 'gr-folha'), f = elD('div', 'gr-form'), h = elD('h4', null, 'Lançar · ' + v.nome), x = elD('button', null, '×'); x.type = 'button'; x.setAttribute('aria-label', 'Fechar'); h.append(x);
  const fecha = () => fo.remove(); x.onclick = fecha; fo.addEventListener('click', e => { if (e.target === fo) fecha(); });
  const tipos = elD('div', 'gr-fases'); let t = tipo0 === 'feito' ? 'manutencao' : tipo0;
  const campos = elD('div'); campos.style.cssText = 'display:flex;flex-direction:column;gap:10px';
  const campo = (rot, el) => { const lb = elD('label', null, rot); lb.append(el); return lb; };
  const inp = (ph, val, modo) => { const i = elD('input'); i.type = 'text'; i.placeholder = ph; if (val) i.value = val; if (modo) i.inputMode = modo; i.autocomplete = 'off'; return i; };
  const erro = elD('p', 'gr-erro'), ok = elD('button', 'gr-ok', 'Lançar'); ok.type = 'button';
  let F = {};
  const monta = () => {
    [...tipos.children].forEach((b, i) => b.classList.toggle('on', ['manutencao', 'abastecimento', 'oleo'][i] === t));
    F = {}; campos.replaceChildren(); erro.textContent = '';
    if (t === 'manutencao') {
      F.item = inp('ex.: trocar pastilha de freio', item0 ? item0.item : ''); F.estado = elD('select'); ESTMAN.forEach(([e]) => { const o = elD('option', null, e); o.value = e; F.estado.append(o); }); F.estado.value = item0 ? 'feito' : 'a fazer';
      F.data = inp('DD/MM/AAAA', item0 ? hojeBr() : '', 'numeric');
      campos.append(campo('O que', F.item), campo('Estado', F.estado), campo('Data (agendado ou feito)', F.data));
    } else if (t === 'abastecimento') { F.data = inp('DD/MM/AAAA', hojeBr(), 'numeric'); F.valor = inp('0,00', '', 'decimal'); F.nota = inp('posto, litros, km (opcional)', ''); campos.append(campo('Data', F.data), campo('Valor (R$)', F.valor), campo('Nota', F.nota)); }
    else { F.data = inp('DD/MM/AAAA', hojeBr(), 'numeric'); F.km = inp('km (opcional)', '', 'numeric'); F.nota = inp('óleo, filtro (opcional)', ''); campos.append(campo('Data', F.data), campo('Km', F.km), campo('Nota', F.nota)); }
  };
  [['manutencao', 'Manutenção'], ['abastecimento', 'Abastecimento'], ['oleo', 'Troca de óleo']].forEach(([q, n]) => { const b = elD('button', 'gr-chip', n); b.type = 'button'; b.onclick = () => { t = q; item0 = null; monta(); }; tipos.append(b); });
  monta();
  const lim = s => String(s || '').trim().replace(/\s*·\s*/g, ' - ');
  ok.onclick = async () => {
    const dt = (F.data.value || '').trim();
    if (dt && !/^\d{2}\/\d{2}\/\d{4}$/.test(dt)) { erro.textContent = 'Data no formato DD/MM/AAAA.'; return; }
    let c2;
    if (t === 'manutencao') { const it = lim(F.item.value), es = F.estado.value; if (!it) { erro.textContent = 'Diz o que é a manutenção.'; return; } if (es === 'agendado' && !dt) { erro.textContent = 'Agendado precisa da data.'; return; } c2 = [it, es, es === 'feito' ? (dt || hojeBr()) : dt]; if (!c2[2]) c2.pop(); }
    else if (t === 'abastecimento') { const n = numBr(F.valor.value); if (!(n > 0)) { erro.textContent = 'Põe o valor em R$.'; return; } c2 = [dt || hojeBr(), n.toFixed(2).replace('.', ','), lim(F.nota.value)]; if (!c2[2]) c2.pop(); }
    else { c2 = [dt || hojeBr(), lim(F.km.value), lim(F.nota.value)]; while (c2.length > 1 && !c2[c2.length - 1]) c2.pop(); }
    const agora = new Date(), linha = '- [' + stamp(agora) + '] ' + t + ' · ' + v.id + ' · ' + c2.join(' · ');
    ok.disabled = true; ok.textContent = 'Lançando…';
    if (await grava(linha)) { aplicaLanc(v, t, c2, stamp(agora).slice(0, 10)); fecha(); depois(t); }
    else { ok.disabled = false; ok.textContent = 'Lançar'; erro.textContent = 'Não lançou: confere a internet.'; }
  };
  f.append(h, tipos, campos, erro, ok); fo.append(f); raiz.append(fo);
}
function pagina(v, i, tot, raiz) {
  const cor = corOk(v.cor), pg = elD('article', 'gr-pag'); pg.style.setProperty('--v', cor); pg.setAttribute('aria-label', v.nome);
  const pal = elD('div', 'gr-palco'), par = elD('div', 'gr-parede'), pf = elD('div', 'gr-painel-f'), box = elD('div', 'gr-box', 'BOX');
  pf.innerHTML = FERRAMENTAS; box.append(elD('b', null, String(i + 1).padStart(2, '0'))); box.setAttribute('aria-label', 'Vaga ' + (i + 1) + ' de ' + tot);
  par.append(elD('div', 'gr-lampada'), pf, box);
  const carga = elD('div', 'gr-carga'), id = (v.id || 'v' + i).replace(/[^a-z0-9]/gi, '');
  const vet = elD('div', 'gr-vet'); vet.innerHTML = (SVG[v.tipo] || svgSiena)(id, cor); carga.append(vet);
  const rampa = elD('div', 'gr-rampa'); rampa.append(elD('span', 'gr-carro e'), elD('span', 'gr-carro d')); carga.append(rampa);
  pal.append(par, elD('div', 'gr-faixa'), elD('div', 'gr-chao'), elD('div', 'gr-sombra'), elD('div', 'gr-coluna e'), elD('div', 'gr-coluna d'), carga);
  const nm = elD('div', 'gr-nome'); nm.append(elD('h3', null, v.nome), elD('div', 'gr-modelo', v.modelo));
  const ln = elD('div', 'gr-linha'); if (v.apelido) ln.append(elD('span', 'gr-fita', v.apelido));
  if (v.medida) { const tr = elD('span', 'gr-trena'); tr.setAttribute('aria-label', 'Medida ' + v.medida); tr.append(elD('i'), elD('span', null, v.medida)); ln.append(tr); }
  if (ln.children.length) nm.append(ln);
  const ro = elD('div', 'gr-rola');
  const ctl = elevador(v, vet);
  const abas = elD('div', 'gr-abas'), corpo = elD('div', 'gr-corpo');
  const ficha = () => { const l = []; if (v.antes || v.depois) l.push(antesDepois(v)); if (v.odometro) l.push(odometro(v)); l.push(datas(v), pendentes(v)); if (v.cor_nota) l.push(elD('span', 'gr-cornota', v.cor_nota)); if (v.fonte) l.push(elD('p', 'gr-fonte', 'fonte: ' + v.fonte)); return l; };
  const tunar = () => { if (v.projeto && v.projeto.length) return [projeto(v)]; const k = cartao('Tunar'); k.append(elD('p', 'gr-vazio', 'nada anotado ainda')); return [k]; };
  const lanca = (t, it) => folhaLancar(raiz, v, t, it, linha => gravaLinha(ARQ_LANC, linha), tp => { bs[tp === 'manutencao' ? 2 : 3].click(); showNote('Lançado.'); });
  const AB = [['Ficha', ficha], ['Tunar', tunar], ['Manutenção', () => [manutencao(v, lanca)]], ['Diário', () => [diario(v, lanca)]]];
  const bs = AB.map(([t, f], n) => { const b = elD('button', 'gr-aba', t); b.type = 'button'; b.onclick = () => { bs.forEach((x, q) => x.classList.toggle('on', q === n)); corpo.replaceChildren(...f()); }; abas.append(b); return b; });
  bs[0].click(); ro.append(abas, corpo);
  pg.append(pal, ctl, nm, ro); return pg;
}
window.abreGaragem = function (m) {
  m = m || {}; const arq = m.arq || 'categorias/carros-moto/garagem.json';
  tela(m.nome || 'Garagem', async c => {
    injetaCss(); c.classList.add('gr-tela'); painel.style.setProperty('--c', '#F5C400');
    cabecalho({ icone: 'car', sub: 'Oficina da May' });
    const portao = elD('div', 'gr-portao'), pl = elD('div', 'gr-portao-placa', 'Garagem'); portao.append(pl, elD('span', 'gr-portao-puxa')); c.append(portao);
    const t0 = Date.now(); let d;
    try { d = JSON.parse(await lerArquivo(arq)); } catch (e) { d = null; }
    let lanc = ''; try { lanc = await lerArquivo(ARQ_LANC); } catch (e) { lanc = ''; }
    if (!c.isConnected) return;
    const vs = d && Array.isArray(d.veiculos) ? d.veiculos : [];
    if (vs.length) somaLancamentos(vs, lanc);
    if (!vs.length) { c.prepend(elD('p', 'gr-msg', d ? 'A garagem tá vazia.' : 'Não consegui abrir a garagem. Confere a internet.')); }
    else {
      cabecalho({ icone: 'car', sub: vs.length + (vs.length === 1 ? ' veículo' : ' veículos') + ' na oficina' });
      const pager = elD('div', 'gr-pager'), pts = elD('div', 'gr-pontos'), pgs = vs.map((v, i) => pagina(v, i, vs.length, c));
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
