import { useState } from "react";
import {
  Phone, MapPin, Clock, Mail, Star, ChevronRight, Calendar,
  Shield, Heart, Award, Check, Facebook, Instagram, Smile,
  AlertCircle, Settings, LogOut, Plus, Lock, Sparkles, Zap,
  Eye, MessageSquare, Menu, X, Users,
} from "lucide-react";

/* ============================================================
   GLOBAL STYLES — Fonts, animations, shared utility classes
   ============================================================ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', sans-serif; color: #1e293b; }
      .serif { font-family: 'Playfair Display', serif; }
      .page-enter { animation: pgIn 0.45s ease forwards; }
      @keyframes pgIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .lift:hover { transform: translateY(-5px); box-shadow: 0 18px 42px rgba(10,45,80,0.13); }
      .btn-p { background: linear-gradient(135deg,#0e7490,#0891b2); color:#fff; border:none; cursor:pointer; transition:all .22s ease; }
      .btn-p:hover { background:linear-gradient(135deg,#0a5f75,#0e7490); transform:translateY(-1px); box-shadow:0 8px 22px rgba(14,116,144,.35); }
      .btn-o { background:transparent; color:#fff; border:2px solid rgba(255,255,255,.65); cursor:pointer; transition:all .22s ease; }
      .btn-o:hover { background:rgba(255,255,255,.12); border-color:#fff; }
      .nav-lnk { position:relative; cursor:pointer; transition:color .2s; }
      .nav-lnk::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#0891b2; transition:width .3s; }
      .nav-lnk:hover::after, .nav-lnk.active::after { width:100%; }
      .dot-bg { background-image:radial-gradient(circle,rgba(8,145,178,.09) 1px,transparent 1px); background-size:26px 26px; }
      input, textarea { font-family:'DM Sans',sans-serif; }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-thumb { background:#0891b2; border-radius:4px; }
      .tab-btn { cursor:pointer; padding:10px 14px; border-radius:10px; font-size:14px; font-weight:500; display:flex; align-items:center; gap:9px; transition:all .2s; }
      .tab-btn:hover { background:rgba(8,145,178,.12); color:#22d3ee; }
      .tab-btn.active-tab { background:rgba(8,145,178,.2); color:#22d3ee; }
      @media (max-width: 768px) {
        .two-col { grid-template-columns: 1fr !important; }
        .four-col { grid-template-columns: 1fr 1fr !important; }
        .hide-mobile { display: none !important; }
      }
    `}</style>
  );
}

/* ============================================================
   NAVBAR — Edit navItems to add/remove pages
   ============================================================ */
