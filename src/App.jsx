import React, { useState, useEffect } from "react";

const FONT = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700;800&family=Orbitron:wght@700;900&display=swap";

const C = {
  green: "#133827", greenLit: "#1a5038", greenPale: "#e8f5e9", greenText: "#22c55e",
  black: "#0c0c0c", white: "#fafaf6", cream: "#f5f5f0", border: "#e0e0da",
  text: "#111", sub: "#777", muted: "#bbb", red: "#ef4444",
};
const R = 4;

const MOCK_HISTORY = [
  { id:"m1",date:"2026-02-13",opponent:"Luis García",table:"Mesa 1",result:"W",sets:[2,1],games:[{s:[11,8]},{s:[9,11]},{s:[11,6]}] },
  { id:"m2",date:"2026-02-10",opponent:"Ana Ruiz",table:"Mesa 3",result:"L",sets:[1,2],games:[{s:[11,7]},{s:[8,11]},{s:[9,11]}] },
  { id:"m3",date:"2026-02-07",opponent:"Pedro Méndez",table:"Mesa 2",result:"W",sets:[2,0],games:[{s:[11,5]},{s:[11,9]}] },
  { id:"m4",date:"2026-02-03",opponent:"Sofía Chen",table:"Mesa 4",result:"W",sets:[2,1],games:[{s:[7,11]},{s:[11,9]},{s:[11,8]}] },
];
const TIMES = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];
const booked = new Set(["10:00","16:00"]);

export default function PlayPongSite() {
  const [showApp, setShowApp] = useState(false);
  useEffect(() => { if (!document.querySelector(`link[href="${FONT}"]`)) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = FONT; document.head.appendChild(l); } }, []);
  if (showApp) return <PlayPongApp onBack={() => setShowApp(false)} />;
  return <Landing onApp={() => setShowApp(true)} />;
}

function Logo({ size = 20, color = "#133827" }) {
  return (<div style={{ display:"flex",flexDirection:"column",alignItems:"center",lineHeight:1 }}><span style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:size,color,letterSpacing:4,lineHeight:1 }}>PLAY</span><div style={{ width:size*1.8,height:1.5,background:color,margin:"1px 0" }}/><span style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:size,color,letterSpacing:4,lineHeight:1 }}>PONG</span></div>);
}
const Tag = ({children}) => <p style={{color:C.green,fontSize:12,fontWeight:700,letterSpacing:4,marginBottom:8}}>{children.toUpperCase()}</p>;
const h2s = { fontFamily:"'Bebas Neue',sans-serif",fontSize:44,letterSpacing:2,lineHeight:1,color:C.text,marginBottom:12 };

