(function(){
if (customElements.get('dv-ui')) return;
const CSS = `
:host{display:block;--ground:#F4F6FA;--paper:#FFFFFF;--ink:#10203A;--ink-2:#44526B;--ink-3:#7A8699;--line:#DCE2EC;--line-2:#C5CEDD;--mist:#EEF1F6;--blue:#3D6FE3;--blue-deep:#274FB0;--blue-soft:#E8EFFD;--blue-line:#B7CBF6;--amber:#C97A21;--amber-soft:#FFF4E5;--amber-line:#F0CF9F;--green:#1E8E5A;--green-soft:#E6F5EC;--green-line:#9FD5B9;--red:#C43C3C;--red-soft:#FCEBEB;--red-line:#EBB1B1;--teal:#1F9E8C;--navy:#0E1C33;--shadow:0 10px 30px rgba(16,32,58,.10);--shadow-lg:0 24px 60px rgba(16,32,58,.16);--f-body:"Pretendard Variable","Pretendard","Noto Sans KR","Apple SD Gothic Neo",sans-serif;--f-mono:var(--f-body);font-family:var(--f-body);color:var(--ink);font-size:16px;line-height:1.7;letter-spacing:-0.01em;font-variant-numeric:tabular-nums;word-break:keep-all;text-align:left}
*{box-sizing:border-box}[hidden]{display:none!important}
button{font:inherit;color:inherit}h3,h4{margin:0;letter-spacing:-0.03em;line-height:1.3}h3{font-size:20px;font-weight:600}p{margin:0}
.sample{font-size:12px;color:var(--ink-3)}
.link-arrow{color:var(--blue);font-weight:600;font-size:15px;text-decoration:none}
.chip{display:inline-flex;align-items:center;font-size:12px;padding:2px 9px;border-radius:999px;border:1px solid;line-height:1.55;white-space:nowrap;font-weight:500}
.chip.g{color:var(--green);border-color:var(--green-line);background:var(--green-soft)}.chip.r{color:var(--red);border-color:var(--red-line);background:var(--red-soft)}.chip.b{color:var(--blue);border-color:var(--blue-line);background:var(--blue-soft)}.chip.a{color:var(--amber);border-color:var(--amber-line);background:var(--amber-soft)}.chip.n{color:var(--ink-2);border-color:var(--line-2);background:var(--mist)}
.cs{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;color:#fff;font-size:12px;font-weight:600;flex:none}.cs.g{background:var(--green)}.cs.o{background:var(--amber)}.cs.r{background:var(--red)}.cs.x{background:var(--line-2)}
.src{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--ink-2)}.src i{width:18px;height:18px;border-radius:5px;display:inline-grid;place-items:center;font-style:normal;font-size:10px;font-weight:700;color:#fff}
.dirc{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;font-size:13px;background:var(--blue-soft);color:var(--blue)}.dirc.miss{background:var(--amber-soft);color:var(--amber)}.dirc.out{background:#EEF1F6;color:var(--ink-2)}
.fine{font-size:13px;color:var(--ink-3);margin-top:16px}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(30,142,90,.45)}70%{box-shadow:0 0 0 9px rgba(30,142,90,0)}100%{box-shadow:0 0 0 0 rgba(30,142,90,0)}}
@keyframes slidein{from{opacity:0;transform:translateY(-10px);background:var(--blue-soft)}to{opacity:1;transform:none;background:transparent}}
@keyframes apulse{0%,100%{opacity:1}50%{opacity:.25}}
.live{background:var(--paper);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow-lg);overflow:hidden}
.live-h{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--line)}
.live-h b{font-weight:600;font-size:15px;display:flex;align-items:center;gap:9px}
.pulse{width:9px;height:9px;border-radius:50%;background:var(--green);animation:pulse 2s infinite}
.live-h span{font-size:12px;color:var(--ink-3)}
.counters{display:grid;grid-template-columns:repeat(5,1fr);border-bottom:1px solid var(--line);background:#FAFBFD}
.counters div{padding:12px 6px;text-align:center;border-right:1px solid var(--line)}.counters div:last-child{border-right:0}
.counters span{display:block;font-size:11.5px;color:var(--ink-3)}.counters b{font-size:20px;font-weight:600;transition:color .3s}
.counters .warn b{color:var(--amber)}.counters .bad b{color:var(--red)}
.counters b.bump{animation:up .4s}
.feed{list-style:none;margin:0;padding:6px 0;min-height:352px}
.feed li{display:grid;grid-template-columns:48px 28px 1fr auto;gap:10px;align-items:center;padding:11px 20px;border-bottom:1px solid var(--mist)}.feed li:last-child{border-bottom:0}
.feed li.new{animation:rowin .32s cubic-bezier(.22,1,.36,1) both}
@keyframes rowin{from{opacity:0;max-height:0;padding-top:0;padding-bottom:0;background:var(--blue-soft)}60%{opacity:1}to{opacity:1;max-height:80px;background:transparent}}
.feed .t{font-size:12px;color:var(--ink-3)}
.feed .ic{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-size:11px;font-weight:700;color:#fff}
.ic.call{background:var(--blue)}.ic.miss{background:var(--amber)}.ic.cons{background:var(--teal)}.ic.visit{background:var(--green)}
.feed .tx b{display:block;font-size:14px;font-weight:600;line-height:1.35}.feed .tx small{display:block;font-size:12.5px;color:var(--ink-3);line-height:1.4}
.live-f{padding:10px 20px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;background:#FAFBFD;gap:10px}
@media (max-width:520px){.feed li{grid-template-columns:40px 26px 1fr}.feed li .chip{grid-column:3;justify-self:start}.counters span{font-size:10.5px}}
.loop{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:56px;align-items:center}
.steps{display:flex;flex-direction:column;border-top:1px solid #E5E8EB}
.steps button{position:relative;display:block;text-align:left;padding:24px 0;border:0;border-bottom:1px solid #E5E8EB;background:none;cursor:pointer;border-radius:0}
.steps button .k{display:none}
.steps button b{display:block;font-size:clamp(19px,2vw,24px);font-weight:700;letter-spacing:-0.02em;color:#C4CAD3;transition:color .4s}.steps button:hover b{color:#8B95A1}.steps button span.d{display:block;max-height:0;opacity:0;overflow:hidden;font-size:16px;color:#6B7684;line-height:1.65;transition:max-height .6s cubic-bezier(.22,1,.36,1),opacity .4s,margin .4s}
.steps button[aria-selected="true"] b{color:#191F28}.steps button[aria-selected="true"] span.d{max-height:140px;opacity:1;margin-top:10px}
.steps button .pg{position:absolute;left:0;bottom:-1px;height:2px;width:0;background:#191F28}
.stage-box{background:var(--paper);border:1px solid rgba(0,0,0,.05);border-radius:28px;box-shadow:0 30px 70px -30px rgba(30,40,60,.28);padding:26px;min-height:460px}
.stage-box .sh{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}.stage-box .sh b{font-size:15px;font-weight:600}
.lpanel{display:none}.lpanel.on{display:block;animation:fade .3s}
.lpanel.on .mrow,.lpanel.on .bar,.lpanel.on .mi,.lpanel.on .ba>div{animation:up .45s both}
.mrow{display:grid;grid-template-columns:auto 1fr auto auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--mist);font-size:14px}.mrow:last-child{border-bottom:0}
.mrow .who{font-weight:500}.mrow .who small{display:block;font-size:12px;color:var(--ink-3);font-weight:400}
.bars{display:grid;gap:10px}
.bar{display:grid;grid-template-columns:120px 1fr 44px;gap:12px;align-items:center;font-size:14px}
.bar .track{height:12px;background:var(--mist);border-radius:6px;overflow:hidden}
.bar .fill{height:100%;border-radius:6px;background:var(--blue);transition:width .9s cubic-bezier(.22,1,.36,1)}
.bar .fill.r{background:var(--red)}.bar .fill.a{background:var(--amber)}.bar .fill.g{background:var(--green)}
.bar .v{font-size:13px;text-align:right}
.kw{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.kw span{font-size:13px;padding:5px 11px;border-radius:999px;background:var(--mist);color:var(--ink-2)}.kw span.hot{background:var(--red-soft);color:var(--red)}
.manual{border:1px solid var(--line);border-radius:10px;overflow:hidden}
.manual .mh{background:var(--mist);padding:10px 14px;font-weight:600;font-size:14px;display:flex;justify-content:space-between}
.manual .mi{padding:12px 14px;border-top:1px solid var(--line);font-size:14px}.manual .mi .qq{font-weight:600;margin-bottom:4px}.manual .mi .aa{color:var(--ink-2);line-height:1.55}
.manual .mi .from{margin-top:6px;display:flex;gap:8px;align-items:center;font-size:12px;color:var(--ink-3)}
.ba{display:grid;grid-template-columns:1fr 1fr;gap:14px}.ba>div{border:1px solid var(--line);border-radius:10px;padding:16px}
.ba .lbl{font-size:12.5px;color:var(--ink-3);margin-bottom:8px}.ba .big{font-size:30px;font-weight:600;line-height:1.1}.ba .big small{font-size:14px;color:var(--ink-3);font-weight:400}.ba .arrow{color:var(--green);font-weight:600;font-size:13.5px;margin-top:4px}
@media (max-width:980px){.loop{grid-template-columns:1fr}}
.explorer{background:var(--paper);border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);overflow:hidden}.explorer.bare{border:0;border-radius:0;box-shadow:none}
.ex-top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:18px 22px;border-bottom:1px solid var(--line);background:#FAFBFD}
.ex-top h3{font-size:19px}.ex-top p{font-size:14px;color:var(--ink-3)}
.filters{display:flex;gap:8px;flex-wrap:wrap}
.filters button{border:1px solid var(--line-2);background:var(--paper);border-radius:999px;padding:7px 14px;font-size:13.5px;cursor:pointer;font-weight:500}
.filters button[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}.filters button .n{font-size:12px;margin-left:6px;opacity:.7}
.ex-body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);min-height:520px}
.ex-list{border-right:1px solid var(--line);max-height:620px;overflow:auto}
.ex-list button{display:grid;grid-template-columns:30px 1fr auto;gap:12px;align-items:center;width:100%;text-align:left;padding:14px 18px;border:0;border-bottom:1px solid var(--mist);background:transparent;cursor:pointer;transition:background .25s,box-shadow .25s}
.ex-list button:hover{background:#F8FAFD}.ex-list button[aria-selected="true"]{background:var(--blue-soft);box-shadow:inset 3px 0 0 var(--blue)}
.ex-list .nm{font-weight:600;font-size:14.5px}.ex-list .nm small{font-weight:400;color:var(--ink-3);font-size:12.5px;margin-left:6px}
.ex-list .tg{display:flex;gap:5px;flex-wrap:wrap;margin-top:4px}.ex-list .rt{display:flex;flex-direction:column;align-items:flex-end;gap:5px}.ex-list .rt small{font-size:11.5px;color:var(--ink-3)}
.ex-detail{padding:22px 24px;max-height:620px;overflow:auto}
.ex-detail .dh{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:14px}.ex-detail .dh h4{margin:0;font-size:18px;font-weight:600}.ex-detail .dh small{display:block;color:var(--ink-3);font-size:13px;font-weight:400}
.info{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-bottom:16px}
.info div{background:#FAFBFD;padding:9px 12px;font-size:13px}.info span{display:block;color:var(--ink-3);font-size:11.5px}
.bubbles{display:flex;flex-direction:column;gap:9px;margin-bottom:16px}
.bub{max-width:88%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.55}
.bubbles .bub,.dnote{animation:up .45s both}
.bub.c{background:var(--mist);align-self:flex-start;border-bottom-left-radius:3px}.bub.s{background:var(--blue);color:#fff;align-self:flex-end;border-bottom-right-radius:3px}
.bub .who{display:block;font-size:10.5px;opacity:.7;margin-bottom:2px}.bub .chip{margin-top:6px}
.dnote{background:#F8FAFD;border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.dnote .dt{font-weight:600;font-size:13.5px;color:var(--blue);margin-bottom:8px;display:flex;justify-content:space-between}
.kv{display:grid;grid-template-columns:auto 1fr;gap:5px 16px;font-size:14px;margin:0}.kv dt{color:var(--ink-3)}.kv dd{margin:0;font-weight:500}.kv dd.hl{color:var(--blue);font-weight:600}
.missmsg{border:1px dashed var(--amber-line);background:var(--amber-soft);border-radius:10px;padding:16px;font-size:14.5px;color:#7A4A12;animation:up .45s both}
@media (max-width:860px){.ex-body{grid-template-columns:1fr}.ex-list{border-right:0;border-bottom:1px solid var(--line);max-height:340px}.info{grid-template-columns:1fr 1fr}}
.donut{display:grid;grid-template-columns:180px 1fr;gap:22px;align-items:center}.donut svg{width:180px;height:180px;display:block}
.donut .legend{list-style:none;padding:0;margin:0;display:grid;gap:2px}
.donut .legend button{display:grid;grid-template-columns:12px 1fr auto auto;gap:10px;align-items:center;width:100%;padding:5px 8px;border:0;background:transparent;border-radius:6px;cursor:pointer;font-size:13.5px;text-align:left;transition:background .2s}
.donut .legend button:hover,.donut .legend button[aria-pressed="true"]{background:var(--mist)}
.donut .legend i{width:10px;height:10px;border-radius:3px;display:block}.donut .legend .c{font-size:12.5px;color:var(--ink-3)}.donut .legend .p{font-size:12.5px;font-weight:600;min-width:34px;text-align:right}
circle.seg{transition:opacity .3s,stroke-width .3s}
@media (max-width:520px){.donut{grid-template-columns:1fr;justify-items:center}.donut .legend{width:100%}}
.soapw{display:grid;grid-template-columns:1fr 1fr;background:var(--paper);border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);overflow:hidden}
.soapw .col{padding:20px 22px}.soapw .col+.col{border-left:1px solid var(--line);background:#FAFBFD}
.soapw .ch{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:10px;flex-wrap:wrap}.soapw .ch b{font-size:15px;font-weight:600}
.tscript{position:relative;max-height:470px;overflow:auto;display:flex;flex-direction:column;gap:6px;padding-right:4px;scroll-behavior:smooth}
.tl{display:grid;grid-template-columns:44px 20px 1fr;gap:8px;padding:8px 10px;border-radius:8px;font-size:14px;line-height:1.5;border-left:3px solid transparent;transition:background .3s,border-color .3s}
.tl .ts{font-size:12px;color:var(--ink-3);padding-top:1px}.tl .sp{font-size:12px;font-weight:600;color:var(--blue);padding-top:1px}.tl.B .sp{color:var(--green)}
.tl.hit{background:var(--amber-soft);border-left-color:var(--amber)}
.soap{display:flex;flex-direction:column;gap:14px}
.soap .sec b{font-size:13px;color:var(--ink);display:block;margin-bottom:4px}.soap .sec b em{font-style:normal;color:var(--ink-3);font-weight:400;margin-left:6px;font-size:12.5px}
.soap button{display:block;width:100%;text-align:left;padding:6px 10px;margin:0 0 2px;border:1px solid transparent;border-radius:7px;background:transparent;cursor:pointer;font-size:14px;line-height:1.5;transition:all .25s}
.soap button:hover{background:var(--paper);border-color:var(--line)}.soap button[aria-pressed="true"]{background:var(--paper);border-color:var(--amber);box-shadow:0 0 0 3px var(--amber-soft)}
.soap-hint{font-size:13px;color:var(--ink-3);margin-top:12px}
@media (max-width:900px){.soapw{grid-template-columns:1fr}.soapw .col+.col{border-left:0;border-top:1px solid var(--line)}.tscript{max-height:300px}}
.vis{position:relative;background:none;display:grid;place-items:center;overflow:hidden;height:340px;padding:28px 26px;border-radius:inherit}
.fr{width:100%;max-width:330px;background:rgba(255,255,255,.74);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.85);border-radius:20px;box-shadow:0 20px 44px -24px rgba(30,40,60,.28);font-size:12.5px;line-height:1.5;padding:12px 14px}
.vis.on .fr>*{animation:up .5s both}
.vis{background:#FAFBFD;isolation:isolate}
.vis .bl{position:absolute;border-radius:50%;filter:blur(36px);z-index:-1;animation:drift 14s ease-in-out infinite alternate;transition:background .6s}
.vis .b1{width:75%;height:75%;left:-15%;top:-20%;background:rgba(81,104,224,.10)}
.vis .b2{width:65%;height:65%;right:-18%;bottom:-25%;background:rgba(197,188,187,.18);animation-duration:18s;animation-direction:alternate-reverse}
.vis .b3{width:50%;height:50%;right:5%;top:0;background:rgba(248,241,255,.95);animation-duration:11s}
.vis[data-t="1"] .b1,.vis[data-t="4"] .b1{left:40%;top:-25%}
.vis[data-t="1"] .b2,.vis[data-t="4"] .b2{left:-20%;right:auto}
.vis[data-t="2"] .b1,.vis[data-t="5"] .b1{left:10%;top:45%}
.vis[data-t="2"] .b3,.vis[data-t="5"] .b3{left:0;right:auto}
@keyframes drift{0%{transform:translate(0,0) scale(1)}50%{transform:translate(10%,8%) scale(1.15)}100%{transform:translate(-8%,5%) scale(.92)}}
.vis .fr{position:relative;animation:flo 6s ease-in-out infinite;transition:transform .6s cubic-bezier(.22,1,.36,1),box-shadow .6s}
@keyframes flo{0%,100%{translate:0 0}50%{translate:0 -7px}}
:host(:hover) .vis .fr{transform:scale(1.04);box-shadow:0 34px 60px -28px rgba(43,69,212,.38)}
:host(:hover) .vis .b1{background:rgba(81,104,224,.2)}
.arw{position:absolute;right:18px;bottom:18px;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.62);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:#191F28;box-shadow:0 8px 24px rgba(30,40,60,.10);transition:background .4s,color .4s,transform .5s cubic-bezier(.22,1,.36,1)}
:host([active]) .arw{background:#fff;transform:scale(1.08)}
:host(:hover) .arw{background:#2B45D4;color:#fff;transform:translateX(4px) scale(1.08)}
.fr-h{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px}.fr-h b{font-weight:700;font-size:1.05em}.fr-h>span:not(.chip){font-size:.86em;color:var(--ink-3)}
.fr-a{display:grid;grid-template-columns:24px 1fr auto;gap:10px;align-items:center;padding:10px 12px;border-radius:9px;margin-bottom:7px}
.fr-a i{width:24px;height:24px;border-radius:7px;display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:700;color:#fff}.fr-a b{font-size:1.15em;font-weight:800}
.fr-a.amber{background:var(--amber-soft)}.fr-a.amber i{background:var(--amber)}.fr-a.amber b{color:var(--amber)}
.fr-a.red{background:var(--red-soft)}.fr-a.red i{background:var(--red)}.fr-a.red b{color:var(--red)}
.fr-a.blue{background:var(--blue-soft)}.fr-a.blue i{background:var(--blue)}.fr-a.blue b{color:var(--blue)}
.fr-row{display:grid;grid-template-columns:30px 1fr auto;gap:12px;align-items:center}.fr-row b{display:block;font-weight:700}.fr-row small{color:var(--ink-3);font-size:.88em}
.fr-chips{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}
.fr-note{background:var(--mist);border-radius:8px;padding:9px 12px;font-size:.95em}.fr-note span{font-size:.82em;font-weight:700;color:var(--blue);margin-right:8px}.fr-note b{color:var(--blue)}
.fr-bars{display:grid;gap:8px}.fr-bar{display:grid;grid-template-columns:70px 1fr 22px;gap:10px;align-items:center;font-size:.92em}
.fr-bar .tr{height:9px;background:var(--mist);border-radius:5px;overflow:hidden}.fr-bar .tr span{display:block;height:100%;background:var(--red);border-radius:5px}.fr-bar em{font-style:normal;text-align:right;font-weight:700}
.fr-arrow{text-align:center;color:var(--ink-3);margin:6px 0;font-size:1.1em;line-height:1}
.fr-std{border:1px solid var(--green-line);background:var(--green-soft);border-radius:10px;padding:10px 12px}.fr-std b{display:block;color:var(--green);font-size:.92em;margin-bottom:4px}.fr-std ul{margin:0;padding-left:18px}.fr-std li{margin:2px 0}
.fr-kv{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0;font-size:.95em}.fr-kv dt{color:var(--ink-3)}.fr-kv dd{margin:0;font-weight:500}
.fr-kv dd.hl{background:var(--amber-soft);border-radius:5px;padding:0 6px;margin:0 -6px;color:#8A5412;font-weight:700}
.fr-soap{display:grid;gap:7px}.fr-soap div{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:center;padding:7px 10px;border-radius:8px;background:#F6F8FC}
.fr-soap b{width:28px;height:28px;border-radius:7px;background:var(--ink);color:#fff;display:grid;place-items:center;font-weight:700}.fr-soap div.hl{background:var(--amber-soft)}.fr-soap div.hl b{background:var(--amber)}
.fr-donut{display:grid;grid-template-columns:118px 1fr;gap:16px;align-items:center}
.fr-donut .d{width:118px;height:118px;border-radius:50%;background:conic-gradient(#03A55A 0 39%,#3D6FE3 0 62%,#D9A400 0 71%,#2E9BD6 0 79%,#7A5AF8 0 86%,#D6456B 0 93%,#E0752D 0 98%,#8A94A6 0 100%);position:relative;display:grid;place-items:center}
.fr-donut .d::after{content:"";position:absolute;inset:25px;border-radius:50%;background:var(--paper)}.fr-donut .d b{position:relative;z-index:1;font-size:1.3em;font-weight:800}
.fr-donut ul{list-style:none;margin:0;padding:0;display:grid;gap:6px;font-size:.92em}.fr-donut li{display:grid;grid-template-columns:10px 1fr auto;gap:8px;align-items:center}.fr-donut li i{width:10px;height:10px;border-radius:3px;display:block}.fr-donut li em{font-style:normal;font-weight:700}
.fr-tl{list-style:none;margin:0;padding:0}.fr-tl li{display:grid;grid-template-columns:42px 1fr;gap:10px;padding:8px 0;border-bottom:1px solid var(--mist);align-items:start}.fr-tl li:last-child{border-bottom:0}
.fr-tl .ty{font-size:.78em;font-weight:700;color:#fff;border-radius:999px;text-align:center;padding:2px 0;margin-top:2px}.fr-tl .ty.call{background:var(--blue)}.fr-tl .ty.cons{background:var(--teal)}.fr-tl .ty.visit{background:var(--green)}.fr-tl small{display:block;color:var(--ink-3);font-size:.86em}
.app{display:flex;height:472px;background:#F6F8FC;font-size:12px;line-height:1.5;color:var(--ink);text-align:left}
.app-nav{width:110px;flex:none;background:var(--paper);border-right:1px solid var(--line);padding:10px 7px;display:flex;flex-direction:column;gap:1px}
.app-nav .logo{font-weight:700;font-size:12px;padding:2px 8px 9px;display:flex;align-items:center;gap:5px}.app-nav .logo i{width:10px;height:10px;border-radius:50%;background:var(--blue);flex:none}
.app-nav .ani{padding:5px 8px;border-radius:7px;color:var(--ink-2);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.app-nav .ani.on{background:var(--blue-soft);color:var(--blue);font-weight:600}
.app-rec{margin-top:auto;display:grid;gap:5px}.app-rec span{text-align:center;background:var(--blue);color:#fff;font-size:10px;border-radius:999px;padding:4px 0;font-weight:600}
.app-main{flex:1;min-width:0;display:flex;flex-direction:column}
.app-top{flex:none;height:33px;background:var(--paper);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:8px;padding:0 12px}.app-top b{font-size:12px}
.app-top small{color:var(--ink-3);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.app-top .who{margin-left:auto;font-size:10.5px;color:var(--ink-2);white-space:nowrap}
.app-body{flex:1;min-height:0;overflow:auto;padding:9px;display:grid;gap:8px;align-content:start}
.app .ag2{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:start;min-width:0}
.app .ac{background:var(--paper);border:1px solid var(--line);border-radius:9px;padding:9px 11px;min-width:0}
.app .ach{display:flex;align-items:center;gap:6px;font-weight:600;font-size:11.5px;margin-bottom:7px}.app .ach small{font-weight:400;color:var(--ink-3);font-size:10px}
.app .aseg{margin-left:auto;display:inline-flex;background:var(--mist);border-radius:7px;padding:2px;gap:2px}
.app .aseg button{border:0;background:none;font:inherit;font-size:10px;padding:1px 8px;border-radius:5px;color:var(--ink-2);cursor:pointer;transition:all .25s}
.app .aseg button[aria-pressed="true"]{background:var(--paper);color:var(--blue);font-weight:600;box-shadow:0 1px 2px rgba(16,32,58,.14)}
.app .chip{font-size:10px;padding:1px 7px}.app .cs{width:20px;height:20px;font-size:10.5px}.app .fine{font-size:10.5px;margin-top:6px}
.app .acnt div{display:flex;justify-content:space-between;padding:4px 2px;border-bottom:1px solid var(--mist);font-size:11px}.app .acnt div:last-child{border-bottom:0}.app .acnt b{font-size:11.5px}
.app .aalert{display:flex;align-items:center;gap:7px;border:0;width:100%;text-align:left;font:inherit;border-radius:8px;padding:6px 9px;font-size:10.8px;cursor:pointer;margin-bottom:5px;color:inherit;transition:outline-color .2s}
.app .aalert:last-child{margin-bottom:0}.app .aalert i{width:15px;height:15px;flex:none;border-radius:50%;display:grid;place-items:center;font-size:9px;font-weight:700;font-style:normal;color:#fff}.app .aalert b{margin-left:auto;white-space:nowrap}
.app .aalert.am{background:var(--amber-soft)}.app .aalert.am i{background:var(--amber)}.app .aalert.rd{background:var(--red-soft)}.app .aalert.rd i{background:var(--red)}.app .aalert.bl{background:var(--blue-soft)}.app .aalert.bl i{background:var(--blue)}
.app .aalert[aria-pressed="true"]{outline:2px solid var(--blue);outline-offset:1px}
.app .alines{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
.app .aline{display:flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:7px;padding:4px 7px;font-size:10px;white-space:nowrap;overflow:hidden}
.app .aline i{width:7px;height:7px;border-radius:50%;background:var(--green);flex:none}.app .aline.busy{border-color:var(--amber-line);background:var(--amber-soft)}.app .aline.busy i{background:var(--amber);animation:apulse 1.1s ease-in-out infinite}
.app .abar{display:grid;grid-template-columns:88px 1fr 30px;gap:7px;align-items:center;font-size:10.5px;margin-bottom:5px}
.app .abar .t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink-2)}.app .abar .tk{height:7px;background:var(--mist);border-radius:4px;overflow:hidden}
.app .abar .tk i{display:block;height:100%;background:var(--blue);border-radius:4px;transition:width .45s ease}.app .abar em{font-style:normal;text-align:right;font-size:10px;color:var(--ink-2)}
.app .akw{display:flex;flex-wrap:wrap;gap:5px;align-content:flex-start}.app .akw span{border:1px solid var(--line);border-radius:999px;padding:1px 8px;color:var(--ink-2);background:#FAFBFD}
.app .artb{width:100%;border-collapse:collapse;font-size:10.8px}.app .artb th{font-weight:500;color:var(--ink-3);text-align:left;font-size:10px;padding:2px 6px;border-bottom:1px solid var(--line)}
.app .artb td{padding:4px 6px;border-bottom:1px solid var(--mist);white-space:nowrap}.app .artb tr:last-child td{border-bottom:0}.app .artb tbody tr{animation:up .35s both}
.app .ainfo{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:3px 10px;font-size:10.8px;margin:0}.app .ainfo dt{color:var(--ink-3);white-space:nowrap}.app .ainfo dd{margin:0;font-weight:500;min-width:0}
.app .arow{display:flex;align-items:flex-start;gap:7px;font-size:10.8px;margin-top:7px;padding-top:7px;border-top:1px solid var(--mist)}.app .arow>span:first-child{color:var(--ink-3);flex:none;padding-top:1px}.app .arow .quote{color:var(--ink-2)}
.app .anotice{margin-top:7px;padding-top:7px;border-top:1px solid var(--mist);font-size:10.5px;color:var(--green);display:flex;gap:5px;align-items:center}
.app .aplay{display:flex;align-items:center;gap:8px}.app .aplay .pb{width:29px;height:29px;flex:none;border-radius:8px;border:0;background:var(--blue);color:#fff;font-size:11px;cursor:pointer;display:grid;place-items:center}
.app .aplay .tr{flex:1;height:6px;background:var(--mist);border-radius:3px;position:relative;cursor:pointer}.app .aplay .tr i{position:absolute;left:0;top:0;bottom:0;background:var(--blue);border-radius:3px;width:0}
.app .aplay .tm{font-size:10px;color:var(--ink-3);width:74px;text-align:right;flex:none}
.app .atrans{position:relative;max-height:198px;overflow:auto;display:flex;flex-direction:column;gap:6px;padding-right:3px;scroll-behavior:smooth}
.app .bub{font-size:10.8px;padding:6px 9px;max-width:93%;border-radius:9px;line-height:1.5;transition:box-shadow .2s}.app .bub .who{display:block;font-size:9.5px;opacity:.75;margin-bottom:1px}.app .bub.now{box-shadow:0 0 0 2px var(--blue-line)}.app .bub .chip{margin-top:3px}
.app .trow{display:flex;gap:6px;align-items:flex-start}.app .trow .ts{font-size:9.5px;color:var(--ink-3);width:30px;flex:none;padding-top:5px;text-align:right}
.app .trow .bx{flex:1;border:1px solid var(--line);border-left:3px solid var(--blue);border-radius:7px;padding:4px 8px;background:var(--paper);font-size:10.8px;transition:background .3s,border-color .3s}
.app .trow.b .bx{border-left-color:var(--green)}.app .trow.hit .bx{background:var(--amber-soft);border-color:var(--amber-line);border-left-color:var(--amber)}
.app .atabs{display:flex;gap:13px;border-bottom:1px solid var(--line);margin-bottom:8px}.app .atabs button{border:0;background:none;font:inherit;font-size:11px;padding:2px 2px 6px;color:var(--ink-2);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
.app .atabs button[aria-selected="true"]{color:var(--blue);font-weight:600;border-bottom-color:var(--blue)}
.app .dnbody{max-height:198px;overflow:auto;font-size:10.8px}.app .dnbody .kv2{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;margin:0}.app .dnbody .kv2 dt{color:var(--ink-3);white-space:nowrap}.app .dnbody .kv2 dd{margin:0;font-weight:500}.app .dnbody .kv2 dd.hl{color:var(--blue);font-weight:600}
.app .dnsec>b{display:block;font-size:10px;color:var(--ink-2);background:var(--mist);border-radius:5px;padding:1px 7px;margin:8px 0 4px;width:fit-content}.app .dnsec:first-child>b{margin-top:0}.app .dnsec ul{margin:0;padding-left:15px}.app .dnsec li{margin:1px 0}.app .dnsec li.hl{color:var(--blue);font-weight:600}
.app .amemo{width:100%;height:170px;font:inherit;font-size:10.8px;line-height:1.6;border:1px dashed var(--line-2);border-radius:8px;padding:8px;resize:none;background:#FCFDFF;color:var(--ink)}
.app .soapbtns .sec{margin-bottom:7px}.app .soapbtns .sec b{display:block;font-size:10.5px;margin-bottom:3px}.app .soapbtns .sec b em{font-style:normal;color:var(--ink-3);font-weight:400;margin-left:5px}
.app .soapbtns button{display:block;width:100%;text-align:left;border:1px solid var(--line);background:var(--paper);border-radius:7px;font:inherit;font-size:10.5px;padding:3px 8px;margin:3px 0;cursor:pointer;color:var(--ink-2);transition:all .25s}
.app .soapbtns button[aria-pressed="true"]{border-color:var(--amber-line);background:var(--amber-soft);color:#7A4A12;font-weight:600}
.app .amet{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.app .amet div{background:#FAFBFD;border:1px solid var(--line);border-radius:8px;padding:6px 9px;min-width:0;animation:up .35s both}.app .amet span{display:block;font-size:9.5px;color:var(--ink-3);white-space:nowrap}.app .amet b{font-size:12px;white-space:nowrap}
.app .adonut{display:grid;grid-template-columns:118px 1fr;gap:10px;align-items:center}.app .adonut svg{width:118px;height:118px}
.app .aleg{list-style:none;margin:0;padding:0;display:grid;gap:1px}.app .aleg button{display:grid;grid-template-columns:10px 1fr auto auto;gap:6px;align-items:center;width:100%;border:0;background:none;font:inherit;font-size:10.3px;padding:2px 5px;border-radius:6px;cursor:pointer;color:var(--ink-2);text-align:left}
.app .aleg button[aria-pressed="true"]{background:var(--mist);color:var(--ink);font-weight:600}.app .aleg i{width:9px;height:9px;border-radius:3px}.app .aleg .c{font-size:10px}.app .aleg .p{font-size:10px;color:var(--ink-3);width:32px;text-align:right}
.app .atrend{display:flex;align-items:flex-end;justify-content:center;gap:4px;height:74px;margin-top:4px}.app .atrend .col{flex:1;max-width:32px;display:flex;flex-direction:column-reverse;gap:1px;cursor:pointer;border:0;background:none;padding:0;min-width:4px}
.app .atrend .col i{display:block;border-radius:2px}.app .atrend .col:hover i,.app .atrend .col.on i{filter:brightness(.82)}
.app .atinfo{font-size:10.3px;color:var(--ink-2);margin-top:6px;min-height:16px}
.app .pgrid{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:start}.app .pbtns{display:grid;gap:5px}.app .pbtns span{background:var(--blue);color:#fff;border-radius:999px;font-size:10px;font-weight:600;padding:4px 12px;text-align:center;white-space:nowrap}
.app .cfilt{display:flex;gap:5px;align-items:center;flex-wrap:wrap}.app .cfilt .lbl{font-size:10.5px;color:var(--ink-3);margin-right:2px}
.app .cfilt button{border:1px solid var(--line);background:var(--paper);font:inherit;font-size:10.3px;border-radius:999px;padding:2px 9px;cursor:pointer;color:var(--ink-2)}.app .cfilt button[aria-pressed="true"]{border-color:var(--blue-line);background:var(--blue-soft);color:var(--blue);font-weight:600}.app .cfilt .sort{margin-left:auto;border-radius:7px}
.app .crows{display:grid;gap:5px}
.app .crow{display:grid;grid-template-columns:22px 44px 110px 1fr;gap:7px;align-items:center;padding:5px 8px;border:1px solid var(--line);border-radius:8px;background:var(--paper);cursor:pointer;font:inherit;font-size:10.8px;text-align:left;width:100%;color:inherit;transition:border-color .2s}
.app .crow .cty{width:19px;height:19px;border-radius:6px;display:grid;place-items:center;font-size:9px;font-weight:700;color:#fff}
.app .crow .cty.call{background:var(--blue)}.app .crow .cty.miss{background:var(--amber)}.app .crow .cty.cons{background:var(--teal)}.app .crow .cty.visit{background:var(--green)}
.app .crow .dur{font-size:10px;color:var(--ink-2)}.app .crow .wm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink-2)}.app .crow .nt{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink-3)}.app .crow .nt b{color:var(--blue);font-weight:600}
.app .crow.open{border-color:var(--blue-line)}.app .crow.open .nt{grid-column:1/-1;white-space:normal;background:#F8FAFD;border:1px solid var(--line);border-radius:7px;padding:6px 9px;color:var(--ink-2);animation:up .3s both}
@media (max-width:700px){.app-nav{display:none}.app .who{display:none}.app .ag2{grid-template-columns:1fr}.app .alines{grid-template-columns:1fr 1fr}.app .amet{grid-template-columns:1fr 1fr}.app .ainfo{grid-template-columns:auto 1fr}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const csClass=v=>v==null?'x':v>=8?'g':v>=6?'o':'r';
const toSec=t=>{const[a,b]=t.split(':').map(Number);return a*60+b;};
const scrollTo=(box,el)=>{if(box&&el)box.scrollTop=Math.max(0,el.offsetTop-box.offsetTop-40);};
const FRAG={
  morning:`<div class="fr"><div class="fr-h"><b>오늘의 콜 알림</b><span>어제 18:00 ~ 오늘 09:00</span></div><div class="fr-a amber"><i>!</i><span>수신 부재중</span><b>6건</b></div><div class="fr-a red"><i>!</i><span>클레임 유의</span><b>2건</b></div><div class="fr-a blue" style="margin-bottom:0"><i>✓</i><span>조치 필요</span><b>3건</b></div></div>`,
  call:`<div class="fr"><div class="fr-row"><span class="dirc">↙</span><div><b>눈썹 반영구 문의</b><small>0:59 · 대표번호 · 실장 김하늘</small></div><span class="cs g">9</span></div><div class="fr-chips"><span class="chip g">비용 문의</span><span class="chip g">예약·시간 문의</span><span class="src"><i style="background:#03C75A">N</i>네이버 검색</span></div><div class="fr-note"><span>통화 요약</span>접수 완료 · 예약 <b>9/3 14:00</b></div></div>`,
  fix:`<div class="fr"><div class="fr-h"><b>불만 통화 원인</b><span>지난 30일 · 12건</span></div><div class="fr-bars"><div class="fr-bar"><span>접수 대기</span><span class="tr"><span style="width:75%"></span></span><em>9</em></div><div class="fr-bar"><span>시술 경과</span><span class="tr"><span style="width:17%"></span></span><em>2</em></div><div class="fr-bar"><span>안내 누락</span><span class="tr"><span style="width:8%"></span></span><em>1</em></div></div><div class="fr-arrow" aria-hidden="true">↓</div><div class="fr-std"><b>우리 병원 응대 기준</b><ul><li>가격은 한 번에, 금액으로</li><li>가능한 시간 두 개를 먼저</li><li>내원 전 준비사항 안내</li></ul></div></div>`,
  consult:`<div class="fr"><div class="fr-h"><b>상담 메모 · 7개 항목</b><span class="chip b">자동 정리</span></div><dl class="fr-kv"><dt>이전 시술</dt><dd>리프팅 경험 없음</dd><dt>피부 고민</dt><dd>턱선 처짐, 관자 꺼짐</dd><dt>예산·일정</dt><dd class="hl">458만원 안내 · 결정 보류</dd><dt>통증</dt><dd>민감함</dd><dt>다운타임</dt><dd>발표 일정 이후 희망</dd><dt>희망 시술</dt><dd>울쎄라 300샷 외 3건</dd><dt>특이사항</dt><dd>견적서 문자 발송</dd></dl></div>`,
  chart:`<div class="fr"><div class="fr-h"><b>차트 초안</b><span class="chip g">정리 완료</span></div><div class="fr-soap"><div><b>S</b><span>검진 결과 상담 · 음주 주 3회</span></div><div><b>O</b><span>BP 120/78 · AST/ALT 48/62</span></div><div><b>A</b><span>Fatty liver, moderate</span></div><div class="hl"><b>P</b><span>3개월 후 Lab 추적 · 체중 5kg 감량</span></div></div></div>`,
  channel:`<div class="fr"><div class="fr-h"><b>전화가 온 채널</b><span>유입 감지 122건</span></div><div class="fr-donut"><div class="d" role="img" aria-label="채널별 유입 비율"><b>39%</b></div><ul><li><i style="background:#03A55A"></i><span>네이버 플레이스</span><em>39%</em></li><li><i style="background:#3D6FE3"></i><span>네이버 검색</span><em>23%</em></li><li><i style="background:#D9A400"></i><span>카카오톡</span><em>9%</em></li><li><i style="background:#8A94A6"></i><span>그 외 5개 채널</span><em>29%</em></li></ul></div></div>`,
  timeline:`<div class="fr"><div class="fr-h"><b>최○○ 환자</b><span>콜 12 · 상담 2 · 진료 2</span></div><ul class="fr-tl"><li><span class="ty visit">진료</span><span>검진 결과 · 3개월 후 추적<small>08.31 · 원장 김도현</small></span></li><li><span class="ty call">콜</span><span>시술 경과 문의 · 내원 예약<small>08.30 · 실장 윤채원</small></span></li><li><span class="ty cons">상담</span><span>리쥬란 아이 · 촬영 후 진행<small>08.27 · 실장 박유리</small></span></li><li><span class="ty call">콜</span><span>제증명 발급 문의<small>08.21 · 실장 박유리</small></span></li></ul></div>`
};
const NAV=['대시보드','환자목록','콜레코드','상담레코드','진료레코드','마케팅 분석','직원 통계','설정'];
const shell=(el,active,title,sub,body)=>{el.className='app';el.innerHTML=`<aside class="app-nav" aria-hidden="true"><div class="logo"><i></i>D voice</div>${NAV.map(n=>`<span class="ani ${n===active?'on':''}">${n}</span>`).join('')}<div class="app-rec"><span>상담 녹음 →</span><span>진료 녹음 →</span></div></aside><div class="app-main"><div class="app-top"><b>${esc(title)}</b><small>${esc(sub)}</small><span class="who">로봇컴 의원 · 실장 김하늘</span></div><div class="app-body">${body}</div></div>`;return el;};

class DvUi extends HTMLElement{
  static get observedAttributes(){return['screen','frag','bare','tone'];}
  constructor(){super();this.attachShadow({mode:'open'});this.timers=[];this.vis=false;this.hover=false;this.idle=0;}
  get active(){return this.vis&&!this.hover&&Date.now()>this.idle;}
  connectedCallback(){
    this.io=new IntersectionObserver(es=>es.forEach(e=>{this.vis=e.isIntersecting;if(this.vis&&!this.shown){this.shown=true;this.seq();if(this.onShow)this.onShow();}}),{threshold:0.25});
    this.io.observe(this);
    this.addEventListener('pointerenter',()=>{this.hover=true;});
    this.addEventListener('pointerleave',()=>{this.hover=false;});
    this.addEventListener('pointerdown',()=>{this.idle=Date.now()+6000;});
    this.render();
  }
  disconnectedCallback(){this.clear();this.io&&this.io.disconnect();}
  attributeChangedCallback(){if(this.isConnected)this.render();}
  clear(){this.timers.forEach(clearInterval);this.timers=[];}
  seq(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const scr=this.getAttribute('screen');if(scr==='frag')return;
    const SEL='.ex-top,.filters button,.ex-list>button,.info>div,.counters>div,.feed li,.live-h,.live-f,.steps button,.stage-box,.mrow,.bar,.mi,.ba>div,.kw span,.fr-donut li,.acnt>div,.ach,.ac,.col,.ch,.tscript>*,.dh,.legend>*,.seg,table tr,ul>li';
    const seen=new Set(),els=[];
    this.$$(SEL).forEach(el=>{if(seen.has(el))return;let p=el.parentElement;while(p){if(seen.has(p))return;p=p.parentElement;}seen.add(el);els.push(el);});
    els.slice(0,40).forEach((el,i)=>{if(!el.animate)return;const svg=el instanceof SVGElement;
      el.animate(svg?[{opacity:0},{opacity:1}]:[{opacity:0,transform:'translateY(14px) scale(.985)',filter:'blur(3px)'},{opacity:1,transform:'none',filter:'blur(0)'}],{duration:620,delay:120+i*55,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});});
  }
  every(ms,fn){this.timers.push(setInterval(()=>{if(this.active)fn();},ms));}
  render(){
    const scr=this.getAttribute('screen');if(!scr)return;
    if(!window.DV){setTimeout(()=>this.render(),60);return;}
    const key=scr+(this.getAttribute('frag')||'')+(this.hasAttribute('bare')?'b':'')+(this.getAttribute('tone')||'');if(this._key===key)return;
    this._key=key;
    this.clear();this.shown=false;this.onShow=null;
    this.shadowRoot.innerHTML=`<style>${CSS}</style><div id="r"></div>`;
    const r=this.shadowRoot.getElementById('r');
    const fn=this['s_'+scr.replace(/-/g,'_')];if(fn)fn.call(this,r,window.DV);
    if(this.vis&&this.onShow){this.shown=true;this.onShow();}
  }
  $(s,r){return (r||this.shadowRoot).querySelector(s);}
  $$(s,r){return Array.from((r||this.shadowRoot).querySelectorAll(s));}

  s_live(r,D){
    r.innerHTML=`<div class="live" aria-label="진료실 밖 실시간 화면 예시"><div class="live-h"><b><span class="pulse" aria-hidden="true"></span>지금 진료실 밖에서</b><span>오늘 · 예시 데이터</span></div><div class="counters"><div><span>수신</span><b id="c-in">0</b></div><div class="warn"><span>부재중</span><b id="c-miss">0</b></div><div class="bad"><span>클레임 유의</span><b id="c-bad">0</b></div><div><span>상담</span><b id="c-cons">0</b></div><div><span>진료</span><b id="c-visit">0</b></div></div><ul class="feed" id="feed" aria-live="off"></ul><div class="live-f"><span class="sample">화면 예시 · 제품의 대시보드·콜레코드 구성 참고</span><a class="link-arrow" href="#/summary" style="font-size:13px">3분 요약 보기 →</a></div></div>`;
    const el=this.$('#feed');const ICON={call:'콜',miss:'!',cons:'상',visit:'진'};
    const row=(e,t,isNew)=>`<li class="${isNew?'new':''}"><span class="t">${esc(t)}</span><span class="ic ${e.type}" aria-hidden="true">${ICON[e.type]}</span><span class="tx"><b>${esc(e.title)}</b><small>${esc(e.sub)}</small></span><span class="chip ${e.chip[1]}">${esc(e.chip[0])}</span></li>`;
    D.feed.slice(0,5).forEach(e=>el.insertAdjacentHTML('beforeend',row(e,e.t)));
    const ctr={call:'#c-in',miss:'#c-miss',cons:'#c-cons',visit:'#c-visit'};
    const inc=s=>{const c=this.$(s);if(!c)return;c.textContent=+c.textContent+1;c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump');};
    // One-shot: counters count up once, then a single new missed call arrives. No loop.
    this.start=()=>{if(this._started)return;this._started=true;
      const T=[['#c-in',43],['#c-miss',6],['#c-bad',2],['#c-cons',5],['#c-visit',8]],t0=performance.now();
      const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const step=now=>{let done=true;T.forEach(([sel,v],k)=>{const c=this.$(sel);if(!c)return;const p=reduce?1:Math.max(0,Math.min(1,(now-t0-k*70)/650));if(p<1)done=false;c.textContent=Math.round(v*(1-Math.pow(1-p,3)));});if(!done)requestAnimationFrame(step);};
      requestAnimationFrame(step);
      this.timers.push(setTimeout(()=>{const e=D.feed.find(f=>f.type==='miss')||D.feed[0];
        el.insertAdjacentHTML('afterbegin',row(e,'09:23',true));
        setTimeout(()=>{while(el.children.length>5)el.lastElementChild.remove();},340);
        inc('#c-in');inc('#c-miss');},1300));
    };
    this.onShow=()=>{this.timers.push(setTimeout(()=>{if(!this.hasAttribute('data-manual'))this.start();},600));};
  }

  s_loop(r){
    r.innerHTML=`<div class="loop"><div class="steps" role="tablist" aria-label="관리 순환 4단계">
<button role="tab" aria-selected="true" data-lp="0"><span class="k">01</span><span><b>기록된다</b><span class="d">모든 통화와 상담이 전사문, 태그, 요약으로 남습니다. 직원이 따로 적지 않습니다.</span></span><i class="pg"></i></button>
<button role="tab" aria-selected="false" data-lp="1"><span class="k">02</span><span><b>문제가 보인다</b><span class="d">불만 태그, 낮은 응대 점수, 회신이 필요한 통화가 걸러집니다. 반복되는 문제가 키워드로 보입니다.</span></span><i class="pg"></i></button>
<button role="tab" aria-selected="false" data-lp="2"><span class="k">03</span><span><b>매뉴얼이 된다</b><span class="d">응대 점수가 높은 통화에서 우리 병원의 모범 응대를 뽑아 표준으로 만듭니다.</span></span><i class="pg"></i></button>
<button role="tab" aria-selected="false" data-lp="3"><span class="k">04</span><span><b>개선이 확인된다</b><span class="d">매뉴얼 적용 전후로 응대 점수와 불만 통화 수를 비교합니다. 감이 아니라 숫자로.</span></span><i class="pg"></i></button>
</div><div class="stage-box" aria-live="polite">
<div class="lpanel on" data-lp="0"><div class="sh"><b>콜레코드 · 오늘</b><span class="sample">화면 예시</span></div>
<div class="mrow"><span class="dirc">↙</span><span class="who">임○○ · 눈썹 반영구 문의<small>실장 김하늘 · 대표번호 · 0:59</small></span><span class="chip g">예약 확정</span><span class="cs g">9</span></div>
<div class="mrow"><span class="dirc">↙</span><span class="who">전○○ · 검진 접수 대기<small>실장 이서준 · 검진센터 · 0:38</small></span><span class="chip r">접수 불만</span><span class="cs r">4</span></div>
<div class="mrow"><span class="dirc">↙</span><span class="who">황○○ · 시술 경과 문의<small>CS 지우 · CS 1003 · 0:43</small></span><span class="chip r">불만족</span><span class="cs o">6</span></div>
<div class="mrow"><span class="dirc">↙</span><span class="who">명○○ · 처방약 문의<small>실장 박진주 · 대표번호 · 0:46</small></span><span class="chip n">회신필요</span><span class="cs o">7</span></div>
<div class="mrow"><span class="dirc miss">!</span><span class="who">미등록 · 수신 부재중<small>대표번호 · 08:12</small></span><span class="chip a">회신 대기</span><span class="cs x">–</span></div>
<div class="mrow"><span class="dirc">↙</span><span class="who">정○○ · 리터치 예약<small>CS 수빈 · CS 1002 · 0:48</small></span><span class="chip g">예약 확정</span><span class="cs g">9</span></div>
<p class="fine">통화가 끝나면 전사문, 태그, 응대 점수, 유입 채널, 통화 요약이 자동으로 붙습니다.</p></div>
<div class="lpanel" data-lp="1"><div class="sh"><b>지난 30일 통화 태그</b><span class="sample">예시</span></div><div class="bars">
<div class="bar"><span>예약·시간 문의</span><span class="track"><span class="fill" data-w="92%" style="width:0;display:block"></span></span><span class="v">71</span></div>
<div class="bar"><span>비용 문의</span><span class="track"><span class="fill" data-w="83%" style="width:0;display:block"></span></span><span class="v">64</span></div>
<div class="bar"><span>회신필요</span><span class="track"><span class="fill a" data-w="24%" style="width:0;display:block"></span></span><span class="v">18</span></div>
<div class="bar"><span>접수 불만</span><span class="track"><span class="fill r" data-w="16%" style="width:0;display:block"></span></span><span class="v">12</span></div>
<div class="bar"><span>응대·시설 불만</span><span class="track"><span class="fill r" data-w="7%" style="width:0;display:block"></span></span><span class="v">5</span></div></div>
<div class="kw"><span class="hot">대기 시간</span><span class="hot">금식</span><span class="hot">자격 조회</span><span>주차</span><span>마취크림</span><span>리터치</span><span>가격</span></div>
<p class="fine">불만 통화 12건 중 9건은 "접수 대기"였고, "대기 시간"과 "자격 조회" 키워드가 함께 나옵니다. 문제는 직원 태도가 아니라 접수 동선이었습니다.</p></div>
<div class="lpanel" data-lp="2"><div class="manual"><div class="mh"><span>우리 병원 전화 응대 기준</span><span class="sample">응대 점수 9~10 통화에서</span></div>
<div class="mi"><div class="qq">Q. 가격이 어떻게 되나요?</div><div class="aa">시술별 가격을 한 번에, 구체적인 금액으로 안내합니다. "선 25만원, 메이크업 25만원, 둘 다 하시면 30만원입니다."</div><div class="from"><span class="cs g" style="width:20px;height:20px;font-size:10.5px">9</span>CS 태은 · 8/31 통화에서 발췌</div></div>
<div class="mi"><div class="qq">Q. 이번 주에 되나요?</div><div class="aa">가능한 시간 두 개를 먼저 제시합니다. "목요일 오후 2시와 금요일 오전 11시가 비어 있어요."</div><div class="from"><span class="cs g" style="width:20px;height:20px;font-size:10.5px">9</span>CS 태은 · 8/31 통화에서 발췌</div></div>
<div class="mi"><div class="qq">예약 마무리</div><div class="aa">내원 전 준비사항을 꼭 붙입니다. "마취크림 시간이 30분 필요해서 조금 일찍 와주세요."</div><div class="from"><span class="cs g" style="width:20px;height:20px;font-size:10.5px">10</span>실장 김하늘 · 8/29 통화에서 발췌</div></div></div>
<p class="fine">통화 녹음과 전사문을 그대로 교육 자료로 씁니다. 새 직원은 첫 주에 모범 통화를 듣고 시작합니다.</p></div>
<div class="lpanel" data-lp="3"><div class="sh"><b>응대 기준 적용 전후 · 8주</b><span class="sample">예시</span></div><div class="ba">
<div><div class="lbl">평균 응대 점수</div><div class="big">6.9 <small>→</small> 8.5</div><div class="arrow">▲ 1.6점</div></div>
<div><div class="lbl">월 불만 태그 통화</div><div class="big">14 <small>→</small> 5</div><div class="arrow">▼ 9건</div></div>
<div><div class="lbl">부재중 당일 회신율</div><div class="big">22% <small>→</small> 81%</div><div class="arrow">▲ 59%p</div></div>
<div><div class="lbl">비용 문의 후 예약</div><div class="big">31% <small>→</small> 42%</div><div class="arrow">▲ 11%p</div></div></div>
<p class="fine">직원 통계와 태그 추이로 매주 확인합니다. 원장님이 "요즘 전화 잘 받아?"라고 묻지 않으셔도 됩니다.</p></div>
</div></div>`;
    const tabs=this.$$('.steps [role=tab]'),panels=this.$$('.lpanel');let cur=0,t0=Date.now();const DUR=4800;
    const stagger=p=>this.$$('.mrow,.bar,.mi,.ba>div',p).forEach((x,i)=>x.style.animationDelay=(i*70)+'ms');
    const go=i=>{cur=i;t0=Date.now();tabs.forEach(x=>{x.setAttribute('aria-selected',String(+x.dataset.lp===i));x.querySelector('.pg').style.width='0';});
      panels.forEach(p=>p.classList.toggle('on',+p.dataset.lp===i));const p=panels[i];stagger(p);
      this.$$('.fill',p).forEach(f=>{f.style.width='0';requestAnimationFrame(()=>requestAnimationFrame(()=>f.style.width=f.dataset.w));});};
    tabs.forEach(t=>t.addEventListener('click',()=>{const i=+t.dataset.lp;if(this.ext&&this.onStepClick)this.onStepClick(i);else go(i);}));
    this.timers.push(setInterval(()=>{if(this.ext)return;if(!this.active){t0=Date.now()-((+tabs[cur].querySelector('.pg').style.width.replace('%','')||0)/100*DUR);return;}
      const k=Math.min(1,(Date.now()-t0)/DUR);tabs[cur].querySelector('.pg').style.width=(k*100)+'%';if(k>=1)go((cur+1)%4);},50));
    this.onShow=()=>{if(!this.ext)go(0);};
    this.setStep=(i,k)=>{if(i==null){this.ext=false;return;}this.ext=true;if(i!==cur)go(i);tabs[cur].querySelector('.pg').style.width=(Math.max(0,Math.min(1,k))*100)+'%';};
  }

  s_explorer(r,D){
    const bare=this.hasAttribute('bare');
    r.innerHTML=`<div class="explorer${bare?' bare':''}"><div class="ex-top">${bare?'':'<div><h3>직접 눌러보기 · 콜레코드</h3><p>태그로 거르고, 통화를 눌러 대화와 요약을 확인해 보세요. 제품 구성을 참고해 새로 그린 체험 화면이며, 데이터는 예시입니다.</p></div>'}<div class="filters" id="ex-filters" role="group" aria-label="통화 필터"></div></div><div class="ex-body"><div class="ex-list" id="ex-list" role="listbox" aria-label="통화 목록"></div><div class="ex-detail" id="ex-detail"></div></div></div>`;
    const F=[['all','전체',()=>true],['bad','불만',c=>c.tags.some(t=>t.k==='r')],['back','회신필요',c=>c.tags.some(t=>t.t==='회신필요')],['book','예약·비용 문의',c=>c.tags.some(t=>/예약|비용/.test(t.t))],['miss','부재중',c=>c.dir==='miss']];
    let f='all',sel='c1';const fb=this.$('#ex-filters'),list=this.$('#ex-list'),det=this.$('#ex-detail');
    fb.innerHTML=F.map(([k,l,fn])=>`<button type="button" data-f="${k}" aria-pressed="${k===f}">${l}<span class="n">${D.calls.filter(fn).length}</span></button>`).join('');
    const dirIcon=c=>c.dir==='miss'?'<span class="dirc miss">!</span>':c.dir==='out'?'<span class="dirc out">↗</span>':'<span class="dirc">↙</span>';
    const srcHtml=s=>s?`<span class="src"><i style="background:${s[2]}">${esc(s[0])}</i>${esc(s[1])}</span>`:'<span class="src" style="color:var(--ink-3)">감지 안 됨</span>';
    const items=()=>D.calls.filter(F.find(x=>x[0]===f)[2]);
    const renderList=()=>{const it=items();if(!it.some(c=>c.id===sel))sel=it[0]?it[0].id:null;
      list.innerHTML=it.map(c=>`<button type="button" role="option" data-id="${c.id}" aria-selected="${c.id===sel}">${dirIcon(c)}<span><span class="nm">${esc(c.name)}<small>${esc(c.staff)} · ${esc(c.line)}</small></span><span class="tg">${c.tags.map(t=>`<span class="chip ${t.k}">${esc(t.t)}</span>`).join('')}</span></span><span class="rt"><span class="cs ${csClass(c.cs)}">${c.cs??'–'}</span><small>${esc(c.time)}</small></span></button>`).join('');renderDetail();};
    const renderDetail=()=>{const c=D.calls.find(x=>x.id===sel);if(!c){det.innerHTML='<p class="fine">조건에 맞는 통화가 없습니다.</p>';return;}
      const head=`<div class="dh"><h4>${esc(c.name)} ${c.dir==='miss'?'부재중 전화':'통화'}<small>${esc(c.time)} · ${esc(c.dur)} · ${esc(c.phone)}</small></h4><span class="cs ${csClass(c.cs)}" title="응대 점수">${c.cs??'–'}</span></div><div class="info"><div><span>직원</span>${esc(c.staff)}</div><div><span>회선</span>${esc(c.line)}</div><div><span>유입</span>${srcHtml(c.src)}</div></div>`;
      det.scrollTop=0;
      if(c.dir==='miss'){det.innerHTML=head+`<div class="missmsg"><b>연결되지 않은 전화입니다.</b><br>대시보드의 "오늘의 콜 알림"에 부재중으로 올라가고, 회신할 번호가 목록에 남습니다. 회신 통화가 이어지면 같은 환자의 기록으로 연결됩니다.</div>`;return;}
      const bub=c.lines.map((l,i)=>`<div class="bub ${l[0]}" style="animation-delay:${i*380}ms"><span class="who">${l[0]==='c'?'고객':'직원'} ${l[1]}</span>${esc(l[2])}${l[3]?`<br><span class="chip ${l[3][1]}">${esc(l[3][0])}</span>`:''}</div>`).join('');
      const note=c.note.length?`<div class="dnote" style="animation-delay:${c.lines.length*380+200}ms"><div class="dt"><span>D-Note · 통화 요약</span><span class="sample">자동 생성</span></div><dl class="kv">${c.note.map(n=>`<dt>${esc(n[0])}</dt><dd class="${n[2]?'hl':''}">${esc(n[1])}</dd>`).join('')}</dl></div>`:'';
      det.innerHTML=head+`<div class="bubbles">${bub}</div>`+note;};
    fb.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;f=b.dataset.f;this.$$('button',fb).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderList();});
    list.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;sel=b.dataset.id;this.$$('button',list).forEach(x=>x.setAttribute('aria-selected',String(x===b)));renderDetail();});
    renderList();
    const host=this.$('.explorer');host.style.position='relative';
    const cur=document.createElement('div');cur.setAttribute('aria-hidden','true');
    Object.assign(cur.style,{position:'absolute',left:'0',top:'0',width:'26px',height:'26px',margin:'-13px 0 0 -13px',borderRadius:'50%',background:'rgba(25,31,40,0.22)',boxShadow:'0 0 0 2px rgba(255,255,255,0.95),0 6px 16px rgba(25,31,40,0.25)',backdropFilter:'blur(2px)',pointerEvents:'none',zIndex:'5',opacity:'0',transform:'translate(60%,40%)',transition:'transform 1100ms cubic-bezier(.65,0,.35,1),opacity 400ms'});
    host.appendChild(cur);
    const moveTo=el=>{if(!el)return false;const hr=host.getBoundingClientRect(),er=el.getBoundingClientRect();if(!er.width)return false;const x=er.left-hr.left+Math.min(er.width*0.5,70),y=er.top-hr.top+er.height*0.5;cur.style.transform='translate('+x+'px,'+y+'px)';return true;};
    const tap=el=>{if(!cur.animate)return;cur.animate([{scale:'1'},{scale:'0.78'},{scale:'1'}],{duration:260,easing:'ease-out'});
      const rp=document.createElement('div');Object.assign(rp.style,{position:'absolute',left:'0',top:'0',width:'26px',height:'26px',margin:'-13px 0 0 -13px',borderRadius:'50%',border:'2px solid rgba(61,111,227,0.5)',pointerEvents:'none',zIndex:'4',transform:cur.style.transform});host.appendChild(rp);
      rp.animate([{opacity:1,scale:'0.6'},{opacity:0,scale:'2.4'}],{duration:620,easing:'cubic-bezier(.22,1,.36,1)'}).onfinish=()=>rp.remove();el.click();};
    const steps=[()=>list.children[1],()=>list.children[2],()=>this.$('button[data-f="bad"]',fb),()=>list.children[0],()=>this.$('button[data-f="back"]',fb),()=>list.children[0],()=>this.$('button[data-f="all"]',fb),()=>list.children[0]];
    let si=0,busy=false;
    const run=()=>{if(busy)return;if(!this.active){cur.style.opacity='0';return;}busy=true;cur.style.opacity='1';
      const el=steps[si%steps.length]();si++;
      if(!moveTo(el)){busy=false;return;}
      this.timers.push(setTimeout(()=>{if(this.active){if(el.closest('#ex-list'))scrollTo(list,el);tap(el);}busy=false;},1200));};
    this.timers.push(setInterval(run,3600));
    this.onShow=()=>{renderDetail();this.timers.push(setTimeout(run,900));};
  }

  s_donut(r,D){
    const d=D.channels,total=d.reduce((a,x)=>a+x[1],0),R=62,C=2*Math.PI*R;let off=0;
    const segs=d.map((x,i)=>{const len=x[1]/total*C;const s=`<circle class="seg" data-i="${i}" cx="90" cy="90" r="${R}" fill="none" stroke="${x[2]}" stroke-width="26" stroke-dasharray="${Math.max(len-1.5,0.5)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 90 90)"></circle>`;off+=len;return s;}).join('');
    r.innerHTML=`<div class="donut" id="donut"><svg viewBox="0 0 180 180" role="img" aria-label="채널별 유입 비율 도넛 차트">${segs}<text id="dn-p" x="90" y="88" text-anchor="middle" font-family="Pretendard Variable, Pretendard, sans-serif" font-size="26" font-weight="600" fill="#10203A"></text><text id="dn-l" x="90" y="110" text-anchor="middle" font-family="Pretendard Variable, Pretendard, sans-serif" font-size="11.5" fill="#7A8699"></text></svg><ul class="legend">${d.map((x,i)=>`<li><button type="button" data-i="${i}" aria-pressed="${i===0}"><i style="background:${x[2]}"></i><span>${esc(x[0])}</span><span class="c">${x[1]}건</span><span class="p">${Math.round(x[1]/total*100)}%</span></button></li>`).join('')}</ul></div>`;
    const box=this.$('#donut');let cur=0;
    const pick=i=>{cur=i;const x=d[i];this.$('#dn-p').textContent=Math.round(x[1]/total*100)+'%';this.$('#dn-l').textContent=x[0];
      this.$$('circle.seg',box).forEach(c=>{const on=+c.dataset.i===i;c.style.opacity=on?1:.28;c.setAttribute('stroke-width',on?30:26);});
      this.$$('.legend button',box).forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.i===i)));};
    ['mouseover','click','focusin'].forEach(ev=>box.addEventListener(ev,e=>{const t=e.target.closest('[data-i]');if(t)pick(+t.dataset.i);}));
    pick(0);this.every(2200,()=>pick((cur+1)%d.length));
  }

  s_interest(r,D){
    const it=D.interests,max=Math.max(...it.map(x=>x[1]));
    r.innerHTML=`<div class="bars">${it.map((x,i)=>`<div class="bar" style="grid-template-columns:minmax(0,1.2fr) 1fr 30px"><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(x[0])}</span><span class="track"><span class="fill ${i===it.length-1?'':'g'}" data-w="${x[1]/max*100}%" style="display:block;width:0;transition-delay:${i*80}ms;${i===it.length-1?'background:var(--line-2)':''}"></span></span><span class="v">${x[1]}</span></div>`).join('')}</div>`;
    this.onShow=()=>requestAnimationFrame(()=>this.$$('.fill').forEach(f=>f.style.width=f.dataset.w));
  }

  s_soap(r,D){
    r.innerHTML=`<div class="soapw"><div class="col"><div class="ch"><b>진료 대화 · 01:17</b><span class="sample">원장 A · 환자 B · 예시 기록</span></div><div class="tscript" id="tscript"></div></div><div class="col"><div class="ch"><b>D-Note · 자동 정리된 차트 초안</b><span class="chip g">정리 완료</span></div><div class="soap" id="soap"></div><p class="soap-hint">검사 수치, 진단, 추적 계획까지 대화에서 그대로 옮겨집니다. 수정이 필요한 곳만 고치시면 됩니다.</p></div></div>`;
    const ts=this.$('#tscript'),sp=this.$('#soap');
    ts.innerHTML=D.transcript.map((l,i)=>`<div class="tl ${l[0]}" data-t="${i}"><span class="ts">${l[1]}</span><span class="sp">${l[0]}</span><span>${esc(l[2])}</span></div>`).join('');
    let k=0;sp.innerHTML=D.soap.map(sec=>`<div class="sec"><b>${sec[0]})<em>${sec[1]}</em></b>${sec[2].map(it=>`<button type="button" data-src="${it[1].join(',')}" data-k="${k++}" aria-pressed="false">${esc(it[0])}</button>`).join('')}</div>`).join('');
    const btns=this.$$('button',sp);let cur=0;
    const pick=btn=>{cur=btns.indexOf(btn);btns.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));const ids=btn.dataset.src.split(',').map(Number);
      this.$$('.tl',ts).forEach(l=>l.classList.toggle('hit',ids.includes(+l.dataset.t)));const first=this.$(`.tl[data-t="${ids[0]}"]`,ts);if(first)ts.scrollTop=first.offsetTop-60;};
    ['mouseover','click','focusin'].forEach(ev=>sp.addEventListener(ev,e=>{const b=e.target.closest('button');if(b)pick(b);}));
    const def=btns.find(b=>b.textContent.startsWith('약물치료'));if(def)pick(def);
    this.every(2600,()=>pick(btns[(cur+1)%btns.length]));
  }

  s_frag(r){
    const f=this.getAttribute('frag')||'morning',tn=this.getAttribute('tone')||'0';
    r.innerHTML=`<div class="vis" data-t="${tn}"><i class="bl b1"></i><i class="bl b2"></i><i class="bl b3"></i>${FRAG[f]||''}<span class="arw" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>`;
    if(!this._hv){this._hv=1;this.addEventListener('pointerenter',()=>{if(this.replay)this.replay();});}
    this.$$('.fr>*').forEach((x,i)=>x.style.animationDelay=(i*90)+'ms');
    this.onShow=()=>this.$('.vis').classList.add('on');
    this.replay=()=>{const v=this.$('.vis');if(!v)return;v.classList.remove('on');void v.offsetWidth;v.classList.add('on');};
    if(!this._sync){const P=4200;this._sync=1;const tick=()=>{if(this.vis&&this.shown&&this.replay)this.replay();};setTimeout(()=>{tick();this._syncT=setInterval(tick,P);},P-(Date.now()%P));}
  }

  s_mk_dash(r){
    const D={counts:[['수신',32],['발신',11],['수신 부재중',6],['발신 부재중',2],['상담',4],['진료',6]],
      tags:{'7':[['예약·시간 문의',34],['비용 문의',28],['진료 문의',19],['예약 변경·취소',12],['접수 불만',6],['위치·주차 문의',5]],'30':[['예약·시간 문의',128],['비용 문의',104],['진료 문의',77],['예약 변경·취소',49],['접수 불만',21],['위치·주차 문의',18]]},
      kw:{'7':[['눈썹 반영구',13],['울쎄라',11],['가격',9],['주차',7],['토요일',6],['필러',5],['점 제거',4]],'30':[['울쎄라',41],['눈썹 반영구',38],['가격',30],['필러',22],['물광',18],['토요일',15],['주차',13],['리쥬란',11],['보톡스',9]]},
      lines:[['02-533-0071',''],['031-373-9999',''],['070-7770-1001',''],['070-7770-1002',''],['070-7770-1003','busy'],['070-7770-1004',''],['070-7770-1005',''],['070-4355-4201','']],
      recent:[['call','임○○','콜','오전 09:12','0분 59초',''],['miss','010-88••-••02','부재중','오전 09:05','—','miss'],['cons','임○○','상담','오전 08:51','1분 59초',''],['call','전○○','콜','오전 08:47','0분 40초','claim'],['visit','최○○','진료','오전 08:30','1분 17초',''],['call','명○○','콜','오전 08:21','0분 41초','act'],['miss','010-17••-••23','부재중','오전 08:14','—','miss'],['call','리○○','콜','오전 08:05','0분 32초','']]};
    const TY={call:['콜','b'],miss:['부재중','a'],cons:['상담','g'],visit:['진료','g']};
    const el=shell(r,'대시보드','대시보드','조직 운영 현황을 한눈에 확인합니다',
      `<div class="ag2"><div class="ac"><div class="ach">오늘 <small>실시간 집계</small></div><div class="acnt">${D.counts.map(c=>`<div><span>${c[0]}</span><b>${c[1]} 건</b></div>`).join('')}</div></div><div class="ac"><div class="ach">오늘의 콜 알림 <small>누르면 최근 레코드가 걸러집니다</small></div><button type="button" class="aalert am" data-af="miss" aria-pressed="false"><i>!</i><span>어제 18시 ~ 오늘 9시 수신 부재중 전화</span><b>6건</b></button><button type="button" class="aalert rd" data-af="claim" aria-pressed="false"><i>!</i><span>클레임 유의 통화</span><b>2건</b></button><button type="button" class="aalert bl" data-af="act" aria-pressed="false"><i>✓</i><span>조치 필요</span><b>3건</b></button></div></div><div class="ac"><div class="ach">회선 현황 <small>8회선 연결</small></div><div class="alines">${D.lines.map(l=>`<span class="aline ${l[1]}"><i></i>${l[0]}${l[1]?' 통화 중':''}</span>`).join('')}</div></div><div class="ac"><div class="ach">콜 태그 분포 추이<span class="aseg" id="mkd-seg"><button type="button" data-p="7" aria-pressed="true">7일</button><button type="button" data-p="30" aria-pressed="false">30일</button></span></div><div id="mkd-tags"></div></div><div class="ag2"><div class="ac"><div class="ach">최근 레코드</div><table class="artb"><thead><tr><th>환자</th><th>유형</th><th>일시</th><th>진행 시간</th></tr></thead><tbody id="mkd-recent"></tbody></table></div><div class="ac"><div class="ach">키워드 통계 <small>기간 내 통화에서 자주 나온 말</small></div><div class="akw" id="mkd-kw"></div></div></div>`);
    let p='7',af=null;
    const paint=()=>{const tg=D.tags[p],max=tg[0][1];
      this.$('#mkd-tags').innerHTML=tg.map(t=>`<div class="abar"><span class="t">${esc(t[0])}</span><span class="tk"><i style="width:${t[1]/max*100}%"></i></span><em>${t[1]}</em></div>`).join('');
      this.$('#mkd-kw').innerHTML=D.kw[p].map((k,i)=>`<span style="font-size:${Math.max(9.5,12.5-i*.5)}px">${esc(k[0])} ${k[1]}</span>`).join('');
      const rows=D.recent.filter(x=>!af||x[5]===af);
      this.$('#mkd-recent').innerHTML=rows.map((x,i)=>`<tr style="animation-delay:${i*50}ms"><td>${esc(x[1])}</td><td><span class="chip ${TY[x[0]][1]}">${TY[x[0]][0]}</span></td><td>${x[3]}</td><td>${x[4]}</td></tr>`).join('')||'<tr><td colspan="4" style="color:var(--ink-3)">해당 레코드가 없습니다.</td></tr>';};
    const setP=v=>{p=v;this.$$('#mkd-seg button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.p===p)));paint();};
    const setAf=v=>{af=v;this.$$('.aalert',el).forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.af===af)));paint();};
    this.$('#mkd-seg').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setP(b.dataset.p);});
    el.addEventListener('click',e=>{const b=e.target.closest('.aalert');if(b)setAf(af===b.dataset.af?null:b.dataset.af);});
    paint();
    const seq=[()=>setAf('miss'),()=>setAf('claim'),()=>setAf('act'),()=>setAf(null),()=>setP('30'),()=>setP('7')];let s=0;
    this.every(2400,()=>{seq[s%seq.length]();s++;});
  }

  s_mk_call(r,D){
    const c=D.calls[0],dur=59;
    const el=shell(r,'콜레코드','콜레코드','통화 녹취를 조회하고 바로 재생·다운로드합니다',
      `<div class="ac"><div class="ach">통화 정보 <small>[임○○ 환자 전화 기록] 오늘 ${c.time} 통화</small></div><dl class="ainfo"><dt>통화일시</dt><dd>오늘 오전 ${c.time}</dd><dt>환자 이름</dt><dd>${esc(c.name)}</dd><dt>통화시간</dt><dd>00분 59초</dd><dt>환자 전화번호</dt><dd>${esc(c.phone)}</dd><dt>방향</dt><dd>↙ 수신</dd><dt>직원 이름</dt><dd>${esc(c.staff)}</dd><dt>소스</dt><dd>유선전화 · ${esc(c.line)}</dd><dt>응대 점수</dt><dd><span class="cs g">9</span></dd></dl>`+
      `<div class="arow"><span>태그</span><span>${c.lines.map(l=>l[3]&&l[3][0].indexOf('유입')<0?`<button type="button" class="chip g" data-t="${toSec(l[1])}" style="cursor:pointer;font:inherit;margin-right:5px">${esc(l[3][0])}</button>`:'').join('')}<span class="quote" style="font-size:10px;color:var(--ink-3)">태그를 누르면 해당 발화로 이동합니다</span></span></div><div class="arow"><span>유입</span><span><span class="src"><i style="background:#03C75A">N</i>네이버 검색</span><span class="quote"> — "안녕하세요, 네이버 검색하다 보고 연락드렸는데요."</span></span></div><div class="anotice">✓ 환자에게 녹음 사실을 고지했습니다.</div></div>`+
      `<div class="ac"><div class="ach">통화 녹음 <small>재생하면 전사문이 따라 움직입니다</small></div><div class="aplay"><button type="button" class="pb" id="mkc-pb" aria-label="재생">▶</button><div class="tr" id="mkc-tr"><i id="mkc-fill"></i></div><span class="tm" id="mkc-tm">0:00 / 0:59</span></div></div>`+
      `<div class="ag2"><div class="ac"><div class="ach">전사문</div><div class="atrans" id="mkc-bub">${c.lines.map(l=>`<div class="bub ${l[0]}" data-t="${toSec(l[1])}" style="${l[0]==='c'?'background:var(--mist);align-self:flex-start':'background:var(--blue);color:#fff;align-self:flex-end'}"><span class="who">${l[0]==='c'?'고객':'직원'} ${l[1]}</span>${esc(l[2])}${l[3]?`<br><span class="chip ${l[3][1]}">${esc(l[3][0])}</span>`:''}</div>`).join('')}</div></div>`+
      `<div class="ac"><div class="atabs" role="tablist"><button type="button" role="tab" data-tp="note" aria-selected="true">D-Note</button><button type="button" role="tab" data-tp="memo" aria-selected="false">메모</button></div><div class="dnbody" data-tpanel="note"><dl class="kv2">${c.note.map(n=>`<dt>${esc(n[0])}</dt><dd class="${n[2]?'hl':''}">${esc(n[1])}</dd>`).join('')}</dl><p class="fine">통화가 끝나면 자동으로 생성되는 통화 요약입니다.</p></div><div class="dnbody" data-tpanel="memo" hidden><textarea class="amemo" placeholder="이곳에 메모를 입력해 보세요. 통화 기록과 함께 저장됩니다. (체험용)"></textarea></div></div></div>`);
    const bubs=this.$$('.bub',el),fill=this.$('#mkc-fill'),tm=this.$('#mkc-tm'),pb=this.$('#mkc-pb'),track=this.$('#mkc-tr'),pane=this.$('#mkc-bub');
    let cur=0,playing=false,wait=0;const fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
    const paint=()=>{fill.style.width=(cur/dur*100)+'%';tm.textContent=fmt(cur)+' / 0:59';let now=null;bubs.forEach(b=>{b.classList.remove('now');if(+b.dataset.t<=cur&&cur>0)now=b;});if(now){now.classList.add('now');scrollTo(pane,now);}};
    const setPlay=v=>{playing=v;pb.textContent=v?'❚❚':'▶';pb.setAttribute('aria-label',v?'일시정지':'재생');};
    pb.addEventListener('click',()=>{if(playing){setPlay(false);return;}if(cur>=dur)cur=0;setPlay(true);});
    track.addEventListener('click',e=>{const b=track.getBoundingClientRect();cur=Math.max(0,Math.min(dur,(e.clientX-b.left)/b.width*dur));paint();});
    el.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b||!b.classList.contains('chip'))return;cur=+b.dataset.t+0.5;paint();});
    el.addEventListener('click',e=>{const t=e.target.closest('[role=tab]');if(!t)return;this.$$('[role=tab]',el).forEach(x=>x.setAttribute('aria-selected',String(x===t)));this.$$('[data-tpanel]',el).forEach(p=>p.hidden=p.dataset.tpanel!==t.dataset.tp);});
    paint();
    this.timers.push(setInterval(()=>{if(!this.vis)return;
      if(playing){cur+=0.7;if(cur>=dur){cur=dur;setPlay(false);wait=25;}paint();}
      else if(this.active){if(wait>0)wait--;else{if(cur>=dur){cur=0;paint();}setPlay(true);}}},100));
    this.onShow=()=>{wait=6;};
  }

  s_mk_cons(r){
    const PROC=['울쎄라피프라임','히알루론산 필러 (MD코드)','콜라겐 물광'];
    const L=[['A','00:00','안녕하세요, 상담실장 이서준입니다. 오늘 어떤 부분이 제일 신경 쓰이세요?'],['B','00:06','전체적으로 좀 처진 것 같아요. 특히 턱선이 예전 같지 않아서요.'],['A','00:13','사진 한번 볼게요. 중하안면 볼륨이 내려오면서 턱선이 흐려진 케이스세요.'],['B','00:20','네 맞아요. 그리고 관자 쪽이 꺼진 것 같기도 하고요.'],['B','00:32','울쎄라 같은 리프팅은 한 번도 안 해봤어요. 관리만 받았어요.',0],['A','00:37','그러시면 울쎄라 삼백 샷으로 먼저 잡아드리는 걸 권해드려요. 백사십팔만오천원입니다.',0],['A','00:46','히알루론산 필러 엠디코드로 관자, 옆볼, 귀족 부위를 육 씨씨 정도 채우시면 윤곽이 매끄러워집니다.',1],['B','00:53','필러는 좀 무서운데요. 저 아픈 거 정말 못 참아요.',1],['A','00:57','마취크림 충분히 올리고 진행하고요, 시술 중에도 계속 여쭤보면서 합니다.'],['B','01:03','멍은 얼마나 가요? 저 다음 주에 발표가 있어서요.'],['A','01:16','콜라겐 물광은 팔십육만구천원이고 전얼굴 결 개선에 좋습니다.',2],['B','01:30','콜라겐 물광까지 전체 다 하면 얼마예요?',2],['A','01:34','울쎄라 삼백 샷, 필러 육 씨씨, 콜라겐 물광, 보톡스 네 부위 해서 사백오십팔만사천원입니다.'],['B','01:46','생각보다 크네요. 견적서 받아서 좀 생각해볼게요.'],['A','01:50','네, 오늘 결정 안 하셔도 됩니다. 사진이랑 견적서 문자로 보내드릴 테니 편하게 보고 연락 주세요.']];
    const NOTE=[['이전 시술 경험',['리프팅 시술 경험 없음, 관리성 시술만 받아보심']],['피부 고민',['얼굴 전반 처짐 및 턱선 흐려짐','관자·옆볼 꺼짐으로 광대 부각']],['예산 및 일정',[['합산 458만4천원 안내 · 결정 미정','hl'],'다음 주 발표 일정 있어 그 이후 진행 희망']],['통증 민감도',['통증을 잘 못 참는다고 하심 · 마취크림 충분 도포 안내']],['다운타임',['주사 시술 후 멍·붓기 3일~1주일 권장 안내']],['희망 시술',['울쎄라피프라임 300샷 (결정 미정)','히알루론산 필러 6cc (권유, 결정 미정)','콜라겐 물광 1세트 (결정 미정)']],['특이사항',['상담 후 사진·견적서 문자 전달 및 재연락 대기']]];
    const el=shell(r,'상담레코드','상담레코드','상담실 대면 상담 녹음을 환자 기준으로 조회합니다',
      `<div class="ac"><div class="ach">상담 정보 <small>[임○○ 환자 상담 기록] 오늘 임○○ 상담</small></div><dl class="ainfo"><dt>녹음시간</dt><dd>01:59</dd><dt>상담직원</dt><dd>실장 이서준</dd><dt>감지 언어</dt><dd>한국어</dd><dt>참여 인원</dt><dd>3명</dd></dl><div class="arow"><span>관심 시술</span><span>${PROC.map((p,i)=>`<button type="button" class="chip b" data-p="${i}" aria-pressed="false" style="cursor:pointer;font:inherit;margin:0 5px 3px 0">${esc(p)}</button>`).join('')}<span class="quote" style="font-size:10px;color:var(--ink-3)">시술명을 누르면 언급된 대목이 표시됩니다</span></span></div><div class="anotice">✓ 환자에게 녹음 사실을 고지했습니다.</div></div>`+
      `<div class="ag2"><div class="ac"><div class="ach">상담 전사문 <small>A 실장 · B 환자</small></div><div class="atrans" id="mks-tr">${L.map(l=>`<div class="trow ${l[0]==='B'?'b':''}" ${l[3]!=null?`data-p="${l[3]}"`:''}><span class="ts">${l[1]}</span><span class="bx">${esc(l[2])}</span></div>`).join('')}</div></div>`+
      `<div class="ac"><div class="atabs" role="tablist"><button type="button" role="tab" data-tp="note" aria-selected="true">D-Note</button><button type="button" role="tab" data-tp="memo" aria-selected="false">상담 메모</button></div><div class="dnbody" data-tpanel="note">${NOTE.map(s=>`<div class="dnsec"><b>${esc(s[0])}</b><ul>${s[1].map(it=>Array.isArray(it)?`<li class="hl">${esc(it[0])}</li>`:`<li>${esc(it)}</li>`).join('')}</ul></div>`).join('')}<p class="fine">병원이 정한 7개 항목으로 자동 정리됩니다.</p></div><div class="dnbody" data-tpanel="memo" hidden><textarea class="amemo" placeholder="상담 메모를 입력해 보세요. (체험용)"></textarea></div></div></div>`);
    let sel=null;const pane=this.$('#mks-tr');
    const pick=v=>{sel=v;this.$$('button[data-p]',el).forEach(x=>{x.setAttribute('aria-pressed',String(x.dataset.p===sel));x.style.boxShadow=x.dataset.p===sel?'0 0 0 2px var(--blue-line)':'';});
      let first=null;this.$$('.trow',el).forEach(rw=>{const hit=sel!=null&&rw.dataset.p===sel;rw.classList.toggle('hit',hit);if(hit&&!first)first=rw;});if(first)scrollTo(pane,first);};
    el.addEventListener('click',e=>{const t=e.target.closest('[role=tab]');if(t){this.$$('[role=tab]',el).forEach(x=>x.setAttribute('aria-selected',String(x===t)));this.$$('[data-tpanel]',el).forEach(p=>p.hidden=p.dataset.tpanel!==t.dataset.tp);return;}
      const b=e.target.closest('button[data-p]');if(b)pick(sel===b.dataset.p?null:b.dataset.p);});
    let s=0;this.every(2800,()=>{pick(String(s%3));s++;});
  }

  s_mk_visit(r,D){
    const el=shell(r,'진료레코드','진료레코드','진료 녹음과 환자별 D-Note(SOAP) 준비 상태를 확인합니다',
      `<div class="ac"><div class="ach">진료 정보 <small>[최○○ 환자 진료 기록] 오늘 최○○ 진료</small></div><dl class="ainfo"><dt>담당의</dt><dd>원장 김도현</dd><dt>녹음시간</dt><dd>01:17</dd><dt>감지 언어</dt><dd>한국어</dd><dt>참여 인원</dt><dd>2명</dd></dl><div class="anotice">✓ 환자에게 녹음 사실을 고지했습니다.</div></div>`+
      `<div class="ag2"><div class="ac"><div class="ach">진료 전사문 <small>A 원장 · B 환자</small></div><div class="atrans" id="mkv-tr">${D.transcript.map((l,i)=>`<div class="trow ${l[0]==='B'?'b':''}" data-t="${i}"><span class="ts">${l[1]}</span><span class="bx">${esc(l[2])}</span></div>`).join('')}</div></div>`+
      `<div class="ac"><div class="atabs" role="tablist"><button type="button" role="tab" data-tp="note" aria-selected="true">D-Note (SOAP)</button><button type="button" role="tab" data-tp="memo" aria-selected="false">진료 메모</button></div><div class="dnbody soapbtns" data-tpanel="note" id="mkv-soap"></div><div class="dnbody" data-tpanel="memo" hidden><textarea class="amemo" placeholder="진료 메모를 입력해 보세요. (체험용)"></textarea></div></div></div>`);
    const sp=this.$('#mkv-soap'),ts=this.$('#mkv-tr');
    sp.innerHTML=D.soap.map(sec=>`<div class="sec"><b>${sec[0]})<em>${sec[1]}</em></b>${sec[2].map(it=>`<button type="button" data-src="${it[1].join(',')}" aria-pressed="false">${esc(it[0])}</button>`).join('')}</div>`).join('')+'<p class="fine">항목을 누르면 근거가 된 발화가 표시됩니다.</p>';
    const btns=this.$$('button',sp);let cur=0;
    const pick=btn=>{cur=btns.indexOf(btn);btns.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));const ids=btn.dataset.src.split(',').map(Number);let first=null;
      this.$$('.trow',ts).forEach(l=>{const hit=ids.includes(+l.dataset.t);l.classList.toggle('hit',hit);if(hit&&!first)first=l;});if(first)scrollTo(ts,first);scrollTo(sp,btn);};
    sp.addEventListener('click',e=>{const b=e.target.closest('button');if(b)pick(b);});
    el.addEventListener('click',e=>{const t=e.target.closest('[role=tab]');if(!t)return;this.$$('[role=tab]',el).forEach(x=>x.setAttribute('aria-selected',String(x===t)));this.$$('[data-tpanel]',el).forEach(p=>p.hidden=p.dataset.tpanel!==t.dataset.tp);});
    const def=btns.find(b=>b.textContent.indexOf('약물치료')===0);if(def)pick(def);
    this.every(2600,()=>pick(btns[(cur+1)%btns.length]));
  }

  s_mk_mkt(r,DV){
    const P={'7':{met:[['최다 채널','네이버 플레이스 13건'],['피크 일자','9월 28일 (월)'],['전체 문의','81건'],['유입 감지','31건']],ch:[['네이버 플레이스',13,'#03A55A'],['네이버 검색',7,'#3D6FE3'],['카카오톡',3,'#D9A400'],['구글 검색',2,'#2E9BD6'],['지인소개',2,'#7A5AF8'],['인스타그램',2,'#D6456B'],['강남언니',2,'#E0752D']],days:['9/23','9/24','9/25','9/26','9/27','9/28','9/29'],tr:[[4,6],[3,5],[5,7],[2,4],[1,2],[6,7],[3,5]]},
      '30':{met:[['최다 채널','네이버 플레이스 47건'],['피크 일자','8월 31일 (월)'],['전체 문의','323건'],['유입 감지','122건']],ch:DV.channels,days:['9/1','9/2','9/3','9/4','9/5','9/7','9/8','9/9','9/10','9/11','9/12','9/14','9/15','9/16','9/17','9/18','9/19','9/21','9/22','9/23','9/24','9/25','9/26','9/28','9/29'],tr:[[3,4],[2,5],[4,6],[3,3],[2,4],[5,6],[3,5],[2,3],[4,7],[3,4],[2,3],[4,5],[5,8],[3,4],[2,5],[4,6],[3,3],[5,7],[2,4],[4,6],[3,5],[5,7],[2,4],[6,7],[3,5]]}};
    const el=shell(r,'마케팅 분석','마케팅 분석','콜레코드를 기반으로 채널별 유입과 성과를 분석합니다',
      `<div class="ac"><div class="ach">최근 인사이트<span class="aseg" id="mkm-seg"><button type="button" data-p="7" aria-pressed="false">최근 7일</button><button type="button" data-p="30" aria-pressed="true">최근 30일</button></span></div><div class="amet" id="mkm-met"></div></div><div class="ag2"><div class="ac"><div class="ach">채널별 유입 비율 <small>콜레코드 기준</small></div><div class="adonut" id="mkm-donut"></div></div><div class="ac"><div class="ach">관심 시술 비율 <small>상담레코드 기준</small></div><div id="mkm-int"></div></div></div><div class="ac"><div class="ach">일별 채널별 유입 트렌드 <small>막대에 마우스를 올려 보세요</small></div><div class="atrend" id="mkm-tr"></div><div class="atinfo" id="mkm-ti">날짜별 문의 흐름이 채널 색으로 쌓여 보입니다.</div></div>`);
    let p='30',dpick=0,tcol=0,pickD=()=>{},pickT=()=>{};
    const donut=()=>{const d=P[p].ch,total=d.reduce((a,x)=>a+x[1],0),R=40,C=2*Math.PI*R;let off=0;
      const segs=d.map((x,i)=>{const len=x[1]/total*C;const s=`<circle class="seg" data-i="${i}" cx="59" cy="59" r="${R}" fill="none" stroke="${x[2]}" stroke-width="17" stroke-dasharray="${Math.max(len-1,0.5)} ${C}" stroke-dashoffset="${-off}" transform="rotate(-90 59 59)"></circle>`;off+=len;return s;}).join('');
      const box=this.$('#mkm-donut');box.innerHTML=`<svg viewBox="0 0 118 118" role="img" aria-label="채널별 유입 비율">${segs}<text id="mkm-dp" x="59" y="58" text-anchor="middle" font-size="17" font-weight="600" fill="#10203A"></text><text id="mkm-dl" x="59" y="73" text-anchor="middle" font-size="7.5" fill="#7A8699"></text></svg><ul class="aleg">${d.map((x,i)=>`<li><button type="button" data-i="${i}" aria-pressed="${i===0}"><i style="background:${x[2]}"></i><span>${esc(x[0])}</span><span class="c">${x[1]}건</span><span class="p">${Math.round(x[1]/total*100)}%</span></button></li>`).join('')}</ul>`;
      pickD=i=>{dpick=i;const x=d[i];this.$('#mkm-dp').textContent=Math.round(x[1]/total*100)+'%';this.$('#mkm-dl').textContent=x[0];this.$$('circle.seg',box).forEach(c=>{const on=+c.dataset.i===i;c.style.opacity=on?1:.28;c.setAttribute('stroke-width',on?20:17);});this.$$('.aleg button',box).forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.i===i)));};
      box.onmouseover=box.onclick=e=>{const t=e.target.closest('[data-i]');if(t)pickD(+t.dataset.i);};pickD(0);};
    const trend=()=>{const{days,tr}=P[p],max=Math.max(...tr.map(x=>x[0]+x[1]));const box=this.$('#mkm-tr');
      box.innerHTML=tr.map((x,i)=>`<button type="button" class="col" data-i="${i}" aria-label="${days[i]} 문의 ${x[0]+x[1]}건"><i style="height:${x[0]/max*66}px;background:#03A55A"></i><i style="height:${x[1]/max*66}px;background:#3D6FE3"></i></button>`).join('');
      const ti=this.$('#mkm-ti');pickT=i=>{tcol=i;const c=this.$$('.col',box)[i];this.$$('.col',box).forEach(x=>x.classList.toggle('on',x===c));ti.innerHTML=`<b>${days[i]}</b> · 문의 <b>${tr[i][0]+tr[i][1]}건</b> — 네이버 플레이스 ${tr[i][0]}건, 그 외 채널 ${tr[i][1]}건`;};
      box.onmouseover=box.onclick=e=>{const c=e.target.closest('.col');if(c)pickT(+c.dataset.i);};};
    const paint=()=>{this.$('#mkm-met').innerHTML=P[p].met.map((m,i)=>`<div style="animation-delay:${i*60}ms"><span>${m[0]}</span><b>${m[1]}</b></div>`).join('');donut();trend();
      const it=DV.interests,max=Math.max(...it.map(x=>x[1]));this.$('#mkm-int').innerHTML=it.map((x,i)=>`<div class="abar"><span class="t">${esc(x[0])}</span><span class="tk"><i style="width:${x[1]/max*100}%;${i===it.length-1?'background:var(--line-2)':''}"></i></span><em>${x[1]}건</em></div>`).join('');};
    const setP=v=>{p=v;this.$$('#mkm-seg button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.p===p)));paint();};
    this.$('#mkm-seg').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setP(b.dataset.p);});
    paint();let n=0;
    this.every(1600,()=>{n++;pickD((dpick+1)%P[p].ch.length);pickT((tcol+1)%P[p].tr.length);if(n%14===0)setP(p==='30'?'7':'30');});
  }

  s_mk_client(r){
    const R=[['visit','01분 17초','08.31 오전 04:30','원장 김도현','S)★ 검진 결과 상담 위해 내원 · A) 중등도 지방간 · P) 약물치료 보류, 3개월 후 Lab 추적, 체중 5kg 감량 지도'],['call','00분 34초','08.31 오전 03:50','실장 김하늘','검진 결과 재문의 · 다음 내원 예약 안내'],['call','00분 46초','08.30 오후 09:14','실장 김하늘','시술 경과 문의 · 정상 경과 안내'],['call','00분 43초','08.30 오후 06:46','실장 윤채원','시술 2주 경과 확인 · 내원 예약 접수'],['miss','00분 00초','08.29 오전 02:48','—','연결되지 않은 전화 · 회신 목록에 추가됨'],['call','00분 51초','08.30 오후 03:40','CS 태은','8월 25일 예약을 9월 1일로 변경'],['cons','01분 31초','08.27 오전 01:11','실장 박유리','[이전 시술 경험] 눈 부위 시술 없음 · [희망 시술] 리쥬란 아이 (촬영 일정 후 진행 희망)'],['call','00분 37초','08.21 오전 01:53','실장 박유리','제증명 발급 문의 · 대리 발급 시 가족관계 서류 안내'],['visit','01분 31초','08.17 오전 04:50','원장 김도현','S)★ 복통·설사, 어제 저녁 시작 · P) 수액 처치 후 경과 관찰'],['cons','01분 09초','08.13 오전 01:13','실장 박유리','[피부 고민] 광대 부위 경계 · 상담 후 견적서 문자 발송'],['call','00분 27초','07.29 오전 05:53','실장 이서준','발신 · 수면 위내시경 전 금식 안내'],['call','00분 50초','07.29 오전 05:20','실장 이서준','검진 예약 접수 · 공복 내원 안내']];
    const TY={call:['콜','call'],miss:['부재중','miss'],cons:['상담','cons'],visit:['진료','visit']};
    const cnt=t=>R.filter(x=>t==='call'?(x[0]==='call'||x[0]==='miss'):x[0]===t).length;
    const el=shell(r,'환자목록','환자목록','환자 한 명의 콜·상담·진료가 한 줄로 이어집니다',
      `<div class="ac"><div class="pgrid"><div><div class="ach">최○○ <span style="color:var(--amber)">★</span> <small>단골 표시</small></div><dl class="ainfo"><dt>전화번호</dt><dd>010-14••-••03</dd><dt>차트번호</dt><dd>C2026003</dd><dt>등록일시</dt><dd>2026. 05. 16.</dd><dt>레코드</dt><dd>콜 8 · 상담 2 · 진료 2</dd></dl></div><div class="pbtns"><span>최○○ 상담 녹음 시작 →</span><span>최○○ 진료 녹음 시작 →</span></div></div></div>`+
      `<div class="ac"><div class="ach">레코드 <small>종류를 눌러 걸러 보세요 · 레코드를 누르면 D-Note가 펼쳐집니다</small></div><div class="cfilt" id="mkp-f"><span class="lbl">필터</span><button type="button" data-f="call" aria-pressed="true">콜 ${cnt('call')}</button><button type="button" data-f="cons" aria-pressed="true">상담 ${cnt('cons')}</button><button type="button" data-f="visit" aria-pressed="true">진료 ${cnt('visit')}</button><button type="button" class="sort" id="mkp-sort">↑↓ 최신순</button></div><div class="crows" id="mkp-rows" style="margin-top:8px"></div></div>`);
    const on={call:true,cons:true,visit:true};let desc=true,open=null;
    const vis=()=>{let rows=R.map((x,i)=>({x,i})).filter(({x})=>on[x[0]==='miss'?'call':x[0]]);if(!desc)rows=rows.slice().reverse();return rows;};
    const paint=()=>{this.$('#mkp-rows').innerHTML=vis().map(({x,i})=>`<button type="button" class="crow ${open===i?'open':''}" data-i="${i}"><span class="cty ${TY[x[0]][1]}">${TY[x[0]][0][0]}</span><span class="dur">${x[1].replace('분 ',"'").replace('초','')}</span><span class="wm">${x[2]}<br><small style="color:var(--ink-3)">${esc(x[3])}</small></span><span class="nt">${open===i?'<b>D-Note</b> · ':''}${esc(x[4])}</span></button>`).join('')||'<p class="fine">조건에 맞는 레코드가 없습니다.</p>';};
    this.$('#mkp-f').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.id==='mkp-sort'){desc=!desc;b.textContent=desc?'↑↓ 최신순':'↑↓ 오래된순';paint();return;}on[b.dataset.f]=!on[b.dataset.f];b.setAttribute('aria-pressed',String(on[b.dataset.f]));paint();});
    el.addEventListener('click',e=>{const c=e.target.closest('.crow');if(!c)return;open=open===+c.dataset.i?null:+c.dataset.i;paint();});
    paint();let k=-1;
    this.every(2600,()=>{const rows=vis();k=(k+1)%Math.min(rows.length,6);open=rows[k]?rows[k].i:null;paint();});
  }
}
customElements.define('dv-ui',DvUi);
})();
