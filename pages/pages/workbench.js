export default function Workbench() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 260px", gap: 16 }}>
      
      {/* Left Sidebar */}
      <aside style={{ borderRight: "1px solid #222", paddingRight: 12 }}>
        <h3>Zones</h3>
        <ul>
          <li>AI Support</li>
          <li>Modular System</li>
          <li>Role-based Interface</li>
          <li>Multilingual Publishing</li>
          <li>⋯（16 Zones）</li>
        </ul>
      </aside>

      {/* Main Workspace */}
      <section>
        <h2>Workbench</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <div style={{ background: "#1a1a22", padding: 16 }}>Module A</div>
          <div style={{ background: "#1a1a22", padding: 16 }}>Module B</div>
          <div style={{ background: "#1a1a22", padding: 16 }}>Module C</div>
        </div>
      </section>

      {/* Right Panel */}
      <aside style={{ borderLeft: "1px solid #222", paddingLeft: 12 }}>
        <h3>Status</h3>
        <p>Project: Falian Creator</p>
        <p>Version: v0.1</p>
      </aside>
    </div>
  );
}
