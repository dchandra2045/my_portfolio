import { useState, useEffect, useRef } from "react";
import profile from "./assets/dchandra-Photo.jpg";

const NAV = ["Home", "About", "Experience", "Projects", "Skills", "Certifications", "Contact"];

const EXPERIENCES = [
  {
    role: "DSA Intern",
    company: "Coding Block",
    place: "GTH Geeta University",
    period: "June 2025 – Aug 2025",
    icon: "🧠",
    color: "#f59e0b",
    points: [
      "Solved complex algorithmic problems and optimized data structures",
      "Enhanced coding efficiency through hands-on DSA practice",
    ],
  },
  {
    role: "Algorithm & DSA Intern",
    company: "Geeta Technical Hub",
    place: "Geeta University Panipat",
    period: "June 2024 – Aug 2024",
    icon: "⚙️",
    color: "#10b981",
    points: [
      "Implemented efficient algorithms to optimize performance",
      "Solved coding challenges and improved problem-solving skills",
    ],
  },
  {
    role: "Frontend Intern",
    company: "TechGyan",
    place: "IIT Bombay",
    period: "June 2023 – Aug 2023",
    icon: "🚀",
    color: "#3b82f6",
    points: [
      "Developed responsive web projects with frontend technologies",
      "Integrated APIs, optimized performance, and collaborated using Git in Agile environment",
    ],
  },
];

const PROJECTS = [
  {
    title: "Real Time Communication System",
    period: "Aug 2025 – Present",
    desc: "A real-time communication platform enabling instant messaging and live data exchange using WebSockets and modern backend architecture.",
    tags: ["Node.js", "WebSockets", "React", "MongoDB"],
    icon: "📡",
    accent: "#f59e0b",
    status: "Live",
  },
  {
    title: "Bharat Meet",
    period: "Jan 2025 – Jun 2025",
    desc: "A video conferencing application built for seamless virtual meetings with multi-user support, screen sharing, and real-time chat.",
    tags: ["WebRTC", "React", "Node.js", "Socket.io"],
    icon: "🎥",
    accent: "#10b981",
    status: "Completed",
  },
  {
    title: "Telemedicine: Virtual Healthcare",
    period: "Aug 2024 – Dec 2024",
    desc: "A full-stack telemedicine platform connecting patients with doctors for virtual consultations, prescriptions, and appointment scheduling.",
    tags: ["MERN Stack", "JWT", "REST API", "Tailwind"],
    icon: "🏥",
    accent: "#3b82f6",
    status: "Completed",
  },
];

const TECH_SKILLS = [
  { name: "MERN Stack", level: 82, icon: "⚛️" },
  { name: "JavaScript", level: 85, icon: "🟨" },
  { name: "Python", level: 78, icon: "🐍" },
  { name: "Java", level: 75, icon: "☕" },
  { name: "C / C++", level: 80, icon: "⚙️" },
  { name: "Data Structures & Algo", level: 88, icon: "🧠" },
  { name: "Cloud Computing", level: 70, icon: "☁️" },
  { name: "Linux", level: 72, icon: "🐧" },
];

const OTHER_SKILLS = [
  "Computer Networking", "WordPress", "OOP", "Operating Systems",
  "Git & GitHub", "REST APIs", "Agile / Scrum", "DevOps Basics",
];

const CERTS = [
  { name: "Philosophy & Critical Thinking", org: "NPTEL", date: "May 2024", icon: "🎓" },
  { name: "Design Thinking", org: "NPTEL", date: "Sep 2023", icon: "💡" },
  { name: "Website Development using WordPress", org: "Coursera", date: "Nov 2024", icon: "🌐" },
  { name: "Network Support & Security", org: "CISCO", date: "Mar 2024", icon: "🔒" },
];

