// pages/workbench/index.js
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "falian_workbench_cloud_order_v1";

// Zone 定義（固定，不被 UI 改寫）
const ZONES = [
  { id: "zone-1", label: "Creation Zone" },
  { id: "zone-2", label: "Review Zone" },
  { id: "zone-3", label: "Layout Zone" },
  { id: "zone-4", label: "Proofreading Zone" },
  { id: "zone-5", label: "Cover Zone" },
  { id: "zone-6", label: "Integration Zone" },
  { id: "zone-7", label: "Final Product Zone" },
  { id: "zone-8", label: "Management Zone" },
  { id: "zone-9", label: "Legal & Governance Zone" },
  { id: "zone-10", label: "Safety & Verification Zone" },
  { id: "zone-11", label: "AI Chat Zone" },
  { id: "zone-12", label: "Memory & History Zone" },
  { id: "zone-13", label: "Photo & Image Zone" },
  { id: "zone-14", label: "Multimedia Zone" },
  { id: "zone-15", label: "Network Zone" },
  { id: "zone-16", label: "Fun & Recharge Zone" },
];

function safeLoadOrder() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function sanitizeOrder(order, zones) {
  const validIds = new Set(zones.map((z) => z.id));
  const unique = [];
  const seen = new Set();

  // 保留有效且不重複的 id
  for (const id of order || []) {
    if (validIds.has(id) && !seen.has(id)) {
      unique.push(id);
      seen.add(id);
    }
  }

  // 補齊缺少的 zone id（避免壞資料造成遺漏）
  for (const z of zones) {
    if (!seen.has(z.id)) unique.push(z.id);
  }

  return unique;
}

export default function WorkbenchHome() {
  const zonesById = useMemo(() => {
    const m = new Map();
    for (const z of ZONES) m.set(z.id, z);
    return m;
}, [ZONES]);

  const [order, setOrder] = useState(ZONES.map((z) => z.id));
  const [draggingId, setDraggingId] = useState(null);

  // 初次載入：從 localStorage 讀取排序（只影響 UI）
  useEffect(() => {
    const loaded = safeLoadOrder();
    if (!loaded) return;
    setOrder(sanitizeOrder(loaded, ZONES));
  }, []);

  // 每次排序變動：寫回 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // 忽略寫入失敗（例如瀏覽器限制）
    }
  }, [order]);

  const orderedZones = useMemo(() => {
    return order.map((id) => zonesById.get(id)).filter(Boolean);
  }, [order, zonesById]);

  function moveItem(fromId, toId) {
    if (!fromId || !toId || fromId === toId) return;

    setOrder((prev) => {
      const next = [...prev];
      const fromIndex = next.indexOf(fromId);
      const toIndex = next.indexOf(toId);
      if (fromIndex === -1 || toIndex === -1) return prev;

      next.splice(fromIndex, 1);
      next.splice(toIndex, 0, fromId);
      return next;
    });
  }

  function resetOrder() {
    const defaultOrder = ZONES.map((z) => z.id);
    setOrder(defaultOrder);
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Workbench</h2>
      <p>Select a zone to begin.</p>

      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          onClick={resetOrder}
          style={{
            background: "#2a2a35",
            border: "1px solid #3a3a45",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Reset cloud order
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {orderedZones.map((zone) => (
          <div
            key={zone.id}
            draggable
            onDragStart={(e) => {
              setDraggingId(zone.id);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", zone.id);
            }}
            onDragEnd={() => setDraggingId(null)}
            onDragOver={(e) => {
              // 必須 preventDefault 才能 drop
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
              e.preventDefault();
              const fromId = e.dataTransfer.getData("text/plain");
              moveItem(fromId, zone.id);
              setDraggingId(null);
            }}
            style={{
              background: draggingId === zone.id ? "#333344" : "#2a2a35",
              borderRadius: 999,
              padding: "14px 12px",
              textAlign: "center",
              cursor: "grab",
              userSelect: "none",
            }}
            title="Drag to reorder"
          >
            <Link href={`/workbench/${zone.id}`} style={{ color: "#8ab4ff" }}>
              ☁️ {zone.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
