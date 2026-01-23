// components/WorkbenchFrame.js
export default function WorkbenchFrame({ top, left, center, right }) {
  return (
    <div style={{ padding: 16 }}>
      {/* Top Cloud Bar */}
      <div style={{ marginBottom: 12 }}>{top}</div>

      {/* 3-column fixed frame */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 320px", gap: 16 }}>
        <aside style={{ borderRight: "1px solid #222", paddingRight: 12, minHeight: 520 }}>
          {left}
        </aside>

        <main style={{ minHeight: 520 }}>{center}</main>

        <aside style={{ borderLeft: "1px solid #222", paddingLeft: 12, minHeight: 520 }}>
          {right}
        </aside>
      </div>
    </div>
  );
}
