import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";

const features = [
  { icon: "🔥", title: "Fire & Smoke", text: "Covers damage from fire, smoke and explosions." },
  { icon: "🌊", title: "Flood & Storm", text: "Protection against floods, storms and natural disasters." },
  { icon: "🔒", title: "Theft & Burglary", text: "Replacement of stolen valuables and repair of break-ins." },
  { icon: "🏠", title: "Structure Cover", text: "Rebuild or repair your walls, roof and fittings." },
];

const plans = [
  { name: "Basic", price: "₹499", cover: "Up to ₹25 lakh", points: ["Fire & lightning", "Structure cover", "Email support"] },
  { name: "Standard", price: "₹999", cover: "Up to ₹60 lakh", points: ["Everything in Basic", "Flood & storm", "Theft & burglary", "24x7 claim support"], popular: true },
  { name: "Premium", price: "₹1,799", cover: "Up to ₹1.5 crore", points: ["Everything in Standard", "Valuables cover", "Temporary stay cost", "Zero depreciation"] },
];

const steps = [
  { n: 1, title: "Create account", text: "Sign up in under a minute." },
  { n: 2, title: "Choose a plan", text: "Pick the cover that fits your home." },
  { n: 3, title: "Stay protected", text: "File claims online, anytime." },
];

const faqs = [
  { q: "What does home insurance cover?", a: "Your building and belongings against fire, flood, theft and other listed risks." },
  { q: "How fast are claims settled?", a: "Most claims are reviewed within 48 hours of document submission." },
  { q: "Can I change my plan later?", a: "Yes. You can upgrade or downgrade at renewal." },
];

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">🏠 SafeNest</a>
          <nav className="nav-links">
            <a href="#coverage">Coverage</a>
            <a href="#plans">Plans</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-actions">
            {user ? (
              <>
                <Link to="/profile" className="btn-outline">My Profile</Link>
                <button className="btn-link" onClick={() => { logout(); navigate("/"); }}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-outline">Login</Link>
            )}
          </div>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="badge">Trusted by 50,000+ homeowners</span>
            <h1>Protect the home you love, from just ₹499/month</h1>
            <p>Comprehensive home insurance covering fire, flood, theft and more,
               with quick online claims and no hidden charges.</p>
            <ul className="ticks">
              <li>✔ Instant online quote</li>
              <li>✔ 48-hour claim review</li>
              <li>✔ Cancel anytime</li>
            </ul>
          </div>
          <div className="hero-card">
            {user ? (
              <>
                <h3>Welcome back, {user.username}</h3>
                <p>You are signed in. View your account details any time.</p>
                <Link to="/profile" className="btn-primary">Go to my profile</Link>
              </>
            ) : (
              <>
                <h3>Get your free quote</h3>
                <p>Create your account to get started.</p>
                <RegisterForm />
                <p className="small">Already registered? <Link to="/login">Login</Link></p>
              </>
            )}
          </div>
        </div>
      </section>

      <section id="coverage" className="section">
        <div className="container">
          <h2>What we cover</h2>
          <p className="sub">Protection for your home and everything inside it.</p>
          <div className="grid4">
            {features.map((f) => (
              <div className="tile" key={f.title}>
                <div className="icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="section alt">
        <div className="container">
          <h2>Simple, transparent plans</h2>
          <p className="sub">No hidden fees. Upgrade whenever you need.</p>
          <div className="grid3">
            {plans.map((p) => (
              <div className={`plan ${p.popular ? "popular" : ""}`} key={p.name}>
                {p.popular && <span className="badge">Most popular</span>}
                <h3>{p.name}</h3>
                <div className="price">{p.price}<small>/month</small></div>
                <p className="cover">{p.cover}</p>
                <ul>{p.points.map((x) => <li key={x}>✔ {x}</li>)}</ul>
                <a href="#top" className="btn-primary">Get started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="container">
          <h2>How it works</h2>
          <div className="grid3">
            {steps.map((s) => (
              <div className="tile" key={s.n}>
                <div className="num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section alt">
        <div className="container narrow">
          <h2>Frequently asked questions</h2>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container">© 2026 SafeNest Home Insurance. All rights reserved.</div>
      </footer>
    </>
  );
}