/* ── Photo Placeholder Components — tries real photo, falls back to CSS ── */
function PhotoBox({ label, height = 280, dark = false, icon = "📷", children, src }) {
  const [failed, setFailed] = React.useState(false);
  const bg = dark
    ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)"
    : "linear-gradient(135deg, #2d3436 0%, #636e72 50%, #b2bec3 100%)";
  return (
    <div style={{ position:"relative", height, borderRadius:R, background:bg, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
      {/* Try real image first */}
      {src && !failed && <img src={src} alt="" onError={() => setFailed(true)} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", borderRadius:R }} />}
      {/* Subtle grid pattern (shows if no image or as overlay) */}
      {(!src || failed) && <div style={{ position:"absolute", inset:0, opacity:.06, backgroundImage:"repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />}
      {(!src || failed) && (children || <>
        <span style={{ fontSize:40, opacity:.5 }}>{icon}</span>
        <span style={{ color:"#fff", fontSize:11, fontWeight:600, letterSpacing:1, opacity:.5, textAlign:"center", padding:"0 20px" }}>{label}</span>
      </>)}
      <div style={{ position:"absolute", bottom:10, left:10, background:"#000a", backdropFilter:"blur(4px)", color:"#fff", padding:"4px 10px", borderRadius:R, fontSize:9, fontWeight:600, letterSpacing:1, zIndex:2 }}>📍 TU FOTO — {label}</div>
    </div>
  );
}

function HeroBg() {
  return (
    <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #0a1a10 0%, #133827 30%, #1a4a35 60%, #0c2018 100%)", overflow:"hidden" }}>
      {/* Decorative table lines */}
      <div style={{ position:"absolute", top:"50%", left:0, right:0, height:1, background:"#ffffff08" }} />
      <div style={{ position:"absolute", top:0, left:"50%", bottom:0, width:1, background:"#ffffff05" }} />
      {/* Floating balls */}
      {[{x:15,y:20,s:12,d:3},{x:75,y:35,s:8,d:4},{x:85,y:70,s:16,d:5},{x:25,y:75,s:10,d:3.5},{x:55,y:15,s:6,d:4.5}].map((b,i) => (
        <div key={i} style={{ position:"absolute", left:`${b.x}%`, top:`${b.y}%`, width:b.s, height:b.s, borderRadius:"50%", background:"#FFB30022", boxShadow:`0 0 ${b.s*2}px #FFB30011` }} />
      ))}
      {/* Net pattern */}
      <div style={{ position:"absolute", top:"48%", left:"5%", right:"5%", height:3, background:"#ffffff06", borderRadius:1 }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
/* LANDING PAGE                                       */
/* ═══════════════════════════════════════════════════ */
function Landing({ onApp }) {
  return (
    <div style={{ fontFamily:"'Sora',sans-serif",background:C.white,color:C.text,overflowX:"hidden" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}.fu{animation:fadeUp .8s ease both}.fu1{animation:fadeUp .8s ease .15s both}.fu2{animation:fadeUp .8s ease .3s both}.fu3{animation:fadeUp .8s ease .45s both}button{cursor:pointer;-webkit-tap-highlight-color:transparent}a{text-decoration:none;color:inherit}section{padding:80px 20px;max-width:1080px;margin:0 auto}@media(max-width:768px){section{padding:60px 18px}}`}</style>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:C.white+"ee",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px"}}>
          <Logo size={16} color={C.green}/>
          <div style={{display:"flex",gap:24,alignItems:"center"}}>
            {["Espacio","Tecnología","Clases","Comunidad","Precios"].map(s=><a key={s} href={`#${s.toLowerCase()}`} style={{color:C.sub,fontSize:13,fontWeight:500}}>{s}</a>)}
            <button style={{padding:"8px 20px",background:C.green,border:"none",borderRadius:R,color:"#fff",fontSize:13,fontWeight:700,fontFamily:"'Sora',sans-serif"}} onClick={onApp}>Reservar</button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <div style={{position:"relative",minHeight:640,display:"flex",alignItems:"center",overflow:"hidden",paddingTop:60}}>
        <HeroBg />
        <div style={{position:"relative",zIndex:2,maxWidth:1080,margin:"0 auto",padding:"80px 20px",width:"100%"}}>
          <p className="fu" style={{color:C.greenText,fontSize:12,fontWeight:700,letterSpacing:4,marginBottom:16}}>CONDESA, CDMX — PRÓXIMAMENTE</p>
          <h1 className="fu1" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:76,lineHeight:.92,letterSpacing:3,color:"#fff",marginBottom:20,maxWidth:600}}>
            EL CLUB<br/>QUE<br/><span style={{color:C.greenText}}>FALTABA</span>
          </h1>
          <p className="fu2" style={{color:"#ffffffaa",fontSize:16,lineHeight:1.7,maxWidth:480,marginBottom:36}}>
            Ping pong profesional en el corazón de la Condesa. Para los que juegan en serio y los que juegan por diversión. Mesas pro, marcador inteligente en cada mesa, coaches certificados, y una comunidad que no para de jugar.
          </p>
          <div className="fu3" style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button style={{padding:"14px 32px",background:C.green,border:`1px solid ${C.greenText}44`,borderRadius:R,color:"#fff",fontSize:15,fontWeight:700,fontFamily:"'Sora',sans-serif"}} onClick={onApp}>Reservar Mesa →</button>
            <a href="#espacio" style={{padding:"14px 32px",background:"#ffffff10",border:"1px solid #ffffff22",borderRadius:R,color:"#fff",fontSize:15,fontWeight:600,fontFamily:"'Sora',sans-serif",display:"inline-block"}}>Conocer más</a>
          </div>
          <div className="fu3" style={{display:"flex",gap:40,marginTop:52}}>
            {[{n:"4",l:"Mesas pro"},{n:"24/7",l:"Reserva online"},{n:"3",l:"Coaches"},{n:"📍",l:"Condesa"}].map(s=><div key={s.l}><p style={{fontFamily:"'Orbitron',sans-serif",fontSize:28,fontWeight:900,color:"#fff"}}>{s.n}</p><p style={{color:"#ffffff55",fontSize:11,marginTop:2}}>{s.l}</p></div>)}
          </div>
        </div>
      </div>

      {/* ═══ ESPACIO ═══ */}
      <section id="espacio" style={{background:C.cream,margin:0,maxWidth:"100%",padding:"80px 20px"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <Tag>El Espacio</Tag>
          <h2 style={h2s}>Diseñado para jugar</h2>
          <p style={{color:C.sub,fontSize:15,lineHeight:1.7,maxWidth:580,marginBottom:32}}>
            4 mesas profesionales ITTF-approved en un espacio amplio e iluminado. Pisos deportivos, aire acondicionado, música ambiental, y todo lo que necesitas para concentrarte en tu juego — o simplemente pasarla bien con amigos.
          </p>

          {/* Photo grid placeholder */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8,marginBottom:28}}>
            <PhotoBox label="Interior del club" height={340} icon="🏓" src="https://images.pexels.com/photos/3026/ping-pong-table-tennis.jpg?auto=compress&w=800">
              {/* Mini scene: table with lines */}
              <div style={{width:"70%",height:"40%",border:"1px solid #ffffff15",borderRadius:2,position:"relative"}}>
                <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:"#ffffff20"}} />
                <div style={{position:"absolute",top:0,left:"50%",bottom:0,width:1,background:"#ffffff15"}} />
                <div style={{position:"absolute",top:"48%",left:"10%",right:"10%",height:2,background:"#ffffff12"}} />
              </div>
              <span style={{color:"#fff",fontSize:11,fontWeight:600,letterSpacing:1,opacity:.4}}>ESPACIO PRINCIPAL</span>
            </PhotoBox>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <PhotoBox label="Mesas profesionales" height="calc(50% - 4px)" icon="🏓" src="https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg?auto=compress&w=400" />
              <PhotoBox label="Zona lounge" height="calc(50% - 4px)" icon="🛋️" src="https://images.pexels.com/photos/187329/pexels-photo-187329.jpeg?auto=compress&w=400" />
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
            {[
              {t:"Mesas Profesionales",d:"Mesas ITTF-approved con redes de competencia. Piso deportivo antideslizante.",i:"🏓"},
              {t:"Iluminación Optimizada",d:"Luces LED calibradas para eliminar sombras y reflejos durante el juego.",i:"💡"},
              {t:"Zona Lounge",d:"Espacio para descansar, ver partidos en las TVs, y socializar con otros jugadores.",i:"🛋️"},
              {t:"Pro Shop",d:"Paletas, pelotas, grips y accesorios de las mejores marcas disponibles en sitio.",i:"🏪"},
            ].map(f=><div key={f.t} style={{background:"#fff",borderRadius:R,padding:20,border:`1px solid ${C.border}`}}><span style={{fontSize:24}}>{f.i}</span><h3 style={{fontSize:15,fontWeight:700,marginTop:10,color:C.text}}>{f.t}</h3><p style={{color:C.sub,fontSize:12,lineHeight:1.5,marginTop:4}}>{f.d}</p></div>)}
          </div>
        </div>
      </section>

      {/* ═══ TECNOLOGÍA ═══ */}
      <section id="tecnología">
        <Tag>Tecnología</Tag>
        <h2 style={h2s}>Marcador inteligente en cada mesa</h2>
        <p style={{color:C.sub,fontSize:15,lineHeight:1.7,maxWidth:580,marginBottom:32}}>
          Sin apps, sin pantallas, sin distracciones. Cada mesa tiene botones físicos debajo del borde — presionas cuando anotas y la TV se actualiza al instante. Tú solo juegas.
        </p>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          <div style={{flex:2,minWidth:300}}>
            {/* Live scoreboard visual */}
            <div style={{background:C.black,borderRadius:R,padding:"24px 28px",minHeight:220,display:"flex",flexDirection:"column",justifyContent:"center",position:"relative"}}>
              <div style={{position:"absolute",left:"50%",top:"10%",bottom:"10%",width:1,background:"#ffffff06",transform:"translateX(-50%)"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{color:"#ffffff44",fontSize:10,fontWeight:700,letterSpacing:2}}>MESA 1</span>
                <span style={{color:"#ffffff22",fontSize:10}}>SET 3 • BEST OF 5</span>
                <div style={{display:"flex",gap:3}}>
                  <span style={{padding:"2px 5px",background:"#ffffff0a",borderRadius:2,color:"#ffffff33",fontSize:8,fontFamily:"'Orbitron',sans-serif"}}>11–8</span>
                  <span style={{padding:"2px 5px",background:"#ffffff0a",borderRadius:2,color:"#ffffff33",fontSize:8,fontFamily:"'Orbitron',sans-serif"}}>9–11</span>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:40,padding:"16px 0"}}>
                {[{n:"Carlos",s:"07",srv:true},{n:"Ana",s:"05",srv:false}].map(p=>
                  <div key={p.n} style={{textAlign:"center"}}>
                    {p.srv&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginBottom:4}}><div style={{width:5,height:5,borderRadius:1,background:C.greenText,animation:"pulse 2s ease infinite"}}/><span style={{color:C.greenText,fontSize:8,fontWeight:700,letterSpacing:1}}>SERVICIO</span></div>}
                    {!p.srv&&<div style={{height:17,marginBottom:4}}/>}
                    <p style={{color:"#ffffff66",fontSize:13,fontWeight:600,marginBottom:4}}>{p.n}</p>
                    <div style={{display:"flex",gap:3,justifyContent:"center",marginBottom:6}}>
                      <div style={{width:7,height:7,borderRadius:1,background:p.srv?C.greenText:"#ffffff11"}}/>
                      <div style={{width:7,height:7,borderRadius:1,background:"#ffffff11"}}/>
                      <div style={{width:7,height:7,borderRadius:1,background:"#ffffff11"}}/>
                    </div>
                    <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:56,fontWeight:900,color:"#fff"}}>{p.s}</span>
                  </div>
                )}
              </div>
              <p style={{color:"#ffffff22",fontSize:9,textAlign:"center",marginTop:4}}>Puntos registrados con botones físicos debajo de la mesa</p>
            </div>
            {/* Photo placeholder: physical buttons */}
            <div style={{marginTop:8}}>
              <PhotoBox label="Botones bajo la mesa" height={180} icon="🔴" dark src="https://images.pexels.com/photos/3771083/pexels-photo-3771083.jpeg?auto=compress&w=800">
                {/* Button illustration */}
                <div style={{display:"flex",gap:16,alignItems:"center"}}>
                  {["POINT","UNDO","SWITCH"].map(b => (
                    <div key={b} style={{width:48,height:48,borderRadius:24,background:"#ef444433",border:"2px solid #ef444466",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{color:"#ef4444",fontSize:8,fontWeight:700,letterSpacing:1}}>{b}</span>
                    </div>
                  ))}
                </div>
                <span style={{color:"#fff",fontSize:10,opacity:.35,marginTop:8}}>3 botones por lado de mesa</span>
              </PhotoBox>
            </div>
          </div>
          <div style={{flex:1,minWidth:240,display:"flex",flexDirection:"column",gap:10}}>
            {[
              {t:"Botones físicos",d:"Un botón arcade por lado. Táctil, satisfactorio, cero distracciones.",i:"🔴"},
              {t:"TV en tiempo real",d:"Score, sets, servicio, deuce — todo visible para ambos jugadores.",i:"🖥️"},
              {t:"Historial automático",d:"Cada partido se registra en tu perfil con scores completos set por set.",i:"📊"},
              {t:"Cero fricción",d:"Creas el partido desde la app, luego solo juegas. La tecnología desaparece.",i:"⚡"},
            ].map(f=><div key={f.t} style={{background:C.cream,borderRadius:R,padding:"12px 16px",border:`1px solid ${C.border}`,display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16,flexShrink:0}}>{f.i}</span><div><p style={{fontSize:13,fontWeight:700,color:C.text}}>{f.t}</p><p style={{color:C.sub,fontSize:11,marginTop:2,lineHeight:1.4}}>{f.d}</p></div></div>)}
          </div>
        </div>
      </section>

      {/* ═══ CLASES ═══ */}
      <section id="clases" style={{background:C.green,margin:0,maxWidth:"100%",padding:"80px 20px",color:"#fff"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <p style={{color:"#ffffff55",fontSize:12,fontWeight:700,letterSpacing:4,marginBottom:8}}>CLASES & COACHES</p>
          <h2 style={{...h2s,color:"#fff"}}>Mejora tu juego</h2>
          <p style={{color:"#ffffff88",fontSize:15,lineHeight:1.7,maxWidth:580,marginBottom:32}}>
            Desde principiante hasta avanzado. Lecciones privadas 1-on-1, clases grupales temáticas, y programas para niños. Nuestros coaches están certificados y apasionados por el deporte. No importa tu nivel — hay una clase para ti.
          </p>

          {/* Coach photo placeholders */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
            <PhotoBox label="Coach en acción" height={220} dark icon="🎯" src="https://images.pexels.com/photos/6203482/pexels-photo-6203482.jpeg?auto=compress&w=600">
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:50,height:50,borderRadius:R,background:"#ffffff15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🏓</div>
                <div style={{textAlign:"left"}}><p style={{color:"#fff",fontWeight:700,fontSize:14,opacity:.6}}>Lección Privada</p><p style={{color:"#ffffff55",fontSize:11,marginTop:2}}>1-on-1 con coach</p></div>
              </div>
            </PhotoBox>
            <PhotoBox label="Clase grupal" height={220} dark icon="👥" src="https://images.pexels.com/photos/18511482/pexels-photo-18511482.jpeg?auto=compress&w=600">
              <div style={{display:"flex",gap:6}}>
                {[1,2,3,4,5].map(i => <div key={i} style={{width:32,height:32,borderRadius:R,background:"#ffffff12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>👤</div>)}
              </div>
              <span style={{color:"#fff",fontSize:10,opacity:.35,marginTop:8}}>4-8 personas por clase</span>
            </PhotoBox>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
            {[
              {t:"Lecciones Privadas",d:"1-on-1 con coach. Trabaja en tu técnica, estrategia, o lo que necesites.",p:"Desde $250/hr",i:"🎯"},
              {t:"Clases Grupales",d:"4-8 personas por clase. Temas como topspin, defensa, y táctica de partido.",p:"Desde $120/clase",i:"👥"},
              {t:"Programa Kids",d:"Clases divertidas para niños de 6-12 años. Aprenden jugando.",p:"Desde $120/clase",i:"🧒"},
              {t:"Torneos Mensuales",d:"Competencias amistosas con rankings y premios. Todos los niveles.",p:"Incluido",i:"🏆"},
            ].map(c=><div key={c.t} style={{background:"#ffffff0a",borderRadius:R,padding:20,border:"1px solid #ffffff12"}}><span style={{fontSize:24}}>{c.i}</span><h3 style={{fontSize:15,fontWeight:700,marginTop:10}}>{c.t}</h3><p style={{color:"#ffffff88",fontSize:12,lineHeight:1.5,marginTop:4,marginBottom:10}}>{c.d}</p><p style={{color:C.greenText,fontWeight:700,fontSize:13}}>{c.p}</p></div>)}
          </div>
        </div>
      </section>

      {/* ═══ COMUNIDAD ═══ */}
      <section id="comunidad">
        <Tag>Comunidad</Tag>
        <h2 style={h2s}>Más que un club</h2>
        <p style={{color:C.sub,fontSize:15,lineHeight:1.7,maxWidth:580,marginBottom:32}}>
          PlayPong es una comunidad de jugadores. Torneos semanales, rankings en vivo, eventos sociales, y un espacio donde siempre hay alguien dispuesto a jugar un partido. Ven solo y te vas con amigos.
        </p>

        {/* Event photo placeholder */}
        <PhotoBox label="Evento / torneo" height={300} icon="🏆" src="https://images.pexels.com/photos/8933713/pexels-photo-8933713.jpeg?auto=compress&w=800">
          <div style={{display:"flex",gap:12}}>
            {["🥇","🥈","🥉"].map((m,i) => <div key={i} style={{width:56,height:56,borderRadius:R,background:"#ffffff10",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{m}</div>)}
          </div>
          <span style={{color:"#fff",fontSize:12,opacity:.4,marginTop:8}}>TORNEO MENSUAL PLAYPONG</span>
        </PhotoBox>

        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:20}}>
          {[
            {n:"🏆",t:"Torneos Semanales",d:"Cada viernes. Singles y dobles. Todos los niveles con brackets automáticos."},
            {n:"📊",t:"Rankings en Vivo",d:"Tu posición en el club basada en tus resultados. Sube de nivel y desbloquea logros."},
            {n:"🎉",t:"Eventos Sociales",d:"Noches de ping pong + DJ, torneos temáticos, ligas corporativas, y más."},
          ].map(f=><div key={f.t} style={{flex:1,minWidth:200,padding:24,background:C.cream,borderRadius:R,border:`1px solid ${C.border}`}}><span style={{fontSize:28}}>{f.n}</span><h3 style={{fontSize:15,fontWeight:700,marginTop:10,color:C.text}}>{f.t}</h3><p style={{color:C.sub,fontSize:12,lineHeight:1.5,marginTop:6}}>{f.d}</p></div>)}
        </div>
      </section>

      {/* ═══ PRECIOS ═══ */}
      <section id="precios" style={{background:C.cream,margin:0,maxWidth:"100%",padding:"80px 20px"}}>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          <Tag>Precios</Tag>
          <h2 style={h2s}>Simple y transparente</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16,marginTop:32}}>
            {[
              {n:"Por Hora",p:"$150",u:"/hora",f:["Reserva cualquier mesa","Marcador inteligente","Acceso al lounge"],pop:false},
              {n:"Mensual",p:"$1,200",u:"/mes",f:["Horas ilimitadas","Marcador inteligente","10% desc. en clases","Acceso a torneos"],pop:true},
              {n:"Anual",p:"$9,600",u:"/año",f:["Todo Mensual","2 meses gratis","20% desc. en clases","Invitados gratis (2/mes)"],pop:false},
            ].map(p=><div key={p.n} style={{background:p.pop?C.green:"#fff",borderRadius:R,padding:28,border:p.pop?"none":`1px solid ${C.border}`,position:"relative"}}>
              {p.pop&&<span style={{position:"absolute",top:-10,right:16,background:C.greenText,color:"#fff",padding:"4px 12px",borderRadius:R,fontSize:10,fontWeight:700,letterSpacing:1}}>POPULAR</span>}
              <p style={{color:p.pop?"#ffffff88":C.sub,fontSize:12,fontWeight:700,letterSpacing:2}}>{p.n.toUpperCase()}</p>
              <p style={{marginTop:8}}><span style={{fontFamily:"'Orbitron',sans-serif",fontSize:36,fontWeight:900,color:p.pop?"#fff":C.text}}>{p.p}</span><span style={{color:p.pop?"#ffffff66":C.sub,fontSize:14,marginLeft:4}}>{p.u}</span></p>
              <div style={{margin:"20px 0",height:1,background:p.pop?"#ffffff15":C.border}}/>
              {p.f.map(ft=><p key={ft} style={{color:p.pop?"#ffffffcc":C.sub,fontSize:13,padding:"4px 0",lineHeight:1.5}}>✓ {ft}</p>)}
              <button style={{width:"100%",padding:12,background:p.pop?"#fff":C.green,border:"none",borderRadius:R,color:p.pop?C.green:"#fff",fontSize:14,fontWeight:700,fontFamily:"'Sora',sans-serif",marginTop:20}} onClick={onApp}>{p.pop?"Empezar":"Seleccionar"}</button>
            </div>)}
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <div style={{position:"relative",padding:"100px 20px",textAlign:"center",overflow:"hidden"}}>
        <HeroBg />
        <div style={{position:"relative",zIndex:2}}>
          <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:56,letterSpacing:3,color:"#fff",marginBottom:12}}>TU MESA<br/><span style={{color:C.greenText}}>TE ESPERA</span></h2>
          <p style={{color:"#ffffff88",fontSize:16,maxWidth:460,margin:"0 auto 32px",lineHeight:1.7}}>
            Reserva en segundos, llega a la Condesa, y juega. Ya seas pro o principiante, hay lugar para ti en PlayPong.
          </p>
          <button style={{padding:"16px 40px",background:C.green,border:`1px solid ${C.greenText}44`,borderRadius:R,color:"#fff",fontSize:16,fontWeight:700,fontFamily:"'Sora',sans-serif"}} onClick={onApp}>Reservar Ahora →</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${C.border}`,padding:"40px 20px",background:C.cream}}>
        <div style={{maxWidth:1080,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:32}}>
          <div><Logo size={18} color={C.green}/><p style={{color:C.sub,fontSize:13,marginTop:12,lineHeight:1.6}}>El club de ping pong más<br/>innovador de la CDMX.</p></div>
          <div style={{display:"flex",gap:48,flexWrap:"wrap"}}>
            <div><p style={{color:C.text,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:12}}>CLUB</p>{["Espacio","Tecnología","Clases","Precios"].map(l=><a key={l} href={`#${l.toLowerCase()}`} style={{display:"block",color:C.sub,fontSize:13,padding:"3px 0"}}>{l}</a>)}</div>
            <div><p style={{color:C.text,fontWeight:700,fontSize:12,letterSpacing:1,marginBottom:12}}>CONTACTO</p><p style={{color:C.sub,fontSize:13,padding:"3px 0"}}>hola@playpong.mx</p><p style={{color:C.sub,fontSize:13,padding:"3px 0"}}>La Condesa, CDMX</p><p style={{color:C.sub,fontSize:13,padding:"3px 0"}}>@playpong.mx</p></div>
          </div>
        </div>
        <div style={{maxWidth:1080,margin:"24px auto 0",paddingTop:20,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between"}}><p style={{color:C.muted,fontSize:11}}>© 2026 PlayPong. Todos los derechos reservados.</p><p style={{color:C.muted,fontSize:11}}>Hecho con 🏓 en CDMX</p></div>
      </footer>
    </div>
  );
}

function PlayPongApp({ onBack }) {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");
  const [mode, setMode] = useState("dark");
  const [notif, setNotif] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [matchHistory, setMatchHistory] = useState(MOCK_HISTORY);
  const [liveMatch, setLiveMatch] = useState(null);
  const themes = {
    dark: { bg:"#0c0c0c",card:"#161616",border:"#252525",text:"#f0f0f0",sub:"#777",muted:"#444",accent:C.green,accentText:C.greenText,surface:"#111",inputBg:"#1a1a1a",green:"#22c55e",red:"#ef4444",tagBg:C.green,navBg:"#0c0c0c",barBg:"#0c0c0c",logo:"#fff" },
    light: { bg:"#f5f5f0",card:"#fff",border:"#e0e0da",text:"#111",sub:"#888",muted:"#bbb",accent:C.green,accentText:C.green,surface:"#eeeee8",inputBg:"#fff",green:"#16a34a",red:"#dc2626",tagBg:C.greenPale,navBg:"#fff",barBg:"#fff",logo:C.green },
  };
  const t = themes[mode];
  const notify = (msg) => { setNotif(msg); setTimeout(() => setNotif(null), 2500); };
  const nav = (v) => setView(v);

  if (!user) {
    return (
      <div style={{ fontFamily:"'Sora',sans-serif", background:t.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
        <div style={{ width:"100%", maxWidth:380 }}>
          <button style={{ background:"none", border:"none", color:t.sub, fontSize:13, marginBottom:20, cursor:"pointer", fontFamily:"'Sora',sans-serif" }} onClick={onBack}>← Volver al sitio</button>
          <div style={{ textAlign:"center", marginBottom:32 }}><Logo size={28} color={t.logo} /></div>
          <SimpleAuth onAuth={(u) => { setUser(u); nav("home"); }} t={t} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'Sora',sans-serif", background:t.bg, minHeight:"100vh", maxWidth:480, margin:"0 auto", position:"relative" }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } input:focus{outline:none;border-color:${t.accent}!important} button{cursor:pointer} ::-webkit-scrollbar{display:none}`}</style>
      {notif && <div style={{ position:"fixed",top:12,left:"50%",transform:"translateX(-50%)",padding:"10px 24px",borderRadius:R,background:t.accent,color:"#fff",fontWeight:600,fontSize:13,zIndex:999 }}>{notif}</div>}
      <header style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",borderBottom:`1px solid ${t.border}`,background:t.barBg,position:"sticky",top:0,zIndex:50 }}>
        {view!=="home"?<button style={{background:"none",border:"none",padding:4}} onClick={()=>nav("home")}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.sub} strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>:<button style={{background:"none",border:"none",color:t.sub,fontSize:12,cursor:"pointer",fontFamily:"'Sora',sans-serif"}} onClick={onBack}>← Sitio</button>}
        <Logo size={14} color={t.logo} />
        <button style={{width:32,height:32,borderRadius:R,background:t.accent,border:"none",color:"#fff",fontWeight:800,fontSize:13}} onClick={()=>nav("profile")}>{user.name[0]}</button>
      </header>
      <main style={{paddingBottom:72}}>
        {view==="home"&&<AppHome user={user} bookings={bookings} history={matchHistory} nav={nav} t={t} />}
        {view==="reserve"&&<AppReserve onBook={(b)=>{setBookings(p=>[...p,{...b,id:Date.now()}]);notify("Mesa reservada");nav("home")}} t={t}/>}
        {view==="match"&&<AppMatch liveMatch={liveMatch} onStart={(m)=>{setLiveMatch(m);notify("Partido iniciado")}} t={t}/>}
        {view==="history"&&<AppHistory history={matchHistory} t={t}/>}
        {view==="profile"&&<AppProfile user={user} history={matchHistory} mode={mode} setMode={setMode} nav={nav} onLogout={()=>{setUser(null);nav("home")}} t={t}/>}
      </main>
      <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,display:"flex",justifyContent:"space-around",padding:"8px 0 12px",background:t.navBg,borderTop:`1px solid ${t.border}`,zIndex:50}}>
        {[{id:"home",icon:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",label:"Inicio"},{id:"reserve",icon:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",label:"Reservar"},{id:"match",icon:"M13 2L3 14h9l-1 8 10-12h-9l1-8z",label:"Partido"},{id:"history",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",label:"Historial"},{id:"profile",icon:"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z",label:"Perfil"}].map(n=>(
          <button key={n.id} style={{display:"flex",flexDirection:"column",alignItems:"center",background:"none",border:"none",padding:"2px 10px",fontFamily:"'Sora',sans-serif"}} onClick={()=>nav(n.id)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={view===n.id?t.accentText:t.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={n.icon}/></svg>
            <span style={{fontSize:9,marginTop:2,fontWeight:view===n.id?700:500,color:view===n.id?t.accentText:t.muted}}>{n.label}</span>
          </button>))}
      </nav>
    </div>
  );
}

// ─── App Sub-views (compact) ────────────────────────
function SimpleAuth({ onAuth, t }) {
  const [tab, setTab] = useState("login"); const [f, setF] = useState({ name:"",email:"",pass:"" });
  const submit = () => { if(!f.email||!f.pass) return; onAuth({id:"u_"+Date.now(),name:tab==="login"?f.email.split("@")[0]:f.name||f.email.split("@")[0],email:f.email,card:null}); };
  return (<>
    <div style={{display:"flex",marginBottom:20,borderBottom:`1px solid ${t.border}`}}>
      {["login","signup"].map(m=><button key={m} onClick={()=>setTab(m)} style={{flex:1,padding:"10px 0",background:"none",border:"none",borderBottom:tab===m?`2px solid ${t.accent}`:"2px solid transparent",color:tab===m?t.text:t.sub,fontSize:13,fontWeight:600,fontFamily:"'Sora',sans-serif"}}>{m==="login"?"Iniciar Sesión":"Crear Cuenta"}</button>)}
    </div>
    {tab==="signup"&&<input style={ai(t)} placeholder="Nombre" value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>}
    <input style={ai(t)} placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
    <input style={ai(t)} placeholder="Contraseña" type="password" value={f.pass} onChange={e=>setF({...f,pass:e.target.value})}/>
    <button style={ab(t)} onClick={submit}>{tab==="login"?"Entrar":"Crear Cuenta"}</button>
  </>);
}

function AppHome({ user, bookings, history, nav, t }) {
  const w = history.filter(m=>m.result==="W").length; const l = history.filter(m=>m.result==="L").length;
  return (<div style={aw}>
    <div style={{...ac(t),display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><p style={{color:t.text,fontSize:18,fontWeight:800}}>Hola, {user.name}</p><p style={{color:t.sub,fontSize:13}}>¿Listo para jugar?</p></div><div style={{display:"flex",gap:12}}><div style={{textAlign:"center"}}><span style={{color:t.green,fontFamily:"'Orbitron',sans-serif",fontWeight:900}}>{w}</span><br/><span style={{color:t.muted,fontSize:9}}>W</span></div><div style={{textAlign:"center"}}><span style={{color:t.red,fontFamily:"'Orbitron',sans-serif",fontWeight:900}}>{l}</span><br/><span style={{color:t.muted,fontSize:9}}>L</span></div></div></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {[{label:"Reservar Mesa",icon:"📅",view:"reserve"},{label:"Iniciar Partido",icon:"⚡",view:"match"},{label:"Historial",icon:"🏆",view:"history"},{label:"Mi Perfil",icon:"👤",view:"profile"}].map(a=><button key={a.view} style={{...ac(t),display:"flex",alignItems:"center",gap:10,width:"100%",cursor:"pointer",textAlign:"left"}} onClick={()=>nav(a.view)}><span style={{fontSize:20}}>{a.icon}</span><span style={{color:t.text,fontSize:13,fontWeight:600}}>{a.label}</span></button>)}
    </div>
    {history.slice(0,3).map(m=><div key={m.id} style={{...ac(t),display:"flex",alignItems:"center",gap:12}}><div style={{width:28,height:28,borderRadius:R,background:m.result==="W"?`${t.green}18`:`${t.red}18`,color:m.result==="W"?t.green:t.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,fontFamily:"'Orbitron',sans-serif"}}>{m.result}</div><div style={{flex:1}}><p style={{color:t.text,fontSize:13,fontWeight:600}}>vs {m.opponent}</p><p style={{color:t.sub,fontSize:11,marginTop:1}}>{m.date}</p></div><span style={{color:t.text,fontFamily:"'Orbitron',sans-serif",fontWeight:900,fontSize:14}}>{m.sets[0]}–{m.sets[1]}</span></div>)}
  </div>);
}

function AppReserve({ onBook, t }) {
  const [date,setDate]=useState(""); const [time,setTime]=useState(null); const [dur,setDur]=useState(60);
  const dates=Array.from({length:7},(_,i)=>{const d=new Date("2026-02-16");d.setDate(d.getDate()+i);return d.toISOString().split("T")[0]});
  const days=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  if(date&&time) return(<div style={aw}><h2 style={at(t)}>Confirmar</h2><div style={{...ac(t),textAlign:"left"}}>{[["Fecha",date],["Hora",time],["Duración",`${dur} min`],["Total",`$${(dur/60)*150}`]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0"}}><span style={{color:t.sub}}>{k}</span><span style={{color:t.text,fontWeight:600}}>{v}</span></div>)}</div><button style={ab(t)} onClick={()=>onBook({type:"table",title:"Mesa reservada",date,time,duration:dur,price:(dur/60)*150})}>Confirmar y Pagar</button><button style={{background:"none",border:"none",color:t.sub,padding:"8px 0",fontSize:13,display:"block",margin:"8px auto",cursor:"pointer",fontFamily:"'Sora',sans-serif"}} onClick={()=>setTime(null)}>← Atrás</button></div>);
  return (<div style={aw}><h2 style={at(t)}>Reservar Mesa</h2>
    {!date?<><p style={{color:t.sub,fontSize:11,fontWeight:700,letterSpacing:1.5,marginBottom:8}}>FECHA</p><div style={{display:"flex",gap:6,overflowX:"auto"}}>{dates.map(d=>{const o=new Date(d+"T12:00:00");return <button key={d} style={{padding:"10px 14px",background:t.card,border:`1px solid ${t.border}`,borderRadius:R,display:"flex",flexDirection:"column",alignItems:"center",gap:2,minWidth:52,fontFamily:"'Sora',sans-serif"}} onClick={()=>setDate(d)}><span style={{fontSize:10,color:t.sub}}>{days[o.getDay()]}</span><span style={{fontSize:20,fontWeight:700,color:t.text}}>{o.getDate()}</span></button>})}</div></>
    :<><p style={{color:t.sub,fontSize:11,fontWeight:700,letterSpacing:1.5,marginBottom:8}}>DURACIÓN</p><div style={{display:"flex",gap:6,marginBottom:16}}>{[30,60,90].map(d=><button key={d} style={{flex:1,padding:10,background:dur===d?t.accent:t.card,border:`1px solid ${dur===d?t.accent:t.border}`,borderRadius:R,color:dur===d?"#fff":t.text,fontSize:13,fontWeight:600,fontFamily:"'Sora',sans-serif"}} onClick={()=>setDur(d)}>{d} min</button>)}</div><p style={{color:t.sub,fontSize:11,fontWeight:700,letterSpacing:1.5,marginBottom:8}}>HORARIO</p><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>{TIMES.map(tm=>{const bk=booked.has(tm);return <button key={tm} disabled={bk} style={{padding:"12px 4px",background:bk?t.surface:t.card,border:`1px solid ${bk?t.surface:t.border}`,borderRadius:R,color:bk?t.muted:t.text,fontSize:13,fontWeight:600,textDecoration:bk?"line-through":"none",fontFamily:"'Sora',sans-serif"}} onClick={()=>{if(!bk)setTime(tm)}}>{tm}</button>})}</div><button style={{background:"none",border:"none",color:t.sub,padding:"8px 0",fontSize:13,display:"block",margin:"8px auto",cursor:"pointer",fontFamily:"'Sora',sans-serif"}} onClick={()=>setDate("")}>← Atrás</button></>}
  </div>);
}

function AppMatch({ liveMatch, onStart, t }) {
  const [opp,setOpp]=useState(""); const [stw,setStw]=useState(3);
  return (<div style={aw}><h2 style={at(t)}>Iniciar Partido</h2>
    <p style={{color:t.sub,fontSize:11,fontWeight:700,letterSpacing:1.5,margin:"12px 0 8px"}}>OPONENTE</p>
    <input style={ai(t)} placeholder="¿Contra quién juegas?" value={opp} onChange={e=>setOpp(e.target.value)}/>
    <p style={{color:t.sub,fontSize:11,fontWeight:700,letterSpacing:1.5,margin:"8px 0 8px"}}>FORMATO</p>
    <div style={{display:"flex",gap:6,marginBottom:16}}>{[{n:2,l:"Best of 3"},{n:3,l:"Best of 5"},{n:4,l:"Best of 7"}].map(o=><button key={o.n} style={{flex:1,padding:12,background:stw===o.n?t.accent:t.card,border:`1px solid ${stw===o.n?t.accent:t.border}`,borderRadius:R,color:stw===o.n?"#fff":t.text,fontSize:13,fontWeight:700,fontFamily:"'Sora',sans-serif"}} onClick={()=>setStw(o.n)}>{o.l}</button>)}</div>
    <button style={{...ab(t),opacity:opp?1:.4}} disabled={!opp} onClick={()=>onStart({tableId:1,players:["Tú",opp],scores:[0,0],sets:[0,0],serving:0,history:[],gameOver:false,winner:null,setsToWin:stw})}>⚡ Iniciar Partido</button>
  </div>);
}

function AppHistory({ history, t }) {
  const [exp,setExp]=useState(null);
  return (<div style={aw}><h2 style={at(t)}>Historial</h2>
    <div style={{display:"flex",gap:8,marginBottom:12}}>{[{l:"Total",v:history.length,c:t.text},{l:"W",v:history.filter(m=>m.result==="W").length,c:t.green},{l:"L",v:history.filter(m=>m.result==="L").length,c:t.red}].map(s=><div key={s.l} style={{flex:1,textAlign:"center",...ac(t)}}><p style={{color:s.c,fontSize:20,fontWeight:900,fontFamily:"'Orbitron',sans-serif"}}>{s.v}</p><p style={{color:t.sub,fontSize:10,marginTop:4}}>{s.l}</p></div>)}</div>
    {history.map(m=><button key={m.id} style={{...ac(t),width:"100%",cursor:"pointer",textAlign:"left"}} onClick={()=>setExp(exp===m.id?null:m.id)}><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:28,height:28,borderRadius:R,background:m.result==="W"?`${t.green}18`:`${t.red}18`,color:m.result==="W"?t.green:t.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,fontFamily:"'Orbitron',sans-serif"}}>{m.result}</div><div style={{flex:1}}><p style={{color:t.text,fontSize:14,fontWeight:600}}>vs {m.opponent}</p><p style={{color:t.sub,fontSize:11,marginTop:1}}>{m.date}</p></div><span style={{color:t.text,fontFamily:"'Orbitron',sans-serif",fontWeight:900}}>{m.sets[0]}–{m.sets[1]}</span></div>{exp===m.id&&m.games&&<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${t.border}`}}>{m.games.map((g,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0"}}><span style={{color:t.sub,fontSize:12}}>Set {i+1}</span><span style={{color:g.s[0]>g.s[1]?t.green:t.red,fontFamily:"'Orbitron',sans-serif",fontSize:13,fontWeight:700}}>{g.s[0]}–{g.s[1]}</span></div>)}</div>}</button>)}
  </div>);
}

function AppProfile({ user, history, mode, setMode, nav, onLogout, t }) {
  const w=history.filter(m=>m.result==="W").length; const pct=history.length?Math.round(w/history.length*100):0;
  return (<div style={aw}>
    <div style={{textAlign:"center",padding:"20px 0"}}><div style={{width:60,height:60,borderRadius:R,background:t.accent,display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:22,fontWeight:800}}>{user.name[0]}</div><h2 style={{color:t.text,marginTop:12}}>{user.name}</h2><p style={{color:t.sub,fontSize:13}}>{user.email}</p></div>
    <div style={{display:"flex",gap:8,marginBottom:12}}>{[{l:"Partidos",v:history.length},{l:"Win %",v:`${pct}%`}].map(s=><div key={s.l} style={{flex:1,textAlign:"center",...ac(t)}}><p style={{color:t.accentText,fontSize:18,fontWeight:800,fontFamily:"'Orbitron',sans-serif"}}>{s.v}</p><p style={{color:t.sub,fontSize:10,marginTop:4}}>{s.l}</p></div>)}</div>
    <div style={{...ac(t),display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><p style={{color:t.text,fontWeight:600,fontSize:14}}>Modo {mode==="dark"?"oscuro":"claro"}</p><p style={{color:t.sub,fontSize:11,marginTop:1}}>{mode==="dark"?"🌙":"☀️"} Apariencia</p></div><button onClick={()=>setMode(mode==="dark"?"light":"dark")} style={{width:48,height:26,borderRadius:13,border:"none",background:mode==="dark"?t.accent:t.border,position:"relative",cursor:"pointer"}}><div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:3,left:mode==="dark"?25:3,transition:"left .3s"}}/></button></div>
    <button style={{background:"none",border:"none",color:t.red,padding:"12px 0",fontSize:14,display:"block",width:"100%",textAlign:"center",marginTop:12,cursor:"pointer",fontFamily:"'Sora',sans-serif"}} onClick={onLogout}>Cerrar sesión</button>
  </div>);
}

// ─── App style helpers ──────────────────────────────
const aw = { padding: "16px 18px 20px" };
const at = (t) => ({ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:t.text, letterSpacing:2, marginBottom:4 });
const ac = (t) => ({ background:t.card, borderRadius:R, padding:"16px 18px", border:`1px solid ${t.border}`, marginBottom:8, fontFamily:"'Sora',sans-serif" });
const ai = (t) => ({ width:"100%", padding:"13px 16px", background:t.inputBg, border:`1px solid ${t.border}`, borderRadius:R, color:t.text, fontSize:14, marginBottom:10, fontFamily:"'Sora',sans-serif" });
const ab = (t) => ({ width:"100%", padding:14, background:t.accent, border:"none", borderRadius:R, color:"#fff", fontSize:14, fontWeight:700, fontFamily:"'Sora',sans-serif" });