const SOFT_SKILLS = ["Collaboration", "Problem-Solving", "Teamwork", "Attention to Detail", "Multitasking", "Adaptability"];
const LANGUAGES = ["English", "Hindi", "Bhojpuri", "Maithili"];
const INTERESTS = ["Geo-Politics & International Relations", "Playing Cricket", "Sudoku Challenges", "Reading Financial Books"];

function useVisible(ref, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const v = useVisible(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function SkillBar({ skill, delay }) {
  const ref = useRef(null);
  const v = useVisible(ref);
  return (
    <div ref={ref} style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "0.88rem", color: "#e2e8f0", fontWeight: 600 }}>{skill.icon} {skill.name}</span>
        <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#f59e0b" }}>{skill.level}%</span>
      </div>
      <div style={{ height: "5px", background: "#1e293b", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #f59e0b, #ef4444)",
          borderRadius: "3px",
          width: v ? `${skill.level}%` : "0%",
          transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${delay}s`
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [typed, setTyped] = useState("");
  const [cursor, setCursor] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const roles = ["Software Developer", "MERN Stack Engineer", "DSA Problem Solver", "Full-Stack Developer"];
  const rIdx = useRef(0), cIdx = useRef(0), del = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const cur = roles[rIdx.current];
      if (!del.current) {
        setTyped(cur.slice(0, cIdx.current + 1));
        cIdx.current++;
        if (cIdx.current === cur.length) del.current = true;
      } else {
        setTyped(cur.slice(0, cIdx.current - 1));
        cIdx.current--;
        if (cIdx.current === 0) { del.current = false; rIdx.current = (rIdx.current + 1) % roles.length; }
      }
    }, del.current ? 55 : 95);
    return () => clearTimeout(t);
  }, [typed]);

  const scrollTo = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };

  const submit = () => {
    if (form.name && form.email && form.message) {
      setSent(true); setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{background:#060a14;color:#e2e8f0;font-family:'Outfit',sans-serif;overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-thumb{background:#f59e0b;border-radius:2px}

    .nav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(6,10,20,0.92);backdrop-filter:blur(16px);border-bottom:1px solid rgba(245,158,11,0.1);padding:1rem 2.5rem;display:flex;justify-content:space-between;align-items:center}
    .logo{font-family:'JetBrains Mono',monospace;font-size:1rem;color:#f59e0b;letter-spacing:-0.5px}
    .logo span{color:#ef4444}
    .nav-links{display:flex;gap:1.8rem;list-style:none}
    .nav-links a{font-size:0.78rem;letter-spacing:1.5px;text-transform:uppercase;color:#64748b;cursor:pointer;transition:color 0.2s;font-family:'JetBrains Mono',monospace}
    .nav-links a:hover{color:#f59e0b}
    .hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none}
    .hbg span{display:block;width:22px;height:2px;background:#e2e8f0;transition:all 0.3s}
    .mob-menu{display:none;position:fixed;top:64px;left:0;right:0;background:rgba(6,10,20,0.98);backdrop-filter:blur(16px);padding:1.5rem 2rem;z-index:199;border-bottom:1px solid rgba(245,158,11,0.1)}
    .mob-menu.open{display:block}
    .mob-menu a{display:block;padding:0.75rem 0;font-family:'JetBrains Mono',monospace;font-size:0.82rem;letter-spacing:2px;text-transform:uppercase;color:#64748b;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.04)}
    .mob-menu a:hover{color:#f59e0b}

    .hero{min-height:100vh;display:flex;align-items:center;padding:7rem 2.5rem 4rem;position:relative;overflow:hidden}
    .hero-mesh{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 20% 50%,rgba(245,158,11,0.07) 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 80% 20%,rgba(239,68,68,0.06) 0%,transparent 60%);pointer-events:none}
    .hero-lines{position:absolute;inset:0;background-image:repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(245,158,11,0.04) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(245,158,11,0.04) 80px);pointer-events:none}
    .hero-inner{max-width:1100px;margin:0 auto;width:100%;display:grid;grid-template-columns:1.2fr 0.8fr;gap:4rem;align-items:center}
    .chip{display:inline-flex;align-items:center;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;color:#f59e0b;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);padding:0.35rem 1rem;border-radius:2px;margin-bottom:1.5rem}
    .dot{width:6px;height:6px;border-radius:50%;background:#f59e0b;animation:pulse 1.5s infinite}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
    .hero-name{font-size:clamp(2.2rem,5.5vw,4rem);font-weight:800;line-height:1.08;color:#f8fafc;margin-bottom:0.5rem}
    .hero-name em{font-style:normal;color:#f59e0b}
    .hero-role{font-family:'JetBrains Mono',monospace;font-size:clamp(0.9rem,2vw,1.2rem);color:#ef4444;margin-bottom:1.5rem;min-height:1.8rem}
    .blink{display:inline-block;width:2px;height:1em;background:#f59e0b;margin-left:2px;vertical-align:middle}
    .hero-summary{color:#64748b;line-height:1.85;font-size:0.95rem;max-width:500px;margin-bottom:2.5rem}
    .btns{display:flex;gap:1rem;flex-wrap:wrap}
    .btn-a{background:#f59e0b;color:#060a14;font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:0.8rem 1.8rem;border:none;border-radius:2px;cursor:pointer;transition:all 0.2s}
    .btn-a:hover{background:#d97706;transform:translateY(-2px);box-shadow:0 8px 24px rgba(245,158,11,0.25)}
    .btn-b{background:transparent;color:#e2e8f0;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:1px;text-transform:uppercase;padding:0.8rem 1.8rem;border:1px solid rgba(226,232,240,0.15);border-radius:2px;cursor:pointer;transition:all 0.2s}
    .btn-b:hover{border-color:#f59e0b;color:#f59e0b;transform:translateY(-2px)}
    .stat-row{display:flex;gap:2.5rem;margin-top:2.5rem;flex-wrap:wrap}
    .stat-n{font-family:'JetBrains Mono',monospace;font-size:1.5rem;font-weight:700;color:#f59e0b}
    .stat-l{font-size:0.7rem;letter-spacing:1px;text-transform:uppercase;color:#334155;margin-top:2px}
    .hero-card{background:linear-gradient(135deg,#0d1525,#111827);border:1px solid rgba(245,158,11,0.12);border-radius:8px;padding:2rem;position:relative;overflow:hidden}
    .hero-card::before{content:'';position:absolute;top:-30px;right:-30px;width:100px;height:100px;border-radius:50%;background:rgba(245,158,11,0.06);pointer-events:none}
    .avatar-big{font-size:5rem;text-align:center;margin-bottom:1.5rem;display:block}
    .hero-card-name{font-size:1.1rem;font-weight:700;color:#f8fafc;text-align:center;margin-bottom:0.3rem}
    .hero-card-sub{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#f59e0b;text-align:center;letter-spacing:1px;margin-bottom:1.5rem}
    .hero-card-info{display:flex;flex-direction:column;gap:0.7rem}
    .hci{display:flex;align-items:center;gap:0.7rem;font-size:0.8rem;color:#64748b}
    .hci-icon{font-size:0.9rem}

    .sec{padding:6rem 2.5rem}
    .sec-dark{background:#080e1a}
    .inner{max-width:1100px;margin:0 auto}
    .sec-label{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:3px;text-transform:uppercase;color:#f59e0b;margin-bottom:0.6rem}
    .sec-title{font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:800;color:#f8fafc;margin-bottom:0.8rem}
    .sec-title span{color:#f59e0b}
    .divider{width:50px;height:3px;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:2px;margin-bottom:3rem}

    .exp-grid{display:flex;flex-direction:column;gap:1.5rem}
    .exp-card{background:#0d1525;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:1.8rem;display:flex;gap:1.5rem;transition:all 0.3s;position:relative;overflow:hidden}
    .exp-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--acc);border-radius:3px 0 0 3px}
    .exp-card:hover{border-color:rgba(245,158,11,0.15);transform:translateX(4px)}
    .exp-icon{width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08)}
    .exp-role{font-size:1rem;font-weight:700;color:#f8fafc;margin-bottom:0.2rem}
    .exp-co{font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:#f59e0b;margin-bottom:0.2rem}
    .exp-place{font-size:0.78rem;color:#475569;margin-bottom:0.8rem}
    .exp-period{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:1px;color:#334155;background:#111827;padding:0.2rem 0.6rem;border-radius:2px;display:inline-block;margin-bottom:0.8rem}
    .exp-points{list-style:none;display:flex;flex-direction:column;gap:0.4rem}
    .exp-points li{font-size:0.82rem;color:#64748b;padding-left:1rem;position:relative}
    .exp-points li::before{content:'▸';position:absolute;left:0;color:#f59e0b;font-size:0.7rem}

    .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
    .proj-card{background:#0d1525;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:1.8rem;transition:all 0.3s;position:relative;overflow:hidden}
    .proj-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:left;transition:transform 0.3s}
    .proj-card:hover::after{transform:scaleX(1)}
    .proj-card:hover{border-color:rgba(245,158,11,0.12);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.4)}
    .proj-icon{font-size:2rem;margin-bottom:1rem}
    .proj-status{font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:1px;text-transform:uppercase;padding:0.2rem 0.6rem;border-radius:2px;display:inline-block;margin-bottom:0.8rem}
    .status-live{background:rgba(16,185,129,0.1);color:#10b981;border:1px solid rgba(16,185,129,0.2)}
    .status-done{background:rgba(100,116,139,0.1);color:#64748b;border:1px solid rgba(100,116,139,0.2)}
    .proj-title{font-size:1rem;font-weight:700;color:#f8fafc;margin-bottom:0.5rem}
    .proj-period{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#334155;margin-bottom:0.7rem}
    .proj-desc{font-size:0.82rem;color:#64748b;line-height:1.7;margin-bottom:1.2rem}
    .proj-tags{display:flex;flex-wrap:wrap;gap:0.4rem}
    .tag{font-family:'JetBrains Mono',monospace;font-size:0.62rem;padding:0.2rem 0.55rem;border-radius:2px;background:rgba(245,158,11,0.06);color:#b45309;border:1px solid rgba(245,158,11,0.12)}

    .skills-wrap{display:grid;grid-template-columns:1fr 1fr;gap:4rem}
    .other-grid{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:0.5rem}
    .other-pill{font-size:0.78rem;padding:0.4rem 1rem;border-radius:100px;background:#0d1525;border:1px solid rgba(255,255,255,0.07);color:#94a3b8;transition:all 0.2s}
    .other-pill:hover{border-color:rgba(245,158,11,0.3);color:#f59e0b}
    .soft-grid{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.5rem}
    .soft-pill{font-size:0.78rem;padding:0.35rem 0.9rem;border-radius:100px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);color:#fca5a5}

    .cert-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem}
    .cert-card{background:#0d1525;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:1.4rem;display:flex;gap:1rem;align-items:flex-start;transition:all 0.25s}
    .cert-card:hover{border-color:rgba(245,158,11,0.15);transform:translateY(-2px)}
    .cert-ico{width:40px;height:40px;border-radius:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
    .cert-name{font-size:0.88rem;font-weight:600;color:#e2e8f0;margin-bottom:0.2rem}
    .cert-org{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#f59e0b}
    .cert-date{font-size:0.7rem;color:#475569;margin-top:0.2rem}

    .edu-grid{display:flex;flex-direction:column;gap:1.2rem;margin-top:2rem}
    .edu-item{background:#0d1525;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:1.4rem;display:flex;gap:1.2rem;align-items:center}
    .edu-icon{font-size:1.8rem}
    .edu-deg{font-size:0.95rem;font-weight:700;color:#f8fafc}
    .edu-school{font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#f59e0b;margin-top:0.2rem}
    .edu-yr{font-size:0.72rem;color:#475569;margin-top:0.2rem}

    .contact-wrap{display:grid;grid-template-columns:1fr 1.4fr;gap:4rem}
    .ci-item{display:flex;align-items:center;gap:1rem;margin-bottom:1.2rem}
    .ci-icon{width:38px;height:38px;border-radius:8px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
    .ci-text{font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:#94a3b8}
    .socials{display:flex;gap:0.8rem;margin-top:1.8rem;flex-wrap:wrap}
    .soc-btn{padding:0.45rem 1rem;border-radius:2px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);font-family:'JetBrains Mono',monospace;font-size:0.68rem;letter-spacing:1px;color:#64748b;cursor:pointer;transition:all 0.2s;text-transform:uppercase}
    .soc-btn:hover{border-color:rgba(245,158,11,0.3);color:#f59e0b}
    .cf{display:flex;flex-direction:column;gap:1rem}
    .flabel{font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:1px;text-transform:uppercase;color:#334155;margin-bottom:4px}
    .finput{background:#0d1525;border:1px solid rgba(255,255,255,0.07);border-radius:3px;padding:0.75rem 1rem;color:#e2e8f0;font-family:'Outfit',sans-serif;font-size:0.88rem;outline:none;transition:border-color 0.2s;width:100%}
    .finput:focus{border-color:rgba(245,158,11,0.35)}
    .finput::placeholder{color:#1e293b}
    textarea.finput{resize:vertical;min-height:110px}
    .success{background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);color:#10b981;padding:0.75rem;border-radius:3px;font-family:'JetBrains Mono',monospace;font-size:0.75rem;text-align:center}

    .footer{padding:1.8rem 2.5rem;border-top:1px solid rgba(255,255,255,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
    .footer-text{font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:#1e293b;letter-spacing:1px}
    .footer-text span{color:#f59e0b}

    .interests-row{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1rem}
    .int-pill{font-size:0.78rem;padding:0.35rem 0.9rem;border-radius:100px;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);color:#93c5fd}
    .lang-row{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:0.5rem}
    .lang-pill{font-size:0.78rem;padding:0.35rem 0.9rem;border-radius:100px;background:#0d1525;border:1px solid rgba(255,255,255,0.07);color:#94a3b8}

    @media(max-width:900px){
      .hero-inner{grid-template-columns:1fr}
      .hero-card{display:none}
      .proj-grid{grid-template-columns:1fr}
      .skills-wrap{grid-template-columns:1fr;gap:2.5rem}
      .cert-grid{grid-template-columns:1fr}
      .contact-wrap{grid-template-columns:1fr;gap:2.5rem}
      .sec{padding:4rem 1.5rem}
    }
    @media(max-width:768px){
      .nav-links{display:none}
      .hbg{display:flex}
    }
    @keyframes fadeIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
    .hero-left{animation:fadeIn 0.8s ease both}
    .hero-right{animation:fadeIn 0.8s ease 0.2s both}
  `;

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo">&lt;<span>D</span>ularchandra.dev /&gt;</div>
        <ul className="nav-links">
          {NAV.map(n => <li key={n}><a onClick={() => scrollTo(n)}>{n}</a></li>)}
        </ul>
        <button className="hbg" onClick={() => setMenu(m => !m)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mob-menu ${menu ? "open" : ""}`}>
        {NAV.map(n => <a key={n} onClick={() => scrollTo(n)}>{n}</a>)}
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-mesh" /><div className="hero-lines" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="chip"><span className="dot" />Open to Work</div>
            <h1 className="hero-name">Dularchandra<br /><em>Kumar</em></h1>
            <div className="hero-role">
              {typed}<span className="blink" style={{ opacity: cursor ? 1 : 0 }} />
            </div>
            <p className="hero-summary">
              Software Developer with expertise in designing and optimizing scalable applications. Proficient in Python, Java, JavaScript, C++, and experienced with MERN Stack, cloud computing, and DevOps. Strong DSA foundations with 3 internships at IIT Bombay, Geeta University & Coding Block.
            </p>
            <div className="btns">
              <button className="btn-a" onClick={() => scrollTo("Projects")}>View Projects</button>
              <button className="btn-b" onClick={() => scrollTo("Contact")}>Contact Me</button>
            </div>
            <div className="stat-row">
              {[["3+", "Internships"], ["3", "Projects"], ["4+", "Certifications"], ["4", "Languages"]].map(([n, l]) => (
                <div key={l}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <img
                src={profile}
                alt="Dularchandra Kumar"
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto 1.5rem",
                  border: "3px solid #f59e0b",
                  boxShadow: "0 0 25px rgba(245,158,11,0.35)"
                }}
              />
              <div className="hero-card-name">Dularchandra Kumar</div>
              <div className="hero-card-sub">Software Developer</div>
              <div className="hero-card-info">
                {[["📍", "Begusarai, Bihar"], ["📧", "dchandra2045@gmail.com"], ["📱", "+91 82986 22628"], ["🎓", "B.Tech CSE | Geeta University"], ["📅", "Graduating 2026"]].map(([ic, tx]) => (
                  <div className="hci" key={tx}><span className="hci-icon">{ic}</span><span>{tx}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="sec sec-dark">
        <div className="inner">
          <Reveal><div className="sec-label">// Work History</div></Reveal>
          <Reveal delay={0.05}><h2 className="sec-title">Professional <span>Experience</span></h2></Reveal>
          <Reveal delay={0.1}><div className="divider" /></Reveal>
          <div className="exp-grid">
            {EXPERIENCES.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <div className="exp-card" style={{ "--acc": e.color }}>
                  <div className="exp-icon">{e.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-co">{e.company}</div>
                    <div className="exp-place">{e.place}</div>
                    <div className="exp-period">{e.period}</div>
                    <ul className="exp-points">
                      {e.points.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education */}
          <Reveal delay={0.1} style={{ marginTop: "4rem" }}>
            <div className="sec-label" style={{ marginTop: "4rem" }}>// Education</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.5rem" }}>Academic <span style={{ color: "#f59e0b" }}>Background</span></h3>
          </Reveal>
          <div className="edu-grid">
            {[
              { icon: "🎓", deg: "B.Tech in Computer Science & Engineering", school: "Geeta University", yr: "2022 – 2026" },
              { icon: "📚", deg: "Intermediate (12th)", school: "M.R.J.D Inter College, Begusarai", yr: "2019 – 2021" },
            ].map((e, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="edu-item">
                  <span className="edu-icon">{e.icon}</span>
                  <div>
                    <div className="edu-deg">{e.deg}</div>
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-yr">{e.yr}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="sec">
        <div className="inner">
          <Reveal><div className="sec-label">// What I've Built</div></Reveal>
          <Reveal delay={0.05}><h2 className="sec-title">Featured <span>Projects</span></h2></Reveal>
          <Reveal delay={0.1}><div className="divider" /></Reveal>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="proj-card" style={{ "--acc": p.accent }}>
                  <div className="proj-icon">{p.icon}</div>
                  <span className={`proj-status ${p.status === "Live" ? "status-live" : "status-done"}`}>
                    {p.status === "Live" ? "● Live" : "✓ Completed"}
                  </span>
                  <div className="proj-title">{p.title}</div>
                  <div className="proj-period">{p.period}</div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="sec sec-dark">
        <div className="inner">
          <Reveal><div className="sec-label">// Technical Expertise</div></Reveal>
          <Reveal delay={0.05}><h2 className="sec-title">My <span>Skills</span></h2></Reveal>
          <Reveal delay={0.1}><div className="divider" /></Reveal>
          <div className="skills-wrap">
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "1.5rem" }}>// Proficiency</p>
              {TECH_SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} delay={i * 0.08} />)}
            </div>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "1rem" }}>// Other Technologies</p>
              <div className="other-grid">
                {OTHER_SKILLS.map(s => <span className="other-pill" key={s}>{s}</span>)}
              </div>
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "0.5rem", marginTop: "2rem" }}>// Soft Skills</p>
              <div className="soft-grid">
                {SOFT_SKILLS.map(s => <span className="soft-pill" key={s}>{s}</span>)}
              </div>
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "0.5rem", marginTop: "2rem" }}>// Languages</p>
              <div className="lang-row">
                {LANGUAGES.map(l => <span className="lang-pill" key={l}>{l}</span>)}
              </div>
              <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginBottom: "0.5rem", marginTop: "2rem" }}>// Interests</p>
              <div className="interests-row">
                {INTERESTS.map(i => <span className="int-pill" key={i}>{i}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="sec">
        <div className="inner">
          <Reveal><div className="sec-label">// Credentials</div></Reveal>
          <Reveal delay={0.05}><h2 className="sec-title">Certifications & <span>Achievements</span></h2></Reveal>
          <Reveal delay={0.1}><div className="divider" /></Reveal>
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <div className="cert-card">
                  <div className="cert-ico">{c.icon}</div>
                  <div>
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-org">{c.org}</div>
                    <div className="cert-date">{c.date}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Co-curricular */}
          <Reveal delay={0.1}>
            <p style={{ fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "2px", color: "#475569", textTransform: "uppercase", margin: "3rem 0 1.2rem" }}>// Co-Curricular Activities</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {[
                { icon: "🏆", text: "Business Plan Competition – Entrepreneurship Cell (Feb 2024)" },
                { icon: "📊", text: "Marketing Case Study Challenge – Geeta University Business Club (April 2023)" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#0d1525", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px", padding: "1rem 1.2rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>{a.icon}</span>
                  <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>{a.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec sec-dark">
        <div className="inner">
          <Reveal><div className="sec-label">// Let's Connect</div></Reveal>
          <Reveal delay={0.05}><h2 className="sec-title">Get In <span>Touch</span></h2></Reveal>
          <Reveal delay={0.1}><div className="divider" /></Reveal>
          <Reveal>
            <div className="contact-wrap">
              <div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                  I'm actively looking for full-time Software Developer roles or internships. If you have an opportunity or want to collaborate on a project, feel free to reach out!
                </p>
                {[["📧", "dchandra2045@gmail.com"], ["📱", "+91 82986 22628"], ["📍", "Begusarai, Bihar, India"]].map(([ic, tx]) => (
                  <div className="ci-item" key={tx}>
                    <div className="ci-icon">{ic}</div>
                    <div className="ci-text">{tx}</div>
                  </div>
                ))}
                <div className="socials">
                  {["LinkedIn", "GitHub", "Twitter", "Resume"].map(s => (
                    <button className="soc-btn" key={s}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="cf">
                <div>
                  <div className="flabel">Your Name</div>
                  <input className="finput" placeholder="Enter your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <div className="flabel">Email Address</div>
                  <input className="finput" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <div className="flabel">Message</div>
                  <textarea className="finput" placeholder="Tell me about the opportunity..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                {sent
                  ? <div className="success">✅ Message sent! I'll respond within 24 hours.</div>
                  : <button className="btn-a" onClick={submit} style={{ width: "100%", cursor: "pointer" }}>Send Message →</button>
                }
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-text">© 2025 <span>Dularchandra Kumar</span> · All rights reserved</div>
        <div className="footer-text">Built with <span>React</span> · MERN Stack Developer</div>
      </footer>
    </>
  );
}