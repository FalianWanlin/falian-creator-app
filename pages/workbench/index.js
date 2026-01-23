// pages/workbench/index.js
import Link from "next/link";

const ZONES = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  label: `Zone ${i + 1}`,
}));

export default function WorkbenchHome() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Workbench</h2>
      <p>Select a zone to begin.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {ZONES.map((zone) => (
          <Link key={zone.id} href={`/workbench/zone-${zone.id}`}>
            <div
              style={{
                background: "#2a2a35",
                borderRadius: 999,
                padding: "16px 12px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              ☁️ {zone.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
