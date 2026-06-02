import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine,
} from "recharts";

/* ══════════════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════════════ */
const T = {
  bg:      "#04070f",
  surface: "#080d1e",
  card:    "#0b1229",
  border:  "#152040",
  dim:     "#0e1630",
  cases:   "#f97316",
  deaths:  "#ef4444",
  cfr:     "#c084fc",
  green:   "#22c55e",
  cyan:    "#22d3ee",
  yellow:  "#fbbf24",
  text:    "#e2e8f0",
  mid:     "#94a3b8",
  muted:   "#475569",
};

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const MONTHLY = [
  { m:"Mar'14", nc:55,   nd:20,   cc:55,    cd:20    },
  { m:"Apr'14", nc:155,  nd:58,   cc:210,   cd:78    },
  { m:"May'14", nc:200,  nd:75,   cc:410,   cd:153   },
  { m:"Jun'14", nc:380,  nd:140,  cc:790,   cd:293   },
  { m:"Jul'14", nc:690,  nd:255,  cc:1480,  cd:548   },
  { m:"Aug'14", nc:1680, nd:620,  cc:3160,  cd:1168  },
  { m:"Sep'14", nc:3400, nd:1250, cc:6560,  cd:2418  },
  { m:"Oct'14", nc:8200, nd:3030, cc:14760, cd:5448  },
  { m:"Nov'14", nc:4000, nd:1480, cc:18760, cd:6928  },
  { m:"Dec'14", nc:3500, nd:1295, cc:22260, cd:8223  },
  { m:"Jan'15", nc:1850, nd:685,  cc:24110, cd:8908  },
  { m:"Feb'15", nc:1400, nd:518,  cc:25510, cd:9426  },
  { m:"Mar'15", nc:980,  nd:363,  cc:26490, cd:9789  },
  { m:"Apr'15", nc:680,  nd:252,  cc:27170, cd:10041 },
  { m:"May'15", nc:480,  nd:178,  cc:27650, cd:10219 },
  { m:"Jun'15", nc:320,  nd:118,  cc:27970, cd:10337 },
  { m:"Jul'15", nc:195,  nd:72,   cc:28165, cd:10409 },
  { m:"Aug'15", nc:130,  nd:48,   cc:28295, cd:10457 },
  { m:"Sep'15", nc:95,   nd:35,   cc:28390, cd:10492 },
  { m:"Oct'15", nc:75,   nd:28,   cc:28465, cd:10520 },
  { m:"Nov'15", nc:60,   nd:22,   cc:28525, cd:10542 },
  { m:"Dec'15", nc:48,   nd:18,   cc:28573, cd:10560 },
  { m:"Jan'16", nc:32,   nd:12,   cc:28605, cd:10572 },
  { m:"Feb'16", nc:18,   nd:7,    cc:28623, cd:10579 },
  { m:"Mar'16", nc:8,    nd:3,    cc:28631, cd:10582 },
];

const COUNTRIES = [
  { name:"Sierra Leone", flag:"🇸🇱", cases:14124, deaths:3956, cfr:28.0, color:T.cases   },
  { name:"Liberia",      flag:"🇱🇷", cases:10678, deaths:4810, cfr:45.1, color:"#fb923c" },
  { name:"Guinea",       flag:"🇬🇳", cases:3814,  deaths:2543, cfr:66.7, color:T.deaths  },
  { name:"Nigeria",      flag:"🇳🇬", cases:20,    deaths:8,    cfr:40.0, color:T.cfr     },
  { name:"Mali",         flag:"🇲🇱", cases:8,     deaths:6,    cfr:75.0, color:"#e879f9" },
];

const PIE_DATA = [
  { name:"Sierra Leone", value:14124, color:T.cases    },
  { name:"Liberia",      value:10678, color:"#fb923c"  },
  { name:"Guinea",       value:3814,  color:T.deaths   },
  { name:"Others",       value:37,    color:T.muted    },
];

