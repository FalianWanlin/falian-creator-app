// pages/workbench/index.js
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/**
 * 視覺語義：
 * - 天空藍背景
 * - 上方 15 個雲（可拖曳排序，不含 AI Chat）
 * - 中間 AI Chat 固定
 * - 左右為角色 / 外掛 placeholder
 */

const STORAGE_KEY = "falian_workbench_cloud_order_v1";
const CHAT_ZONE_ID = "zone-11";

// 16 區正式定義
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
  { id: "zone-11", label: "AI Chat Zone" }, // 固定中間
  { id: "zone-12", label: "Memory & History Zone" },
  { id: "zone-13", label: "Photo & Image Zone" },
  { id: "zone-14", label: "Multimedia Zone" },
  { id: "zone-15", label: "Network Zone" },
  { id: "zone-16", label: "Fun & Recharge Zone" },
];

// 只有漂浮的雲（排除 AI Chat）
const CLOUD_ZONES = ZONES.filter((z) => z.id !== CHAT_ZONE_ID);

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
  const valid = zones.map((z) => z.id);
  const result = order?.filter((id) => valid.includes(id)) || [];
  for (const id of valid) {
    if (!result.includes(id)) result.push(id);
  }
  return result;
}

export default function WorkbenchHome() {
  const [order, setOrder] = useState(CLOUD_ZONES.map((z) => z.id));
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    const saved = safeLoadOrder();
    if (saved) setOrder(sanitizeOrder(saved, CLOUD_ZONES));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  }, [order]);

  const zonesById = useMemo(() => {
    const m = new Map();
    CLOUD_ZONES.forEach((z) => m.set(z.id, z));
    return m;
  }, []);

  const orderedZones = order.map((id) => zonesById.get(id));

  function move(fromId, toId) {
    if (fromId === toId) return;
    setOrder((prev) => {
      const next = [...prev];
      const from = next.indexOf(fromId);
      const to = next.indexOf(toId);
      next.splice(from, 1);
      next.splice(to, 0, fromId);
      return next;
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 16,
        background: "linear-gradient(#87CEEB, #E0F6FF)",
      }}
    >
      {/* 上方天空雲 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {orderedZones.map((zone) => (
          <div
            key={zone.id}
            draggable
            onDragStart={(e) => {
              setDraggingId(zone.id);
              e.dataTransfer.setData("text/plain", zone.id);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const fromId = e.dataTransfer.getData("text/plain");
              move(fromId, zone.id);
              setDraggingId(null);
            }}
            className="cloud"
            style={{ textAlign: "center" }}
          >
            <Link
              href={`/workbench/${zone.id}`}
              style={{
                color: "#1a3c5a",
                fontWeight: 600,
                pointerEvents: draggingId ? "none" : "auto",
              }}
            >
              ☁️ {zone.label}
            </Link>
          </div>
        ))}
      </div>

      {/* 固定三欄 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr 320px",
          gap: 16,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <aside>
          <h3>Roles</h3>
          <p>(角色選擇區)</p>
        </aside>

        <main>
          <h3>AI Chat</h3>
          <div
            style={{
              background: "#ffffff",
              borderRadius: 12,
              padding: 16,
              minHeight: 400,
              boxShadow: "inset 0 0 0 1px #e0e0e0",
            }}
          >
            （固定對話框）
          </div>
        </main>

        <aside>
          <h3>Addons</h3>
          <p>(外掛加掛區)</p>
        </aside>
      </div>
    </div>
  );
}

