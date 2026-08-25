import { useState, useEffect } from "react";
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
useEffect(() => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self' 'unsafe-inline' https:";
  document.head.appendChild(meta);
}, []);

  // #c39748
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', sans-serif; color: #1e293b; }
      .serif { font-family: 'Playfair Display', serif; }
      .page-enter { animation: pgIn 0.45s ease forwards; }
      @keyframes pgIn { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      .lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .lift:hover { transform: translateY(-5px); box-shadow: -5px -4px 42px 0px rgba(10, 45, 80, 0.13) }
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
        #hamburger { display: block !important; }
        * { max-width: 100vw; }
         section { overflow-x: hidden !important; }
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
  { id: "offers", label: "Offers" },
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
          <img src={require('./logo.png')} alt="Lalor Dental Logo" style={{ height:70, objectFit:"contain" }} />
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
          <div style={{ display:"none" }} id="hamburger">
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

/* ============================================================
   FAQ COMPONENT
   To add a question: copy one { q:"...", a:"..." } block,
   paste it inside the faqs array, and fill in your question
   and answer. To remove one, delete the whole block.
   ============================================================ */
function FAQList() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q:"How much do dental implants cost in Australia?",
      a:"Dental implants are a long-term investment in your smile. Costs vary depending on the number of implants and complexity of your case. Contact us for a personalised quote following a consultation."
    },
    {
      q:"How much does Botox cost?",
      a:"Anti-wrinkle injection pricing depends on the areas treated and the number of units required. We offer competitive pricing and will provide a full quote during your consultation."
    },
    {
      q:"How long does Botox last?",
      a:"Anti-wrinkle injections typically last 3 to 4 months. With regular maintenance treatments, many patients find their results last longer over time."
    },
    {
      q:"What is the difference between Botox and dermal fillers?",
      a:"Botox relaxes muscles to smooth dynamic wrinkles like frown lines and crow's feet. Dermal fillers restore volume to areas like lips, cheeks, and under-eye hollows. Both can be combined for a naturally refreshed appearance."
    },
    {
      q:"How long do dermal fillers last?",
      a:"Dermal fillers typically last between 6 to 18 months depending on the area treated and the type of filler used. Lip fillers generally last 6 to 12 months."
    },
    {
      q:"Does lip filler hurt?",
      a:"We apply a topical numbing cream before treatment to ensure your comfort. Most patients describe the sensation as a mild pressure rather than pain. The procedure takes only 15 to 30 minutes."
    },
    {
      q:"Are dental implants better than dentures?",
      a:"Dental implants are widely considered the gold standard for tooth replacement. Unlike dentures, implants are permanent, feel completely natural, preserve your jawbone, and require no adhesives or removal."
    },
    {
      q:"Do you accept new patients?",
      a:"Yes! We warmly welcome new patients of all ages. You can book online or call us directly to arrange your first appointment."
    },
    {
      q:"Do you accept emergency dental appointments?",
      a:"Absolutely. We offer same-day emergency appointments for toothaches, broken teeth, lost fillings, and dental trauma. Call us first thing in the morning and we will do our best to see you that day."
    },
    {
      q:"Do you treat children?",
      a:"Yes, we love treating children! We create a gentle, fun, and stress-free environment for young patients from their very first visit."
    },
    {
      q:"Do you accept private health insurance?",
      a:"Yes, we accept all major health funds and have HICAPS available so you can claim on the spot at your appointment."
    },
    {
      q:"Is Botox safe?",
      a:"Yes. When performed by a qualified and experienced practitioner, anti-wrinkle injections are very safe. We use only medical-grade, TGA-approved products."
    },
    {
      q:"Will my dental procedure hurt?",
      a:"Modern dentistry prioritises your comfort. We use local anaesthetic for all treatments. Sedation options are also available for anxious patients — just let us know."
    },
    {
      q:"Why do my gums bleed when I brush?",
      a:"Bleeding gums are usually the first sign of gingivitis — early-stage gum disease caused by plaque buildup. It is very treatable with a professional clean and improved home care. Book a check-up if it persists."
    },
    {
      q:"How often should I visit the dentist?",
      a:"We recommend a check-up and professional clean every 6 months. Patients with gum disease or a history of cavities may benefit from more frequent visits."
    },
    {
      q:"How long does teeth whitening last?",
      a:"Results typically last between 1 to 3 years depending on your lifestyle habits such as coffee, tea, red wine, and smoking."
    },
    {
      q:"Is there a dentist near me in Lalor?",
      a:"Yes! Lalor Dental Clinic is conveniently located in Lalor, Victoria 3075, serving the local community including Thomastown, Epping, Bundoora, and surrounding suburbs."
    },
    {
      q:"Do you offer cosmetic dentistry in Lalor?",
      a:"Yes. We offer a full range of cosmetic dental and facial aesthetic treatments including teeth whitening, veneers, Botox, and dermal fillers — all in one convenient location in Lalor."
    },
    {
      q:"Do you offer payment plans?",
      a:"We understand that dental care is an investment. Please speak with our friendly team about flexible payment options available at the clinic."
    },
    {
      q:"How do I book an appointment at Lalor Dental Clinic?",
      a:"You can book online through our website, call us directly, or send us a message through our Contact page. We respond promptly to all enquiries."
    },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {faqs.map((f, i) => (
        <div key={i} style={{
          background:"white", borderRadius:14,
          border:`1px solid ${open===i ? "#0891b2" : "rgba(14,116,144,.08)"}`,
          overflow:"hidden", transition:"border .2s",
          boxShadow: open===i ? "0 4px 18px rgba(8,145,178,0.1)" : "0 2px 8px rgba(0,0,0,0.04)"
        }}>
          <div onClick={() => setOpen(open===i ? null : i)}
            style={{ padding:"18px 22px", display:"flex",
              justifyContent:"space-between", alignItems:"center",
              cursor:"pointer", gap:16 }}>
            <span style={{ fontSize:15, fontWeight:600,
              color:"#0a3550", lineHeight:1.4 }}>{f.q}</span>
            <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0,
              background: open===i ? "#0891b2" : "#e0f7fa",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .2s" }}>
              <span style={{ color: open===i ? "white" : "#0891b2",
                fontSize:20, lineHeight:1, marginTop:-2, fontWeight:300 }}>
                {open===i ? "−" : "+"}
              </span>
            </div>
          </div>
          {open===i && (
            <div style={{ padding:"0 22px 18px", fontSize:14,
              color:"#475569", lineHeight:1.8,
              borderTop:"1px solid rgba(14,116,144,.08)" }}>
              <div style={{ paddingTop:14 }}>{f.a}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


function HomePage({ go }) {
  const [activeTesti, setActiveTesti] = useState(0);
  const services = [
    { icon:<Sparkles size={26}/>, title:"Cosmetic & Aesthetic Procedures", desc:"Beyond your smile — we offer facial aesthetics including anti-wrinkle injections (Botox), dermal fillers, lip enhancement, and skin rejuvenation treatments for a naturally refreshed look." },
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

  useEffect(() => {
    // Page title and meta description
    document.title = "Lalor Dental Clinic | Family Dentist & Cosmetic Clinic in Lalor VIC";
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Lalor Dental Clinic offers general dentistry, dental implants, teeth whitening, Botox and dermal fillers in Lalor VIC 3075. Book your appointment today.';
    document.head.appendChild(meta);

    // FAQ Schema for Google
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much do dental implants cost in Australia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dental implants are a long-term investment in your smile. Costs vary depending on the number of implants and complexity of your case. Contact us for a personalised quote following a consultation."
          }
        },
        {
          "@type": "Question",
          "name": "Do you accept emergency dental appointments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We offer same-day emergency appointments for toothaches, broken teeth, lost fillings, and dental trauma. Call us first thing in the morning and we will do our best to see you that day."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a dentist near me in Lalor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Lalor Dental Clinic is conveniently located in Lalor, Victoria 3075, serving the local community including Thomastown, Epping, Bundoora, and surrounding suburbs."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer cosmetic dentistry in Lalor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We offer a full range of cosmetic dental and facial aesthetic treatments including teeth whitening, veneers, Botox, and dermal fillers — all in one convenient location in Lalor."
          }
        },
        {
          "@type": "Question",
          "name": "How long does Botox last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Anti-wrinkle injections typically last 3 to 4 months. With regular maintenance treatments, many patients find their results last longer over time."
          }
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
    document.head.removeChild(script);
    document.head.removeChild(meta);
  };
}, []);
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
              Healthy Smile, Confident You. Dr. Eyad Almashaal brings over 10 years of experience delivering complete dental and aesthetic care for the whole family.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button className="btn-p" onClick={() => go("book")}
                style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:600,
                  display:"flex", alignItems:"center", gap:8 }}>
                <Calendar size={18} /> Book Appointment
              </button>
              <a href="tel:0382567501"
                style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:500,
                  display:"flex", alignItems:"center", gap:8, textDecoration:"none",
                  border:"2px solid rgba(255,255,255,.65)", color:"white" }}>
                <Phone size={18} /> 0382567501
              </a>
            </div>
            {/* Stats 
            <div style={{ display:"flex", gap:32, marginTop:48, paddingTop:32,
              borderTop:"1px solid rgba(255,255,255,.1)" }}>
              {[["500+","Happy Patients"],["10+","Years Experience"],["5 ★","Google Rating"]].map(([n,l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize:30, color:"#22d3ee", fontWeight:700 }}>{n}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,.5)", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
            */}
          </div>
          {/* Doctor card */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div style={{ position:"relative", width:440, height:440 }}>
              {/* Dashed ring */}
              <div style={{ position:"absolute", inset:-22, borderRadius:"50%",
                border:"2px dashed rgba(8,145,178,.25)" }} />
              {/* Photo circle */}
              <div style={{ width:"100%", height:"100%", borderRadius:"50%",
                overflow:"hidden",
                background:"#e0f7fa",
                border:"4px solid rgba(8,145,178,.35)",
                boxShadow:"0 28px 70px rgba(0,0,0,.3)" }}>
                <img src={require('./doctor.png')} alt="Dr. Eyad Almashaal"
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    objectPosition:"center top" }} />
              </div>
              {/* 10+ years badge — top right of circle */}
              <div style={{ position:"absolute", top:20, right:-10,
                background:"linear-gradient(135deg,#0891b2,#22d3ee)",
                borderRadius:14, padding:"12px 16px",
                boxShadow:"0 8px 22px rgba(8,145,178,.45)",
                textAlign:"center" }}>
                <div className="serif" style={{ color:"white", fontSize:22,
                  fontWeight:800, lineHeight:1 }}>10+</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.85)",
                  marginTop:3, fontWeight:600 }}>Years Experience</div>
              </div>
              {/* Name badge — bottom left */}
              <div style={{ position:"absolute", bottom:20, left:-10,
                background:"white", borderRadius:12, padding:"10px 14px",
                boxShadow:"0 8px 22px rgba(0,0,0,.15)" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#0a3550" }}>
                  Dr. Eyad Almashaal
                </div>
                <div style={{ fontSize:10, color:"#0891b2", marginTop:2 }}>
                  Principal Dentist · BDS
                </div>
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
            <a href="tel:0382567501"
              className="btn-p"
              style={{ padding:"14px 28px", borderRadius:10, fontSize:15, fontWeight:600,
                display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none" }}>
              <Phone size={17} /> 0382567501
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section style={{ padding:"96px 24px", background:"white" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid",
          gridTemplateColumns:"1fr 1.4fr", gap:68, alignItems:"center" }} className="two-col">
          <div style={{ position:"relative", maxWidth:420, width:"100%", margin:"0 auto" }}>
            <div style={{ width:"100%", height:440, borderRadius:24,
              overflow:"hidden",
              boxShadow:"0 28px 64px rgba(10,53,80,.22)" }}>
              <img src={require('./doctor.png')} alt="Dr. Eyad Almashaal"
                style={{ width:"10", height:"110%", objectFit:"cover", }} />
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
      {/* ── FAQ SECTION ── */}
      <section style={{ padding:"96px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <div style={{ display:"inline-block", background:"#e0f7fa", color:"#0891b2",
              padding:"4px 14px", borderRadius:20, fontSize:11, fontWeight:700,
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>FAQ</div>
            <h2 className="serif" style={{ fontSize:"clamp(28px,3.5vw,46px)",
              color:"#0a3550", fontWeight:600, marginBottom:10 }}>
              Common Questions
            </h2>
            <p style={{ color:"#64748b", fontSize:16, maxWidth:480, margin:"0 auto" }}>
              Everything you need to know before your visit.
            </p>
          </div>
          <FAQList />
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg,#0a3550,#0d6480)" }}></section>
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
      <section style={{ padding:"80px 24px", background:"white", overflowX:'hidden' }}>
        <div style={{ maxWidth:660, margin:"0 auto", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <img src={require('./logo.png')} alt="Lalor Dental Logo"
           style={{ width:630, height:480, objectFit:"contain", marginBottom:10, maxWidth:'100%' }} />
            Ready for a Healthier Smile?
          
          <p style={{ fontSize:17, color:"#64748b", marginBottom:36, lineHeight:1.72 }}>
            Book your appointment today and take the first step toward the smile you deserve.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-p" onClick={() => go("book")}
              style={{ padding:"16px 36px", borderRadius:12, fontSize:16, fontWeight:600,
                display:"flex", alignItems:"center", gap:8, background:'#c39748' }}>
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
   SERVICE CARD COMPONENT
   Each card shows summary + expandable details
   To add a photo: replace the emoji div with an img tag
   ============================================================ */
function ServiceCard({ s, go }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:"white", borderRadius:20, overflow:"hidden",
      border:`1px solid ${open?"#0891b2":"rgba(14,116,144,.07)"}`,
      boxShadow: open?"0 8px 32px rgba(8,145,178,0.12)":"0 2px 12px rgba(0,0,0,0.04)",
      transition:"all .3s" }}>
      {/* Service photo/icon area */}
      <div style={{ width:"100%", height:220, overflow:"hidden",
  position:"relative" }}>
  {s.photo ? (
    <img src={require(`./images/${s.photo}`)}
      alt={s.title}
      style={{ width:"100%", height:"100%", objectFit:"cover" }} />
  ) : (
    <div style={{ width:"100%", height:"100%",
      background:"linear-gradient(135deg,#e0f7fa,#cffafe)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:64 }}>{s.emoji}</div>
  )}
        <div style={{ position:"absolute", top:12, right:12,
          background:"#0891b2", borderRadius:8, padding:"3px 10px",
          fontSize:10, color:"white", fontWeight:700, letterSpacing:"0.05em" }}>
          {s.tag || "DENTAL"}
        </div>
      </div>
      {/* Card content */}
      <div style={{ padding:"22px 22px 16px" }}>
        <h3 className="serif" style={{ fontSize:18, color:"#0a3550",
          fontWeight:600, marginBottom:8 }}>{s.title}</h3>
        <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65,
          marginBottom:14 }}>{s.desc}</p>
        {/* Expand button */}
        <button onClick={() => setOpen(!open)}
          style={{ width:"100%", padding:"9px", borderRadius:9, border:"none",
            background: open?"#0891b2":"#e0f7fa", color: open?"white":"#0891b2",
            fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .2s",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
          {open ? "Show Less ▲" : "Learn More ▼"}
        </button>
        {/* Expandable details */}
        {open && (
          <div style={{ marginTop:18, paddingTop:18,
            borderTop:"1px solid rgba(14,116,144,.1)" }}>
            {/* Meaning */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#0891b2",
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
                What it is
              </div>
              <p style={{ fontSize:13, color:"#475569", lineHeight:1.7 }}>{s.meaning}</p>
            </div>
            {/* Includes */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#0891b2",
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
                What's Included
              </div>
              {s.includes.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start",
                  gap:8, marginBottom:5 }}>
                  <div style={{ width:16, height:16, borderRadius:"50%",
                    background:"#e0f7fa", display:"flex", alignItems:"center",
                    justifyContent:"center", flexShrink:0, marginTop:1 }}>
                    <Check size={9} color="#0891b2" />
                  </div>
                  <span style={{ fontSize:13, color:"#475569" }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Benefits */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#059669",
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
                Benefits
              </div>
              {s.benefits.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start",
                  gap:8, marginBottom:5 }}>
                  <span style={{ color:"#059669", fontSize:14, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:13, color:"#475569" }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Risks */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#d97706",
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
                Risks & Considerations
              </div>
              {s.risks.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start",
                  gap:8, marginBottom:5 }}>
                  <span style={{ color:"#d97706", fontSize:14, flexShrink:0 }}>⚠</span>
                  <span style={{ fontSize:13, color:"#475569" }}>{item}</span>
                </div>
              ))}
            </div>
            {/* What to expect */}
            <div style={{ background:"#f8fafc", borderRadius:10,
              padding:"12px 14px", marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#0a3550",
                textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>
                What to Expect
              </div>
              <p style={{ fontSize:13, color:"#475569", lineHeight:1.7, margin:0 }}>
                {s.expect}
              </p>
            </div>
            <button className="btn-p" onClick={() => go("book")}
              style={{ padding:"10px", borderRadius:9, fontSize:13,
                fontWeight:600, width:"100%", border:"none", cursor:"pointer" }}>
              Book This Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



/* ============================================================
   OFFERS PAGE
   Edit prices and offer details here
   ============================================================ */
function OffersPage({ go }) {
  const offers = [
    {
      emoji:"🏠",
      photo:"whitening-home.jpg",
      tag:"WHITENING",
      tagColor:"#0891b2",
      title:"Take-Home Teeth Whitening",
      price:"$250",
      original:"$450",
      highlight:false,
      desc:"Professional custom-fitted whitening trays with professional-strength gel for stunning results from home.",
      includes:["Custom-fitted whitening trays","Professional whitening gel syringes","Full instructions","Results in 1–2 weeks"],
      note:null
    },
    {
      emoji:"✨",
      photo:"whitening-chair.jpg",
      tag:"WHITENING",
      tagColor:"#0891b2",
      title:"In-Chair Teeth Whitening",
      price:"$450",
      original:"$750",
      highlight:false,
      desc:"Professional in-clinic whitening for immediately whiter teeth in a single 90-minute appointment.",
      includes:["In-chair professional whitening","Up to 8 shades lighter","Immediate results","Single appointment"],
      note:null
    },
    {
      emoji:"⭐",
      photo:"whitening-package.jpg",
      tag:"BEST VALUE",
      tagColor:"#059669",
      title:"Complete Whitening Package",
      price:"$600",
      original:"$995",
      highlight:true,
      desc:"The ultimate whitening package — in-chair whitening PLUS take-home trays for maximum results and long-lasting brightness.",
      includes:["In-chair whitening session","Custom take-home trays","Professional whitening gel","Best possible results","Maintain your results at home"],
      note:"Save $100 compared to booking separately!"
    },
    {
      emoji:"👨‍👩‍👧",
      photo:"family.jpg",
      tag:"FAMILY OFFER",
      tagColor:"#7c3aed",
      title:"2 Kids Medicare Check-up + 1 Parent Check-up FREE",
      price:"FREE",
      original:"$320",
      highlight:true,
      desc:"Bring your two children for their Medicare-covered check-up and clean — and we will give ONE parent a full check-up and clean completely FREE of charge.",
      includes:[
        "✅ Child 1 — Full check-up & clean (Medicare CDBS)",
        "✅ Child 2 — Full check-up & clean (Medicare CDBS)",
        "🎁 Parent — Full check-up & clean COMPLIMENTARY",
        "X-rays included if clinically needed",
        "Personalised oral health advice for the whole family"
      ],
      note:"Children must be eligible for Medicare Child Dental Benefit Schedule. One complimentary parent visit per family. Call us to confirm your children's eligibility before booking."
    },
    {
      emoji:"🏥",
      photo:"checkup.jpg",
      tag:"HEALTH FUND",
      tagColor:"#059669",
      title:"Check-up & Clean with Private Health Insurance",
      price:"$0 out of pocket",
      original:null,
      highlight:false,
      desc:"If you have private health insurance with extras cover, your check-up and clean may cost you nothing out of pocket. We process your claim on the spot with HICAPS.",
      includes:["Full check-up and examination","Professional scale and clean","HICAPS on-the-spot claiming","No gap in most cases"],
      note:"Out-of-pocket costs vary by health fund and policy level. Call us to check your cover before booking."
    },
    {
      emoji:"🦷",
      photo:"Checkup2.jpg",
      tag:"SPECIAL OFFER",
      tagColor:"#0891b2",
      title:"Check-up & Clean with X-Rays",
      price:"$165",
      original:"$320",
      highlight:false,
      desc:"Comprehensive dental check-up, professional clean, and X-rays — everything you need to know about your oral health at a special discounted price.",
      includes:[
        "Full mouth examination",
        "Professional scale and clean",
        "Digital X-rays",
        "Oral cancer screening",
        "Personalised oral health advice"
      ],
      note:"Valid for new patients and existing patients without a recent check-up."
    },
    {
      emoji:"🔩",
      photo:"implants.jpg",
      tag:"IMPLANTS",
      tagColor:"#0a3550",
      title:"Dental Implant with Crown",
      price:"$3,800",
      original:"$5,000",
      highlight:true,
      desc:"Complete single tooth replacement including the titanium implant, abutment, and custom porcelain crown. A permanent solution for a missing tooth.",
      includes:["Initial consultation and X-rays","Titanium implant placement","Healing period monitoring","Custom porcelain crown","Complete permanent tooth replacement"],
      note:"Price is for a single implant and crown. Payment plans available."
    },
    {
      emoji:"💉",
       photo:"botox.jpg",
      tag:"AESTHETICS",
      tagColor:"#c05577",
      title:"Cosmetic Injection Special Offers",
      price:"Contact Us",
      original:null,
      highlight:false,
      desc:"We regularly offer special pricing on anti-wrinkle injections (Botox) and dermal fillers. Call or message us to ask about our current aesthetic injection offers.",
      includes:["Anti-wrinkle injections (Botox)","Dermal fillers","Lip enhancement","Jawline contouring","Masseter Botox for grinding"],
      note:"Prices vary by area and units required. Contact us for a personalised quote."
    },
  ];

  return (
    <div className="page-enter" style={{ paddingTop:68 }}>
      {/* Hero */}
      <section style={{ padding:"72px 24px 56px",
        background:"linear-gradient(135deg,#0a3550,#0e7490)",
        textAlign:"center", position:"relative" }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.35 }} />
        <div style={{ position:"relative" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,.15)",
            border:"1px solid rgba(255,255,255,.25)",
            borderRadius:20, padding:"5px 16px", marginBottom:14 }}>
            <span style={{ fontSize:11, color:"#67e8f9", letterSpacing:"0.1em",
              textTransform:"uppercase", fontWeight:700 }}>Limited Time Offers</span>
          </div>
          <h1 className="serif" style={{ fontSize:"clamp(34px,5vw,60px)",
            color:"white", fontWeight:600, marginBottom:10 }}>
            Special Offers
          </h1>
          <p style={{ color:"rgba(255,255,255,.68)", fontSize:17,
            maxWidth:500, margin:"0 auto" }}>
            Quality dental and aesthetic care at prices that won't break the bank.
          </p>
        </div>
      </section>

      {/* Offers grid */}

      <section style={{ padding:"72px 24px 72px", background:"#f8fafc" }}>
  <div style={{ paddingTop:24 }}>

      {/* Attention banner */}
<div style={{ maxWidth:1100, margin:"0 auto 36px",
  background:"linear-gradient(135deg,#0a3550,#0891b2)",
  borderRadius:18, padding:"24px 32px",
  display:"flex", alignItems:"center", justifyContent:"space-between",
  flexWrap:"wrap", gap:16, boxShadow:"0 8px 32px rgba(8,145,178,.25)" }}>
  <div>
    <div style={{ fontSize:11, color:"#67e8f9", fontWeight:700,
      letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:6 }}>
      🔥 Limited Time Only
    </div>
    <div className="serif" style={{ fontSize:26, color:"white",
    fontWeight:700, lineHeight:1.2 }}>
    {offers.length} Exclusive Offers for New & Existing Patients
  </div>
  </div>
  <button className="btn-p" onClick={() => go("book")}
    style={{ padding:"13px 26px", borderRadius:10, fontSize:14,
      fontWeight:700, border:"2px solid rgba(255,255,255,.4)",
      background:"rgba(255,255,255,.15)", cursor:"pointer",
      color:"white", whiteSpace:"nowrap" }}>
    📅 Book Now & Save
  </button>
</div>

<div style={{ maxWidth:1100, margin:"0 auto",
  display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}></div>
        <div style={{ maxWidth:1100, margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>

          {offers.map((o,i) => (
            <div key={i} style={{ background:"white", borderRadius:20,
              overflow:"visible",
              border: o.highlight ? "2px solid #0891b2" : "1px solid rgba(14,116,144,.07)",
              boxShadow: o.highlight
                ? "0 12px 40px rgba(8,145,178,0.18)"
                : "0 4px 16px rgba(0,0,0,0.05)",
              position:"relative" }}>
                {/* Offer number ribbon — sits above the card */}
                <div style={{
                  position:"absolute",
                  top:-16,
                  left:"50%",
                  transform:"translateX(-50%)",
                  zIndex:10,
                  background:"#0a3550",
                  color:"white",
                  padding:"6px 22px",
                  borderRadius:20,
                  fontSize:11,
                  fontWeight:800,
                  letterSpacing:"0.14em",
                  textTransform:"uppercase",
                  boxShadow:"0 4px 14px rgba(10,53,80,.3)",
                  whiteSpace:"nowrap",
                  display:"flex",
                  alignItems:"center",
                  gap:6
                }}>
                  <span style={{ color:"#22d3ee" }}>✦</span>
                  OFFER {i+1}
                  <span style={{ color:"#22d3ee" }}>✦</span>
                </div>
            {/* Best deal badge */}
            {o.highlight && (
              <div style={{ position:"absolute", top:16, right:16, zIndex:2,
                background:"linear-gradient(135deg,#0891b2,#22d3ee)",
                color:"white", borderRadius:10,
                padding:"6px 14px", fontSize:11, fontWeight:800,
                letterSpacing:"0.06em", boxShadow:"0 4px 12px rgba(8,145,178,.4)" }}>
                ⭐ BEST DEAL
              </div>
            )}
              
              {/* Top section */}
              <div style={{ padding:"28px 24px 20px" }}>
                {o.photo && (
  <div style={{ width:"100%", height:200, overflow:"hidden",
    borderRadius:"12px 12px 0 0", marginBottom:16, marginTop:-28,
    marginLeft:-24, marginRight:-24, width:"calc(100% + 48px)" }}>
    <img src={require(`./images/${o.photo}`)}
      alt={o.title}
      style={{ width:"100%", height:"100%",
        objectFit:"cover", objectPosition:"center" }} />
  </div>
)}
<div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
  {!o.photo && <div style={{ fontSize:36 }}>{o.emoji}</div>}
  <div style={{ background:`${o.tagColor}18`,
                    color:o.tagColor, borderRadius:8,
                    padding:"3px 10px", fontSize:10, fontWeight:700,
                    letterSpacing:"0.08em" }}>
                    {o.tag}
                  </div>
                </div>
                <h3 className="serif" style={{ fontSize:22, color:"#0a3550",
                   fontWeight:700, marginBottom:8, lineHeight:1.2 }}>{o.title}</h3>
                <p style={{ fontSize:13, color:"#64748b",
                  lineHeight:1.65, marginBottom:16 }}>{o.desc}</p>
                {/* Price */}
                <div style={{ display:"flex", alignItems:"baseline",
                  gap:10, marginBottom:16, flexWrap:"wrap" }}>
                  <div className="serif" style={{ fontSize:42, fontWeight:800,
                    background:"linear-gradient(135deg,#0891b2,#22d3ee)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                    lineHeight:1 }}>{o.price}</div>
                  {o.original && (
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <div style={{ fontSize:13, color:"#94a3b8",
                        textDecoration:"line-through" }}>{o.original}</div>
                      <div style={{ fontSize:11, color:"#059669", fontWeight:700 }}>
                        YOU SAVE {o.original}
                      </div>
                    </div>
                  )}
                </div>
                {/* Includes */}
                <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
                  {o.includes.map((item,j) => (
                    <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                      <div style={{ width:16, height:16, borderRadius:"50%",
                        background:"#e0f7fa", display:"flex", alignItems:"center",
                        justifyContent:"center", flexShrink:0, marginTop:1 }}>
                        <Check size={9} color="#0891b2" />
                      </div>
                      <span style={{ fontSize:13, color:"#374151" }}>{item}</span>
                    </div>
                  ))}
                </div>
                {/* Note */}
                {o.note && (
                  <div style={{ background:"#fffbeb", border:"1px solid #fde68a",
                    borderRadius:8, padding:"8px 12px", marginBottom:16,
                    fontSize:12, color:"#92400e", lineHeight:1.5 }}>
                    ℹ️ {o.note}
                  </div>
                )}
              </div>
              {/* CTA */}
              <div style={{ padding:"0 24px 24px" }}>
                {o.price === "Contact Us" ? (
                  <button className="btn-p" onClick={() => go("contact")}
                    style={{ padding:"11px", borderRadius:10, fontSize:14,
                      fontWeight:600, width:"100%", border:"none", cursor:"pointer" }}>
                    Contact Us for Pricing
                  </button>
                ) : (
                  <button className="btn-p" onClick={() => go("book")}
                    style={{ padding:"11px", borderRadius:10, fontSize:14,
                      fontWeight:600, width:"100%", border:"none", cursor:"pointer" }}>
                    Book This Offer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
        {/* Bottom note */}
        <div style={{ maxWidth:600, margin:"40px auto 0", textAlign:"center",
          background:"white", borderRadius:16, padding:"22px",
          border:"1px solid rgba(14,116,144,.08)" }}>
          <div style={{ fontSize:20, marginBottom:8 }}>💳</div>
          <div style={{ fontWeight:600, color:"#0a3550", fontSize:15, marginBottom:6 }}>
            Payment Plans Available
          </div>
          <p style={{ fontSize:13, color:"#64748b", lineHeight:1.65 }}>
            We understand dental care is an investment. Ask our team about flexible payment options available at the clinic. All major health funds accepted with HICAPS on-site.
          </p>
        </div>
      </section>
    </div>
  );
}


/* ============================================================
   SERVICES PAGE
   To add a service: copy one object in the `all` array,
   paste it, and fill in the details.
   Replace emoji with <img> tag when you have real photos.
   ============================================================ */
function ServicesPage({ go, targetService }) {
  const all = [
    {
      emoji:"🦷", tag:"GENERAL",
       photo:"checkup.jpg",
      title:"General Dental Check-up & Clean",
      desc:"Comprehensive examination and professional cleaning to maintain optimal oral health.",
      meaning:"A routine check-up involves a thorough examination of your teeth, gums, and mouth to detect any problems early. The professional clean removes plaque and tartar that regular brushing cannot reach.",
      includes:["Full mouth examination","Professional scale and clean","Digital X-rays if needed","Oral cancer screening","Gum health assessment","Personalised home care advice"],
      benefits:["Early detection of problems before they worsen","Prevention of cavities and gum disease","Fresher breath and polished teeth","Long-term cost savings","Peace of mind about your oral health"],
      risks:["Mild gum tenderness for 24–48 hours after cleaning","Temporary sensitivity — resolves quickly"],
      expect:"Your appointment takes 45 to 60 minutes. The dentist examines your mouth thoroughly, then performs a professional scale and polish. X-rays may be taken if needed. You'll receive personalised advice on home care before you leave."
    },
    {
      emoji:"🔩", tag:"IMPLANTS",
       photo:"implants.jpg",
      title:"Dental Implants",
      desc:"Permanent titanium tooth replacement that looks, feels, and functions like a natural tooth.",
      meaning:"A dental implant is a titanium post surgically placed into the jawbone to act as an artificial tooth root. Once healed, a custom-made crown is attached — giving you a permanent, natural-looking replacement tooth.",
      includes:["Initial consultation and 3D imaging","Implant placement surgery under local anaesthetic","Healing period monitoring","Abutment placement","Custom shade-matched crown fitting"],
      benefits:["Permanent — designed to last a lifetime","Looks, feels, and functions like a natural tooth","Preserves jawbone and facial structure","No adhesives or removal required","Easy to clean like natural teeth"],
      risks:["Small risk of infection post-surgery","Rare implant failure (less than 5%)","Temporary swelling and discomfort after placement","Requires adequate bone density — assessed before treatment"],
      expect:"The full process takes 3 to 6 months. The implant is placed under local anaesthetic in a straightforward procedure. After a healing period of 3–4 months, the final crown is attached. The end result is indistinguishable from a natural tooth."
    },
    {
      emoji:"✨", tag:"WHITENING",
       photo:"whitening-chair.jpg",
      title:"Teeth Whitening — In-Chair",
      desc:"Professional in-clinic whitening for dramatically whiter teeth in a single appointment.",
      meaning:"In-chair whitening uses professional-strength bleaching gel activated under a special light to break down stains and discolouration. Results are immediate and significantly stronger than any over-the-counter product.",
      includes:["Pre-whitening examination","Gum and tooth protection","Professional bleaching gel application","LED light activation","Up to 8 shades lighter in one session"],
      benefits:["Immediate results in 60–90 minutes","Safe and controlled by a professional","Significantly stronger than home kits","Long-lasting results up to 2 years"],
      risks:["Temporary tooth sensitivity (24–48 hours)","Mild gum irritation — resolves quickly","Not suitable for crowns or veneers (those won't whiten)"],
      expect:"Your appointment takes approximately 90 minutes. Your gums are protected, then the whitening gel is applied in three 20-minute sessions with LED light activation. Results are immediate — you'll leave with a noticeably brighter smile."
    },
    {
      emoji:"🏠", tag:"WHITENING",
       photo:"whitening-home.jpg",
      title:"Teeth Whitening — Take-Home Trays",
      desc:"Custom-fitted whitening trays for professional results from the comfort of your home.",
      meaning:"Take-home whitening uses custom-made trays fitted precisely to your teeth, combined with professional-strength whitening gel. You wear the trays for a set time each day, gradually whitening your teeth over 1 to 2 weeks.",
      includes:["Custom impressions for your trays","Professional whitening gel syringes","Instructions and maintenance advice","Follow-up check if needed"],
      benefits:["Convenient — whiten at home on your schedule","Custom trays ensure even, safe whitening","Trays can be reused for top-up treatments","More affordable than in-chair whitening"],
      risks:["Temporary sensitivity during treatment","Results take 1–2 weeks (not instant)","Must be used as directed for best results"],
      expect:"We take impressions of your teeth at your first appointment and your custom trays are ready within a few days. You'll wear the trays for 30–60 minutes daily for 1–2 weeks. Most patients see 4–6 shades improvement."
    },
    {
      emoji:"💎", tag:"COSMETIC",
       photo:"veneers.jpg",
      title:"Porcelain Veneers",
      desc:"Ultra-thin porcelain shells that transform the shape, colour, and size of your teeth.",
      meaning:"Veneers are custom-made, wafer-thin shells of porcelain bonded to the front surface of your teeth. They are used to fix chips, gaps, staining, and misshapen teeth — creating a perfect, natural-looking smile.",
      includes:["Smile design consultation","Tooth preparation (minimal enamel removal)","Temporary veneers while permanents are made","Custom porcelain veneer fabrication","Bonding and bite adjustment"],
      benefits:["Dramatic smile transformation","Natural-looking and stain-resistant","Long-lasting — 10 to 15 years with care","Minimal tooth removal compared to crowns","Boosts confidence significantly"],
      risks:["Irreversible — some enamel is permanently removed","Can chip if excessive force is applied","Not suitable for teeth with extensive decay","May require replacement after 10–15 years"],
      expect:"Veneers typically require 2 to 3 appointments. At the first visit, teeth are prepared and temporary veneers placed. Your custom porcelain veneers are then fabricated and bonded at the second visit. Results are immediately life-changing."
    },
    {
      emoji:"🦠", tag:"GENERAL",
       photo:"rootcanal.jpg",
      title:"Root Canal Treatment",
      desc:"Pain-free treatment to save an infected tooth and relieve acute toothache.",
      meaning:"Root canal therapy removes infected or dead pulp (the nerve and blood supply) from inside a tooth. The canal is cleaned, disinfected, and sealed — saving the tooth from extraction and eliminating pain.",
      includes:["Local anaesthetic for complete comfort","Infected pulp removal","Canal cleaning and disinfection","Permanent sealing of the canal","Crown placement recommended afterwards"],
      benefits:["Saves the natural tooth from extraction","Eliminates toothache and infection","Relatively comfortable with modern techniques","Restored tooth can last a lifetime"],
      risks:["Mild discomfort for a few days after treatment","Very rarely, re-treatment may be needed","Treated tooth may become more brittle over time — crown recommended"],
      expect:"Root canal treatment takes 1 to 2 appointments of 60–90 minutes each. Local anaesthetic ensures you feel no pain during the procedure. Most patients are surprised at how comfortable it is. Mild soreness for 2–3 days afterwards is normal."
    },
    {
      emoji:"👑", tag:"GENERAL",
       photo:"dental crown procedure.jpg",
      title:"Dental Crowns",
      desc:"Custom caps that restore the shape, strength, and appearance of damaged teeth.",
      meaning:"A dental crown is a custom-made cap that covers the entire visible portion of a damaged, broken, or heavily filled tooth. Crowns restore full function and appearance while protecting the tooth from further damage.",
      includes:["Tooth preparation and shaping","Digital impressions","Temporary crown placement","Custom porcelain or zirconia crown fabrication","Permanent bonding and bite adjustment"],
      benefits:["Restores full tooth function","Protects weakened or cracked teeth","Natural-looking and colour-matched","Long-lasting — 10 to 15 years with care"],
      risks:["Some sensitivity after placement","Temporary crown may feel different","Rare: crown may need replacing after many years"],
      expect:"Crowns require 2 appointments. At the first visit, the tooth is shaped and a temporary crown placed. Your permanent custom crown is fitted at the second visit. The entire process takes about 2 weeks."
    },
    {
      emoji:"🌉", tag:"GENERAL",
       photo:"dental bridge teeth.jpg",
      title:"Dental Bridges",
      desc:"A fixed restoration that replaces one or more missing teeth using neighbouring teeth as support.",
      meaning:"A dental bridge fills the gap left by one or more missing teeth. It consists of artificial teeth (pontics) anchored to crowns on the adjacent natural teeth — creating a fixed, non-removable replacement.",
      includes:["Assessment and treatment planning","Preparation of supporting teeth","Impressions and temporary bridge","Custom bridge fabrication","Permanent cementation"],
      benefits:["Fixed — does not need to be removed","Restores chewing function and appearance","Prevents neighbouring teeth from shifting","More affordable than implants"],
      risks:["Supporting teeth require preparation (permanent)","Harder to clean under the bridge","May need replacing after 10–15 years"],
      expect:"Similar to crowns, bridges require 2 appointments over 2 weeks. The final result is a fixed, natural-looking replacement for your missing teeth that is easy to live with."
    },
    {
      emoji:"🎨", tag:"GENERAL",
       photo:"composite filling dentist.jpg",
      title:"Tooth Coloured Fillings",
      desc:"Natural-looking composite resin fillings that blend seamlessly with your teeth.",
      meaning:"Tooth-coloured fillings use composite resin material matched to your natural tooth colour to repair cavities and decay. They bond directly to the tooth structure, requiring less removal of healthy tooth than old silver amalgam fillings.",
      includes:["Decay removal under local anaesthetic","Composite resin application","Shade matching to natural tooth","Shaping and polishing","Bite check and adjustment"],
      benefits:["Completely invisible — matches your tooth colour","Mercury-free","Bonds to tooth structure for added strength","Completed in a single visit"],
      risks:["May stain slightly over many years","May need replacing after 7–10 years","Mild sensitivity for a few days post-treatment"],
      expect:"A filling appointment takes 30 to 60 minutes depending on the size of the cavity. Local anaesthetic is used for complete comfort. The filling is placed, shaped, and polished in the same visit. You can eat within a few hours."
    },
    {
      emoji:"🚨", tag:"EMERGENCY",
       photo:"emergency.jpg",
      title:"Emergency Dental Care",
      desc:"Same-day urgent appointments for toothache, trauma, broken teeth, and lost fillings.",
      meaning:"Dental emergencies include sudden toothache, chipped or broken teeth, knocked-out teeth, lost fillings or crowns, facial swelling, and dental abscesses. Prompt treatment relieves pain and prevents further complications.",
      includes:["Same-day emergency appointment","Pain relief and diagnosis","Emergency treatment — filling, extraction, or antibiotics","Follow-up plan for ongoing care"],
      benefits:["Immediate pain relief","Prevention of infection spreading","Saves teeth that might otherwise be lost","Peace of mind in a stressful situation"],
      risks:["Varies depending on the emergency and treatment required"],
      expect:"Call us first thing in the morning and we will do our best to see you the same day. We will assess the situation, relieve your pain, and provide emergency treatment. A follow-up plan will be discussed at your appointment."
    },
    {
      emoji:"👶", tag:"FAMILY",
       photo:"children.jpg",
      title:"Children's Dentistry",
      desc:"Gentle, fun, and stress-free dental care for children of all ages.",
      meaning:"Children's dentistry focuses on preventive care, early detection of problems, and creating positive dental experiences for young patients. Starting dental visits early builds lifelong healthy habits.",
      includes:["Gentle examination","Teeth cleaning and fluoride treatment","Fissure sealants (cavity prevention)","X-rays if needed","Education on brushing and diet","Parent guidance"],
      benefits:["Early detection and prevention of problems","Positive dental habits formed early","Prevents fear of dentists in adulthood","Medicare Child Dental Benefit Schedule (CDBS) accepted"],
      risks:["Minimal risk — routine preventive care"],
      expect:"We make children's visits fun and stress-free. Our team is trained to work with children at their pace. First visits are usually short and gentle — focused on building trust. Most children leave happy and looking forward to their next visit."
    },
    {
      emoji:"💉", tag:"AESTHETICS",
       photo:"botox.jpg",
      title:"Anti-Wrinkle Injections",
      desc:"Smooth dynamic wrinkles and refresh your appearance with TGA-approved anti-wrinkle treatments.",
      meaning:"Anti-wrinkle injections (commonly known as Botox) use a purified protein to temporarily relax facial muscles that cause frown lines, forehead lines, and crow's feet. Results are natural-looking and non-surgical.",
      includes:["Facial assessment and treatment planning","TGA-approved anti-wrinkle product","Precise injection technique","15 to 30 minute appointment","Review appointment if needed"],
      benefits:["Smooths wrinkles without surgery","Natural-looking results","Quick procedure with no downtime","Results last 3 to 4 months","Prevents deepening of lines over time"],
      risks:["Temporary bruising or swelling at injection sites","Headache (rare, short-lived)","Asymmetry if product migrates — very rare with experienced practitioners","Results are temporary — treatment needed every 3–4 months"],
      expect:"Your appointment takes 15 to 30 minutes. A thorough facial assessment is performed first. Injections are quick with minimal discomfort. Results begin appearing within 3 to 5 days and are fully visible at 2 weeks. No downtime required."
    },
    {
      emoji:"😬", tag:"GENERAL",
       photo:"grinding.jpg",
      title:"Teeth Grinding Treatment",
      desc:"Protect your teeth and relieve jaw pain caused by grinding and clenching (bruxism).",
      meaning:"Bruxism is the unconscious grinding or clenching of teeth, usually during sleep. Over time it causes worn teeth, jaw pain, headaches, and cracked teeth. Treatment involves custom splints and in some cases anti-wrinkle injections to relax the jaw muscles.",
      includes:["Examination and bruxism assessment","Custom-made night splint (occlusal splint)","Anti-wrinkle jaw injections (Masseter Botox) if indicated","Follow-up monitoring"],
      benefits:["Protects teeth from further wear","Relieves jaw pain and morning headaches","Reduces frequency and intensity of grinding","Slims the jawline appearance (with Masseter Botox)"],
      risks:["Splint may take a few nights to get used to","Masseter Botox may cause temporary difficulty chewing hard foods"],
      expect:"After assessment, your custom splint impressions are taken. The splint is ready within 1 to 2 weeks. If Masseter Botox is recommended, this is a separate quick appointment. Most patients notice significant relief within weeks."
    },
    {
      emoji:"💆", tag:"AESTHETICS",
       photo:"face fillers.jpg",
      title:"Face Enhancement with Dermal Filler",
      desc:"Restore volume, define features, and rejuvenate your appearance with dermal fillers.",
      meaning:"Dermal fillers use hyaluronic acid — a naturally occurring substance — to add volume, smooth lines, and enhance facial features. Common areas include cheeks, jawline, under-eyes, and nasolabial folds.",
      includes:["Full facial assessment","Topical numbing cream","Precise filler placement","Massage and moulding for natural results","Review appointment if needed"],
      benefits:["Instant volume restoration","Reduces deep lines and hollows","Defines and contours facial features","Natural-looking results","No surgery or downtime"],
      risks:["Temporary bruising or swelling (3–5 days)","Lumps — smoothed at review if needed","Rare: vascular occlusion (prevented by experienced practitioners)","Results last 9 to 18 months depending on area"],
      expect:"Your appointment takes 30 to 60 minutes including assessment and treatment. Numbing cream is applied for comfort. Filler is injected with precision. Results are immediate. A small amount of swelling is normal and settles within a few days."
    },
    {
      emoji:"👄", tag:"AESTHETICS",
       photo:"fillers.jpg",
      title:"Lip Enhancement",
      desc:"Achieve fuller, more defined lips with natural-looking hyaluronic acid filler.",
      meaning:"Lip filler uses hyaluronic acid to add volume, define the border, and improve the shape of the lips. Treatment can be subtle (natural enhancement) or more dramatic depending on your goals.",
      includes:["Lip assessment and goal discussion","Topical numbing cream","Hyaluronic acid filler injection","Shaping and symmetry check","Review if needed"],
      benefits:["Fuller, more defined lips","Improved symmetry","Hydrated and youthful appearance","Completely reversible with dissolving enzyme","Results last 6 to 12 months"],
      risks:["Swelling and bruising for 3 to 5 days","Lumps — resolve naturally or at review","Asymmetry — corrected at review","Rare: vascular complications"],
      expect:"The appointment takes 30 minutes. Numbing cream is applied for 15 minutes before treatment. Filler is carefully injected using fine needles. Lips will appear slightly swollen immediately — final results are visible after 1 to 2 weeks once swelling settles."
    },
    {
      emoji:"😊", tag:"COSMETIC",
       photo:"Cosmetic Dentistry.jpg",
      title:"Cosmetic Dentistry",
      desc:"Smile makeovers combining multiple treatments to transform your smile completely.",
      meaning:"Cosmetic dentistry combines treatments such as whitening, veneers, bonding, and gum contouring to create a complete smile transformation tailored to your unique facial features and goals.",
      includes:["Smile design consultation","Digital smile preview","Combination of whitening, veneers, bonding, or crowns","Full smile makeover plan","Before and after photos"],
      benefits:["Complete smile transformation","Fully personalised to your face and goals","Boosts confidence dramatically","Long-lasting results"],
      risks:["Varies depending on treatments included","All risks discussed individually during consultation"],
      expect:"We start with a detailed smile design consultation where we listen to your goals and create a personalised plan. You'll see a digital preview of your expected results before any treatment begins."
    },
    {
      emoji:"👨‍👩‍👧", tag:"FAMILY",
       photo:"family.jpg",
      title:"Family Dentistry",
      desc:"Comprehensive dental care for every member of your family, from toddlers to seniors.",
      meaning:"Family dentistry means we treat all ages in the one practice — children, adults, and elderly patients. We build long-term relationships with families and provide continuity of care across generations.",
      includes:["Check-ups and cleans for all ages","Children's preventive care","Adult restorative and cosmetic treatments","Senior dental care","Medicare CDBS for eligible children"],
      benefits:["Convenience — whole family at one clinic","Consistent, familiar care you can trust","Long-term relationship with your dentist","Children build positive associations with dental care early"],
      risks:["No specific risks — routine family care"],
      expect:"Whether you're bringing in a toddler for their first visit or a grandparent for a new set of dentures, our team is experienced and gentle with patients of all ages. We make every visit comfortable and stress-free."
    },
    {
      emoji:"🦴", tag:"GENERAL",
       photo:"dentures.jpg",
      title:"Dentures",
      desc:"Custom-made removable tooth replacements to restore your smile and chewing function.",
      meaning:"Dentures are removable prosthetic devices that replace missing teeth. They can be full (replacing all teeth) or partial (replacing some teeth). Modern dentures are natural-looking and comfortable.",
      includes:["Impressions and bite measurements","Custom fabrication","Trial fitting and adjustments","Final fitting","Maintenance advice"],
      benefits:["Restores ability to eat and speak normally","Improves facial appearance and confidence","Removable for easy cleaning","More affordable than implants"],
      risks:["May feel loose or uncomfortable initially","Requires adjustment period","May need relining as jawbone changes over time","Cannot chew as hard as natural teeth"],
      expect:"Dentures require 4 to 5 appointments over several weeks. We take precise impressions, fabricate your dentures, and conduct trial fittings to ensure perfect fit and appearance before the final denture is delivered."
    },
    {
      emoji:"🦷", tag:"ORAL SURGERY",
       photo:"wisdom.jpg",
      title:"Wisdom Teeth Removal",
      desc:"Safe removal of problematic wisdom teeth to prevent pain, infection, and crowding.",
      meaning:"Wisdom teeth (third molars) often cause problems when there is not enough room for them to erupt properly. Impacted or partially erupted wisdom teeth can cause pain, infection, and damage to adjacent teeth.",
      includes:["Digital X-rays and assessment","Local anaesthetic","Surgical extraction if impacted","Post-operative care instructions","Follow-up check"],
      benefits:["Eliminates pain and recurring infections","Prevents damage to adjacent teeth","Reduces risk of cysts and complications","Long-term relief"],
      risks:["Swelling and discomfort for 3 to 7 days","Dry socket (rare — 2 to 5% of cases)","Temporary numbness (resolves)","Infection risk — minimised with antibiotics if needed"],
      expect:"The procedure is performed under local anaesthetic and takes 30 to 60 minutes depending on complexity. You'll receive detailed aftercare instructions. Swelling peaks at day 2 and improves significantly by day 5. Most patients return to work within 3 to 5 days."
    },
    {
      emoji:"🔧", tag:"GENERAL",
       photo:"extraction.jpg",
      title:"Teeth Extraction",
      desc:"Gentle, pain-free removal of teeth that cannot be saved.",
      meaning:"Sometimes a tooth is too damaged by decay, fracture, or infection to be saved. Extraction removes the tooth to relieve pain and prevent further problems. We always explore saving the tooth first before recommending extraction.",
      includes:["X-ray assessment","Local anaesthetic","Careful extraction technique","Gauze and aftercare pack","Replacement options discussion"],
      benefits:["Immediate relief from pain and infection","Prevention of infection spreading","Makes room for orthodontic treatment if needed"],
      risks:["Swelling and discomfort for 1 to 3 days","Dry socket (rare)","Bone loss in the area over time — implant or bridge recommended"],
      expect:"Extractions are quick — often just 10 to 20 minutes under local anaesthetic. You will feel pressure but no pain. Aftercare is straightforward. We will always discuss your tooth replacement options before you leave."
    },
    {
      emoji:"🛡️", tag:"PREVENTIVE",
       photo:"preventive.jpg",
      title:"Preventive Dental Treatments",
      desc:"Proactive treatments to protect your teeth and prevent problems before they start.",
      meaning:"Preventive dentistry includes fluoride treatments, fissure sealants, dietary advice, and oral hygiene instructions designed to keep your teeth healthy and avoid costly treatments down the track.",
      includes:["Fluoride treatments","Fissure sealants for children and adults","Dietary and home care advice","Oral hygiene demonstrations","Early decay detection"],
      benefits:["Prevents cavities and gum disease","Saves money long-term","Keeps teeth healthy for life","Especially important for children"],
      risks:["Minimal risk — all preventive, non-invasive treatments"],
      expect:"Preventive treatments are quick and painless, usually completed at your regular check-up appointment. Fissure sealants take just a few minutes per tooth and can prevent cavities for years."
    },
    {
      emoji:"🏃", tag:"SPORTS",
       photo:"mouthguard.jpg",
      title:"Mouth Guards for Sports",
      desc:"Custom-fitted sports mouth guards to protect your teeth during contact sports.",
      meaning:"A custom-fitted mouthguard from your dentist provides significantly better protection than over-the-counter guards. They are essential for contact sports like football, basketball, martial arts, and boxing.",
      includes:["Impressions of your teeth","Custom fabrication in your choice of colour","Perfect fit check","Maintenance instructions"],
      benefits:["Protects teeth from fractures and loss","Reduces risk of concussion","Comfortable and easy to breathe with","Lasts 1 to 2 seasons with proper care"],
      risks:["Minimal risk — protective device","May need replacing as teeth change in children"],
      expect:"We take impressions at one appointment and your custom guard is ready within a week. The fit is checked and any adjustments made. A well-fitted guard should feel secure and comfortable without restricting breathing."
    },
    {
      emoji:"😴", tag:"GENERAL",
       photo:"grinding.jpg",
      title:"Splints for Grinding",
      desc:"Custom occlusal splints to protect your teeth from grinding and clenching during sleep.",
      meaning:"An occlusal splint (night guard) is a custom-made hard acrylic device worn over your teeth during sleep. It prevents grinding damage, relieves jaw muscle tension, and protects existing dental work.",
      includes:["Impressions of your teeth","Custom hard acrylic splint fabrication","Fit and bite adjustment","Wear and care instructions","Follow-up monitoring"],
      benefits:["Protects teeth from grinding wear","Reduces jaw pain and morning headaches","Protects crowns, veneers, and fillings","Long-lasting with proper care"],
      risks:["Takes 1 to 2 weeks to adjust to wearing","Increased saliva initially","Splint must be cleaned daily"],
      expect:"Impressions are taken at your first appointment. Your splint is ready within 1 to 2 weeks. The fit is carefully checked and adjusted. Most patients notice reduced jaw pain within weeks of regular use."
    },
    {
      emoji:"🌟", tag:"COSMETIC",
       photo:"smile-design.jpg",
      title:"Smile Design",
      desc:"A fully personalised smile makeover planned around your face, features, and goals.",
      meaning:"Smile design is a comprehensive process where we analyse your teeth, gums, lips, and facial proportions to create a bespoke treatment plan. Using digital technology, you can preview your new smile before any treatment begins.",
      includes:["Detailed smile analysis","Digital smile preview","Comprehensive treatment plan","Combination of cosmetic treatments","Step-by-step implementation","Before and after documentation"],
      benefits:["Completely personalised to your unique features","See your results before committing","Systematic, well-planned transformation","Life-changing confidence boost"],
      risks:["Varies by treatment — all discussed in detail during planning","Full transparency before any work begins"],
      expect:"Your smile design journey starts with an in-depth consultation and photography. We analyse your smile digitally and present a visual plan. Once you are happy with the design, treatment proceeds step by step at your own pace."
    },
  ];

  return (
    <div className="page-enter" style={{ paddingTop:68 }}>
      <section style={{ padding:"72px 24px 56px",
        background:"linear-gradient(135deg,#0a3550,#0e7490)",
        textAlign:"center", position:"relative" }}>
        <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:.35 }} />
        <div style={{ position:"relative" }}>
          <h1 className="serif" style={{ fontSize:"clamp(34px,5vw,60px)",
            color:"white", fontWeight:600, marginBottom:10 }}>
            Our Dental Services
          </h1>
          <p style={{ color:"rgba(255,255,255,.68)", fontSize:17,
            maxWidth:500, margin:"0 auto" }}>
            Click any service to learn more — including what's included, benefits, risks, and what to expect.
          </p>
        </div>
      </section>
      <section style={{ padding:"72px 24px", background:"#f8fafc" }}>
        <div style={{ maxWidth:1200, margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:22 }}>
          {all.map((s,i) => (
            <div key={i}
              ref={el => { if(targetService===s.title && el)
                setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"center"}),100); }}>
              <ServiceCard s={s} go={go} />
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
          display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:40,
          alignItems:"start", width:"100%" }} className="two-col">
          <div>
            <div style={{ width:"100%", maxWidth:380, margin:"0 auto",
              aspectRatio:"3/4", borderRadius:24,
              overflow:"hidden",
              boxShadow:"0 28px 64px rgba(10,53,80,.2)" }}>
              <img src={require('./doctor.png')} alt="Dr. Eyad Almashaal"
                style={{ width:"100%", height:"100%", objectFit:"cover",
                  objectPosition:"center top" }} />
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
              "With over 10 years of experience, Dr. Almashaal believes great dental care begins with listening — understanding each patient's unique concerns and goals. His gentle, patient-centred approach has helped thousands achieve and maintain healthy, confident smiles.",
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
              { icon:<Phone size={19}/>, label:"Phone", val:"0382567501", href:"tel:0382567501"},
              { icon:<Mail size={19}/>, label:"Email", val:"info@lalordental.com.au" },
            ].map(({ icon, label, val, href }) => (
              <div key={label} style={{ display:"flex", gap:14, marginBottom:16,
                background:"white", padding:"16px 20px", borderRadius:14,
                border:"1px solid rgba(14,116,144,.07)" }}>
                <div style={{ width:42, height:42, borderRadius:11, background:"#e0f7fa",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#0891b2", flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize:11, color:"#94a3b8", fontWeight:600,
                    textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3 }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ fontSize:14, color:"#0891b2", fontWeight:500,
                      textDecoration:"none" }}>{val}</a>
                  ) : (
                    <div style={{ fontSize:14, color:"#1e293b", fontWeight:500,
                      whiteSpace:"pre-line" }}>{val}</div>
                  )}                </div>
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
              {[["Monday","By appointment"],["Tuesday","By appointment"],["Wednesday","6:30pm – 9:00pm"],["Thursday","9:00am – 6:00pm"],["Friday","6:30pm – 9:00pm"],["Saturday","6:30pm – 9:00pm"],["Sunday","By appointment"]].map(([day,hrs]) => (  
                  <div key={day} style={{ display:"flex", justifyContent:"space-between",
                  padding:"8px 0", borderBottom:"1px solid #f8fafc", fontSize:13 }}>
                  <span style={{ color:"#64748b" }}>{day}</span>
                  <span style={{ color:hrs==="Closed"?"#ef4444":"#0a3550", fontWeight:500 }}>{hrs}</span>
                </div>
              ))}
            </div>
            {/* Social icons */}
            <div style={{ display:"flex", gap:10 }}>
              {[
                { Icon:Facebook, url:"https://www.facebook.com/share/17wqnvDSLT/" },
                { Icon:Instagram, url:"https://www.instagram.com/lalordentalclinic" },
                { Icon:MessageSquare, url:"https://lalordentalclinic.com.au/#contact" }
              ].map(({Icon,url},i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ width:34, height:34, borderRadius:8,
                    background:"rgba(255,255,255,.07)", display:"flex",
                    alignItems:"center", justifyContent:"center", cursor:"pointer",
                    textDecoration:"none" }}>
                  <Icon size={14} color="rgba(255,255,255,.65)" />
                </a>
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
      setErr("Invalid credentials. Demo: admin@lalordental.com / password");
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
            {[["Monday","By appointment","Call us"],["Tuesday","By appointment","Call us"],
              ["Wednesday","6:30 PM","9:00 PM"],["Thursday","9:00 AM","6:00 PM"],
              ["Friday","6:30 PM","9:00 PM"],["Saturday","6:30 PM","9:00 PM"],
              ["Sunday","By appointment","Call us"]].map(([day,open,close]) => (
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
              Healthy Smile, Confident You. Serving Lalor and northern Melbourne suburbs with over 10 years of experience in dental and aesthetic care.
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
            {[["home","Home"],["services","Services"],["offers","Offers"],["about","About"],["contact","Contact"],["book","Book Appointment"]].map(([id,label]) => (
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
              {[["Monday","By appointment — call us"],["Tuesday","By appointment — call us"],["Wednesday","6:30pm – 9:00pm"],["Thursday","9:00am – 6:00pm"],["Friday","6:30pm – 9:00pm"],["Saturday","6:30pm – 9:00pm"],["Sunday","By appointment — call us"]].map(([d,h]) => (             
                <div key={d} style={{ fontSize:12, marginBottom:8, lineHeight:1.6 }}>
                <span style={{ color:"rgba(255,255,255,.4)" }}>{d}: </span>
                <span style={{ color:h==="Closed"?"#f87171":"rgba(255,255,255,.8)" }}>{h}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color:"white", fontWeight:600, fontSize:13,
              marginBottom:16, letterSpacing:"0.06em", textTransform:"uppercase" }}>Contact</div>
            {[[<MapPin size={12}/>, "362 Edgars Road\nLalor VIC 3075", null],
              [<Phone size={12}/>, "0382567501", "tel:0382567501"],
              [<Mail size={12}/>, "info@lalordentalclinic.com.au", "mailto:info@lalordentalclinic.com.au"]].map(([icon,text,href],i) => (
              <div key={i} style={{ display:"flex", gap:9, marginBottom:11,
                fontSize:12, alignItems:"flex-start" }}>
                <span style={{ color:"#0891b2", marginTop:1, flexShrink:0 }}>{icon}</span>
                {href ? (
                  <a href={href} style={{ whiteSpace:"pre-line", lineHeight:1.65,
                    color:"rgba(255,255,255,.6)", textDecoration:"none" }}>{text}</a>
                ) : (
                  <span style={{ whiteSpace:"pre-line", lineHeight:1.65 }}>{text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:22,
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div style={{ fontSize:11 }}>© 2025 Lalor Dental Clinic. All rights reserved. All content on this website including text, images, and graphics is the property of Lalor Dental Clinic and may not be reproduced without written permission.</div>          <div style={{ display:"flex", gap:18 }}>
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
const go = (p, service = null) => { 
  setPage(p); 
  setMobileOpen(false); 
  setTargetService(service);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <div>
      <GlobalStyles />
      {page !== "admin" && (
        <Navbar page={page} go={go} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
      {page === "home" && <HomePage go={go} />}
      {page === "services" && <ServicesPage go={go} targetService={targetService} />}
      {page === "offers" && <OffersPage go={go} />}
      {page === "about" && <AboutPage go={go} />}
      {page === "contact" && <ContactPage />}
      {page === "book" && <BookPage />}
      {page === "admin" && <AdminPage go={go} />}
      {page !== "admin" && <Footer go={go} />}
    </div>
  );
}