const DISTRICTS = [
  { name:"Montserrado",  country:"LBR", cases:4258, deaths:1745, cfr:41.0 },
  { name:"Western Area", country:"SLE", cases:3027, deaths:696,  cfr:23.0 },
  { name:"Port Loko",    country:"SLE", cases:1941, deaths:573,  cfr:29.5 },
  { name:"Margibi",      country:"LBR", cases:1831, deaths:762,  cfr:41.6 },
  { name:"Bo",           country:"SLE", cases:1459, deaths:348,  cfr:23.8 },
  { name:"Kenema",       country:"SLE", cases:1260, deaths:574,  cfr:45.6 },
  { name:"Bombali",      country:"SLE", cases:1325, deaths:432,  cfr:32.6 },
  { name:"Lofa",         country:"LBR", cases:1225, deaths:483,  cfr:39.4 },
  { name:"Conakry",      country:"GUI", cases:1145, deaths:548,  cfr:47.9 },
  { name:"Guéckédou",    country:"GUI", cases:980,  deaths:663,  cfr:67.7 },
];

const EVENTS = [
  { date:"Dec 2013",    text:"Index case, Guéckédou, Guinea",             type:"start"    },
  { date:"Mar 2014",    text:"WHO officially notified of outbreak",        type:"alert"    },
  { date:"May 2014",    text:"First cases confirmed in Sierra Leone",      type:"alert"    },
  { date:"Aug 8, 2014", text:"WHO declares Public Health Emergency (PHEIC)",type:"critical"},
  { date:"Oct 2014",    text:"Outbreak peaks — 8,200+ new cases in a month",type:"critical"},
  { date:"Oct 2014",    text:"Nigeria: transmission successfully halted",  type:"positive" },
  { date:"May 9, 2015", text:"Liberia declared Ebola-free (first time)",  type:"positive" },
  { date:"Nov 7, 2015", text:"Sierra Leone declared Ebola-free",          type:"positive" },
  { date:"Dec 29, 2015",text:"Guinea declared Ebola-free",                type:"positive" },
  { date:"Jun 2016",    text:"WHO officially ends the outbreak",           type:"end"      },
];

const COUNTRY_COLORS = { LBR:"#fb923c", SLE:T.cases, GUI:T.deaths };

/* ══════════════════════════════════════════════════════════════
   HOOKS & HELPERS
══════════════════════════════════════════════════════════════ */
function useCount(target, duration = 1800) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setV(Math.floor(current));
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return v;
}

/* ══════════════════════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════════════════════ */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <p style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 9,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: T.muted,
      marginBottom: 8,
    }}>{children}</p>
  );
}

function CardTitle({ children }) {
  return (
    <h3 style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontSize: 17,
      fontWeight: 700,
      color: T.text,
      marginBottom: 16,
      lineHeight: 1.2,
    }}>{children}</h3>
  );
}

const EpiTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:"#0b1229", border:`1px solid ${T.border}`,
      borderRadius:8, padding:"12px 16px", minWidth:180,
    }}>
      <p style={{ fontFamily:"'IBM Plex Mono'", fontSize:10, color:T.muted, marginBottom:8 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
          <div style={{ width:8, height:8, borderRadius:2, background: p.color || p.fill, flexShrink:0 }} />
          <span style={{ fontFamily:"'IBM Plex Mono'", fontSize:10, color:T.muted }}>{p.name}:</span>
          <span style={{ fontFamily:"'IBM Plex Mono'", fontSize:12, color:T.text, fontWeight:600 }}>
            {(p.value||0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════════ */
export default function EbolaDashboard() {
  const [view, setView] = useState("new");
  const totalCases  = useCount(28616);
  const totalDeaths = useCount(11310);
  const hcwCases    = useCount(886);
  const cntries     = useCount(10);

  const chartData = MONTHLY.map(d =>
    view === "new"
      ? { m:d.m, "New Cases":d.nc, "New Deaths":d.nd }
      : { m:d.m, "Cumulative Cases":d.cc, "Cumulative Deaths":d.cd }
  );

  return (
    <div style={{ background:T.bg, minHeight:"100vh", color:T.text, fontFamily:"'DM Sans', system-ui, sans-serif" }}>

      {/* ── GOOGLE FONTS + GLOBAL STYLES ─────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;900&family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${T.bg};}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px;}
        @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .blink{animation:blink 1s step-end infinite;}
        .mono{font-family:'IBM Plex Mono',monospace;}
        .barlow{font-family:'Barlow Condensed',sans-serif;}
        .fade-1{animation:fadeUp .5s ease-out .05s both;}
        .fade-2{animation:fadeUp .5s ease-out .15s both;}
        .fade-3{animation:fadeUp .5s ease-out .25s both;}
        .fade-4{animation:fadeUp .5s ease-out .35s both;}
        .fade-5{animation:fadeUp .5s ease-out .45s both;}
        .fade-6{animation:fadeUp .5s ease-out .55s both;}
        .fade-7{animation:fadeUp .5s ease-out .65s both;}
      `}</style>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header style={{
        background:T.surface, borderBottom:`1px solid ${T.border}`,
        padding:"0 24px", height:58,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ position:"relative", width:14, height:14, flexShrink:0 }}>
            <div style={{
              width:8, height:8, borderRadius:"50%", background:T.green,
              position:"absolute", top:3, left:3,
            }} className="blink" />
            <div style={{
              width:14, height:14, borderRadius:"50%",
              border:`1px solid ${T.green}55`, position:"absolute", top:0, left:0,
            }} />
          </div>
          <div>
            <div className="barlow" style={{ fontSize:22, fontWeight:900, letterSpacing:"0.04em", color:T.text, lineHeight:1 }}>
              EBOLA OUTBREAK MONITOR
            </div>
            <div className="mono" style={{ fontSize:8.5, color:T.muted, letterSpacing:"0.12em" }}>
              WEST AFRICA · 2014–2016 · WHO / CDC SURVEILLANCE DATA
            </div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          {/* Country status pills */}
          <div style={{ display:"flex", gap:6 }}>
            {[["🇬🇳 GUI","Dec '15"],["🇱🇷 LBR","Jan '16"],["🇸🇱 SLE","Nov '15"]].map(([f,d]) => (
              <div key={f} style={{
                background:"#0f1f0f", border:`1px solid ${T.green}33`,
                borderRadius:20, padding:"3px 10px",
                display:"flex", alignItems:"center", gap:6,
              }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:T.green }} />
                <span className="mono" style={{ fontSize:9, color:T.green }}>{f} — Ended {d}</span>
              </div>
            ))}
          </div>
          <div style={{ borderLeft:`1px solid ${T.border}`, paddingLeft:20 }}>
            <div className="mono" style={{ fontSize:8, color:T.muted }}>EPIDEMIC PERIOD</div>
            <div className="mono" style={{ fontSize:11, color:T.cyan }}>DEC 2013 — JUN 2016</div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <main style={{ padding:16, display:"flex", flexDirection:"column", gap:12 }}>

        {/* ── KPI ROW ──────────────────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>

          {[
            {
              label:"Total Confirmed + Probable", value:totalCases, color:T.cases,
              sub:"Ebola Cases Recorded", badge:"ALL COUNTRIES", cls:"fade-1",
            },
            {
              label:"Total Fatalities", value:totalDeaths, color:T.deaths,
              sub:"Deaths Recorded", badge:"CFR 39.5%", cls:"fade-2",
            },
            {
              label:"Healthcare Workers", value:hcwCases, color:T.yellow,
              sub:"HCW Infections", badge:"513 DEATHS", cls:"fade-3",
            },
            {
              label:"Geographic Spread", value:cntries, color:T.cyan,
              sub:"Countries Affected", badge:"3 EPICENTERS", cls:"fade-4",
            },
          ].map(({ label, value, color, sub, badge, cls }) => (
            <Card key={label} style={{ padding:20 }} >
              <div className={cls}>
                <Label>{label}</Label>
                <div className="barlow" style={{ fontSize:48, fontWeight:900, color, lineHeight:1, letterSpacing:"-0.01em" }}>
                  {value.toLocaleString()}
                </div>
                <div style={{ marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:T.muted }}>{sub}</span>
                  <span className="mono" style={{
                    fontSize:9, color, background:`${color}18`,
                    padding:"2px 8px", borderRadius:4, letterSpacing:"0.05em",
                  }}>{badge}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* ── EPIDEMIC CURVE + PIE ─────────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:12 }}>

          {/* Epidemic Curve */}
          <Card style={{ padding:"20px 20px 14px" }} >
            <div className="fade-5">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <div>
                  <Label>WHO Surveillance · Epidemic Progression</Label>
                  <CardTitle>
                    {view === "new" ? "Monthly New Cases & Deaths" : "Cumulative Totals Over Time"}
                  </CardTitle>
                </div>
                <div style={{ display:"flex", gap:4 }}>
                  {[["new","Monthly New"],["cumulative","Cumulative"]].map(([k,lbl]) => (
                    <button key={k} onClick={() => setView(k)} style={{
                      background: view===k ? `${T.cases}22` : "transparent",
                      border: `1px solid ${view===k ? T.cases : T.border}`,
                      color: view===k ? T.cases : T.muted,
                      borderRadius:6, padding:"4px 12px", fontSize:10,
                      cursor:"pointer", fontFamily:"'IBM Plex Mono',monospace",
                      letterSpacing:"0.04em", transition:"all .2s",
                    }}>{lbl}</button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={chartData} margin={{ top:4, right:4, bottom:0, left:-24 }}>
                  <defs>
                    <linearGradient id="gCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.cases}  stopOpacity={0.35} />
                      <stop offset="95%" stopColor={T.cases}  stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gDeaths" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={T.deaths} stopOpacity={0.45} />
                      <stop offset="95%" stopColor={T.deaths} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis dataKey="m" tick={{ fill:T.muted, fontSize:8.5, fontFamily:"'IBM Plex Mono'" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill:T.muted, fontSize:8.5, fontFamily:"'IBM Plex Mono'" }} tickLine={false} axisLine={false}
                    tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip content={<EpiTooltip />} />
                  {view === "new" && (
                    <>
                      <ReferenceLine x="Oct'14" stroke={T.cases}  strokeDasharray="4 3" strokeOpacity={0.5}
                        label={{ value:"▲ PEAK", fill:T.cases,  fontSize:8, fontFamily:"'IBM Plex Mono'", position:"top" }} />
                      <ReferenceLine x="Aug'14" stroke={T.yellow} strokeDasharray="4 3" strokeOpacity={0.5}
                        label={{ value:"PHEIC",  fill:T.yellow, fontSize:8, fontFamily:"'IBM Plex Mono'", position:"top" }} />
                    </>
                  )}
                  {view === "new" ? (
                    <>
                      <Area type="monotone" dataKey="New Cases"  stroke={T.cases}  strokeWidth={2} fill="url(#gCases)"  />
                      <Area type="monotone" dataKey="New Deaths" stroke={T.deaths} strokeWidth={2} fill="url(#gDeaths)" />
                    </>
                  ) : (
                    <>
                      <Area type="monotone" dataKey="Cumulative Cases"  stroke={T.cases}  strokeWidth={2} fill="url(#gCases)"  />
                      <Area type="monotone" dataKey="Cumulative Deaths" stroke={T.deaths} strokeWidth={2} fill="url(#gDeaths)" />
                    </>
                  )}
                </AreaChart>
              </ResponsiveContainer>

              <div style={{ display:"flex", gap:20, marginTop:8, flexWrap:"wrap" }}>
                {[
                  { color:T.cases,  dashed:false, label: view==="new" ? "New Cases"  : "Cumulative Cases"  },
                  { color:T.deaths, dashed:false, label: view==="new" ? "New Deaths" : "Cumulative Deaths" },
                  ...(view==="new" ? [
                    { color:T.cases,  dashed:true, label:"Peak — Oct 2014" },
                    { color:T.yellow, dashed:true, label:"WHO PHEIC Declared" },
                  ] : []),
                ].map(({ color, dashed, label }) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{
                      width:20, height:2,
                      background: dashed ? "none" : color,
                      borderTop: dashed ? `1.5px dashed ${color}` : "none",
                      opacity: dashed ? 0.7 : 1,
                    }} />
                    <span className="mono" style={{ fontSize:9, color:T.muted }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Country Pie */}
          <Card style={{ padding:20 }}>
            <div className="fade-6">
              <Label>Case Distribution · By Country</Label>
              <CardTitle>Epicenter Breakdown</CardTitle>

              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value">
                    {PIE_DATA.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
                  </Pie>
                  <Tooltip
                    formatter={v => v.toLocaleString()}
                    contentStyle={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'IBM Plex Mono'", fontSize:11 }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Donut center label */}
              <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:8 }}>
                {PIE_DATA.map(d => {
                  const pct = ((d.value / 28616) * 100).toFixed(1);
                  return (
                    <div key={d.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:8, height:8, borderRadius:2, background:d.color, flexShrink:0 }} />
                      <span style={{ fontSize:12, color:T.text, flex:1 }}>{d.name}</span>
                      <span className="mono" style={{ fontSize:11, color:d.color, fontWeight:600 }}>{pct}%</span>
                      <span className="mono" style={{ fontSize:10, color:T.muted, minWidth:50, textAlign:"right" }}>
                        {d.value.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* ── COUNTRY BAR CHART + CFR ──────────────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:12 }}>

          {/* Horizontal bar chart */}
          <Card style={{ padding:"20px 20px 14px" }}>
            <div className="fade-5">
              <Label>Country Epidemiological Breakdown · All Confirmed Cases</Label>
              <CardTitle>Cases & Deaths by Country</CardTitle>

              <ResponsiveContainer width="100%" height={190}>
                <BarChart
                  layout="vertical"
                  data={COUNTRIES.map(c => ({ name:c.name, Cases:c.cases, Deaths:c.deaths }))}
                  margin={{ left:4, right:20, top:0, bottom:0 }}
                  barCategoryGap="30%"
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
                  <XAxis type="number" tick={{ fill:T.muted, fontSize:8.5, fontFamily:"'IBM Plex Mono'" }}
                    tickLine={false} axisLine={false}
                    tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <YAxis type="category" dataKey="name"
                    tick={{ fill:T.text, fontSize:11 }}
                    tickLine={false} axisLine={false} width={85} />
                  <Tooltip content={<EpiTooltip />} />
                  <Bar dataKey="Cases"  fill={T.cases}  radius={[0,4,4,0]} fillOpacity={0.85} />
                  <Bar dataKey="Deaths" fill={T.deaths} radius={[0,4,4,0]} fillOpacity={0.85} />
                </BarChart>
              </ResponsiveContainer>

              <div style={{ display:"flex", gap:20, marginTop:8 }}>
                {[["Cases", T.cases],["Deaths", T.deaths]].map(([lbl,clr]) => (
                  <div key={lbl} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:12, height:12, borderRadius:3, background:clr }} />
                    <span className="mono" style={{ fontSize:9, color:T.muted }}>Total {lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* CFR by country */}
          <Card style={{ padding:20 }}>
            <div className="fade-6">
              <Label>Case Fatality Rate · Country Comparison</Label>
              <CardTitle>CFR Analysis</CardTitle>

              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {COUNTRIES.map(c => {
                  const clr = c.cfr > 60 ? T.deaths : c.cfr > 40 ? T.cases : T.yellow;
                  return (
                    <div key={c.name}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:12, color:T.text }}>{c.flag} {c.name}</span>
                        <span className="mono" style={{ fontSize:13, color:clr, fontWeight:600 }}>
                          {c.cfr.toFixed(1)}%
                        </span>
                      </div>
                      <div style={{ height:7, background:T.border, borderRadius:4, overflow:"hidden" }}>
                        <div style={{
                          height:"100%", width:`${c.cfr}%`, background:clr,
                          borderRadius:4, transition:"width 1.2s ease-out",
                        }} />
                      </div>
                    </div>
                  );
                })}

                <div style={{
                  marginTop:4, paddingTop:14,
                  borderTop:`1px solid ${T.border}`,
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                }}>
                  <div>
                    <div className="mono" style={{ fontSize:9, color:T.muted }}>OVERALL CFR</div>
                    <div style={{ fontSize:11, color:T.mid }}>28,616 cases · 11,310 deaths</div>
                  </div>
                  <div className="barlow" style={{ fontSize:36, fontWeight:900, color:T.cfr }}>
                    39.5%
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── DISTRICT TABLE + EVENTS TIMELINE ─────────────── */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:12 }}>

          {/* District table */}
          <Card style={{ padding:0, overflow:"hidden" }}>
            <div style={{ padding:"20px 20px 14px", borderBottom:`1px solid ${T.border}` }}>
              <Label>Sub-national Analysis · Hotspot Districts</Label>
              <CardTitle style={{ marginBottom:0 }}>Top 10 Affected Districts</CardTitle>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead>
                  <tr style={{ background:T.dim }}>
                    {["Rank","District","Country","Cases","Deaths","CFR","Severity"].map(h => (
                      <th key={h} style={{
                        padding:"9px 14px", textAlign:"left",
                        fontFamily:"'IBM Plex Mono',monospace", fontSize:8.5,
                        letterSpacing:"0.1em", color:T.muted,
                        textTransform:"uppercase", fontWeight:500,
                        borderBottom:`1px solid ${T.border}`,
                        whiteSpace:"nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DISTRICTS.map((d, i) => {
                    const severity = d.cfr > 60 ? "EXTREME" : d.cfr > 40 ? "HIGH" : d.cfr > 25 ? "MODERATE" : "ELEVATED";
                    const sc = d.cfr > 60 ? T.deaths : d.cfr > 40 ? T.cases : T.yellow;
                    const cc = COUNTRY_COLORS[d.country] || T.muted;
                    return (
                      <tr key={d.name} style={{
                        borderBottom:`1px solid ${T.border}`,
                        background: i % 2 === 0 ? "transparent" : `${T.dim}80`,
                      }}>
                        <td style={{ padding:"9px 14px" }}>
                          <span className="mono" style={{ fontSize:10, color:T.muted }}>#{String(i+1).padStart(2,"0")}</span>
                        </td>
                        <td style={{ padding:"9px 14px", color:T.text, fontWeight:500 }}>{d.name}</td>
                        <td style={{ padding:"9px 14px" }}>
                          <span className="mono" style={{
                            fontSize:9, color:cc, background:`${cc}18`,
                            padding:"2px 7px", borderRadius:4,
                          }}>{d.country}</span>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <span className="mono" style={{ fontSize:12, color:T.cases, fontWeight:600 }}>
                            {d.cases.toLocaleString()}
                          </span>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <span className="mono" style={{ fontSize:12, color:T.deaths, fontWeight:600 }}>
                            {d.deaths.toLocaleString()}
                          </span>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <span className="mono" style={{ fontSize:13, color:sc, fontWeight:700 }}>
                            {d.cfr.toFixed(1)}%
                          </span>
                        </td>
                        <td style={{ padding:"9px 14px" }}>
                          <span className="mono" style={{
                            fontSize:8.5, color:sc,
                            border:`1px solid ${sc}44`,
                            padding:"2px 8px", borderRadius:4,
                            letterSpacing:"0.06em",
                          }}>{severity}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Key Events Timeline */}
          <Card style={{ padding:20 }}>
            <Label>Epidemic Milestones · Chronological</Label>
            <CardTitle>Key Events Timeline</CardTitle>

            <div style={{ position:"relative", paddingLeft:16 }}>
              {/* vertical spine */}
              <div style={{
                position:"absolute", left:5, top:6, bottom:6,
                width:1, background:`linear-gradient(to bottom, ${T.border}, ${T.green}55)`,
              }} />

              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {EVENTS.map((e, i) => {
                  const dotClr = e.type==="critical" ? T.deaths
                    : e.type==="positive" ? T.green
                    : e.type==="alert"    ? T.yellow
                    : e.type==="end"      ? T.cyan
                    : T.muted;
                  return (
                    <div key={i} style={{ position:"relative", paddingLeft:18 }}>
                      <div style={{
                        position:"absolute", left:-11, top:4,
                        width:9, height:9, borderRadius:"50%",
                        background:dotClr, boxShadow:`0 0 8px ${dotClr}66`,
                        flexShrink:0,
                      }} />
                      <div className="mono" style={{ fontSize:8.5, color:T.muted, marginBottom:2 }}>
                        {e.date}
                      </div>
                      <div style={{ fontSize:11.5, color: e.type==="critical" ? T.text : T.mid, lineHeight:1.4 }}>
                        {e.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HCW callout */}
            <div style={{
              marginTop:20, padding:12,
              background:`${T.yellow}12`, border:`1px solid ${T.yellow}33`,
              borderRadius:8,
            }}>
              <div className="mono" style={{ fontSize:8, color:T.yellow, letterSpacing:"0.1em", marginBottom:4 }}>
                HEALTHCARE WORKER TOLL
              </div>
              <div style={{ fontSize:11, color:T.mid, lineHeight:1.5 }}>
                <span className="mono" style={{ color:T.yellow, fontWeight:600 }}>886</span> HCW infections ·{" "}
                <span className="mono" style={{ color:T.deaths, fontWeight:600 }}>513</span> deaths.
                HCW infection rate was significantly higher than the general population.
              </div>
            </div>
          </Card>
        </div>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <div style={{
          borderTop:`1px solid ${T.border}`,
          paddingTop:10,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          flexWrap:"wrap",
          gap:8,
        }}>
          <span className="mono" style={{ fontSize:8.5, color:T.muted }}>
            SOURCES: WHO EBOLA SITUATION REPORTS · CDC MMWR · HUMANITARIAN DATA EXCHANGE (HDX) · NEJM 2014 ·
            MONTHLY DATA APPROXIMATE — FOR ANALYTICAL VISUALIZATION PURPOSES
          </span>
          <span className="mono" style={{ fontSize:8.5, color:T.muted }}>GENERATED MAY 2026</span>
        </div>

      </main>
    </div>
  );
}
