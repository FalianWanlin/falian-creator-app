import "../styles/workbench.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: "system-ui", background: "#0e0e11", color: "#fff", minHeight: "100vh" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid #222" }}>
        <strong>Falian Creator</strong>
      </header>

      <main style={{ padding: "24px" }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