function Navbar({ page, go, mobileOpen, setMobileOpen }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200,
      background:"rgba(255,255,255,0.97)", backdropFilter:"blur(14px)",
      borderBottom:"1px solid rgba(14,116,144,0.1)",
      boxShadow:"0 2px 24px rgba(10,45,80,0.07)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>
        {/* Logo */}
        <div onClick={() => go("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <img src={require('./logo.png')} alt="Lalor Dental Logo" style={{ height:75, objectFit:"contain" }} />
          <div>
            <div className="serif" style={{ fontSize:17, fontWeight:700, color:"#0a3550", lineHeight:1.1 }}>Lalor Dental</div>
            <div style={{ fontSize:9, color:"#0891b2", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600 }}>Clinic</div>
          </div>
        </div>
        {/* Desktop links */}
        <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:32 }}>
          {links.map(l => (
            <span key={l.id} className={`nav-lnk ${page===l.id?"active":""}`}
              onClick={() => go(l.id)}
              style={{ fontSize:14, fontWeight:500, color: page===l.id ? "#0891b2":"#334155" }}>
              {l.label}
            </span>
          ))}
        </div>
        {/* CTA */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button className="btn-p" onClick={() => go("book")}
            style={{ padding:"10px 20px", borderRadius:9, fontSize:14, fontWeight:600,
              display:"flex", alignItems:"center", gap:6 }}>
            <Calendar size={15} /> Book Now
          </button>
          <div className="hide-mobile" style={{ display:"none" }}>
            <div onClick={() => setMobileOpen(!mobileOpen)} style={{ cursor:"pointer", padding:8 }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background:"white", borderTop:"1px solid #f1f5f9", padding:"16px 24px" }}>
          {[...links, { id:"book", label:"Book Appointment" }].map(l => (
            <div key={l.id} onClick={() => { go(l.id); setMobileOpen(false); }}
              style={{ padding:"12px 0", borderBottom:"1px solid #f8fafc", fontSize:15, cursor:"pointer",
                color: page===l.id ? "#0891b2":"#334155", fontWeight: page===l.id ? 600:400 }}>
              {l.label}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ============================================================
   HOME PAGE — Hero, Services, About preview, Why us, Testimonials, CTA
   ============================================================ */
function HomePage({ go }) {
  const [activeTesti, setActiveTesti] = useState(0);
  const services = [
    { icon:<Smile size={26}/>, title:"General Check-ups", desc:"Comprehensive exams for the whole family, including digital X-rays and cancer screening." },
    { icon:<Sparkles size={26}/>, title:"Teeth Whitening", desc:"Professional in-chair and take-home whitening for a dramatically brighter smile." },
    { icon:<Shield size={26}/>, title:"Dental Implants", desc:"Permanent, natural-looking tooth replacement that fuses with your jawbone." },
    { icon:<Zap size={26}/>, title:"Emergency Care", desc:"Same-day emergency appointments for toothache, trauma, and lost fillings." },
    { icon:<Heart size={26}/>, title:"Family Dentistry", desc:"Gentle, patient care for children and adults of all ages." },
    { icon:<Eye size={26}/>, title:"Cosmetic Dentistry", desc:"Smile makeovers, veneers, and bonding tailored to your goals." },
  ];
  const testi = [
    { name:"Sarah M.", stars:5, text:"Dr. Eyad is absolutely wonderful with my children. They actually look forward to dental visits now! The clinic is spotless and the whole team is so warm." },
    { name:"James T.", stars:5, text:"I had been avoiding the dentist for years due to anxiety. Dr. Almashaal made me feel completely at ease — I couldn't believe how comfortable the whole experience was." },
    { name:"Priya K.", stars:5, text:"Best dental clinic I've visited. Modern equipment, genuinely caring staff, and Dr. Eyad takes time to explain every step clearly. Highly recommend to everyone." },
  ];
  const reasons = [
    { icon:<Award size={22}/>, title:"Experienced Dentist", desc:"10+ years of comprehensive family and cosmetic dental expertise" },
    { icon:<Zap size={22}/>, title:"Modern Technology", desc:"State-of-the-art digital X-rays and treatment equipment" },
    { icon:<Heart size={22}/>, title:"Family Friendly", desc:"Gentle care for patients from children to seniors" },
    { icon:<AlertCircle size={22}/>, title:"Emergency Appointments", desc:"Same-day urgent care when you need it most" },
  ];

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", background:"linear-gradient(135deg,#061828 0%,#0a3550 45%,#0d6480 100%)",
        display:"flex", alignItems:"center", position:"relative", overflow:"hidden", paddingTop:68 }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.5 }} />
        {/* Decorative rings */}
        <div style={{ position:"absolute", top:"8%", right:"4%", width:420, height:420, borderRadius:"50%",
          border:"1px solid rgba(8,145,178,.14)", opacity:.7 }} />
        <div style={{ position:"absolute", top:"18%", right:"8%", width:280, height:280, borderRadius:"50%",
          border:"1px solid rgba(8,145,178,.1)" }} />
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"72px 24px",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center",
          position:"relative", zIndex:1, width:"100%" }} className="two-col">
          {/* Text */}
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(8,145,178,.18)", border:"1px solid rgba(8,145,178,.28)",
              borderRadius:20, padding:"5px 15px", marginBottom:24 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#22d3ee" }} />
              <span style={{ fontSize:11, color:"#67e8f9", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:600 }}>
                Lalor, Victoria
              </span>
            </div>
            <h1 className="serif" style={{ fontSize:"clamp(38px,5.2vw,70px)", color:"white",
              lineHeight:1.08, marginBottom:20, fontWeight:600 }}>
              Your Trusted<br/>
              <span style={{ color:"#22d3ee", fontStyle:"italic" }}>Family Dentist</span><br/>
              in Lalor
            </h1>
            <p style={{ fontSize:17, color:"rgba(255,255,255,.68)", lineHeight:1.75,
              marginBottom:36, maxWidth:440 }}>
              Quality dental care for the whole family. Dr. Eyad Almashaal and the team are dedicated to your health and confidence.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button className="btn-p" onClick={() => go("book")}
                style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:600,
                  display:"flex", alignItems:"center", gap:8 }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <button className="btn-o"
                style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:500,
                  display:"flex", alignItems:"center", gap:8 }}>
                <Phone size={18} /> 0382567501
              </button>
            </div>
            {/* Stats */}
            <div style={{ display:"flex", gap:32, marginTop:48, paddingTop:32,
              borderTop:"1px solid rgba(255,255,255,.1)" }}>
              {[["500+","Happy Patients"],["10+","Years Experience"],["5 ★","Google Rating"]].map(([n,l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize:30, color:"#22d3ee", fontWeight:700 }}>{n}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Doctor card */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div style={{ position:"relative", width:360, height:360 }}>
              <div style={{ position:"absolute", inset:-18, borderRadius:"50%",
                border:"2px dashed rgba(8,145,178,.25)" }} />
              <div style={{ width:"100%", height:"100%", borderRadius:"50%",
                background:"linear-gradient(135deg,#0d6480,#1a9cb5)",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                border:"4px solid rgba(8,145,178,.35)",
                boxShadow:"0 28px 70px rgba(0,0,0,.3)" }}>
                <img src={require('./logo.png')} alt="Lalor Dental Logo" style={{ width:180, height:180, objectFit:"contain" }} />
                <div className="serif" style={{ color:"white", fontSize:17, fontWeight:600 }}>Dr. Eyad Almashaal</div>
                <div style={{ color:"rgba(255,255,255,.6)", fontSize:13, marginTop:5 }}>Principal Dentist · BDS</div>
              </div>
              {/* Review badge */}
              <div style={{ position:"absolute", bottom:24, right:-24,
                background:"white", borderRadius:14, padding:"12px 16px",
                boxShadow:"0 10px 30px rgba(0,0,0,.22)",
                display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ color:"#f59e0b", fontSize:15 }}>★★★★★</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#0a3550" }}>5.0 Rating</div>
                  <div style={{ fontSize:10, color:"#94a3b8" }}>Google Reviews</div>
                </div>
              </div>
              {/* Emergency badge */}
              <div style={{ position:"absolute", top:24, left:-16,
                background:"#0891b2", borderRadius:12, padding:"10px 14px",
                boxShadow:"0 8px 22px rgba(8,145,178,.4)", textAlign:"center" }}>
                <div className="serif" style={{ color:"white", fontSize:13, fontWeight:700 }}>Same Day</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.8)" }}>Emergency Care</div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", letterSpacing:"0.1em" }}>SCROLL</div>
          <div style={{ width:1, height:36, background:"linear-gradient(to bottom,rgba(255,255,255,.3),transparent)" }} />
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ padding:"96px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ display:"inline-block", background:"#e0f7fa", color:"#0891b2",
              padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Our Services</div>
            <h2 className="serif" style={{ fontSize:"clamp(30px,4vw,50px)", color:"#0a3550", fontWeight:600, marginBottom:10 }}>
              Comprehensive Dental Care
            </h2>
            <p style={{ color:"#64748b", fontSize:16, maxWidth:480, margin:"0 auto" }}>
              Everything your family needs for a healthy, beautiful smile — all under one roof.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:22 }}>
            {services.map((s,i) => (
              <div key={i} className="lift" onClick={() => go("services", s.title)}
                style={{ background:"white", borderRadius:18, padding:"30px 26px",
                  border:"1px solid rgba(14,116,144,.07)", cursor:"pointer" }}>
                <div style={{ width:54, height:54, borderRadius:14,
                  background:"linear-gradient(135deg,#e0f7fa,#cffafe)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#0891b2", marginBottom:18 }}>{s.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:600, color:"#0a3550", marginBottom:7 }}>{s.title}</h3>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65, marginBottom:14 }}>{s.desc}</p>
                <div style={{ display:"flex", alignItems:"center", gap:4, color:"#0891b2", fontSize:12, fontWeight:600 }}>
                  Learn more <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:38 }}>
            <button className="btn-p" onClick={() => go("services")}
              style={{ padding:"12px 28px", borderRadius:10, fontSize:14, fontWeight:600 }}>
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section style={{ padding:"96px 24px", background:"white" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid",
          gridTemplateColumns:"1fr 1.4fr", gap:68, alignItems:"center" }} className="two-col">
          <div style={{ position:"relative" }}>
            <div style={{ width:"100%", height:440, borderRadius:24,
              background:"linear-gradient(145deg,#0a3550,#0e6d8a)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 28px 64px rgba(10,53,80,.22)" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:96, marginBottom:12 }}>👨‍⚕️</div>
                <div className="serif" style={{ color:"white", fontSize:20, fontWeight:600 }}>Dr. Eyad Almashaal</div>
                <div style={{ color:"rgba(255,255,255,.55)", fontSize:13, marginTop:6 }}>BDS · Principal Dentist</div>
              </div>
            </div>
            <div style={{ position:"absolute", top:-18, right:-18,
              background:"linear-gradient(135deg,#0891b2,#06b6d4)",
              borderRadius:16, padding:"22px 26px", color:"white", textAlign:"center",
              boxShadow:"0 10px 28px rgba(8,145,178,.38)" }}>
              <div className="serif" style={{ fontSize:38, fontWeight:700 }}>10+</div>
              <div style={{ fontSize:11, opacity:.85, lineHeight:1.4 }}>Years of<br/>Experience</div>
            </div>
          </div>
          <div>
            <div style={{ display:"inline-block", background:"#e0f7fa", color:"#0891b2",
              padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:18 }}>Meet the Dentist</div>
            <h2 className="serif" style={{ fontSize:"clamp(30px,3.5vw,48px)", color:"#0a3550",
              fontWeight:600, lineHeight:1.12, marginBottom:18 }}>
              Dr. Eyad<br/>Almashaal
            </h2>
            <p style={{ fontSize:15, color:"#475569", lineHeight:1.82, marginBottom:14 }}>
              Dr. Almashaal is a dedicated family dentist with over a decade of experience providing high-quality, compassionate dental care to the Lalor community.
            </p>
            <p style={{ fontSize:15, color:"#475569", lineHeight:1.82, marginBottom:28 }}>
              His gentle, patient-centred approach has helped thousands of patients achieve and maintain healthy, confident smiles — from routine check-ups to complex restorations.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:30 }}>
              {["Bachelor of Dental Surgery (BDS)","Member, Australian Dental Association","Focused on family & preventive care"].map(q => (
                <div key={q} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:"#e0f7fa",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Check size={11} color="#0891b2" />
                  </div>
                  <span style={{ fontSize:14, color:"#374151" }}>{q}</span>
                </div>
              ))}
            </div>
            <button className="btn-p" onClick={() => go("about")}
              style={{ padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:600,
                display:"flex", alignItems:"center", gap:6, width:"fit-content" }}>
              Read Full Bio <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg,#0a3550,#0d6480)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <h2 className="serif" style={{ fontSize:"clamp(28px,3.5vw,46px)", color:"white", fontWeight:600, marginBottom:10 }}>
              Why Choose Lalor Dental?
            </h2>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:16 }}>
              We're committed to exceptional care at every single visit.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:22 }}>
            {reasons.map((r,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,.07)",
                border:"1px solid rgba(255,255,255,.1)", borderRadius:18,
                padding:"28px 22px", backdropFilter:"blur(8px)" }}>
                <div style={{ width:48, height:48, borderRadius:13,
                  background:"rgba(34,211,238,.14)", display:"flex", alignItems:"center",
                  justifyContent:"center", color:"#22d3ee", marginBottom:18 }}>{r.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:600, color:"white", marginBottom:7 }}>{r.title}</h3>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.58)", lineHeight:1.65 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* <section style={{ padding:"96px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ display:"inline-block", background:"#e0f7fa", color:"#0891b2",
              padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>Patient Reviews</div>
            <h2 className="serif" style={{ fontSize:"clamp(28px,3.5vw,46px)", color:"#0a3550", fontWeight:600 }}>
              What Our Patients Say
            </h2>
          </div>
          <div style={{ background:"white", borderRadius:22, padding:"44px 52px",
            boxShadow:"0 8px 44px rgba(10,53,80,.07)",
            border:"1px solid rgba(14,116,144,.07)", textAlign:"center", marginBottom:22 }}>
            <div style={{ fontSize:60, color:"#e0f2fe", lineHeight:1, marginBottom:12 }}>"</div>
            <p className="serif" style={{ fontSize:19, color:"#1e293b", lineHeight:1.72,
              marginBottom:24, fontStyle:"italic" }}>
              {testi[activeTesti].text}
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:3, marginBottom:10 }}>
              {[...Array(testi[activeTesti].stars)].map((_,i) => (
                <span key={i} style={{ color:"#f59e0b", fontSize:18 }}>★</span>
              ))}
            </div>
            <div style={{ fontWeight:600, color:"#0a3550", fontSize:15 }}>{testi[activeTesti].name}</div>
            <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>Verified Google Review</div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
            {testi.map((_,i) => (
              <button key={i} onClick={() => setActiveTesti(i)}
                style={{ width:i===activeTesti?26:8, height:8, borderRadius:4, border:"none",
                  cursor:"pointer", background:i===activeTesti?"#0891b2":"#cbd5e1",
                  transition:"all .3s ease" }} />
            ))}
          </div>
        </div>
      </section> */}

      {/* ── FINAL CTA ── */}
      <section style={{ padding:"80px 24px", background:"white" }}>
        <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <img src={require('./logo.png')} alt="Lalor Dental Logo"
           style={{ width:630, height:480, objectFit:"contain", marginBottom:10 }} />
            Ready for a Healthier Smile?
          
          <p style={{ fontSize:17, color:"#64748b", marginBottom:36, lineHeight:1.72 }}>
            Book your appointment today and take the first step toward the smile you deserve.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-p" onClick={() => go("book")}
              style={{ padding:"16px 36px", borderRadius:12, fontSize:16, fontWeight:600,
                display:"flex", alignItems:"center", gap:8 }}>
              <Calendar size={19} /> Book Appointment
            </button>
            <button style={{ padding:"16px 36px", borderRadius:12, fontSize:16, fontWeight:600,
              background:"#f1f5f9", border:"1px solid #e2e8f0", cursor:"pointer",
              display:"flex", alignItems:"center", gap:8, color:"#0a3550",
              transition:"background .2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="#e2e8f0"}
              onMouseLeave={e=>e.currentTarget.style.background="#f1f5f9"}>
              <Phone size={19} /> (03) 8256 7501
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   SERVICES PAGE — Full services list. Edit allServices array.
   ============================================================ */
function ServicesPage({ go, targetService }) {
  const { useEffect, useRef } = window.React || require('react');
  const refs = {};
  const all = [
    { icon:<Smile size={30}/>, title:"General Check-ups", desc:"Comprehensive oral examinations including digital X-rays, gum assessment, and oral cancer screening.", feats:["Digital X-rays","Oral cancer screening","Gum health assessment"] },
    { icon:<Sparkles size={30}/>, title:"Teeth Cleaning", desc:"Professional scale & clean to remove plaque and tartar that regular brushing cannot address.", feats:["Scale & clean","Polish & fluoride","Stain removal"] },
    { icon:<Shield size={30}/>, title:"Dental Fillings", desc:"Restore decayed teeth with natural-looking tooth-coloured composite resin fillings.", feats:["Tooth-coloured composite","Mercury-free","Single visit"] },
    { icon:<Heart size={30}/>, title:"Root Canal Treatment", desc:"Pain-free root canal therapy to save severely infected teeth and relieve acute toothache.", feats:["Pain management","Modern rotary technique","Tooth preservation"] },
    { icon:<Award size={30}/>, title:"Crowns & Bridges", desc:"Custom porcelain or zirconia crowns and bridges to restore damaged or missing teeth.", feats:["Porcelain & zirconia","Custom shade-matched","Durable & natural"] },
    { icon:<Eye size={30}/>, title:"Teeth Whitening", desc:"Professional-grade whitening for dramatically brighter results — safe and long-lasting.", feats:["In-chair whitening","Take-home kits","Up to 8 shades lighter"] },
    { icon:<Zap size={30}/>, title:"Dental Implants", desc:"Permanent tooth replacement using titanium implants that look, feel, and function like natural teeth.", feats:["Titanium implants","Single & full-arch","Lifelong solution"] },
    { icon:<AlertCircle size={30}/>, title:"Emergency Dental Care", desc:"Same-day emergency appointments for toothache, chipped teeth, lost fillings, and dental trauma.", feats:["Same-day appointments","After-hours line","Immediate pain relief"] },
  ];

  return (
    <div className="page-enter" style={{ paddingTop:68 }}>
      <section style={{ padding:"72px 24px 56px",
        background:"linear-gradient(135deg,#0a3550,#0e7490)", textAlign:"center", position:"relative" }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.35 }} />
        <div style={{ position:"relative" }}>
          <h1 className="serif" style={{ fontSize:"clamp(34px,5vw,60px)", color:"white", fontWeight:600, marginBottom:10 }}>
            Our Dental Services
          </h1>
          <p style={{ color:"rgba(255,255,255,.68)", fontSize:17, maxWidth:500, margin:"0 auto" }}>
            Comprehensive care for the whole family, delivered with skill and compassion.
          </p>
        </div>
      </section>
      <section style={{ padding:"72px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:1200, margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:26 }}>
          {all.map((s,i) => (
  <div key={i} ref={el => { if(targetService===s.title && el) setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"center"}),100); }}
    className="lift" style={{ background:"white", borderRadius:20,
    padding:"36px 30px", border:"1px solid rgba(14,116,144,.07)",
    outline: targetService===s.title ? "2px solid #0891b2" : "none",
    transition:"outline .3s" }}>
              <div style={{ width:62, height:62, borderRadius:16,
                background:"linear-gradient(135deg,#e0f7fa,#cffafe)",
                display:"flex", alignItems:"center", justifyContent:"center",
                color:"#0891b2", marginBottom:22 }}>{s.icon}</div>
              <h3 className="serif" style={{ fontSize:22, color:"#0a3550", fontWeight:600, marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7, marginBottom:18 }}>{s.desc}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:22 }}>
                {s.feats.map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <Check size={13} color="#0891b2" />
                    <span style={{ fontSize:13, color:"#475569" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="btn-p" onClick={() => go("book")}
                style={{ padding:"10px 18px", borderRadius:9, fontSize:13, fontWeight:600, width:"100%" }}>
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ABOUT PAGE — Dentist bio and qualifications
   ============================================================ */
function AboutPage({ go }) {
  return (
    <div className="page-enter" style={{ paddingTop:68 }}>
      <section style={{ padding:"72px 24px 56px",
        background:"linear-gradient(135deg,#0a3550,#0e7490)", textAlign:"center", position:"relative" }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.35 }} />
        <div style={{ position:"relative" }}>
          <h1 className="serif" style={{ fontSize:"clamp(34px,5vw,60px)", color:"white", fontWeight:600, marginBottom:10 }}>
            About the Dentist
          </h1>
          <p style={{ color:"rgba(255,255,255,.68)", fontSize:17 }}>Meet Dr. Eyad Almashaal</p>
        </div>
      </section>
      <section style={{ padding:"80px 24px", background:"white" }}>
        <div style={{ maxWidth:1080, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:72, alignItems:"start" }} className="two-col">
          <div>
            <div style={{ width:"100%", aspectRatio:"4/5", borderRadius:24,
              background:"linear-gradient(155deg,#0a3550,#0e7490)",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              boxShadow:"0 28px 64px rgba(10,53,80,.2)" }}>
              <div style={{ fontSize:104, marginBottom:14 }}>👨‍⚕️</div>
              <div className="serif" style={{ color:"white", fontSize:19, fontWeight:600 }}>Dr. Eyad Almashaal</div>
              <div style={{ color:"rgba(255,255,255,.55)", fontSize:13, marginTop:6 }}>BDS · Principal Dentist</div>
            </div>
            <div style={{ background:"#f8fafc", borderRadius:16, padding:"22px",
              marginTop:18, border:"1px solid rgba(14,116,144,.08)" }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#0a3550",
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Quick Contact</div>
              {[[<Phone size={13}/>, "(03) 8256 7501"],[<Mail size={13}/>, "info@lalordental.com.au"],[<MapPin size={13}/>, "Lalor, Victoria 3075"]].map(([icon,text],i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10,
                  fontSize:13, color:"#475569", marginBottom:8 }}>
                  <span style={{ color:"#0891b2" }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display:"inline-block", background:"#e0f7fa", color:"#0891b2",
              padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:20 }}>Biography</div>
            <h2 className="serif" style={{ fontSize:42, color:"#0a3550", fontWeight:600, lineHeight:1.1, marginBottom:24 }}>
              Dr. Eyad<br/>Almashaal
            </h2>
            {["Dr. Eyad Almashaal is the principal dentist at Lalor Dental Clinic, bringing over a decade of experience in comprehensive family dentistry. He completed his Bachelor of Dental Surgery and has since dedicated his career to providing exceptional dental care to the Lalor community.",
              "Dr. Almashaal believes great dental care begins with listening — understanding each patient's unique concerns and goals. His gentle, patient-centred approach has helped thousands achieve and maintain healthy, confident smiles.",
              "Outside the clinic, he stays current with the latest advancements through continued professional development, ensuring his patients always benefit from the most modern techniques and technology available."
            ].map((para, i) => (
              <p key={i} style={{ fontSize:15, color:"#475569", lineHeight:1.85, marginBottom:16 }}>{para}</p>
            ))}
            <h3 className="serif" style={{ fontSize:24, color:"#0a3550", fontWeight:600, margin:"28px 0 16px" }}>
              Qualifications & Memberships
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
              {["Bachelor of Dental Surgery (BDS)","Member, Australian Dental Association (ADA)","Registered with AHPRA","Advanced training in cosmetic dentistry","Certified in oral implantology"].map(q => (
                <div key={q} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"#e0f7fa",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Check size={12} color="#0891b2" />
                  </div>
                  <span style={{ fontSize:14, color:"#374151" }}>{q}</span>
                </div>
              ))}
            </div>
            <button className="btn-p" onClick={() => go("book")}
              style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:600,
                display:"flex", alignItems:"center", gap:8, width:"fit-content" }}>
              <Calendar size={17} /> Book with Dr. Almashaal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   CONTACT PAGE — Address, hours, social, map, contact form
   ============================================================ */
function ContactPage() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  return (
    <div className="page-enter" style={{ paddingTop:68 }}>
      <section style={{ padding:"72px 24px 56px",
        background:"linear-gradient(135deg,#0a3550,#0e7490)", textAlign:"center", position:"relative" }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.35 }} />
        <div style={{ position:"relative" }}>
          <h1 className="serif" style={{ fontSize:"clamp(34px,5vw,60px)", color:"white", fontWeight:600, marginBottom:10 }}>
            Contact & Location
          </h1>
          <p style={{ color:"rgba(255,255,255,.68)", fontSize:17 }}>We'd love to hear from you</p>
        </div>
      </section>
      <section style={{ padding:"72px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:1080, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:48 }} className="two-col">
          {/* Info column */}
          <div>
            <h2 className="serif" style={{ fontSize:30, color:"#0a3550", fontWeight:600, marginBottom:26 }}>Clinic Information</h2>
            {[
              { icon:<MapPin size={19}/>, label:"Address", val:"362 Edgars Rd\nLalor VIC 3075" },
              { icon:<Phone size={19}/>, label:"Phone", val:"0382567501" },
              { icon:<Mail size={19}/>, label:"Email", val:"info@lalordental.com.au" },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display:"flex", gap:14, marginBottom:16,
                background:"white", padding:"16px 20px", borderRadius:14,
                border:"1px solid rgba(14,116,144,.07)" }}>
                <div style={{ width:42, height:42, borderRadius:11, background:"#e0f7fa",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#0891b2", flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600,
                    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:14, color:"#1e293b", fontWeight:500, whiteSpace:"pre-line" }}>{val}</div>
                </div>
              </div>
            ))}
            {/* Hours */}
            <div style={{ background:"white", borderRadius:16, padding:"22px",
              border:"1px solid rgba(14,116,144,.07)", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <Clock size={15} color="#0891b2" />
                <span style={{ fontSize:11, fontWeight:700, color:"#0a3550",
                  textTransform:"uppercase", letterSpacing:"0.08em" }}>Opening Hours</span>
              </div>
              {[["Mon – Fri","8:30am – 5:30pm"],["Saturday","9:00am – 1:00pm"],["Sunday","Closed"]].map(([day,hrs]) => (
                <div key={day} style={{ display:"flex", justifyContent:"space-between",
                  padding:"8px 0", borderBottom:"1px solid #f8fafc", fontSize:13 }}>
                  <span style={{ color:"#64748b" }}>{day}</span>
                  <span style={{ color:hrs==="Closed"?"#ef4444":"#0a3550", fontWeight:500 }}>{hrs}</span>
                </div>
              ))}
            </div>
            {/* Social icons */}
            <div style={{ display:"flex", gap:10 }}>
              {[Facebook,Instagram,MessageSquare].map((Icon,i) => (
                <div key={i} style={{ width:42, height:42, borderRadius:11, background:"#0a3550",
                  display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
                  transition:"background .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#0891b2"}
                  onMouseLeave={e=>e.currentTarget.style.background="#0a3550"}>
                  <Icon size={17} color="white" />
                </div>
              ))}
            </div>
          </div>
          {/* Form + map column */}
          <div>
            {/* Map placeholder */}
            <div style={{ width:"100%", height:180, borderRadius:16, marginBottom:26,
              background:"linear-gradient(135deg,#e0f7fa,#cffafe)",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              border:"1px solid rgba(14,116,144,.13)" }}>
              <div style={{ fontSize:36, marginBottom:6 }}>📍</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#0a3550" }}>Lalor Dental Clinic</div>
              <div style={{ fontSize:11, color:"#64748b", marginTop:3 }}>Lalor, Victoria 3075</div>
              <div style={{ fontSize:11, color:"#0891b2", marginTop:6, fontWeight:600 }}>[ Google Maps Embed ]</div>
            </div>
            {/* Contact form */}
            {sent ? (
              <div style={{ background:"#d1fae5", border:"1px solid #34d399",
                borderRadius:18, padding:"36px", textAlign:"center" }}>
                <div style={{ fontSize:44, marginBottom:12 }}>✅</div>
                <div style={{ fontSize:20, fontWeight:700, color:"#065f46" }}>Message Sent!</div>
                <p style={{ fontSize:14, color:"#047857", marginTop:8 }}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div style={{ background:"white", borderRadius:20, padding:"30px",
                border:"1px solid rgba(14,116,144,.07)" }}>
                <h3 className="serif" style={{ fontSize:22, color:"#0a3550", fontWeight:600, marginBottom:22 }}>Send a Message</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                  {[["Full Name","name","Your name","text"],["Phone","phone","0400 000 000","tel"]].map(([label,key,ph,type]) => (
                    <div key={key}>
                      <label style={{ fontSize:11, fontWeight:600, color:"#64748b",
                        textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:5 }}>{label}</label>
                      <input type={type} value={form[key]} placeholder={ph}
                        onChange={e => setForm({...form,[key]:e.target.value})}
                        style={{ width:"100%", padding:"10px 12px", borderRadius:9,
                          border:"1px solid #e2e8f0", fontSize:13, outline:"none" }}
                        onFocus={e=>e.target.style.borderColor="#0891b2"}
                        onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, fontWeight:600, color:"#64748b",
                    textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:5 }}>Email</label>
                  <input type="email" value={form.email} placeholder="your@email.com"
                    onChange={e => setForm({...form, email:e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", borderRadius:9,
                      border:"1px solid #e2e8f0", fontSize:13, outline:"none" }}
                    onFocus={e=>e.target.style.borderColor="#0891b2"}
                    onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontSize:11, fontWeight:600, color:"#64748b",
                    textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:5 }}>Message</label>
                  <textarea value={form.message} placeholder="How can we help you?" rows={4}
                    onChange={e => setForm({...form, message:e.target.value})}
                    style={{ width:"100%", padding:"10px 12px", borderRadius:9,
                      border:"1px solid #e2e8f0", fontSize:13, outline:"none", resize:"vertical" }}
                    onFocus={e=>e.target.style.borderColor="#0891b2"}
                    onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
                </div>
                <button className="btn-p" onClick={() => setSent(true)}
                  style={{ padding:"12px", borderRadius:10, fontSize:15, fontWeight:600, width:"100%" }}>
                  Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   BOOK APPOINTMENT PAGE
   Dental4Web widget integration point. Do not modify the
   embedded script section once live.
   ============================================================ */
function BookPage() {
  return (
    <div className="page-enter" style={{ paddingTop:68 }}>
      <section style={{ padding:"72px 24px 56px",
        background:"linear-gradient(135deg,#0a3550,#0e7490)", textAlign:"center", position:"relative" }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.35 }} />
        <div style={{ position:"relative" }}>
          <h1 className="serif" style={{ fontSize:"clamp(34px,5vw,60px)", color:"white", fontWeight:600, marginBottom:10 }}>
            Book an Appointment
          </h1>
          <p style={{ color:"rgba(255,255,255,.68)", fontSize:17 }}>
            Powered by Dental4Web — quick, easy, and secure
          </p>
        </div>
      </section>
      <section style={{ padding:"72px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          {/* Step indicator */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:0, marginBottom:48 }}>
            {[["1","Select Service"],["2","Choose Time"],["3","Your Details"],["4","Confirm"]].map(([n,l],i) => (
              <div key={i} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ width:34, height:34, borderRadius:"50%",
                    background:i===0?"#0891b2":"#e2e8f0",
                    color:i===0?"white":"#94a3b8",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:13, fontWeight:700, margin:"0 auto 5px" }}>{n}</div>
                  <div style={{ fontSize:11, color:i===0?"#0891b2":"#94a3b8",
                    fontWeight:i===0?600:400, whiteSpace:"nowrap" }}>{l}</div>
                </div>
                {i<3 && <div style={{ width:52, height:2, background:"#e2e8f0",
                  margin:"0 6px", marginTop:-18 }} />}
              </div>
            ))}
          </div>
          {/* Dental4Web widget container */}
          <div style={{ background:"white", borderRadius:22,
            border:"1px solid rgba(14,116,144,.1)",
            overflow:"hidden", boxShadow:"0 10px 48px rgba(10,53,80,.08)" }}>
            <div style={{ background:"#0a3550", padding:"18px 26px",
              display:"flex", alignItems:"center", gap:12 }}>
              <Calendar size={19} color="#22d3ee" />
              <span style={{ color:"white", fontWeight:600, fontSize:15 }}>
                Lalor Dental Clinic — Online Booking
              </span>
              <div style={{ marginLeft:"auto", background:"rgba(255,255,255,.1)",
                borderRadius:6, padding:"3px 10px", fontSize:12, color:"#67e8f9" }}>
                🔒 Secure
              </div>
            </div>
            {/* === DENTAL4WEB WIDGET EMBEDS BELOW === */}
            <div style={{ padding:"56px 40px", textAlign:"center" }}>
              <div style={{ fontSize:50, marginBottom:14 }}>🗓️</div>
              <h3 className="serif" style={{ fontSize:26, color:"#0a3550", fontWeight:600, marginBottom:12 }}>
                Dental4Web Booking System
              </h3>
              <p style={{ fontSize:15, color:"#64748b", maxWidth:420, margin:"0 auto 24px", lineHeight:1.7 }}>
                The Dental4Web online booking widget will be embedded here. Replace this block with your Dental4Web embed code.
              </p>
              {/* Code block */}
              <div style={{ background:"#f1f5f9", borderRadius:12, padding:"16px 20px",
                textAlign:"left", maxWidth:480, margin:"0 auto 28px",
                fontFamily:"monospace", fontSize:12, color:"#475569", lineHeight:1.8 }}>
                <span style={{ color:"#94a3b8" }}>{`<!-- Dental4Web Widget -->`}</span><br/>
                <span style={{ color:"#0891b2" }}>{`<script`}</span>{` src="`}<span style={{ color:"#065f46" }}>{`https://dental4web.com.au/widget.js`}</span>{`"`}<br/>
                {`  data-clinic="`}<span style={{ color:"#065f46" }}>lalor-dental</span>{`">`}<br/>
                <span style={{ color:"#0891b2" }}>{`</script>`}</span>
              </div>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:22 }}>
                Or call us directly to book:
              </p>
              <button className="btn-p"
                style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:600,
                  display:"inline-flex", alignItems:"center", gap:8 }}>
                <Phone size={17} /> (03) 8256 7501
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   ADMIN PANEL — Protected. Login: admin@lalordental.com / admin123
   Tabs: Services, Testimonials, Hours, Clinic Info
   ============================================================ */
function AdminPage({ go }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState({ email:"", pass:"" });
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("services");
  const [services, setServices] = useState([
    { id:1, title:"General Check-ups", desc:"Comprehensive oral health examinations." },
    { id:2, title:"Teeth Whitening", desc:"Professional whitening treatments." },
    { id:3, title:"Dental Implants", desc:"Permanent tooth replacement solutions." },
    { id:4, title:"Emergency Dental Care", desc:"Same-day emergency appointments." },
  ]);
  const [testis, setTestis] = useState([
    { id:1, name:"Sarah M.", rating:5, text:"Wonderful with my children. They actually look forward to dental visits now!" },
    { id:2, name:"James T.", rating:5, text:"Made me feel completely at ease. Best dental experience I've ever had." },
    { id:3, name:"Priya K.", rating:5, text:"Modern equipment, caring staff, and Dr. Eyad explains everything clearly." },
  ]);

  const login = () => {
    if (creds.email==="admin@lalordental.com" && creds.pass==="admin123") {
      setLoggedIn(true); setErr("");
    } else {
      setErr("Invalid credentials. Demo: admin@lalordental.com / admin123");
    }
  };

  if (!loggedIn) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#061828,#0a3550)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div className="dot-bg" style={{ position:"fixed", inset:0, opacity:.45 }} />
      <div style={{ background:"white", borderRadius:22, padding:"48px 40px",
        width:"100%", maxWidth:390, position:"relative",
        boxShadow:"0 36px 90px rgba(0,0,0,.3)" }}>
        <div style={{ textAlign:"center", marginBottom:30 }}>
          <div style={{ width:56, height:56, borderRadius:"50%",
            background:"linear-gradient(135deg,#0a3550,#0891b2)",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <Lock size={24} color="white" />
          </div>
          <h2 className="serif" style={{ fontSize:28, color:"#0a3550", fontWeight:700 }}>Admin Login</h2>
          <p style={{ fontSize:13, color:"#94a3b8", marginTop:5 }}>Lalor Dental Clinic</p>
        </div>
        {err && <div style={{ background:"#fee2e2", border:"1px solid #fca5a5",
          borderRadius:8, padding:"10px 14px", fontSize:12, color:"#dc2626", marginBottom:16 }}>{err}</div>}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:11, fontWeight:600, color:"#64748b", textTransform:"uppercase",
            letterSpacing:"0.07em", display:"block", marginBottom:5 }}>Email</label>
          <input type="email" value={creds.email} placeholder="admin@lalordental.com"
            onChange={e=>setCreds({...creds,email:e.target.value})}
            style={{ width:"100%", padding:"11px 14px", borderRadius:10,
              border:"1px solid #e2e8f0", fontSize:14, outline:"none" }} />
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:11, fontWeight:600, color:"#64748b", textTransform:"uppercase",
            letterSpacing:"0.07em", display:"block", marginBottom:5 }}>Password</label>
          <input type="password" value={creds.pass} placeholder="••••••••"
            onChange={e=>setCreds({...creds,pass:e.target.value})}
            onKeyDown={e=>e.key==="Enter"&&login()}
            style={{ width:"100%", padding:"11px 14px", borderRadius:10,
              border:"1px solid #e2e8f0", fontSize:14, outline:"none" }} />
        </div>
        <button className="btn-p" onClick={login}
          style={{ padding:"13px", borderRadius:10, fontSize:15, fontWeight:600, width:"100%" }}>
          Sign In
        </button>
        <div style={{ textAlign:"center", marginTop:18 }}>
          <span onClick={()=>go("home")}
            style={{ fontSize:13, color:"#0891b2", cursor:"pointer" }}>← Back to Website</span>
        </div>
      </div>
    </div>
  );

  const sideItems = [
    { id:"services", label:"Services", icon:<Shield size={15}/> },
    { id:"testimonials", label:"Testimonials", icon:<Star size={15}/> },
    { id:"hours", label:"Opening Hours", icon:<Clock size={15}/> },
    { id:"info", label:"Clinic Info", icon:<Settings size={15}/> },
  ];

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans',sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width:234, background:"#0a3550", display:"flex",
        flexDirection:"column", position:"fixed", top:0, bottom:0, zIndex:100 }}>
        <div style={{ padding:"22px 18px", borderBottom:"1px solid rgba(255,255,255,.1)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <img src={require('./logo.png')} alt="Lalor Dental Logo" style={{ width:36, height:36, objectFit:"contain" }} />            <div>
              <div className="serif" style={{ color:"white", fontSize:15, fontWeight:600 }}>Lalor Dental</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,.45)", letterSpacing:"0.1em" }}>ADMIN PANEL</div>
            </div>
          </div>
        </div>
        <div style={{ padding:"14px 10px", flex:1 }}>
          {sideItems.map(s => (
            <div key={s.id} onClick={()=>setTab(s.id)}
              className={`tab-btn ${tab===s.id?"active-tab":""}`}
              style={{ color: tab===s.id?"#22d3ee":"rgba(255,255,255,.6)", marginBottom:3 }}>
              {s.icon}{s.label}
            </div>
          ))}
        </div>
        <div style={{ padding:"14px 10px", borderTop:"1px solid rgba(255,255,255,.08)" }}>
          <div onClick={()=>go("home")}
            className="tab-btn"
            style={{ color:"rgba(255,255,255,.45)" }}>
            <LogOut size={15}/> Exit to Site
          </div>
        </div>
      </div>
      {/* Main */}
      <div style={{ marginLeft:234, flex:1, padding:"36px 44px", background:"#f8fafc" }}>
        <div style={{ marginBottom:30 }}>
          <h1 className="serif" style={{ fontSize:28, color:"#0a3550", fontWeight:700, marginBottom:4 }}>
            {sideItems.find(s=>s.id===tab)?.label}
          </h1>
          <p style={{ fontSize:14, color:"#94a3b8" }}>Edit website content without touching code.</p>
        </div>
        {/* Services */}
        {tab==="services" && (
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:18 }}>
              {services.map(s => (
                <div key={s.id} style={{ background:"white", borderRadius:14, padding:"18px 22px",
                  border:"1px solid rgba(14,116,144,.07)", display:"flex",
                  alignItems:"center", justifyContent:"space-between", gap:14 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, color:"#0a3550", marginBottom:3, fontSize:15 }}>{s.title}</div>
                    <div style={{ fontSize:13, color:"#64748b" }}>{s.desc}</div>
                  </div>
                  <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                    <button style={{ padding:"7px 14px", borderRadius:8, background:"#e0f7fa",
                      color:"#0891b2", border:"none", cursor:"pointer", fontSize:12, fontWeight:600 }}>Edit</button>
                    <button onClick={()=>setServices(services.filter(x=>x.id!==s.id))}
                      style={{ padding:"7px 14px", borderRadius:8, background:"#fee2e2",
                        color:"#dc2626", border:"none", cursor:"pointer", fontSize:12, fontWeight:600 }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-p" style={{ padding:"10px 18px", borderRadius:10,
              fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
              <Plus size={14}/> Add Service
            </button>
          </div>
        )}
        {/* Testimonials */}
        {tab==="testimonials" && (
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:18 }}>
              {testis.map(t => (
                <div key={t.id} style={{ background:"white", borderRadius:14, padding:"18px 22px",
                  border:"1px solid rgba(14,116,144,.07)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:10 }}>
                    <div>
                      <div style={{ fontWeight:600, color:"#0a3550", fontSize:15 }}>{t.name}</div>
                      <div style={{ color:"#f59e0b", fontSize:14, marginTop:2 }}>{"★".repeat(t.rating)}</div>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button style={{ padding:"7px 14px", borderRadius:8, background:"#e0f7fa",
                        color:"#0891b2", border:"none", cursor:"pointer", fontSize:12, fontWeight:600 }}>Edit</button>
                      <button onClick={()=>setTestis(testis.filter(x=>x.id!==t.id))}
                        style={{ padding:"7px 14px", borderRadius:8, background:"#fee2e2",
                          color:"#dc2626", border:"none", cursor:"pointer", fontSize:12, fontWeight:600 }}>Delete</button>
                    </div>
                  </div>
                  <p style={{ fontSize:13, color:"#475569", lineHeight:1.65 }}>{t.text}</p>
                </div>
              ))}
            </div>
            <button className="btn-p" style={{ padding:"10px 18px", borderRadius:10,
              fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
              <Plus size={14}/> Add Testimonial
            </button>
          </div>
        )}
        {/* Hours */}
        {tab==="hours" && (
          <div style={{ background:"white", borderRadius:18, padding:"28px",
            border:"1px solid rgba(14,116,144,.07)", maxWidth:480 }}>
            <p style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>
              Update clinic opening hours. Changes will reflect across the website.
            </p>
            {[["Monday","8:30 AM","5:30 PM"],["Tuesday","8:30 AM","5:30 PM"],
              ["Wednesday","8:30 AM","5:30 PM"],["Thursday","8:30 AM","5:30 PM"],
              ["Friday","8:30 AM","5:30 PM"],["Saturday","9:00 AM","1:00 PM"],
              ["Sunday","Closed",""]].map(([day,open,close]) => (
              <div key={day} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
                gap:10, marginBottom:10, alignItems:"center" }}>
                <span style={{ fontSize:13, fontWeight:500, color:"#374151" }}>{day}</span>
                <input defaultValue={open}
                  style={{ padding:"8px 10px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:12, outline:"none" }} />
                {close && <input defaultValue={close}
                  style={{ padding:"8px 10px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:12, outline:"none" }} />}
              </div>
            ))}
            <button className="btn-p" style={{ marginTop:14, padding:"10px 20px",
              borderRadius:10, fontSize:14, fontWeight:600 }}>Save Hours</button>
          </div>
        )}
        {/* Clinic Info */}
        {tab==="info" && (
          <div style={{ background:"white", borderRadius:18, padding:"28px",
            border:"1px solid rgba(14,116,144,.07)", maxWidth:520 }}>
            <p style={{ fontSize:13, color:"#64748b", marginBottom:22 }}>
              Update core clinic information displayed across the website.
            </p>
            {[["Clinic Name","Lalor Dental Clinic"],["Dentist Name","Dr. Eyad Almashaal"],
              ["Phone","0382567501"],["Email","info@lalordental.com.au"],
              ["Address","362 Edgars Rd\nLalor VIC 3075"]].map(([label,val]) => (
              <div key={label} style={{ marginBottom:16 }}>
                <label style={{ fontSize:11, fontWeight:600, color:"#64748b",
                  textTransform:"uppercase", letterSpacing:"0.07em", display:"block", marginBottom:5 }}>{label}</label>
                <input defaultValue={val}
                  style={{ width:"100%", padding:"10px 13px", borderRadius:10,
                    border:"1px solid #e2e8f0", fontSize:14, outline:"none" }}
                  onFocus={e=>e.target.style.borderColor="#0891b2"}
                  onBlur={e=>e.target.style.borderColor="#e2e8f0"} />
              </div>
            ))}
            <button className="btn-p" style={{ padding:"10px 22px", borderRadius:10, fontSize:14, fontWeight:600 }}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER — Edit contact info, hours, and links here
   ============================================================ */
function Footer({ go }) {
  return (
    <footer style={{ background:"#061828", color:"rgba(255,255,255,.6)", padding:"64px 24px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1.1fr", gap:44, marginBottom:48 }} className="four-col">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <img src={require('./logo.png')} alt="Lalor Dental Logo" style={{ height:80, objectFit:"contain" }} />
              <div className="serif" style={{ color:"white", fontSize:17, fontWeight:600 }}>Lalor Dental Clinic</div>
            </div>
            <p style={{ fontSize:13, lineHeight:1.82, marginBottom:18 }}>
              Quality dental care for the whole family. Serving the Lalor community with compassion and expertise.
            </p>
            <div style={{ display:"flex", gap:9 }}>
              {[Facebook,Instagram,MessageSquare].map((Icon,i) => (
                <div key={i} style={{ width:34, height:34, borderRadius:8,
                  background:"rgba(255,255,255,.07)", display:"flex",
                  alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                  <Icon size={14} color="rgba(255,255,255,.65)" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color:"white", fontWeight:600, fontSize:13,
              marginBottom:16, letterSpacing:"0.06em", textTransform:"uppercase" }}>Quick Links</div>
            {[["home","Home"],["services","Services"],["about","About"],["contact","Contact"],["book","Book Appointment"]].map(([id,label]) => (
              <div key={id} onClick={()=>go(id)}
                style={{ fontSize:13, marginBottom:9, cursor:"pointer", transition:"color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#22d3ee"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"}>
                {label}
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:"white", fontWeight:600, fontSize:13,
              marginBottom:16, letterSpacing:"0.06em", textTransform:"uppercase" }}>Hours</div>
            {[["Mon – Fri","8:30am – 5:30pm"],["Saturday","9:00am – 1:00pm"],["Sunday","Closed"]].map(([d,h]) => (
              <div key={d} style={{ fontSize:12, marginBottom:8, lineHeight:1.6 }}>
                <span style={{ color:"rgba(255,255,255,.4)" }}>{d}: </span>
                <span style={{ color:h==="Closed"?"#f87171":"rgba(255,255,255,.8)" }}>{h}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:"white", fontWeight:600, fontSize:13,
              marginBottom:16, letterSpacing:"0.06em", textTransform:"uppercase" }}>Contact</div>
            {[[<MapPin size={12}/>, "362 Edgars Rd\nLalor VIC 3075"],
              [<Phone size={12}/>, "0382567501"],
              [<Mail size={12}/>, "info@lalordental.com.au"]].map(([icon,text],i) => (
              <div key={i} style={{ display:"flex", gap:9, marginBottom:11,
                fontSize:12, alignItems:"flex-start" }}>
                <span style={{ color:"#0891b2", marginTop:1, flexShrink:0 }}>{icon}</span>
                <span style={{ whiteSpace:"pre-line", lineHeight:1.65 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:22,
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:11 }}>© 2025 Lalor Dental Clinic. All rights reserved.</div>
          <div style={{ display:"flex", gap:18 }}>
            <span style={{ fontSize:11, cursor:"pointer" }}>Privacy Policy</span>
            <span style={{ fontSize:11, cursor:"pointer" }}>Terms</span>
            <span onClick={()=>go("admin")}
              style={{ fontSize:11, cursor:"pointer", color:"rgba(255,255,255,.2)" }}>Admin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT — Page routing and global layout
   ============================================================ */
export default function App() {
 const [page, setPage] = useState("home");
const [mobileOpen, setMobileOpen] = useState(false);
const [targetService, setTargetService] = useState(null);
const go = (p, service = null) => { setPage(p); setMobileOpen(false); setTargetService(service); };

  return (
    <div>
      <GlobalStyles />
      {page !== "admin" && (
        <Navbar page={page} go={go} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
      {page === "home" && <HomePage go={go} />}
      {page === "services" && <ServicesPage go={go} targetService={targetService} />}
      {page === "about" && <AboutPage go={go} />}
      {page === "contact" && <ContactPage />}
      {page === "book" && <BookPage />}
      {page === "admin" && <AdminPage go={go} />}
      {page !== "admin" && <Footer go={go} />}
    </div>
  );
}