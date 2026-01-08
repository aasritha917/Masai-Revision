import { useEffect, useRef, useState } from "react";

export default function App() {
  const sectionsRef = useRef({});
  const [active, setActive] = useState("About");
  const sections = ["About", "Services", "Portfolio", "Contact"];

  const scrollToSection = (name) => {
    sectionsRef.current[name].scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      for (let sec of sections) {
        const rect = sectionsRef.current[sec].getBoundingClientRect();
        if (rect.top >= 0 && rect.top < 150) {
          setActive(sec);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav style={{ position: "fixed", top: 0, background: "#fff", width: "100%" }}>
        {sections.map(sec => (
          <button
            key={sec}
            onClick={() => scrollToSection(sec)}
            style={{ fontWeight: active === sec ? "bold" : "normal" }}
          >
            {sec}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 60 }}>
        {sections.map(sec => (
          <section
            key={sec}
            ref={(el) => (sectionsRef.current[sec] = el)}
            style={{ height: "100vh", padding: 20 }}
          >
            <h2>{sec}</h2>
          </section>
        ))}
      </div>
    </>
  );
}
