export default function Home() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, margin: "0 0 8px 0" }}>Falian Creator Workbench</h1>
      <p style={{ fontSize: 16, margin: "0 0 20px 0", color: "#cfcfd6" }}>
        From the game, return to your real life.
        <br />
        Step out of the virtual world. Create your real future.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <a
          href="/workbench"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            background: "#ffffff",
            color: "#0e0e11",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Start Creating →
        </a>

        <a
          href="/system"
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #2a2a33",
            background: "transparent",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Explore the System →
        </a>
      </div>

      <div
        style={{
          marginTop: 28,
          padding: 16,
          borderRadius: 14,
          border: "1px solid #222",
          background: "#14141a",
        }}
      >
        <h2 style={{ fontSize: 18, margin: "0 0 10px 0" }}>Quick Links</h2>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
          <li>
            <a href="/workbench" style={{ color: "#cfcfd6" }}>
              Open Workbench
            </a>
          </li>
          <li>
            <a href="/system" style={{ color: "#cfcfd6" }}>
              16-Zone Architecture
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

