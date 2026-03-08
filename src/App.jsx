import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Theme definitions
const themes = {
  dark: {
    name: "Dark",
    icon: "🌙",
    bg: "#080b12",
    surface: "#0f1320",
    surface2: "#161b2e",
    border: "#1c2238",
    borderHov: "#2a3050",
    accent: "#e8a020",
    accentDim: "#b07818",
    text: "#dde2f0",
    muted: "#68728f",
    dim: "#3d4460",
    green: "#22c78a",
    blue: "#4a9eed",
    red: "#e05555",
    purple: "#9a6fe0",
    pink: "#d46abf",
    teal: "#3ac8c8",
    orange: "#e07740",
  },
  light: {
    name: "Light",
    icon: "☀️",
    bg: "#f5f7fa",
    surface: "#ffffff",
    surface2: "#f0f2f5",
    border: "#e1e4e8",
    borderHov: "#d1d5db",
    accent: "#e8a020",
    accentDim: "#d99419",
    text: "#1a1f36",
    muted: "#6b7280",
    dim: "#9ca3af",
    green: "#10b981",
    blue: "#3b82f6",
    red: "#ef4444",
    purple: "#8b5cf6",
    pink: "#ec4899",
    teal: "#14b8a6",
    orange: "#f97316",
  },
  midnight: {
    name: "Midnight",
    icon: "🌌",
    bg: "#0a0e27",
    surface: "#141937",
    surface2: "#1a2342",
    border: "#1f2d5a",
    borderHov: "#2d3f7a",
    accent: "#60a5fa",
    accentDim: "#3b82f6",
    text: "#e0e7ff",
    muted: "#818cf8",
    dim: "#4c4f7a",
    green: "#34d399",
    blue: "#60a5fa",
    red: "#f87171",
    purple: "#a78bfa",
    pink: "#f472b6",
    teal: "#2dd4bf",
    orange: "#fb923c",
  },
};

const C = themes.dark; // Default theme for module scope

const Tag = ({ t, c }) => (
  <span style={{ display:"inline-block", padding:"2px 9px", borderRadius:20, background:`${c}1a`, border:`1px solid ${c}40`, color:c, fontSize:11, fontWeight:700, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{t}</span>
);

const SectionHeader = ({ label, color, title, subtitle }) => (
  <div style={{ marginBottom:28 }}>
    <div style={{ color, fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:3, marginBottom:6, textTransform:"uppercase" }}>{label}</div>
    <h2 style={{ color:C.text, fontSize:26, fontWeight:900, margin:"0 0 6px", fontFamily:"'Playfair Display',Georgia,serif", letterSpacing:"-0.5px" }}>{title}</h2>
    <p style={{ color:C.muted, margin:0, fontSize:14, lineHeight:1.6 }}>{subtitle}</p>
  </div>
);

// ───────── DIAGRAM COMPONENTS ─────────

const FlowingArrow = ({ color = C.blue, delay = 0 }) => (
  <motion.svg width="60" height="20" viewBox="0 0 60 20" style={{ overflow: "visible" }}>
    <motion.path
      d="M 0 10 L 50 10 L 45 5 M 50 10 L 45 15"
      stroke={color}
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay, repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.circle
      cx="0"
      cy="10"
      r="3"
      fill={color}
      initial={{ x: 0 }}
      animate={{ x: 50 }}
      transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
    />
  </motion.svg>
);

const ComponentBox = ({ icon, label, color, delay = 0 }) => (
  <motion.div
    style={{
      background: `${color}15`,
      border: `2px solid ${color}`,
      borderRadius: 12,
      padding: "12px 16px",
      textAlign: "center",
      minWidth: 100,
      maxWidth: "100%"
    }}
    initial={{ scale: 0, rotate: -10 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 12 }}
    whileHover={{ scale: 1.05, boxShadow: `0 8px 25px ${color}50` }}
  >
    <motion.div
      style={{ fontSize: 28, marginBottom: 4 }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, delay: delay + 0.5, repeat: Infinity, repeatDelay: 3 }}
    >
      {icon}
    </motion.div>
    <div style={{ color: C.text, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
  </motion.div>
);

const MetricCard = ({ value, label, color, delay = 0, suffix = "" }) => (
  <motion.div
    style={{
      background: C.surface2,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8,
      padding: "12px 14px"
    }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.03, borderLeftWidth: "6px" }}
  >
    <motion.div
      style={{ color, fontSize: 24, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", marginBottom: 2 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
    >
      {value}{suffix}
    </motion.div>
    <div style={{ color: C.muted, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
  </motion.div>
);

const ArchitectureDiagram = ({ questionType = "url-shortener" }) => {
  const diagrams = {
    "url-shortener": (
      <div style={{ background: C.bg, borderRadius: 12, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <ComponentBox icon="👤" label="Client" color={C.blue} delay={0} />
          <FlowingArrow color={C.blue} delay={0.3} />
          <ComponentBox icon="🌐" label="DNS/CDN" color={C.green} delay={0.15} />
          <FlowingArrow color={C.green} delay={0.6} />
          <ComponentBox icon="⚖️" label="Load Balancer" color={C.accent} delay={0.3} />
          <FlowingArrow color={C.accent} delay={0.9} />
          <ComponentBox icon="🚀" label="API Server" color={C.purple} delay={0.45} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <ComponentBox icon="🗄️" label="PostgreSQL" color={C.red} delay={0.6} />
          <ComponentBox icon="⚡" label="Redis Cache" color={C.orange} delay={0.75} />
          <ComponentBox icon="📊" label="Analytics" color={C.teal} delay={0.9} />
        </div>
        <motion.div
          style={{ marginTop: 16, padding: "8px 12px", background: `${C.accent}15`, borderRadius: 8, textAlign: "center" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <span style={{ color: C.accent, fontSize: 11, fontWeight: 800 }}>⚡ Data Flow: </span>
          <span style={{ color: C.text, fontSize: 11 }}>Write → API → Cache + DB | Read → Cache (if exists) → DB (if miss)</span>
        </motion.div>
      </div>
    ),
    "twitter": (
      <div style={{ background: C.bg, borderRadius: 12, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <ComponentBox icon="📱" label="Mobile/Web" color={C.blue} delay={0} />
          <FlowingArrow color={C.blue} delay={0.3} />
          <ComponentBox icon="🚪" label="API Gateway" color={C.green} delay={0.15} />
          <FlowingArrow color={C.green} delay={0.6} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ComponentBox icon="✍️" label="Tweet Service" color={C.purple} delay={0.3} />
            <ComponentBox icon="📰" label="Timeline Service" color={C.pink} delay={0.45} />
            <ComponentBox icon="👥" label="User Service" color={C.teal} delay={0.6} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
          <ComponentBox icon="🗄️" label="Cassandra" color={C.red} delay={0.75} />
          <ComponentBox icon="⚡" label="Redis" color={C.orange} delay={0.9} />
          <ComponentBox icon="📨" label="Kafka" color={C.accent} delay={1.05} />
          <ComponentBox icon="📦" label="S3 Media" color={C.blue} delay={1.2} />
        </div>
      </div>
    )
  };
  return diagrams[questionType] || diagrams["url-shortener"];
};

const MetricsPanel = ({ metrics }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginTop: 16 }}>
    {metrics.map((m, i) => (
      <MetricCard key={i} value={m.value} label={m.label} color={m.color} delay={i * 0.1} suffix={m.suffix} />
    ))}
  </div>
);

// ───────── FRAMEWORK ─────────
const frameworkSteps = [
  { step:"01", color:C.accent, title:"Clarify Requirements (5–8 min)",
    functional:["What does the system do? List the 3–5 core user stories","Which features are in scope vs out of scope (be explicit)","User types: consumers, businesses, admins? Mobile or web?","Read-heavy or write-heavy? Latency-sensitive or throughput-sensitive?","Any specific APIs or integrations mandated?"],
    nonfunctional:["Scale: DAU, MAU, peak QPS","Availability target: 99.9% / 99.99% / 99.999%","Latency: p50 / p99 SLA requirements","Consistency: eventual vs strong vs causal","Durability: can data be lost? (analytics vs payments)","Geography: single region or multi-region?"],
    tip:'Always ask: "Are there any constraints I should know about?" before drawing anything.' },
  { step:"02", color:C.blue, title:"Capacity Estimation (5 min)",
    functional:["DAU × avg actions/user = requests/day","Requests/day ÷ 86,400 = avg QPS. Peak QPS ≈ 2–5× avg","Storage = payload_size × events/day × retention_days","Read:Write ratio drives DB and cache design","Bandwidth = QPS × avg_response_size"],
    nonfunctional:["Example: 100M DAU, 10 actions each → 1B req/day → ~12K QPS avg → ~50K peak","Tweet (280 chars) × 500M/day × 5yr = ~750TB text","Cache rule: top 20% of content gets 80% of traffic","Video: 1min HD ≈ 100MB; 500hr uploaded/min → ~3TB/min ingested","Always sanity-check with known benchmarks"],
    tip:"Round liberally. 86,400 ≈ 100K. 30 days ≈ 1 month. Interviewers want ballpark, not exact." },
  { step:"03", color:C.green, title:"Define API Contract (5 min)",
    functional:["Define 3–5 core REST endpoints or gRPC methods","Show request params, path params, response shape","Mark which endpoints are idempotent (safe to retry)","Authentication: Bearer token, API key, session cookie?","Pagination: cursor-based (scalable) vs offset (simple)"],
    nonfunctional:["Rate limits: per-user, per-IP, per-endpoint","Versioning: /v1/, /v2/ or header-based","Error responses: standard error schema + HTTP codes","GraphQL vs REST vs gRPC — justify your choice","Webhooks for async event delivery to clients"],
    tip:"Writing APIs first forces you to think from the client's perspective and catches design mistakes early." },
  { step:"04", color:C.purple, title:"High-Level Architecture (10 min)",
    functional:["Draw: Client → DNS → CDN → LB → Service(s) → DB","Identify stateless vs stateful components","Choose sync (REST/gRPC) vs async (Kafka/SQS) paths","Separate read path vs write path if needed","Group services by domain (users, posts, notifications)"],
    nonfunctional:["Start with a monolith — justify when/why to split","Microservice boundaries: split when different scale, deploy, or team","Service communication: REST for external, gRPC for internal","Data ownership: each service owns its own DB (bounded context)","Event-driven for loose coupling: use domain events"],
    tip:"Draw top-down. Client → Edge → API → Business Logic → Data. Never start with databases." },
  { step:"05", color:C.pink, title:"Deep Dive: Critical Path (15 min)",
    functional:["Pick the 2–3 hardest components and zoom in","DB schema: tables, columns, indexes, foreign keys","Caching layer: cache-aside vs write-through, TTL, eviction (LRU/LFU)","Sharding key choice and strategy (hash vs range)","Message queue design: topics, consumer groups, DLQ"],
    nonfunctional:["Read path: how does a query traverse the stack?","Write path: what happens step by step on a POST/PUT?","Failure modes: what if cache misses? DB is slow? Queue backs up?","Idempotency: how do you handle duplicate messages/requests?","Data consistency: where do you accept eventual consistency?"],
    tip:'Ask: "Which area would you like me to go deeper on?" — shows you can collaborate.' },
  { step:"06", color:C.teal, title:"Scalability Design (5 min)",
    functional:["Horizontal scaling: stateless app servers behind LB","DB read replicas: offload read traffic","Sharding: partition data when single node insufficient","Caching: Redis cluster for distributed shared cache","CDN: edge-cache static assets and cacheable API responses"],
    nonfunctional:["Auto-scaling: CPU/memory/custom metrics trigger scale-out","Connection pooling: PgBouncer for Postgres, HikariCP for Java","Async processing: offload heavy work (image resize, emails) to workers","Database federation: split by function (users DB, product DB)","Multi-region: active-active or active-passive — justify tradeoff"],
    tip:"Think in tiers. Each tier scales independently. Bottleneck travels up the stack as you fix each layer." },
  { step:"07", color:C.accent, title:"Reliability & Fault Tolerance (5 min)",
    functional:["Replication: at least 3 replicas for data durability","Circuit breaker: stop cascading failures","Retry + backoff: exponential backoff with jitter","Health checks: readiness (can serve traffic) vs liveness (alive)","Graceful degradation: serve cached/stale data when backend fails"],
    nonfunctional:["RPO (Recovery Point Objective): max data loss acceptable","RTO (Recovery Time Objective): max downtime acceptable","Chaos engineering: Netflix Chaos Monkey approach","Bulkhead: isolate resource pools per dependency","Dead-letter queues: capture and alert on unprocessable messages"],
    tip:"For every component ask: 'What happens when this dies?' Design the answer before the interviewer asks." },
  { step:"08", color:C.red, title:"Observability & Review (3 min)",
    functional:["Metrics: QPS, error rate, p99 latency, saturation (USE method)","Logging: structured JSON logs with correlation IDs","Tracing: distributed tracing (Jaeger/Zipkin) across services","Alerting: PagerDuty/OpsGenie on SLA breaches","Dashboards: Grafana + Prometheus, or Datadog"],
    nonfunctional:["SPOF audit: walk diagram, mark every single point of failure","Bottleneck identification: where will you hit limits first?","'At 10× scale, what breaks first?'","What would you do differently with 3 more months?","Summarize your 2–3 biggest trade-offs and why you made them"],
    tip:"Self-critique is senior-level behavior. End with: 'The biggest risk in my design is X, and I'd address it by Y.'" },
];

function FrameworkContent() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <SectionHeader label="Interview Framework" color={C.accent} title="The 8-Step Interview Framework" subtitle="A structured playbook for 45–60 minute system design sessions at FAANG and top tech companies" />
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {frameworkSteps.map((s, i) => (
          <div key={i} onClick={() => setOpen(open===i?-1:i)}
            style={{ background: open===i ? `${s.color}0c` : C.surface, border:`1px solid ${open===i ? s.color+"44" : C.border}`, borderRadius:12, cursor:"pointer", transition:"all 0.2s", overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px" }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:s.color, fontWeight:800, minWidth:26 }}>{s.step}</span>
              <span style={{ flex:1, color:C.text, fontWeight:700, fontSize:14 }}>{s.title}</span>
              <span style={{ color:C.muted, fontSize:20, transform:open===i?"rotate(90deg)":"none", transition:"transform 0.2s" }}>›</span>
            </div>
            <AnimatePresence initial={false}>
              {open===i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding:"0 18px 18px 58px" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
                      <div style={{ background:C.bg, borderRadius:10, padding:14 }}>
                        <div style={{ color:s.color, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>FUNCTIONAL CHECKLIST</div>
                        {s.functional.map((f, j) => (
                          <div key={j} style={{ display:"flex", gap:8, marginBottom:5 }}>
                            <span style={{ color:s.color, flexShrink:0 }}>□</span>
                            <span style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ background:C.bg, borderRadius:10, padding:14 }}>
                        <div style={{ color:C.blue, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>NON-FUNCTIONAL CHECKLIST</div>
                        {s.nonfunctional.map((f, j) => (
                          <div key={j} style={{ display:"flex", gap:8, marginBottom:5 }}>
                            <span style={{ color:C.blue, flexShrink:0 }}>□</span>
                            <span style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ background:`${s.color}15`, border:`1px solid ${s.color}33`, borderRadius:8, padding:"10px 14px" }}>
                      <span style={{ color:s.color, fontSize:11, fontWeight:800 }}>💡 PRO TIP  </span>
                      <span style={{ color:C.text, fontSize:13 }}>{s.tip}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── CONCEPTS ─────────
const conceptGroups = [
  { name:"Scalability", color:C.accent, icon:"📈", items:[
    { term:"Horizontal Scaling (Scale-Out)",
      def:"Add more machines to distribute load. Each server handles a portion of traffic. Requires stateless architecture where servers share no local state. Session data must live in external store like Redis or DynamoDB.",
      why:"Preferred for web services because you can scale indefinitely by adding commodity hardware. Cost scales nearly linearly with traffic. Single-server limits: CPU, memory, network bandwidth.",
      examples:"• Netflix: thousands of EC2 instances behind ELB\n• Spotify: stateless API servers, session in Redis\n• Uber: sharded microservices, horizontal scaling per service\n• Pattern: App servers (stateless) → Redis (session) → DB (data)",
      tradeoffs:"✅ No ceiling, fault tolerant, commodity hardware\n❌ Complexity: distributed systems, eventual consistency\n❌ Data partitioning challenges\n❌ Debugging harder (distributed tracing needed)",
      numbers:"1 server @ 1K QPS → 100 servers @ 100K QPS (linear scaling)\nTypical: 1 m5.large = 1K-5K QPS for simple API" },
    { term:"Vertical Scaling (Scale-Up)",
      def:"Add more CPU/RAM/SSD to existing machine. Move from t3.medium (2 vCPU, 4GB) to m5.24xlarge (96 vCPU, 384GB). No code changes required. Single-node performance optimization.",
      why:"Simple — no distributed systems complexity. Good for stateful services (databases, caches) where distribution is hard. Interim solution before sharding.",
      examples:"• PostgreSQL: upgrade from db.m5.large to db.m5.24xlarge\n• Redis: r6g.16xlarge (512GB RAM, 52M ops/sec)\n• MongoDB: vertical scaling before sharding\n• Use case: DB CPU at 80% → upgrade to next tier",
      tradeoffs:"✅ Simple — no code change\n✅ No distribution overhead\n✅ Good for DBs short-term\n❌ Hard ceiling (AWS max: ~768 vCPU, 24TB RAM)\n❌ Expensive — cost grows exponentially\n❌ Downtime during resize\n❌ Single point of failure",
      numbers:"t3.medium: $30/mo → m5.24xlarge: $4000/mo (non-linear cost)\nHard limit: 10-100K QPS per single server" },
    { term:"Load Balancing Algorithms",
      def:"Strategy for distributing requests across backend servers. L4 (TCP/IP) vs L7 (HTTP) load balancing. Health checks remove unhealthy nodes. Algorithms: Round Robin, Least Connections, IP Hash (sticky), Weighted (heterogeneous fleet), Least Response Time.",
      why:"Algorithm choice dramatically affects tail latency and resource utilization. Poor choice causes hot spots (overloaded servers) or sticky session issues.",
      examples:"• Round Robin: Request 1 → Server A, Request 2 → Server B (simple, even)\n• Least Connections: Route to server with fewest active connections (adaptive)\n• IP Hash: Hash client IP → consistent server (sticky sessions for stateful apps)\n• Weighted: 70% traffic to new fleet, 30% to old (canary deploys)\n• AWS ALB: path-based (/api → API servers, /static → CDN)",
      tradeoffs:"Round Robin: ✅ Simple ❌ Ignores server load\nLeast Connections: ✅ Adapts to load ❌ Requires shared state\nIP Hash: ✅ Sticky sessions ❌ Uneven if IPs skewed\nWeighted: ✅ Canary deploys ❌ Manual weight tuning",
      numbers:"AWS ALB: $0.0225/hr + $0.008/LCU (~$16/mo + traffic)\nProcesses 1M requests/sec across 1000 targets\nHealth check interval: 5-30 seconds" },
    { term:"Stateless Services",
      def:"Services that store NO local state. All session data, user context, and temporary state lives in external stores (Redis, DB). Any server can handle any request for any user. Enables seamless horizontal scaling.",
      why:"Core requirement for horizontal scaling and zero-downtime deploys. Stateless servers can be killed/restarted anytime. Auto-scaling becomes trivial.",
      examples:"• Stateless API: Express server → Redis (session) → PostgreSQL (data)\n• JWT tokens: client holds state (self-contained, no server session)\n• Shopping cart: stored in Redis with cart_id key, not in server RAM\n• Upload: S3 pre-signed URL (no file stored on server)\n• Pattern: req → any server → external state → response",
      tradeoffs:"✅ Auto-scaling: add/remove servers anytime\n✅ Blue-green deploys\n✅ Fault tolerance (kill server, no data loss)\n❌ Latency: external state fetch\n❌ Cost: Redis cluster needed\n❌ Complexity: distributed state management",
      numbers:"Session in Redis: 1-5ms latency vs local RAM <0.1ms\n1M sessions @ 5KB each = 5GB Redis memory\nTypical: 1 Redis cluster serves 10K app instances" },
    { term:"Database Connection Pooling",
      def:"Reuse expensive database connections instead of creating new connection per request. Tools: PgBouncer (Postgres), HikariCP (Java), SqlConnection pool (.NET). Connection = TCP handshake + auth + memory allocation. Pool maintains warm connections.",
      why:"Database has hard limit on concurrent connections. Each connection costs 5-10MB RAM. 10K app servers × 10 connections each = 100K connections crashes the DB. Pool multiplexes app threads over fewer DB connections.",
      examples:"• PgBouncer: sits between app and Postgres, pools connections\n• HikariCP: Java pool, default in Spring Boot\n• Config: minIdle=10, maxPoolSize=50, connectionTimeout=30s\n• Pattern: App (10K instances) → PgBouncer (100 DB connections) → Postgres\n• AWS RDS Proxy: managed connection pooler",
      tradeoffs:"✅ Reduce DB connection overhead\n✅ Protects DB from connection exhaustion\n✅ Faster queries (connection already warm)\n❌ Added latency (pooler hop)\n❌ Transaction pinning (session state in connection)\n❌ Config complexity",
      numbers:"Postgres max_connections: default 100, practical max ~1000\nConnection cost: ~10MB RAM, 20-50ms to establish\n1K app instances × 10 connections = 10K → pool to 100\nPgBouncer can handle 10K client connections → 100 DB connections" },
  ]},
  { name:"Reliability & HA", color:C.blue, icon:"🛡️", items:[
    { term:"Availability Nines (SLA Targets)",
      def:"Measure of uptime as percentage. 99% (two nines) = 87.6 hours downtime/year. 99.9% (three nines) = 8.7 hours/year. 99.99% (four nines) = 52 minutes/year. 99.999% (five nines) = 5.3 minutes/year. Each additional nine costs exponentially more in infrastructure and complexity.",
      why:"SLA commitments drive architecture decisions. Financial services need five nines. Consumer apps can survive three nines. Knowing the math shows you understand business-engineering tradeoffs.",
      examples:"• AWS S3: 99.999999999% (11 nines) durability, 99.99% availability\n• Stripe: 99.99% uptime SLA, $credit on breach\n• Google Search: targets 99.9%, achieves 99.98%\n• Calculation: 365 days × 24 hours × 60 min × (1 - availability)\n• Example: 99.9% → 365 × 24 × 60 × 0.001 = 525.6 min = 8.7 hours",
      tradeoffs:"✅ 99.9%: achievable with multi-AZ, load balancing\n✅ 99.99%: requires multi-region, automated failover\n❌ 99.999%: exponential cost (multi-region active-active, chaos engineering)\n❌ 100%: impossible (network partitions, hardware failures)",
      numbers:"Cost multiplier: 99% (1×) → 99.9% (5×) → 99.99% (25×) → 99.999% (100×+)\nAWS multi-AZ: ~2× cost, gets you 99.95%\nMulti-region: ~3-4× cost, gets you 99.99%" },
    { term:"Replication Strategies (Sync vs Async)",
      def:"Synchronous replication: primary blocks write until replica acknowledges. Guarantees zero data loss (RPO=0) but higher write latency (2× or more). Asynchronous replication: primary commits write immediately, replicates in background. Fast writes but risk of data loss during failover (RPO > 0).",
      why:"Core tradeoff between consistency and performance. Financial transactions require sync replication (no money can be lost). Social media can tolerate async replication (a few lost likes during failover is acceptable).",
      examples:"• PostgreSQL sync replication: primary waits for standby before commit\n• MySQL semi-sync: waits for at least 1 replica ACK (hybrid)\n• Cassandra: configurable consistency levels (ONE, QUORUM, ALL)\n• MongoDB: writeConcern={w: 'majority'} ensures quorum\n• Pattern: Bank transactions → sync | Social likes → async",
      tradeoffs:"Sync Replication:\n✅ Zero data loss (RPO=0)\n✅ Strong consistency\n❌ 2-3× higher write latency\n❌ Availability impact if replica down\n\nAsync Replication:\n✅ Fast writes (no blocking)\n✅ High availability\n❌ Data loss on failover (last N seconds)\n❌ Eventual consistency",
      numbers:"Sync replication latency: 50-100ms (cross-AZ) vs 5-10ms (single AZ)\nAsync lag: typically <1 sec, can spike to minutes under load\nTypical RPO for async: 5-30 seconds of data loss risk" },
    { term:"Active-Active vs Active-Passive HA",
      def:"Active-Active: all nodes serve traffic simultaneously. Instant failover since all nodes are live. Requires conflict resolution for writes (last-write-wins, CRDTs, vector clocks). Active-Passive: one primary serves traffic, standbys idle until failover. Simpler (no conflicts) but wastes resources and has failover delay.",
      why:"Active-Active maximizes resource usage and eliminates failover time (critical for global apps with low RTO). Active-Passive is simpler and safer for stateful systems like databases where conflict resolution is hard.",
      examples:"• Active-Active: DynamoDB global tables (multi-region writes, CRDTs)\n• Active-Active: Cassandra (eventual consistency, last-write-wins)\n• Active-Passive: PostgreSQL primary-standby (promotes standby on failure)\n• Active-Passive: Redis Sentinel (auto-promotes replica to primary)\n• Pattern: Geo-distributed app → Active-Active | Single-region DB → Active-Passive",
      tradeoffs:"Active-Active:\n✅ Zero failover time\n✅ Efficient resource usage (no idle standbys)\n✅ Geo-distributed writes\n❌ Conflict resolution complexity\n❌ Eventual consistency\n❌ More expensive (run N regions)\n\nActive-Passive:\n✅ Simple (no conflicts)\n✅ Strong consistency\n❌ Wasted resources (idle standbys)\n❌ Failover time: 30s-5min\n❌ Manual or semi-manual promotion",
      numbers:"Active-Active failover: <1 second (instant)\nActive-Passive failover: 30 seconds (auto) to 5 minutes (manual)\nCost: Active-Active 2× (run 2 regions) | Active-Passive 1.2× (1 primary + 1 cheap standby)" },
    { term:"Consensus Algorithms (Raft & Paxos)",
      def:"Algorithms for distributed agreement and leader election. Raft: simpler, understandable. Used in Etcd, CockroachDB, Consul. Paxos: complex but proven. Used in Google Chubby, Spanner. Both require majority quorum (n/2+1 nodes must agree). Tolerate (n-1)/2 failures. Typically 3 or 5 nodes.",
      why:"Understanding Raft demonstrates distributed systems expertise. It's the foundation for leader election, distributed locks, and consistent metadata storage. Interviewers ask about this for senior+ roles.",
      examples:"• Etcd: Kubernetes uses Etcd (Raft) for cluster state\n• CockroachDB: Raft for replication and consensus\n• Consul: service discovery with Raft consensus\n• ZooKeeper: Zab (Raft-like) for distributed coordination\n• Pattern: 5 nodes → 3 must agree → tolerates 2 failures",
      tradeoffs:"✅ Strong consistency (linearizability)\n✅ Fault tolerance (survives minority failures)\n✅ Automated leader election\n❌ Performance cost (quorum writes)\n❌ Requires odd number of nodes (3, 5, 7)\n❌ Cross-region latency hurts (need quorum in <100ms)",
      numbers:"Typical config: 3 nodes (tolerates 1 failure) or 5 nodes (tolerates 2)\nRaft write latency: 2 RTTs (leader → followers → commit)\nQuorum in same AZ: 5-10ms | Across AZ: 50-100ms\nEtcd throughput: ~10K writes/sec (linearizable)" },
    { term:"RPO & RTO (Recovery Objectives)",
      def:"RPO (Recovery Point Objective): maximum acceptable data loss measured in time. How far back in time can you restore? RTO (Recovery Time Objective): maximum acceptable downtime. How long until service is restored? Together define disaster recovery requirements.",
      why:"Business requirements (SLA) dictate RPO and RTO, which drive backup frequency, replication strategy, and failover automation. Financial systems: RPO=0 (no data loss), RTO=minutes. Analytics: RPO=hours, RTO=hours.",
      examples:"• Bank transactions: RPO=0 (sync replication), RTO=5 min (automated failover)\n• E-commerce: RPO=5 min (async replication + WAL), RTO=15 min\n• Analytics pipeline: RPO=1 hour (hourly snapshots), RTO=4 hours\n• Pattern: RTO drives automation (manual=hours, auto=minutes)\n• Pattern: RPO drives replication (RPO=0 → sync, RPO>0 → async + backups)",
      tradeoffs:"Low RPO (< 1 min):\n✅ Minimal data loss\n❌ Expensive (sync replication, continuous backups)\n❌ Performance impact\n\nLow RTO (< 5 min):\n✅ Minimal downtime\n❌ Requires automation, monitoring, runbooks\n❌ Multi-region infrastructure\n\nHigh RPO/RTO (hours):\n✅ Cheaper (daily backups, manual failover)\n❌ Significant data loss and downtime risk",
      numbers:"Sync replication: RPO=0, RTO=30s-5min (automated failover)\nAsync replication: RPO=5-30s, RTO=1-5min\nDaily backups: RPO=24 hours, RTO=hours (restore time)\nCost: RPO=0 is 5-10× more expensive than RPO=1 hour" },
  ]},
  { name:"Consistency Models", color:C.green, icon:"⚖️", items:[
    { term:"CAP Theorem (Consistency-Availability-Partition Tolerance)",
      def:"Fundamental theorem stating distributed systems can guarantee only 2 of 3: Consistency (all nodes see same data at same time), Availability (every request gets a response), Partition Tolerance (system works despite network failures). In practice, network partitions happen, so P is mandatory → choose between CP (consistency) or AP (availability).",
      why:"Every distributed database decision maps to CAP. Understanding this explains why different databases exist and when to use each. Interviewers expect you to articulate CP vs AP tradeoffs.",
      examples:"• CP Systems (Consistency over Availability):\n  - HBase, MongoDB (default), CockroachDB, Etcd\n  - During partition: reject writes to maintain consistency\n  - Use case: banking, inventory, anything requiring correctness\n\n• AP Systems (Availability over Consistency):\n  - Cassandra, DynamoDB, Riak, Couchbase\n  - During partition: accept writes, resolve conflicts later\n  - Use case: social media, analytics, shopping carts",
      tradeoffs:"CP (Consistency + Partition Tolerance):\n✅ Strong consistency guarantees\n✅ No data conflicts\n❌ Service unavailable during partitions\n❌ Higher latency (coordination needed)\n\nAP (Availability + Partition Tolerance):\n✅ Always accepts reads/writes\n✅ Low latency\n❌ Eventual consistency (stale reads possible)\n❌ Conflict resolution needed (CRDTs, last-write-wins)",
      numbers:"Network partition frequency: 10-100 per year in large distributed systems\nPartition duration: typically seconds to minutes, rarely hours\nCAP choice impacts: CP adds 50-200ms latency | AP adds conflict resolution overhead" },
    { term:"Strong Consistency (Linearizability)",
      def:"Strongest consistency model where every read returns the most recent write. All operations appear to occur instantaneously in a single global order. Requires coordination (2-phase commit, Raft/Paxos quorum). Reads and writes hit quorum (majority of nodes).",
      why:"Required for financial transactions, inventory management, seat reservations — anything where stale data causes business errors. Saying 'I need strong consistency' in an interview signals you understand the cost.",
      examples:"• Google Spanner: external consistency via TrueTime (atomic clocks)\n• CockroachDB: serializable isolation via Raft\n• ZooKeeper: linearizable reads/writes for distributed coordination\n• HBase: row-level strong consistency\n• Pattern: Banking transfer: read balance → check → write debit → write credit (all must be latest)",
      tradeoffs:"✅ Simple programming model (no stale data)\n✅ Correctness guaranteed\n✅ No conflict resolution needed\n❌ High latency (quorum reads + writes)\n❌ Lower throughput (coordination overhead)\n❌ Reduced availability (requires quorum)",
      numbers:"Latency cost: 2-5× slower than eventual consistency\nQuorum read: 50-100ms (cross-AZ) vs 5ms (eventual)\nWrite throughput: ~10K/sec (Spanner) vs 1M/sec (DynamoDB eventual)\nTypical config: 3-5 replicas, need n/2+1 for quorum" },
    { term:"Eventual Consistency",
      def:"Weak consistency model where replicas diverge temporarily but converge (become consistent) eventually if writes stop. No guarantees on when convergence happens (could be milliseconds or minutes). Allows high availability and low latency by avoiding coordination.",
      why:"Default for high-scale, geo-distributed systems where availability and performance matter more than real-time consistency. Social media can tolerate stale data (10-second-old like counts are fine). Much faster than strong consistency.",
      examples:"• DynamoDB: default consistency is eventual (can opt-in to strong)\n• Cassandra: eventual by default, tunable with QUORUM reads\n• DNS: updates propagate globally over minutes to hours\n• Social media: Twitter follower counts, Facebook likes, Instagram comments\n• E-commerce: Product view counts, 'X people viewing' banners",
      tradeoffs:"✅ High availability (no coordination)\n✅ Low latency (local reads/writes)\n✅ High throughput (no quorum waits)\n✅ Geo-replication friendly\n❌ Stale reads possible\n❌ Conflict resolution needed (last-write-wins, CRDTs)\n❌ Complex application logic",
      numbers:"Read latency: 1-5ms (local replica) vs 50-100ms (strong consistency)\nWrite latency: 5-10ms (async replication) vs 50-200ms (sync quorum)\nConvergence time: typically <1 sec, worst-case minutes during failures\nThroughput: 10-100× higher than strong consistency" },
    { term:"Read-Your-Writes Consistency",
      def:"Session guarantee: after a user writes data, their subsequent reads always see that write (or newer). Other users may still see stale data. Weaker than strong consistency (no global ordering) but stronger than eventual (personal consistency).",
      why:"Critical for UX. Users expect to see their own posts, profile updates, and uploads immediately. Seeing stale data from your own actions feels like a bug. This is a middle ground between eventual and strong consistency.",
      examples:"• Sticky sessions: route user to same server that handled write\n• Read from primary: after write, read from primary DB for N seconds\n• Version vectors: client tracks write version, only accepts reads >= that version\n• Cassandra: use session token to track latest write timestamp\n• Pattern: User posts tweet → read-your-writes ensures they see it in their feed",
      tradeoffs:"✅ Good UX (users see their own writes)\n✅ Cheaper than strong consistency (no global coordination)\n❌ Doesn't help other users (they may see stale)\n❌ Implementation complexity (sticky sessions or version tracking)\n❌ Sticky sessions hurt load balancing",
      numbers:"Latency overhead: +10-20ms (route to primary or check version)\nImplementation: sticky session (cookie) or monotonic read tokens\nTypical: read-your-writes for 30-60 seconds after write, then eventual" },
    { term:"Linearizability (Strictest Consistency)",
      def:"Strongest consistency model where all operations appear instantaneous and in a single global order, as if executed on a single machine. Once a write completes, all subsequent reads (by any client) see that write. Requires real-time ordering and atomic clocks (Google Spanner TrueTime) or coordination (Raft/Paxos).",
      why:"Gold standard for correctness. Rare requirement (most apps don't need it). Mentioning Spanner's TrueTime or linearizability shows distributed systems depth. Only needed for global financial transactions, distributed locks, or leader election.",
      examples:"• Google Spanner: TrueTime API (GPS + atomic clocks) for global linearizability\n• Etcd: linearizable reads/writes for Kubernetes cluster state\n• CockroachDB: serializable transactions via Raft + clock synchronization\n• ZooKeeper: linearizable operations for distributed coordination\n• Use case: Global bank account (write in US, read in EU must be consistent)",
      tradeoffs:"✅ Strongest guarantees (behaves like single machine)\n✅ Simplest programming model\n✅ No anomalies (no stale reads, no conflicts)\n❌ Very expensive (requires atomic clocks or 2PC)\n❌ High latency (global coordination)\n❌ Low throughput",
      numbers:"Spanner latency: 100-500ms (global consensus)\nEtcd linearizable write: 10-50ms (Raft quorum in same region)\nCost: Spanner ~5-10× more expensive than DynamoDB\nThroughput: ~1K-10K writes/sec (vs 1M+ for eventual consistency)" },
    { term:"PACELC Theorem (Extended CAP)",
      def:"Extension of CAP that covers the 'normal' (no partition) case. IF Partition (P) → choose Availability (A) vs Consistency (C). ELSE (E, no partition) → choose Latency (L) vs Consistency (C). More practical than CAP because partitions are rare; most of the time you're trading latency vs consistency.",
      why:"CAP only describes behavior during partitions (rare). PACELC describes normal operation (99.9% of the time). Shows interviewer you understand nuanced tradeoffs beyond basic CAP.",
      examples:"• PA/EL (Prioritize Availability and Latency):\n  - DynamoDB, Cassandra: eventual consistency, fast reads\n  - During partition: stay available | Normal: low latency\n\n• PC/EC (Prioritize Consistency always):\n  - HBase, MongoDB (default): strong consistency\n  - During partition: reject writes | Normal: quorum reads (higher latency)\n\n• PA/EC (Hybrid):\n  - Cassandra with QUORUM reads: available during partition, consistent normally",
      tradeoffs:"PA/EL (Availability + Low Latency):\n✅ Best performance and availability\n❌ Eventual consistency always\n\nPC/EC (Consistency always):\n✅ Strong consistency guarantees\n❌ Higher latency, lower availability\n\nPA/EC (Hybrid):\n✅ Flexible (tune per query)\n❌ Complex (must understand consistency levels)",
      numbers:"Latency impact: EC (quorum) adds 50-100ms vs EL (local read)\nAvailability impact: PC rejects writes during partition (minutes/year)\nMost systems: PA/EL (DynamoDB, Cassandra) for performance" },
  ]},
  { name:"Caching Deep Dive", color:C.purple, icon:"⚡", items:[
    { term:"Cache-Aside (Lazy Loading)",
      def:"Application explicitly manages cache. On read: check cache → if miss, read DB → populate cache → return data. On write: update DB only (cache becomes stale until next read). Most common pattern. Data is lazily loaded into cache only when requested.",
      why:"Default choice for most read-heavy systems. Simple to implement and reason about. Cache only stores frequently accessed data (self-optimizing). Works well with any DB. Downside: first request after invalidation is slow (cache miss).",
      examples:"• Memcached/Redis in front of MySQL: app checks cache first\n• CDN cache-aside for images: CDN → if miss → origin server\n• Code pattern:\n  data = cache.get(key)\n  if data == null:\n    data = db.query(key)\n    cache.set(key, data, ttl=3600)\n  return data\n• Netflix: cache movie metadata, miss → DB → cache",
      tradeoffs:"✅ Only caches requested data (efficient memory use)\n✅ Simple to implement\n✅ Works with any database\n✅ Cache failure doesn't break system (degrades to DB)\n❌ First read after miss/invalidation is slow (3-way trip)\n❌ Stale data possible (write to DB doesn't update cache)\n❌ App must manage cache logic",
      numbers:"Cache hit latency: 1-5ms | Cache miss: 50-200ms (DB query + cache write)\nTypical hit ratio: 80-99% (1-20% of requests hit DB)\nTTL: 5-60 minutes for dynamic data, hours for static" },
    { term:"Write-Through Cache",
      def:"On write: update cache AND database synchronously (both must succeed). Cache is always fresh and consistent with DB. Read: check cache → if miss, read DB → populate cache. Guarantees read-after-write consistency.",
      why:"Good for data where stale reads are unacceptable (user profiles, product inventory). Trade write latency for read consistency. Simpler consistency model than cache-aside.",
      examples:"• DynamoDB DAX (write-through accelerator)\n• User profile updates: write → cache + DB atomically\n• Product catalog: price change must be immediately visible\n• Code pattern:\n  def write(key, value):\n    db.write(key, value)  # critical path\n    cache.set(key, value)  # critical path\n• AWS ElastiCache write-through config",
      tradeoffs:"✅ Cache always consistent with DB\n✅ Read-after-write guaranteed\n✅ No cache stampede (cache pre-populated)\n❌ 2× write latency (cache + DB serially)\n❌ Wasted cache space (infrequently-read data cached)\n❌ Cache failure blocks writes",
      numbers:"Write latency: 2× (DB write 10ms + cache write 5ms = 15ms total)\nRead latency: 1-5ms (always cache hit if written recently)\nMemory waste: 30-50% of cache may be cold (never read)" },
    { term:"Write-Behind (Write-Back) Cache",
      def:"On write: update cache immediately, return success. Asynchronously flush cache to DB in background (batched, coalesced). Very fast writes. Risk: if cache crashes before flush, data lost. Used when loss tolerance is acceptable.",
      why:"Optimizes for write performance. Great for high-write, loss-tolerant workloads (game scores, analytics events, view counters). Can batch/coalesce DB writes for efficiency. Not suitable for critical data.",
      examples:"• Gaming leaderboards: write score to Redis → async flush to DB every 10 sec\n• Analytics counters: page view increments batched\n• Logging systems: write to memory buffer → flush to disk/DB\n• Pattern: increment counter in Redis (instant) → flush aggregated count hourly\n• MySQL InnoDB buffer pool: writes buffered, flushed to disk async",
      tradeoffs:"✅ Very fast writes (1-2ms, memory-only)\n✅ Batching/coalescing reduces DB load (100 writes → 1 batch)\n✅ High write throughput\n❌ Data loss risk if cache crashes (RPO > 0)\n❌ Complex consistency (DB lags cache)\n❌ Failure recovery tricky",
      numbers:"Write latency: 1-2ms (cache only) vs 10-50ms (write-through)\nBatch efficiency: 100 cache writes → 1 DB write (100× reduction)\nData loss window: 1-60 seconds (flush interval)\nThroughput: 100K+ writes/sec (vs 10K for write-through)" },
    { term:"Read-Through Cache",
      def:"Cache library sits between app and DB. App only talks to cache. On miss, cache itself fetches from DB (transparent to app). Opposite of cache-aside where app manages cache. Simplifies application code at the cost of cache library complexity.",
      why:"Simplifies app code — no if/else cache logic. Cache abstraction handles all DB calls. Good for teams where centralizing cache logic is valuable. Downside: tighter coupling to cache library, harder to debug.",
      examples:"• Hibernate second-level cache: app queries, Hibernate manages cache\n• Apollo GraphQL cache: queries auto-cached, cache handles misses\n• Spring Cache abstraction: @Cacheable annotation, framework manages\n• Code pattern:\n  @Cacheable(\"products\")\n  def getProduct(id):\n    return db.query(id)  # called only on cache miss\n• AWS DAX for DynamoDB (read-through)",
      tradeoffs:"✅ Cleaner app code (no cache if/else)\n✅ Centralized cache logic\n✅ Easier to add caching to existing code\n❌ Tight coupling to cache library\n❌ Less control (harder to customize behavior)\n❌ Debugging harder (magic happens in library)",
      numbers:"Latency same as cache-aside: hit 1-5ms, miss 50-200ms\nCode reduction: ~30-50% less cache-related code in app\nPopularity: less common than cache-aside (more magic)" },
    { term:"Cache Eviction Policies",
      def:"Algorithm for deciding which keys to remove when cache is full. LRU (Least Recently Used): evict oldest accessed key — default in Redis/Memcached. LFU (Least Frequently Used): evict least accessed key — better for skewed distributions. TTL (Time To Live): explicit expiration. FIFO, Random also exist.",
      why:"Eviction policy dramatically affects hit ratio. LRU is general-purpose. LFU better for viral content (popular items stay cached). TTL for explicit control. Wrong choice wastes memory or causes excessive misses.",
      examples:"• LRU: session cache (recent users more likely to return)\n• LFU: viral videos (popular content gets many hits)\n• TTL: API rate limit counters (expire after 1 hour)\n• Redis config: maxmemory-policy allkeys-lru\n• Hybrid: LRU + TTL (evict LRU, but also expire after N seconds)",
      tradeoffs:"LRU (Least Recently Used):\n✅ Simple, general-purpose\n✅ Good for recency-based access (sessions)\n❌ Poor for one-time scans (evicts popular data)\n\nLFU (Least Frequently Used):\n✅ Keeps popular data (viral content)\n❌ Slower eviction (must track frequency)\n❌ Stale popular data lingers\n\nTTL:\n✅ Explicit control, predictable\n❌ Requires manual tuning per key type",
      numbers:"LRU overhead: O(1) eviction with doubly-linked list\nLFU overhead: O(log n) with min-heap (Redis approximates with sampling)\nHit ratio: LRU ~70-90%, LFU ~80-95% for skewed workloads\nRedis default: allkeys-lru (LRU on all keys)" },
    { term:"Cache Stampede / Thundering Herd",
      def:"Problem: popular cache key expires → many simultaneous requests see cache miss → all query DB simultaneously → DB overload → outage. Caused by synchronized expiration under high concurrency. Requires mitigation to prevent DB collapse.",
      why:"Common failure mode in production. Single viral post cache expiry can cause 10,000 simultaneous DB queries. Must mention mitigation in interviews to show production experience. Not mitigating this is a critical design flaw.",
      examples:"• Viral tweet: cache expires → 100K requests hit DB for same tweet\n• Product page: flash sale starts → cache miss → DB query storm\n• Mitigation 1: Mutex/Lock (first request locks, others wait for cache)\n• Mitigation 2: Probabilistic Early Expiry (random jitter before TTL)\n• Mitigation 3: Background refresh (async refresh before expiry)\n• Code: cache.get_or_set_with_lock(key, fetch_func, ttl)",
      tradeoffs:"Mutex Lock:\n✅ Only 1 DB query (others wait for cache)\n❌ Waiters experience latency spike\n\nProbabilistic Early Expiry:\n✅ Smooth refresh (no spike)\n❌ Slight hit ratio reduction\n\nBackground Refresh:\n✅ No user-facing latency\n❌ Complex (requires job scheduler)",
      numbers:"Stampede scenario: 10K req/sec × 1 sec cache miss = 10K simultaneous DB queries\nDB capacity: typically 1K-5K QPS → stampede causes 2-10× overload\nMitigation: mutex reduces 10K queries → 1 query + 9,999 cache hits\nProbabilistic expiry: refresh at 80-90% of TTL (10-20% jitter)" },
  ]},
  { name:"Networking Fundamentals", color:C.teal, icon:"🌐", items:[
    { term:"DNS & Global Load Balancing",
      def:"DNS (Domain Name System) translates domain names to IP addresses. DNS-based load balancing: return multiple IPs (round-robin) or GeoDNS (route to nearest region based on client location). Anycast routing: same IP announced from multiple locations, network routes to nearest. TTL (Time To Live) controls DNS cache duration — lower TTL allows faster failover but more DNS queries.",
      why:"First layer of global traffic management. GeoDNS routes users to nearest region for low latency. DNS failover enables disaster recovery. Understanding TTL tradeoffs shows production experience.",
      examples:"• Route53 GeoDNS: users in US → us-east-1, users in EU → eu-west-1\n• Cloudflare Anycast: 1.1.1.1 announced from 250+ locations globally\n• DNS round-robin: api.example.com → [1.2.3.4, 5.6.7.8] (alternating)\n• Failover: primary IP health check fails → DNS returns secondary IP\n• TTL tradeoff: 300s (5 min) balances caching vs failover speed",
      tradeoffs:"✅ Simple global load balancing\n✅ Geographic routing for low latency\n✅ No single point of failure (distributed DNS)\n❌ DNS caching causes stale routes (TTL delay)\n❌ Clients may cache DNS aggressively (ignore TTL)\n❌ No request-level load balancing (IP-level only)",
      numbers:"DNS query: 10-100ms (cached: <1ms)\nTTL typical: 60-300 seconds (1-5 minutes)\nFailover time: TTL + propagation (typically 5-15 minutes)\nGeoDNS latency savings: 50-200ms (route to nearest region)" },
    { term:"TCP vs UDP Protocols",
      def:"TCP (Transmission Control Protocol): reliable, ordered, connection-based. 3-way handshake to establish connection. Guarantees delivery via ACKs and retransmission. Used for HTTP, gRPC, databases. UDP (User Datagram Protocol): unreliable, connectionless, no ordering guarantees. Fire-and-forget. Used for DNS, video streaming, gaming, real-time voice.",
      why:"Fundamental protocol choice affecting latency and reliability. TCP for correctness (API calls, data transfer). UDP for speed when loss is tolerable (live video, gaming, DNS). Interviewers expect you to know when to use each.",
      examples:"• TCP: HTTP/1.1, HTTP/2, gRPC, database connections, file transfer\n• UDP: DNS queries (53), video conferencing (WebRTC), live streaming (HLS/DASH), multiplayer gaming, VoIP (Skype, Zoom)\n• TCP penalty: 3-way handshake adds 1 RTT latency at connection start\n• UDP advantage: no connection setup, no retransmission delays\n• Hybrid: QUIC (HTTP/3) = UDP + reliability layer",
      tradeoffs:"TCP:\n✅ Reliable (guaranteed delivery, ordered)\n✅ Congestion control (fair bandwidth sharing)\n✅ Stateful (connection tracking)\n❌ Higher latency (handshake, retransmission)\n❌ Head-of-line blocking (packet loss blocks stream)\n\nUDP:\n✅ Low latency (no handshake, no retransmission)\n✅ No head-of-line blocking\n❌ Unreliable (packets may drop, reorder)\n❌ No congestion control (can flood network)",
      numbers:"TCP handshake: +1 RTT (50-100ms cross-region)\nTCP retransmission: adds 200ms-1s on packet loss\nUDP latency: 10-50ms (1 RTT, no handshake)\nPacket loss tolerance: TCP 0%, UDP tolerates 1-5% (video codec compensates)" },
    { term:"HTTP/1.1 vs HTTP/2 vs HTTP/3",
      def:"HTTP/1.1 (1997): one request per TCP connection (or serial over persistent connection). HTTP/2 (2015): multiplexing (many requests over 1 connection), header compression (HPACK), server push. HTTP/3 (2020): QUIC over UDP, 0-RTT connection, solves head-of-line blocking, faster failover.",
      why:"HTTP/2 is now default for most production APIs and websites. Understanding the evolution shows protocol knowledge. HTTP/3 adoption growing (Cloudflare, Google). Mentioning QUIC demonstrates cutting-edge awareness.",
      examples:"• HTTP/1.1: 6 parallel connections per domain, request queueing\n• HTTP/2: multiplexing → 1 connection, 100 concurrent streams\n• HTTP/2: header compression saves 80-90% on cookie-heavy requests\n• HTTP/3: QUIC 0-RTT → connection resumes instantly (no handshake)\n• HTTP/3: WiFi → cellular handoff has no connection reset\n• Adoption: HTTP/2 ~50% of web, HTTP/3 ~25% and growing",
      tradeoffs:"HTTP/1.1:\n✅ Simple, universal support\n❌ Head-of-line blocking (serial requests)\n❌ High overhead (headers repeated, 6 connections)\n\nHTTP/2:\n✅ Multiplexing (parallel requests, 1 connection)\n✅ Header compression (HPACK)\n❌ Still TCP head-of-line blocking (packet loss blocks all streams)\n\nHTTP/3 (QUIC):\n✅ No head-of-line blocking (UDP-based)\n✅ 0-RTT connection resume\n✅ Faster failover (no TCP state)\n❌ UDP blocked by some firewalls\n❌ Less mature (debugging tools)",
      numbers:"HTTP/1.1: 6 TCP connections × 1 RTT each = 6× overhead\nHTTP/2: 1 connection, 100+ concurrent streams\nHTTP/2 header compression: 80-90% size reduction\nHTTP/3 0-RTT: saves 50-100ms (1 RTT) on connection resume\nAdoption: HTTP/2 ~50%, HTTP/3 ~25% (2024)" },
    { term:"WebSockets vs Long Polling vs SSE",
      def:"WebSockets: full-duplex, persistent TCP connection. Bi-directional (client ↔ server). Upgrade from HTTP via handshake. Long Polling: client sends request, server holds it open until data available, responds, client immediately re-polls. SSE (Server-Sent Events): server pushes data to client over HTTP, one-directional (server → client), client auto-reconnects.",
      why:"Real-time communication is common interview topic (chat, live updates, notifications). Each protocol has distinct tradeoffs. WebSocket for chat/gaming (bi-directional). SSE for notifications (server→client). Long polling fallback for old browsers.",
      examples:"• WebSocket: Slack chat, multiplayer games, collaborative editing (Google Docs)\n• SSE: live sports scores, stock tickers, notification feeds\n• Long Polling: legacy real-time apps, fallback when WebSocket blocked\n• WebSocket handshake: HTTP → ws:// upgrade → persistent TCP connection\n• SSE: EventSource API, auto-reconnect on disconnect",
      tradeoffs:"WebSocket:\n✅ Full-duplex (bi-directional)\n✅ Low latency (no HTTP overhead)\n✅ Efficient (1 connection, no polling)\n❌ Stateful (harder to scale, needs sticky sessions)\n❌ Firewall/proxy issues (non-HTTP protocol)\n\nSSE:\n✅ Simple (HTTP-based, EventSource API)\n✅ Auto-reconnect\n✅ Easier to scale (stateless HTTP)\n❌ One-directional (server → client only)\n❌ Browser connection limits (6 per domain)\n\nLong Polling:\n✅ Works everywhere (HTTP)\n❌ High overhead (constant re-polling)\n❌ Scalability issues (many open connections)",
      numbers:"WebSocket overhead: ~2 bytes per message frame\nSSE overhead: HTTP headers + SSE format (~100 bytes)\nLong polling overhead: full HTTP request/response per message (500+ bytes)\nWebSocket connections: 10K-100K per server (C10K problem)\nSSE browser limit: 6 connections per domain" },
    { term:"gRPC (Google RPC)",
      def:"Modern RPC framework using Protocol Buffers (binary serialization, strongly typed). Built on HTTP/2 (multiplexing, streaming). 5-7× faster than REST/JSON. Supports streaming (client, server, bi-directional). Code generation from .proto files. Designed for internal microservice communication.",
      why:"Standard for microservice-to-service communication at Google, Netflix, Uber. More efficient than REST for internal APIs. Shows modern architecture knowledge. REST for external APIs (browser compatibility), gRPC for internal (performance).",
      examples:"• Microservices: API Gateway (REST) → internal services (gRPC)\n• Streaming: server streaming for live logs, client streaming for uploads\n• Protocol Buffers: schema-defined (user.proto), generates code (Go, Java, Python)\n• HTTP/2: multiplexing → 1 connection for all RPC calls\n• Companies: Google, Netflix, Square, Dropbox, Uber (internal services)",
      tradeoffs:"✅ Fast (binary Protocol Buffers vs JSON text)\n✅ Strongly typed (compile-time type safety from .proto)\n✅ Streaming support (bi-directional)\n✅ HTTP/2 native (multiplexing)\n❌ Not browser-friendly (needs gRPC-Web proxy)\n❌ Harder to debug (binary, not human-readable)\n❌ Tooling less mature than REST",
      numbers:"gRPC vs REST/JSON: 5-7× faster serialization, 3-4× smaller payload\nLatency: gRPC ~5-10ms, REST ~20-30ms (internal network)\nPayload size: Protocol Buffers ~3× smaller than JSON\nHTTP/2 multiplexing: 100+ concurrent RPCs over 1 connection" },
  ]},
  { name:"Partitioning & Sharding", color:C.red, icon:"🗂️", items:[
    { term:"Horizontal Partitioning (Sharding)",
      def:"Split table rows across multiple database nodes (shards) based on shard key. Each shard stores a subset of data. Hash-based sharding: hash(key) mod N → even distribution, no range queries. Range-based: key ranges (A-M, N-Z) → range queries work, but risk hot spots. Directory-based: lookup table maps keys to shards → flexible but adds indirection.",
      why:"Only solution when data exceeds single-node capacity (>1TB typical). Instagram, Twitter, Facebook all shard user data by user_id. Mandatory for horizontal scalability of stateful systems.",
      examples:"• Hash-based: user_id 12345 → hash(12345) mod 4 → shard 1\n• Range-based: user_id 0-1M → shard 0, 1M-2M → shard 1\n• Directory-based: lookup table: {user_id: 12345 → shard 3}\n• Instagram: shards Postgres by user_id (hash)\n• MongoDB: auto-sharding with configurable shard key\n• Pattern: app → router (determines shard) → shard N",
      tradeoffs:"Hash-based:\n✅ Even distribution (no hot spots)\n✅ Simple (hash function)\n❌ No range queries (user_id > 1000 hits all shards)\n❌ Hard to rebalance (rehash all keys)\n\nRange-based:\n✅ Range queries work (user_id 1000-2000 → 1 shard)\n❌ Hot spots (new users cluster in latest shard)\n\nDirectory-based:\n✅ Flexible (reassign shards dynamically)\n❌ Lookup table is SPOF and bottleneck",
      numbers:"Shard when: >1TB per node or >10K writes/sec per node\nTypical shard count: 4-64 shards (powers of 2 for hash)\nRebalancing cost: moving 1TB takes hours (network bandwidth)\nInstagram: 1000+ Postgres shards, each ~500GB" },
    { term:"Vertical Partitioning (Column Splitting)",
      def:"Split table columns across multiple tables or databases. Store frequently accessed (hot) columns separately from rarely accessed (cold) columns. Reduces row size, improves cache efficiency, and I/O performance. Example: user(id, name, email) vs user_profile(id, bio, avatar_blob).",
      why:"Optimize access patterns. Hot columns (name, email) fit in cache. Cold columns (bio, avatar) stored separately to avoid polluting cache. Common pattern for user profiles, product catalogs.",
      examples:"• User table split: user(id, name, email, created_at) | user_profile(id, bio, avatar_url, settings_json)\n• Product catalog: product(id, name, price, stock) | product_details(id, description_blob, images, reviews)\n• Hot columns: accessed 90% of queries (cache-friendly)\n• Cold columns: accessed 10% of queries (separate storage)\n• Pattern: JOIN on demand when cold columns needed",
      tradeoffs:"✅ Better cache hit ratio (hot columns fit in RAM)\n✅ Smaller row size (faster scans)\n✅ I/O efficiency (read only needed columns)\n❌ JOINs required to get full object (2 queries)\n❌ Application complexity (manage 2 tables)\n❌ Foreign key constraints across tables",
      numbers:"Typical split: 80% of queries hit hot columns only\nRow size reduction: 500 bytes → 100 bytes (hot) + 400 bytes (cold)\nCache efficiency: 5× more hot rows fit in same RAM\nExample: 1GB cache holds 2M hot rows vs 400K full rows" },
    { term:"Consistent Hashing",
      def:"Hash ring algorithm where nodes and keys are hashed to points on a ring (0 to 2^32-1). Each key is assigned to the next node clockwise on the ring. On node add/remove, only ~1/N keys are reassigned (vs all keys in naive hash mod N). Virtual nodes (each physical node placed at multiple ring positions) improve distribution.",
      why:"Standard technique for distributed caches (Memcached, Redis Cluster) and databases (Cassandra, DynamoDB). Minimizes data movement on scaling. Mentioning virtual nodes shows deep understanding.",
      examples:"• Ring: hash(key) = 1000 → assigned to node at position 1200 (next clockwise)\n• Add node: only keys between new node and previous node reassigned (~1/N)\n• Virtual nodes: node A appears at 100 positions on ring (even distribution)\n• Cassandra: uses consistent hashing with 256 virtual nodes per physical node\n• Memcached client libraries: consistent hashing to route keys to servers",
      tradeoffs:"✅ Minimal data movement on scale (only 1/N keys move)\n✅ Decentralized (no coordinator needed)\n✅ Fault tolerant (remove node → keys go to next node)\n❌ Non-uniform distribution (without virtual nodes)\n❌ Complexity (ring management, virtual nodes)\n❌ Load balancing tricky (popular keys still cluster)",
      numbers:"Naive hash mod N: adding 1 node → 100% keys reassigned\nConsistent hashing: adding 1 node → 1/N keys reassigned\nVirtual nodes: 100-256 per physical node (Cassandra default: 256)\nKey reassignment: 4 nodes → 5 nodes = 20% keys move (vs 100% naive)" },
    { term:"Hot Spot / Skew Problem (Celebrity Problem)",
      def:"Data skew where one shard receives disproportionate traffic due to popular keys. Classic example: celebrity users (Taylor Swift, Elon Musk) have millions of followers, all hitting same shard. Causes: poor shard key choice, natural popularity distribution. Solutions: salting (append random suffix to shard key), per-celebrity caching, read replicas for hot shards.",
      why:"Major pitfall when discussing sharding in interviews. Shows you understand real-world challenges. Twitter, Instagram face this daily. Always mention mitigation when proposing sharding.",
      examples:"• Celebrity problem: Taylor Swift (user_id 123) → shard 3 overloaded (1M followers read)\n• Poor shard key: shard by timestamp → all new data hits latest shard\n• Mitigation 1: Salt celebrity keys (user_id + rand(0-9)) → spread across 10 shards\n• Mitigation 2: Cache celebrity profiles in Redis (bypass DB)\n• Mitigation 3: Read replicas for hot shards (3 replicas handle reads)\n• Twitter: special handling for verified/celebrity accounts",
      tradeoffs:"Salting:\n✅ Spreads hot keys across shards\n❌ Reads must query all salted copies (10 queries)\n❌ Writes must update all copies\n\nPer-celebrity caching:\n✅ Offloads DB entirely\n❌ Cache stampede risk\n\nRead replicas:\n✅ Scales reads for hot shard\n❌ Doesn't help writes\n❌ Eventual consistency",
      numbers:"Skew example: 1 shard with 10× traffic vs average shard\nCelebrity user: 10M followers → 10M reads on profile update\nSalting overhead: 1 write → 10 shards | 1 read → query 10 shards, merge\nCache hit ratio for celebrities: 99%+ (rarely changes)" },
    { term:"Cross-Shard Queries (Scatter-Gather)",
      def:"Queries that span multiple shards require scatter-gather pattern: query router fans out to all relevant shards, collects results, aggregates (merge, sort, deduplicate), and returns to client. Expensive due to network round-trips and aggregation overhead. Avoid by choosing shard key aligned with query patterns or denormalizing data.",
      why:"Major design constraint. Bad shard key choice forces all queries to scatter-gather. Good shard key enables single-shard queries 90%+ of the time. Drives schema design and denormalization decisions.",
      examples:"• Bad: shard by user_id, query by timestamp → scatter to all shards\n• Good: shard by user_id, query by user_id → single shard\n• Scatter-gather: SELECT COUNT(*) → query all shards, sum results\n• Denormalization: duplicate user data in posts table to avoid JOIN across shards\n• Pattern: router → [shard1, shard2, ..., shardN] → aggregate → response",
      tradeoffs:"✅ Flexibility (can query any dimension)\n❌ Latency: N RTTs (1 per shard) instead of 1\n❌ Aggregation overhead (sort/merge results)\n❌ Resource usage (query N shards, N× connections)\n❌ Failure amplification (1 slow shard slows whole query)",
      numbers:"Single-shard query: 10ms | Scatter-gather (16 shards): 50-200ms (parallel + aggregation)\nResource cost: 16× (16 shards × 1 query each)\nTarget: 90%+ queries hit single shard (good shard key)\nFallback: analytics/reporting queries can scatter-gather (not latency-sensitive)" },
  ]},
];

function ConceptsContent() {
  const [selGroup, setSelGroup] = useState(0);
  const [selItem, setSelItem] = useState(null);
  const g = conceptGroups[selGroup];
  return (
    <div>
      <SectionHeader label="Core Concepts" color={C.blue} title="Foundational Concepts You Must Know" subtitle="Deep-dive reference on every major distributed systems concept tested in interviews" />
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
        {conceptGroups.map((g, i) => (
          <button key={i} onClick={() => { setSelGroup(i); setSelItem(null); }}
            style={{ padding:"7px 14px", borderRadius:8, border:`1px solid ${selGroup===i ? g.color : C.border}`, background:selGroup===i ? `${g.color}18` : "transparent", color:selGroup===i ? g.color : C.muted, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all 0.15s", display:"flex", alignItems:"center", gap:6 }}>
            <span>{g.icon}</span><span>{g.name}</span>
          </button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {g.items.map((item, i) => (
          <div key={i} onClick={() => setSelItem(selItem===i?null:i)}
            style={{ background:selItem===i ? `${g.color}0c` : C.surface, border:`1px solid ${selItem===i ? g.color+"44" : C.border}`, borderRadius:10, cursor:"pointer", overflow:"hidden", transition:"all 0.2s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px" }}>
              <span style={{ color:g.color, fontSize:16, flexShrink:0 }}>◈</span>
              <span style={{ flex:1, color:C.text, fontWeight:600, fontSize:14 }}>{item.term}</span>
              <span style={{ color:C.muted }}>{selItem===i?"▴":"▾"}</span>
            </div>
            <AnimatePresence initial={false}>
              {selItem===i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding:"0 16px 14px 44px" }}>
                    <div style={{ background:C.bg, borderRadius:10, padding:14, marginBottom:12 }}>
                      <div style={{ color:g.color, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>📖 DEFINITION</div>
                      <p style={{ color:C.muted, fontSize:13, lineHeight:1.7, margin:0 }}>{item.def}</p>
                    </div>

                    <div style={{ background:`${g.color}15`, border:`1px solid ${g.color}33`, borderRadius:8, padding:"10px 14px", marginBottom:12 }}>
                      <span style={{ color:g.color, fontSize:11, fontWeight:800, fontFamily:"monospace" }}>💡 WHY IT MATTERS  </span>
                      <span style={{ color:C.text, fontSize:13 }}>{item.why}</span>
                    </div>

                    {item.examples && (
                      <div style={{ background:C.bg, borderRadius:10, padding:14, marginBottom:12 }}>
                        <div style={{ color:C.green, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>✅ REAL-WORLD EXAMPLES</div>
                        <pre style={{ color:C.muted, fontSize:12, lineHeight:1.8, margin:0, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre-wrap" }}>{item.examples}</pre>
                      </div>
                    )}

                    {item.tradeoffs && (
                      <div style={{ background:`${C.red}0f`, borderRadius:10, padding:14, marginBottom:12 }}>
                        <div style={{ color:C.red, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>⚖️ TRADEOFFS</div>
                        <pre style={{ color:C.muted, fontSize:12, lineHeight:1.8, margin:0, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre-wrap" }}>{item.tradeoffs}</pre>
                      </div>
                    )}

                    {item.numbers && (
                      <div style={{ background:`${C.accent}0f`, borderRadius:10, padding:14 }}>
                        <div style={{ color:C.accent, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>📊 NUMBERS & SCALE</div>
                        <pre style={{ color:C.muted, fontSize:12, lineHeight:1.8, margin:0, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre-wrap" }}>{item.numbers}</pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── COMPONENTS ─────────
const components = [
  { name:"Load Balancer", icon:"⚖️", color:C.accent, tier:"L4/L7",
    when:"Always — every production system with >1 app server",
    how:"L4 (TCP): fast, no inspection. L7 (HTTP): routing by path/header, SSL termination, sticky sessions.",
    algorithms:["Round Robin","Least Connections","IP Hash","Weighted Round Robin","Least Response Time"],
    tradeoff:"LB itself is SPOF — deploy active-active pair (AWS ALB handles this). Adds ~1ms latency.",
    examples:["AWS ALB/NLB","Nginx","HAProxy","Envoy","Traefik"] },
  { name:"API Gateway", icon:"🚪", color:C.blue, tier:"Edge",
    when:"Microservices — single client-facing entry point",
    how:"Handles: auth/authz, rate limiting, request routing, SSL termination, request aggregation, response transformation, observability.",
    algorithms:["Path-based routing","/v1/ prefix versioning","Consumer-based throttling","JWT validation","Circuit breaking"],
    tradeoff:"Can become bottleneck. Must be HA (clustered). Complex logic in gateway → anti-pattern.",
    examples:["AWS API Gateway","Kong","Nginx","Ocelot (.NET)","Azure API Management"] },
  { name:"Message Queue / Broker", icon:"📨", color:C.green, tier:"Async",
    when:"Decoupling producers/consumers, spike buffering, async workflows, event streaming",
    how:"Point-to-point (queues) vs pub/sub (topics). Kafka: high-throughput, durable, replay. RabbitMQ: rich routing. SQS: managed, simple.",
    algorithms:["FIFO","Priority Queue","Dead-Letter Queue","Consumer Groups","Competing Consumers"],
    tradeoff:"At-least-once vs exactly-once delivery. Ordering guarantees (Kafka: per-partition). Idempotent consumers required.",
    examples:["Apache Kafka","RabbitMQ","AWS SQS/SNS","Redis Streams","Azure Service Bus"] },
  { name:"Cache (Redis)", icon:"⚡", color:C.purple, tier:"Memory",
    when:"Read-heavy, expensive DB queries, sessions, pub/sub, rate limiting, distributed locks",
    how:"In-memory KV store. Rich structures: String, Hash, List, Set, Sorted Set, HyperLogLog, Bloom Filter. Persistence: RDB+AOF.",
    algorithms:["LRU eviction","LFU eviction","TTL","Sorted Set for leaderboards","Lua scripts for atomicity"],
    tradeoff:"Cache invalidation is hard. Cold start (warm-up needed). Memory is expensive. Data can be stale.",
    examples:["Redis","Memcached","AWS ElastiCache","Dragonfly","KeyDB"] },
  { name:"CDN", icon:"🌐", color:C.teal, tier:"Edge",
    when:"Static assets (JS/CSS/images), video streaming, global user base, DDoS protection",
    how:"PoPs at ISPs worldwide. Push CDN (upload assets) vs Pull CDN (origin fetch on miss). Edge computing for dynamic logic.",
    algorithms:["Cache-Control headers","Surrogate keys for invalidation","Anycast routing","Origin shield","Edge workers"],
    tradeoff:"Cache invalidation propagation lag (minutes). High egress cost. Not for user-specific dynamic content.",
    examples:["Cloudflare","AWS CloudFront","Akamai","Fastly","Azure CDN"] },
  { name:"Object Storage", icon:"📦", color:C.orange, tier:"Storage",
    when:"Blobs: images, video, files, backups, ML training data, static website hosting",
    how:"S3-compatible API. Pre-signed URLs for direct client upload (bypass server). Multipart upload for large files. Lifecycle policies.",
    algorithms:["Pre-signed URLs","Multipart upload","Storage classes (Standard→Glacier)","Versioning","Cross-region replication"],
    tradeoff:"Higher latency than block storage (10–100ms). Eventual consistency (S3 was, now strong). Not for frequent tiny writes.",
    examples:["AWS S3","Azure Blob Storage","Google GCS","MinIO","Cloudflare R2"] },
  { name:"Search Engine", icon:"🔍", color:C.pink, tier:"Search",
    when:"Full-text search, faceted filtering, autocomplete, fuzzy matching, geospatial queries",
    how:"Inverted index maps terms → document IDs. Sync from DB via CDC (Debezium) or event stream. Separate read model.",
    algorithms:["TF-IDF scoring","BM25 ranking","Inverted index","Bloom filters for existence","Trigram index for fuzzy"],
    tradeoff:"Eventual consistency with primary DB. Operational complexity. Not a primary data store.",
    examples:["Elasticsearch","OpenSearch","Solr","Typesense","Meilisearch"] },
  { name:"Stream Processing", icon:"🌊", color:C.red, tier:"Streaming",
    when:"Real-time analytics, fraud detection, live dashboards, event-driven ML pipelines",
    how:"Consume from Kafka, process in micro-batches or record-by-record, output to DB/cache/another topic.",
    algorithms:["Tumbling windows","Sliding windows","Watermarks for late data","Exactly-once semantics","State stores"],
    tradeoff:"Complex to operate. Exactly-once is expensive. State management at scale.",
    examples:["Apache Flink","Apache Spark Streaming","Kafka Streams","AWS Kinesis","Google Dataflow"] },
  { name:"Service Mesh", icon:"🕸️", color:C.blue, tier:"Infra",
    when:"Microservices needing mTLS, observability, traffic management, canary releases",
    how:"Sidecar proxy (Envoy/Linkerd2-proxy) injected per pod handles service-to-service communication transparently.",
    algorithms:["mTLS","Traffic splitting (canary)","Retry policies","Circuit breaking","Distributed tracing"],
    tradeoff:"Significant resource overhead (~50MB per sidecar). Complex to operate. Overkill for small systems.",
    examples:["Istio","Linkerd","Consul Connect","AWS App Mesh","Cilium"] },
  { name:"Distributed Lock", icon:"🔐", color:C.accent, tier:"Coordination",
    when:"Mutual exclusion for shared resources, leader election, preventing duplicate processing",
    how:"Redis: SET key val NX PX ttl (Redlock for multi-node). Zookeeper: ephemeral nodes. DB: SELECT FOR UPDATE (bad at scale).",
    algorithms:["Redlock algorithm","Zookeeper ephemeral nodes","Fencing tokens","Optimistic locking (rowversion)","Lease renewal"],
    tradeoff:"Distributed locks are hard. Redlock controversial (Martin Kleppmann critique). Always add fencing tokens.",
    examples:["Redis (Redlock)","Zookeeper","etcd","Consul","Postgres advisory locks"] },
];

function ComponentsContent() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <SectionHeader label="System Components" color={C.green} title="Building Blocks Reference" subtitle="When, why, how, and the trade-offs of every major system component" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {components.map((c, i) => (
          <div key={i} onClick={() => setSel(sel===i?null:i)}
            style={{ background:sel===i ? `${c.color}0d` : C.surface, border:`1px solid ${sel===i ? c.color+"44" : C.border}`, borderRadius:12, cursor:"pointer", transition:"all 0.2s", overflow:"hidden", borderLeft:`3px solid ${sel===i?c.color:C.dim}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px" }}>
              <span style={{ fontSize:18 }}>{c.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{c.name}</div>
                <Tag t={c.tier} c={c.color} />
              </div>
              <span style={{ color:C.muted }}>{sel===i?"▴":"▾"}</span>
            </div>
            <AnimatePresence initial={false}>
              {sel===i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding:"0 16px 16px" }}>
                    <div style={{ marginBottom:8 }}>
                      <span style={{ color:c.color, fontSize:11, fontWeight:800, fontFamily:"monospace" }}>WHEN  </span>
                      <span style={{ color:C.muted, fontSize:13 }}>{c.when}</span>
                    </div>
                    <div style={{ marginBottom:8 }}>
                      <span style={{ color:C.blue, fontSize:11, fontWeight:800, fontFamily:"monospace" }}>HOW  </span>
                      <span style={{ color:C.muted, fontSize:13 }}>{c.how}</span>
                    </div>
                    <div style={{ marginBottom:10 }}>
                      <div style={{ color:C.green, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:5 }}>KEY TECHNIQUES</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                        {c.algorithms.map((a, j) => <Tag key={j} t={a} c={c.color} />)}
                      </div>
                    </div>
                    <div style={{ background:`${C.red}12`, border:`1px solid ${C.red}2a`, borderRadius:8, padding:"8px 12px", marginBottom:10 }}>
                      <span style={{ color:C.red, fontSize:11, fontWeight:800, fontFamily:"monospace" }}>⚠ TRADE-OFF  </span>
                      <span style={{ color:C.text, fontSize:13 }}>{c.tradeoff}</span>
                    </div>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                      {c.examples.map((e, j) => <Tag key={j} t={e} c={C.muted} />)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── DATABASES ─────────
const dbTypes = [
  { name:"Relational (SQL)", color:C.blue, icon:"📋",
    best:"Complex queries, JOINs, ACID transactions, reporting, financial data, normalized data",
    avoid:"Horizontal sharding, flexible schema, extremely high write throughput, unstructured data",
    scaling:"Vertical → Read Replicas (async) → Sharding (complex, Vitess helps) → NewSQL (CockroachDB)",
    indexing:["B-Tree index (default, range queries)","Hash index (equality only, faster)","Composite index (leftmost prefix rule)","Partial index (WHERE clause)","Covering index (all columns in index)","GIN/GiST (Postgres full-text, JSONB, geo)"],
    examples:["PostgreSQL","MySQL","SQL Server","Oracle","CockroachDB"],
    features:["ACID","Joins","Foreign Keys","JSONB (Postgres)","Window Functions","CTEs","Stored Procs"] },
  { name:"Key-Value Store", color:C.green, icon:"🗝️",
    best:"Sessions, caching, leaderboards, rate limiting, simple lookups by primary key",
    avoid:"Complex queries, relationships, ad-hoc patterns, full-text search",
    scaling:"Consistent hashing for sharding. DynamoDB auto-shards. Redis Cluster = 16384 hash slots.",
    indexing:["Primary key only","DynamoDB GSI (Global Secondary Index)","Redis Sorted Set (score-based)","Composite key patterns (userId#postId)"],
    examples:["Redis","DynamoDB","Memcached","etcd","Aerospike"],
    features:["O(1) lookups","TTL","Atomic ops","Sorted Sets","Pub/Sub","Transactions (Redis 7)"] },
  { name:"Document Store", color:C.accent, icon:"📄",
    best:"Flexible/evolving schema, hierarchical data, content management, user profiles, catalogs",
    avoid:"Heavy multi-document transactions (improving), reporting with aggregations, strict schema",
    scaling:"Auto-sharding by shard key. Atlas auto-scaling. Excellent horizontal scale out of box.",
    indexing:["Single field index","Compound index","Text index (full-text search)","Geospatial (2dsphere)","Wildcard index","Partial index"],
    examples:["MongoDB","Couchbase","Firestore","DynamoDB","CouchDB"],
    features:["Flexible schema","Nested documents","Aggregation Pipeline","Atlas Search","Change Streams","Transactions (4.0+)"] },
  { name:"Wide Column (Cassandra)", color:C.purple, icon:"📊",
    best:"Time-series, IoT, write-heavy, huge scale (petabytes), global distribution, audit logs",
    avoid:"Ad-hoc queries, aggregations, frequent updates, complex relationships",
    scaling:"Masterless ring (no SPOF). Linear horizontal scale. RF=3 for durability. Multi-DC native.",
    indexing:["Partition key (hash, determines node)","Clustering key (sort within partition)","Secondary index (avoid at scale)","Materialized views (denormalized query tables)"],
    examples:["Cassandra","ScyllaDB","HBase","Google BigTable","Amazon Keyspaces"],
    features:["Tunable consistency","No SPOF","CQL (SQL-like)","LSM-tree writes","Compaction","TTL native"] },
  { name:"Graph Database", color:C.pink, icon:"🔗",
    best:"Social networks, recommendations, fraud detection, knowledge graphs, dependency analysis",
    avoid:"Non-relational data, simple lookups, write-heavy systems, graph partitioning at massive scale",
    scaling:"Graph partitioning is NP-hard. Limited horizontal scale. Titan/JanusGraph for large graphs.",
    indexing:["Vertex index","Edge index","Property index","Fulltext vertex/edge search","Composite index on properties"],
    examples:["Neo4j","Amazon Neptune","TigerGraph","JanusGraph","NebulaGraph"],
    features:["Traversal queries","Cypher/Gremlin","Native graph storage","ACID (Neo4j)","Pattern matching","Variable-length paths"] },
  { name:"Time-Series DB", color:C.teal, icon:"📈",
    best:"Metrics, monitoring, IoT sensor data, financial ticks, logs, application traces",
    avoid:"General-purpose, complex relationships, point lookups by non-time key",
    scaling:"Partitioned by time range. High write throughput. Automatic downsampling for old data.",
    indexing:["Timestamp (primary, mandatory)","Tag-based index (label sets)","Metric name index","Downsampling (rollups)","Retention policies"],
    examples:["InfluxDB","TimescaleDB","Prometheus","QuestDB","VictoriaMetrics"],
    features:["Downsampling","Retention policies","Continuous queries","PromQL/Flux","TSBS benchmark","Compression 10-100×"] },
  { name:"NewSQL", color:C.orange, icon:"🔮",
    best:"Need SQL semantics + horizontal scale + global distribution + strong consistency",
    avoid:"Simple workloads (overhead unnecessary), cost-sensitive (premium pricing)",
    scaling:"Auto-sharding with SQL interface. Distributed transactions via 2PC + Raft. Google Spanner uses TrueTime.",
    indexing:["Standard SQL indexes","Distributed secondary indexes","TTL indexes","Zone-based locality hints"],
    examples:["CockroachDB","Google Spanner","TiDB","YugabyteDB","PlanetScale"],
    features:["Distributed ACID","Horizontal scale","SQL compatible","Geo-partitioning","Serverless tier","Rebalancing"] },
];

const dbStrategies = [
  { name:"Read Replicas", desc:"Async replication to 1–N replicas. Route reads there. Eventual consistency. Great for analytics and reporting queries.", when:"Read:Write > 5:1" },
  { name:"Sharding", desc:"Horizontal data partitioning. Hash (even dist) vs Range (range queries) vs Directory (flexible). Cross-shard queries are expensive.", when:"Single node can't hold data" },
  { name:"CQRS", desc:"Command Query Responsibility Segregation. Separate write model (SQL) from read model (Elasticsearch/Redis). Sync via events.", when:"Read/write models have very different needs" },
  { name:"Event Sourcing", desc:"Store events, not state. Replay to rebuild. Audit log built-in. Pairs with CQRS. High storage cost.", when:"Audit requirements, temporal queries needed" },
  { name:"Denormalization", desc:"Duplicate data to avoid JOINs. Trade write cost/complexity for fast reads. Document DBs embrace this.", when:"Read performance critical, write less frequent" },
  { name:"Polyglot Persistence", desc:"Use different DBs for different needs: Postgres (core), Redis (cache), Elasticsearch (search), Cassandra (time-series).", when:"Different parts have different access patterns" },
  { name:"Database Federation", desc:"Split DB by function: users_db, orders_db, inventory_db. Reduces write load per DB. Cross-DB queries require application join.", when:"Monolith DB is bottleneck" },
  { name:"CDC (Change Data Capture)", desc:"Debezium tails DB WAL/binlog → publishes to Kafka. Downstream services consume and sync their read models.", when:"Keeping multiple data stores in sync" },
];

function DatabasesContent() {
  const [selDb, setSelDb] = useState(0);
  const db = dbTypes[selDb];
  return (
    <div>
      <SectionHeader label="Databases & Storage" color={C.purple} title="Complete Database Guide" subtitle="Choosing the right storage is half the battle — know the trade-offs cold" />
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:18 }}>
        {dbTypes.map((t, i) => (
          <button key={i} onClick={() => setSelDb(i)}
            style={{ padding:"7px 13px", borderRadius:8, border:`1px solid ${selDb===i?t.color:C.border}`, background:selDb===i?`${t.color}18`:"transparent", color:selDb===i?t.color:C.muted, cursor:"pointer", fontSize:12, fontWeight:600, transition:"all 0.15s" }}>
            {t.icon} {t.name}
          </button>
        ))}
      </div>
      <div style={{ background:C.surface, border:`1px solid ${db.color}33`, borderRadius:14, padding:22, marginBottom:18 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
          <div style={{ background:`${db.color}0d`, borderRadius:10, padding:14 }}>
            <div style={{ color:db.color, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>✅ BEST FOR</div>
            <div style={{ color:C.text, fontSize:13, lineHeight:1.7 }}>{db.best}</div>
          </div>
          <div style={{ background:`${C.red}0d`, borderRadius:10, padding:14 }}>
            <div style={{ color:C.red, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>❌ AVOID WHEN</div>
            <div style={{ color:C.text, fontSize:13, lineHeight:1.7 }}>{db.avoid}</div>
          </div>
        </div>
        <div style={{ background:C.bg, borderRadius:10, padding:14, marginBottom:14 }}>
          <div style={{ color:C.accent, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:6 }}>📈 SCALING STRATEGY</div>
          <div style={{ color:C.text, fontSize:13 }}>{db.scaling}</div>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ color:C.blue, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>🗂 INDEXING STRATEGIES</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
            {db.indexing.map((idx, i) => (
              <div key={i} style={{ background:C.bg, borderRadius:8, padding:"8px 12px", fontSize:12, color:C.muted, borderLeft:`2px solid ${db.color}` }}>{idx}</div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ flex:1 }}>
            <div style={{ color:C.muted, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>KEY FEATURES</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{db.features.map((f, i) => <Tag key={i} t={f} c={db.color} />)}</div>
          </div>
          <div>
            <div style={{ color:C.muted, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>IMPLEMENTATIONS</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{db.examples.map((e, i) => <Tag key={i} t={e} c={C.muted} />)}</div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ color:C.text, fontWeight:700, fontSize:14, marginBottom:12 }}>📐 Scaling & Design Strategies</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {dbStrategies.map((s, i) => (
            <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <span style={{ color:C.accent, fontSize:13, fontWeight:700 }}>{s.name}</span>
                <Tag t={s.when} c={C.blue} />
              </div>
              <div style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── PATTERNS ─────────
const patterns = [
  { name:"Circuit Breaker", cat:"Resilience", color:C.red, icon:"🔌",
    problem:"Service A calls Service B. B is slow/down. A's threads pile up waiting. A crashes too (cascading failure).",
    solution:"Track failure rate. Threshold exceeded → OPEN circuit (fail fast, don't call B). Half-open: probe with occasional requests. Close on success.",
    states:["CLOSED → normal operation, monitoring failures","OPEN → fail fast, return error immediately (no call to B)","HALF-OPEN → allow limited requests to test recovery"],
    code:`// Polly (.NET)\nvar policy = Policy\n  .Handle<HttpRequestException>()\n  .CircuitBreakerAsync(\n    exceptionsAllowedBeforeBreaking: 5,\n    durationOfBreak: TimeSpan.FromSeconds(30)\n  );`,
    useWhen:"Any synchronous inter-service call", tools:["Polly (.NET)","Resilience4j (Java)","Hystrix (legacy)","Istio (mesh-level)"] },
  { name:"Saga Pattern", cat:"Distributed Transactions", color:C.accent, icon:"📜",
    problem:"Order processing spans: inventory service, payment service, shipping service — each with own DB. Traditional 2PC is too slow and brittle.",
    solution:"Sequence of local transactions. Each step publishes event for next. On failure: publish compensating events to undo prior steps.",
    states:["Choreography: services react to events autonomously (decoupled, harder to debug)","Orchestration: central saga orchestrator coordinates each step (clearer, easier to monitor)","Compensating transactions must be idempotent"],
    code:`// Orchestration example (Temporal)\npublic async Task<OrderResult> ExecuteAsync(OrderInput input) {\n  var inventory = await ReserveInventoryAsync(input);\n  var payment = await ChargePaymentAsync(input); // if fails → compensate\n  await CreateShipmentAsync(input);\n}`,
    useWhen:"Multi-service business transactions (orders, bookings, payments)", tools:["Temporal","AWS Step Functions","MassTransit Saga (.NET)","Axon (Java)"] },
  { name:"CQRS", cat:"Architecture", color:C.blue, icon:"↔️",
    problem:"Same model serves reads (need denormalized, fast) and writes (need normalized, validated). They have different scaling needs.",
    solution:"Separate Command (write) model from Query (read) model. Write: normalized SQL. Read: Redis/Elasticsearch projection. Sync via domain events.",
    states:["Command side: validates, applies business rules, emits domain events","Query side: subscribes to events, maintains read-optimized projections","Eventual consistency between write and read sides"],
    code:`// MediatR (.NET)\npublic class CreateOrderCommand : IRequest<OrderId> {}\npublic class GetOrderQuery : IRequest<OrderDto> {}\n// Handler for command writes to SQL\n// Handler for query reads from Redis`,
    useWhen:"Read-heavy systems, complex domain, event sourcing", tools:["MediatR (.NET)","Axon Framework (Java)","EventStoreDB","Greg Young's original"] },
  { name:"Event-Driven Architecture", cat:"Architecture", color:C.green, icon:"📡",
    problem:"Services tightly coupled. Service A synchronously calls B, C, D. Slow, brittle, failure cascades.",
    solution:"Services emit domain events to broker. Subscribers react asynchronously. Publisher has no knowledge of subscribers.",
    states:["Event notification: small event (OrderPlaced{orderId}) — receiver queries for details","Event-carried state: full payload in event — receiver self-contained","Event sourcing: events ARE the source of truth"],
    code:`// OrderService publishes\nawait _bus.Publish(new OrderPlacedEvent { OrderId = id, ... });\n// InventoryService subscribes\npublic async Task Consume(OrderPlacedEvent msg)\n  => await _inventory.Reserve(msg.OrderId);`,
    useWhen:"Notifications, audit logging, fan-out, async workflows", tools:["Kafka","RabbitMQ","AWS EventBridge","Azure Service Bus","NServiceBus"] },
  { name:"Outbox Pattern", cat:"Reliability", color:C.purple, icon:"📮",
    problem:"Write to DB + publish event = two operations. Either can fail independently → data inconsistency.",
    solution:"Write event to OUTBOX table in same DB transaction as business data. Separate relay service polls outbox and publishes to broker. At-least-once delivery.",
    states:["Application: INSERT business row + INSERT outbox row (same transaction)","Relay/CDC: reads outbox, publishes to Kafka, marks as processed","Consumers must be idempotent (may receive duplicates)"],
    code:`// Same transaction\nawait using var tx = await _db.BeginTransactionAsync();\nawait _db.Orders.AddAsync(order);\nawait _db.OutboxMessages.AddAsync(new OutboxMessage(event));\nawait _db.SaveChangesAsync(); // atomic`,
    useWhen:"Any event-driven system needing guaranteed delivery", tools:["Debezium (CDC)","Wolverine (.NET)","MassTransit Outbox","pg-boss"] },
  { name:"Bulkhead", cat:"Resilience", color:C.teal, icon:"🚢",
    problem:"Service calls multiple downstream services. One slow service consumes all threads → other services starved → whole service fails.",
    solution:"Isolate resource pools per downstream dependency. Thread pool or semaphore per service. Failure contained to that 'compartment'.",
    states:["Thread pool isolation: separate executor per dependency","Semaphore isolation: limit concurrent calls per dependency","Combined with Circuit Breaker: stop calling when limit reached"],
    code:`// Polly Bulkhead (.NET)\nvar policy = Policy.BulkheadAsync(\n  maxParallelization: 10,   // max concurrent calls\n  maxQueuingActions: 20     // queue up to 20\n);`,
    useWhen:"Services with multiple downstream dependencies", tools:["Polly (.NET)","Resilience4j (Java)","Semaphore pools","Thread pool isolation"] },
  { name:"Strangler Fig", cat:"Migration", color:C.pink, icon:"🌱",
    problem:"Need to migrate monolith to microservices without big-bang rewrite (too risky).",
    solution:"API gateway proxy in front of monolith. Incrementally extract features as microservices. Route requests to new service as they're ready. Monolith 'strangled' over time.",
    states:["Phase 1: Proxy all traffic through gateway (no change yet)","Phase 2: Extract service, route subset of traffic to it","Phase 3: Old code path dead — remove from monolith"],
    code:`// Nginx routing\nlocation /api/users {\n  proxy_pass http://user-service; // migrated\n}\nlocation /api/ {\n  proxy_pass http://monolith; // everything else\n}`,
    useWhen:"Legacy modernization, zero-downtime migration", tools:["API Gateway","Nginx routing","Feature flags","YARP (.NET reverse proxy)"] },
  { name:"Sidecar", cat:"Infrastructure", color:C.orange, icon:"🏍️",
    problem:"Cross-cutting concerns (logging, mTLS, tracing, auth) duplicated in every microservice.",
    solution:"Deploy auxiliary container alongside main container (same pod). Handles infrastructure concerns. App is unaware.",
    states:["Service Mesh sidecar (Envoy): handles mTLS, retries, circuit breaking, tracing","Log aggregation sidecar: ships logs to central store","Config sidecar: fetches and injects config (Dapr)"],
    code:`# Kubernetes pod with sidecar\ncontainers:\n  - name: app\n    image: myapp:latest\n  - name: envoy-proxy\n    image: envoyproxy/envoy:latest\n    # intercepts all traffic`,
    useWhen:"Service mesh, observability, config management", tools:["Envoy","Dapr","Linkerd proxy","Consul Connect sidecar"] },
  { name:"Rate Limiting Patterns", cat:"Traffic Management", color:C.red, icon:"🚦",
    problem:"API abuse, DDoS, fair usage enforcement, cost control.",
    solution:"Multiple algorithms with different trade-offs.",
    states:["Token Bucket: tokens refill at constant rate. Allows bursts up to bucket size. Most common.","Leaky Bucket: requests processed at constant rate. Smooths traffic. Simple.","Fixed Window: count per time window. Simple but boundary burst problem.","Sliding Window Log: exact but memory intensive. Stores all request timestamps.","Sliding Window Counter: hybrid — weighted sum of adjacent windows. Best balance."],
    code:`// Redis sliding window (Lua, atomic)\nlocal count = redis.call('INCR', key)\nif count == 1 then\n  redis.call('EXPIRE', key, window_seconds)\nend\nreturn count`,
    useWhen:"Any public-facing API", tools:["Redis","NGINX rate limit module","Kong plugin","AWS WAF","Envoy rate limit service"] },
  { name:"Leader Election", cat:"Coordination", color:C.blue, icon:"👑",
    problem:"Distributed system needs one node to coordinate (scheduler, lock holder). Multiple leaders = split brain.",
    solution:"Consensus-based: Raft/Paxos. Or: ephemeral Zookeeper node. Or: DB-based with heartbeat and lease.",
    states:["Candidate → Follower → Leader lifecycle","Leader sends heartbeats. Timeout → new election.","Lease duration: balance between failover speed and split-brain risk"],
    code:`// etcd-based leader election\nclient.Election.CampaignAsync(\n  \"my-service/leader\",\n  nodeId,\n  TimeSpan.FromSeconds(10) // lease\n);`,
    useWhen:"Distributed schedulers, lock managers, single-writer patterns", tools:["etcd","Zookeeper","Redis (Redlock)","Postgres advisory lock","Consul"] },
];

function PatternsContent() {
  const [sel, setSel] = useState(null);
  const cats = [...new Set(patterns.map(p => p.cat))];
  const [filterCat, setFilterCat] = useState(null);
  const filtered = filterCat ? patterns.filter(p => p.cat === filterCat) : patterns;
  return (
    <div>
      <SectionHeader label="Design Patterns" color={C.red} title="Essential Distributed Systems Patterns" subtitle="Reusable solutions to recurring problems — with code snippets and real tools" />
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        <button onClick={() => setFilterCat(null)} style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${!filterCat?C.accent:C.border}`, background:!filterCat?`${C.accent}18`:"transparent", color:!filterCat?C.accent:C.muted, cursor:"pointer", fontSize:12, fontWeight:600 }}>All</button>
        {cats.map((cat, i) => (
          <button key={i} onClick={() => setFilterCat(filterCat===cat?null:cat)} style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${filterCat===cat?C.blue:C.border}`, background:filterCat===cat?`${C.blue}18`:"transparent", color:filterCat===cat?C.blue:C.muted, cursor:"pointer", fontSize:12, fontWeight:600 }}>{cat}</button>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {filtered.map((p, i) => (
          <div key={i} onClick={() => setSel(sel===p.name?null:p.name)}
            style={{ background:sel===p.name?`${p.color}0d`:C.surface, border:`1px solid ${sel===p.name?p.color+"44":C.border}`, borderRadius:12, cursor:"pointer", transition:"all 0.2s", overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"14px 16px" }}>
              <span style={{ fontSize:18 }}>{p.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{p.name}</div>
                <Tag t={p.cat} c={p.color} />
              </div>
              <span style={{ color:C.muted }}>{sel===p.name?"▴":"▾"}</span>
            </div>
            <AnimatePresence initial={false}>
              {sel===p.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding:"0 16px 16px" }}>
                    <div style={{ background:`${C.red}0f`, borderRadius:8, padding:"10px 12px", marginBottom:8 }}>
                      <div style={{ color:C.red, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:4 }}>PROBLEM</div>
                      <div style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{p.problem}</div>
                    </div>
                    <div style={{ background:`${C.green}0f`, borderRadius:8, padding:"10px 12px", marginBottom:8 }}>
                      <div style={{ color:C.green, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:4 }}>SOLUTION</div>
                      <div style={{ color:C.muted, fontSize:13, lineHeight:1.5 }}>{p.solution}</div>
                    </div>
                    <div style={{ marginBottom:8 }}>
                      <div style={{ color:p.color, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:6 }}>STATES / MECHANICS</div>
                      {p.states.map((s, j) => (
                        <div key={j} style={{ display:"flex", gap:8, marginBottom:4 }}>
                          <span style={{ color:p.color, flexShrink:0 }}>→</span>
                          <span style={{ color:C.muted, fontSize:13 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background:C.bg, borderRadius:8, padding:"10px 12px", marginBottom:10, fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.green, lineHeight:1.7, whiteSpace:"pre-wrap", overflowX:"auto" }}>{p.code}</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {p.tools.map((t, j) => <Tag key={j} t={t} c={p.color} />)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── QUESTIONS ─────────
const questions = [
  { name:"URL Shortener", icon:"🔗", difficulty:"Medium", color:C.green, tags:["Hashing","KV Store","CDN"],
    scale:"1B URLs stored, 100:1 read:write, 10K QPS reads, 100 QPS writes",
    diagram:"url-shortener",
    metrics:[
      { value:"1B", label:"URLs Stored", color:C.green },
      { value:"10K", label:"Read QPS", color:C.blue },
      { value:"100", label:"Write QPS", color:C.purple },
      { value:"100:1", label:"Read/Write Ratio", color:C.accent }
    ],
    requirements:["Shorten long URL → short code (6–8 chars)","Redirect short URL to original (HTTP 301/302)","Custom aliases, URL expiry, analytics (optional)"],
    architecture:[
      "Base62 encode auto-increment ID (a-z, A-Z, 0-9) → 6 chars covers 56B URLs",
      "Write: generate ID (Snowflake or DB sequence) → Base62 encode → store in Redis + Cassandra",
      "Read: short code → Redis lookup → if miss → Cassandra → 301 redirect",
      "CDN caches popular redirects (301 = browser caches, 302 = always hits server)",
      "Analytics: async write click events to Kafka → Spark → time-series DB",
    ],
    schema:"urls(id BIGINT PK, short_code VARCHAR(8) UNIQUE, long_url TEXT, user_id, created_at, expires_at, custom_alias)",
    bottlenecks:["Hash collisions — use counter-based approach instead","Custom alias conflicts — CAS (compare-and-swap) in Redis","Hot URLs flood single cache key — local LRU cache in service"],
    tricky:"301 vs 302: 301 caches at browser (no analytics), 302 always hits server (analytics but slower)" },

  { name:"Twitter / Social Feed", icon:"🐦", difficulty:"Hard", color:C.blue, tags:["Fan-out","Timeline","Sharding"],
    scale:"500M users, 300M DAU, 500M tweets/day, 28K QPS reads, 6K QPS writes",
    diagram:"twitter",
    metrics:[
      { value:"500M", label:"Total Users", color:C.blue },
      { value:"300M", label:"Daily Active", color:C.green },
      { value:"28K", label:"Read QPS", color:C.purple },
      { value:"6K", label:"Write QPS", color:C.red },
      { value:"500M", label:"Tweets/Day", color:C.accent },
      { value:"4.7:1", label:"Read/Write Ratio", color:C.teal }
    ],
    requirements:["Post tweets (text, images, video)","Home timeline (follow graph aggregated feed)","Search tweets, trending hashtags","Like, retweet, reply, DMs"],
    architecture:[
      "Fan-out on write (push): on tweet, write to all follower timelines in Redis sorted sets. Fast reads.",
      "Celebrity problem: Obama has 130M followers — skip fan-out for high-follower accounts",
      "Fan-out on read (pull) for celebrities: merge celebrity tweets into timeline at read time",
      "Tweet store: sharded Cassandra by tweet_id (Snowflake). tweet_id encodes timestamp.",
      "Media: uploaded to S3 → async transcoding (multiple resolutions) → served via CDN",
      "Search: async index tweets to Elasticsearch. Trending: count hashtags in Kafka stream.",
    ],
    schema:"tweets(tweet_id BIGINT PK, user_id, content, media_urls[], created_at) | timeline(user_id, tweet_id, created_at) [Redis Sorted Set]",
    bottlenecks:["Follower writes for celebrities: cap fan-out at 10K followers, pull for rest","Timeline Redis sorted set per user: cap at 800 most recent tweets","Retweet storm: rate limit, queue processing"],
    tricky:"Hybrid push-pull: push for regular users (< N followers), pull for celebrities. Threshold N ≈ 1M." },

  { name:"WhatsApp / Chat System", icon:"💬", difficulty:"Hard", color:C.accent, tags:["WebSocket","Presence","E2E Encryption"],
    scale:"2B users, 100B messages/day, 1.15M msgs/sec, sub-second delivery",
    requirements:["1-1 messaging and group chats","Delivery receipts (sent ✓, delivered ✓✓, read ✓✓)","Presence (online/offline/last seen)","Media sharing, voice/video calls (WebRTC)"],
    architecture:[
      "WebSocket connection per user to nearest chat server (sticky via consistent hashing on user_id)",
      "Message flow: Sender → Chat Server → Kafka → Recipient Chat Server → WebSocket → Recipient",
      "Offline messages: stored in Cassandra, delivered when user reconnects. Delete after delivery.",
      "Message store: Cassandra sharded by conversation_id. Clustering key: message_id (Snowflake).",
      "Presence service: users send heartbeat every 5s to presence server → stores in Redis TTL=30s",
      "Group chats: fan-out in application layer. > 1000 members: async fan-out via Kafka",
    ],
    schema:"messages(conversation_id UUID, message_id BIGINT, sender_id, content BLOB, status ENUM, created_at) | presence(user_id, status, last_seen) [Redis]",
    bottlenecks:["WebSocket connection count: 1 server can handle ~65K connections. Need many servers.","Group fan-out for large groups: async via queue","Media: direct P2P upload to S3 with pre-signed URL, server never sees media bytes"],
    tricky:"Message ordering in distributed system: use Snowflake IDs (time-sortable). Lamport timestamps for strict ordering." },

  { name:"YouTube / Video Platform", icon:"▶️", difficulty:"Hard", color:C.red, tags:["CDN","Transcoding","Adaptive Bitrate"],
    scale:"2B+ users, 500hr uploaded/min, 1B+ hrs watched/day, 15% global internet traffic",
    requirements:["Upload video (up to 10GB)","Transcode to multiple resolutions (360p to 4K)","Stream video with adaptive bitrate","Search videos, recommendations, comments, likes"],
    architecture:[
      "Upload: client → S3 multipart upload (bypass app server). Pre-signed URL for direct upload.",
      "Upload complete event → Kafka → Transcoding service (FFmpeg workers). Output: HLS/DASH segments in S3.",
      "Transcoding: multiple resolution outputs (240p, 360p, 720p, 1080p, 4K). Stored in S3.",
      "Streaming: S3 → CloudFront CDN → client. Adaptive bitrate (ABR): client switches quality based on bandwidth.",
      "Metadata: video info in PostgreSQL. Search index in Elasticsearch.",
      "View count: approximate counting with Redis INCR. Persist async to DB. Use HyperLogLog for unique views.",
    ],
    schema:"videos(video_id, user_id, title, description, status ENUM[processing,ready,failed], s3_path, duration_sec, created_at) | video_segments(video_id, quality, segment_index, s3_path)",
    bottlenecks:["Transcoding is CPU-intensive — separate worker fleet, priority queue by video length","CDN cache hit rate: pre-warm popular videos at edge","Hot video spike: CDN handles, origin protected"],
    tricky:"Resume playback: store progress in Redis (user_id:video_id → seconds). HLS .m3u8 manifest points to segments, enabling ABR." },

  { name:"Uber / Ride Sharing", icon:"🚗", difficulty:"Hard", color:C.purple, tags:["Geospatial","WebSocket","Matching"],
    scale:"20M trips/day, 5M drivers active, matching latency < 1 second",
    requirements:["Request ride, match nearby driver","Real-time driver location tracking","Trip pricing (surge), ETA calculation","Payments, ratings, history"],
    architecture:[
      "Driver location: push GPS every 4s via WebSocket. Location service stores in Redis geo-index.",
      "Geospatial: S2 geometry library divides earth into cells (S2 cells). Find drivers in nearby cells.",
      "Matching service: find N nearest available drivers → rank by ETA → offer to best candidate → if reject → next",
      "Trip state machine: REQUESTED → ACCEPTED → DRIVER_ARRIVED → IN_PROGRESS → COMPLETED",
      "Pricing: real-time demand/supply ratio per S2 cell → surge multiplier. Kafka stream for demand counting.",
      "ETA: Google Maps API or internal map routing with OSRM. Cache routes for common city paths.",
    ],
    schema:"drivers(driver_id, location POINT, status ENUM, vehicle_info) | trips(trip_id, rider_id, driver_id, status ENUM, pickup POINT, dropoff POINT, price DECIMAL, started_at, ended_at)",
    bottlenecks:["Driver location updates: 5M drivers × 1 update/4s = 1.25M writes/sec → Redis cluster","Matching: must be < 500ms. Use geospatial index, not full scan","Surge pricing hot cells: Kafka aggregation with windowed counts"],
    tricky:"Race condition in driver matching: use optimistic locking or Redis SETNX to 'claim' a driver atomically. Prevent two riders getting same driver." },

  { name:"Netflix / Video Streaming", icon:"🎬", difficulty:"Hard", color:C.pink, tags:["CDN","Microservices","Recommendation"],
    scale:"260M+ subscribers, 15% global internet traffic, 200+ microservices",
    requirements:["Browse catalog, personalized recommendations","Stream video (high quality, adaptive)","Multiple profiles per account","Downloads for offline"],
    architecture:[
      "Content catalog: stored in Cassandra (high availability, global). Cached in EVCache (Netflix's Memcached).",
      "Video delivery: Open Connect Appliances (Netflix's own CDN servers at ISPs). Pre-load popular content.",
      "Streaming: DASH adaptive bitrate. Client selects quality segment based on available bandwidth.",
      "Recommendations: collaborative filtering + deep learning. Trained offline, served via feature store.",
      "API Gateway (Zuul): routes to 200+ microservices. Per-client response aggregation (Falcor).",
      "Chaos Engineering: Chaos Monkey randomly kills production instances to test resilience.",
    ],
    schema:"profiles(account_id, profile_id, viewing_history[], preferences) | content(content_id, title, genres[], regions[], available_qualities[])",
    bottlenecks:["Popular show launch: pre-position content at edge CDN before release","Recommendation serving: pre-compute and cache, < 50ms SLA","Regional licensing: content filtering by user region"],
    tricky:"Open Connect: ISP-hosted Netflix servers serve 95% of traffic. Reduces CDN costs dramatically. Pre-position content based on predicted popularity." },

  { name:"Instagram / Photo Sharing", icon:"📸", difficulty:"Hard", color:C.orange, tags:["Media Processing","Feed","CDN"],
    scale:"2B users, 100M photos/day uploaded, 500M Stories/day, 4B likes/day",
    requirements:["Upload photos/videos, apply filters","Follow/following graph, feed generation","Stories (24hr expiry), Reels","Explore page, hashtags, search"],
    architecture:[
      "Photo upload: pre-signed S3 URL → direct upload → async pipeline: thumbnail generation, filter processing, CDN distribution",
      "Feed: hybrid fan-out. For users < 1M followers: push to follower Redis sorted sets. Celebrities: pull on demand.",
      "Stories: stored separately with TTL. S3 for media, Cassandra for metadata with TTL column.",
      "Explore: pre-computed clusters of popular content by topic. Elasticsearch for tag/caption search.",
      "Like count: Redis INCR for real-time display. Async persist to DB with Kafka pipeline.",
      "User graph: stored in specialized graph store for follow/follower traversal. Cached adjacency lists.",
    ],
    schema:"photos(photo_id BIGINT, user_id, s3_url, caption, location, created_at) | stories(story_id, user_id, media_url, expires_at, views[]) | likes(photo_id, user_id) [sharded]",
    bottlenecks:["4B likes/day = 46K likes/sec: Redis counter + async batch persist","Filter processing: GPU workers, async pipeline","Stories expiry: TTL in Cassandra, background cleanup job"],
    tricky:"Follower count and like counts shown are approximate (Redis INCR). Strong consistency for these would kill performance. Users don't need exact counts." },

  { name:"Google Maps / Navigation", icon:"🗺️", difficulty:"Hard", color:C.teal, tags:["Geospatial","Graph","Real-time Traffic"],
    scale:"1B+ users, 20M businesses, real-time traffic from millions of probes",
    requirements:["Turn-by-turn navigation","Real-time traffic, ETA","Business search (nearby)","Street View, satellite imagery"],
    architecture:[
      "Map data: hierarchical tiles at zoom levels. Pre-rendered tile images served from CDN by tile coordinates.",
      "Routing: world map as graph (nodes=intersections, edges=roads with weights). Dijkstra/A* too slow at global scale.",
      "Optimized routing: Contraction Hierarchies preprocessing + bidirectional A*. Splits routing into hierarchy levels.",
      "Real-time traffic: user phones send GPS probes → aggregated per road segment → update edge weights.",
      "ETA: ML model on historical + real-time traffic patterns. Historical data: time-of-day, day-of-week.",
      "Nearby search: geospatial quadtree or R-tree index. Redis GEOSEARCH for proximity queries.",
    ],
    schema:"road_segments(segment_id, from_node, to_node, distance, speed_limit, current_speed, road_type) | businesses(business_id, name, location POINT, category, rating, hours)",
    bottlenecks:["Route computation: graph partitioning by region, distributed routing algorithm","Traffic updates: 1M probe uploads/min → stream processing → segment speed update","Map tile serving: billions of tile requests → CDN with very high hit rate (tiles don't change often)"],
    tricky:"Contraction Hierarchies: pre-process graph to add 'shortcut' edges (skip unimportant nodes). Reduces search space by 1000×. Important interview depth point." },

  { name:"Slack / Team Messaging", icon:"💼", difficulty:"Hard", color:C.blue, tags:["WebSocket","Search","Workspace"],
    scale:"20M DAU, 5B messages/day, 750K workspaces, real-time messaging",
    requirements:["Channels, DMs, threads","Real-time messaging with presence","Full-text message search","File sharing, integrations (webhooks)","Video calls (Huddles)"],
    architecture:[
      "WebSocket server: users maintain persistent connection. Gateway routes to correct workspace shard.",
      "Message store: Cassandra partitioned by (workspace_id, channel_id). Clustering key: message_ts.",
      "Search: Elasticsearch index for full-text search. Updated via Kafka consumer on new messages.",
      "Workspace isolation: each workspace is a logical shard. Large workspaces get dedicated resources.",
      "Presence: Redis pub/sub for typing indicators. Redis sorted set for online users per channel.",
      "Unfurling: when URL posted, scrape metadata async, update message with preview card.",
    ],
    schema:"messages(workspace_id, channel_id, message_id TIMEUUID, user_id, content, thread_id, reactions{}, attachments[], created_at) | channels(workspace_id, channel_id, name, member_ids[])",
    bottlenecks:["Large workspaces (Slack itself): dedicated database shards","Message history: paginate with cursor on message_ts (Cassandra range query)","Search at scale: index per workspace, Elasticsearch with workspace-level security"],
    tricky:"Thread model: root message has thread_id=null. Reply has thread_id=root_message_id. Thread reply count denormalized on root message." },

  { name:"TikTok / Short Video", icon:"🎵", difficulty:"Hard", color:C.pink, tags:["Recommendation","CDN","Feed"],
    scale:"1B users, 34M videos uploaded/day, 1B+ videos watched/day, 167M videos/hr",
    requirements:["Upload short videos (15s–10min)","'For You' personalized feed (infinite scroll)","Following feed, duets, effects","Live streaming, creator analytics"],
    architecture:[
      "Upload: pre-signed URL → S3. Async transcoding pipeline (multiple resolutions + thumbnails).",
      "For You Page (FYP): core differentiator. Candidate generation + multi-stage ranking pipeline.",
      "Candidate generation: collaborative filtering + content-based (visual features, audio, hashtags, location).",
      "Ranking model: 4-stage funnel: recall (millions→thousands) → pre-ranking (→hundreds) → ranking (→dozens) → re-ranking (diversity).",
      "Video serving: CDN with adaptive quality. Prefetch next 2 videos while user watches current.",
      "Live: RTMP ingest → transcoding → HLS distribution. Low latency mode: LL-HLS or WebRTC.",
    ],
    schema:"videos(video_id, creator_id, s3_url, duration, hashtags[], audio_id, created_at, view_count, like_count) | user_interactions(user_id, video_id, watch_time, liked, shared, timestamp)",
    bottlenecks:["FYP inference: batch pre-compute candidate videos per user, serve from Redis","Video prefetch: cache next video before user swipes — reduces perceived latency to 0","Creator metrics: approximate counts (Redis HyperLogLog for unique views)"],
    tricky:"FYP cold start: new users have no history. Bootstrap from: age group, region, trending content, initial interest selection. New videos get 'test traffic' allocation to gauge engagement." },

  { name:"Airbnb / Booking Platform", icon:"🏠", difficulty:"Hard", color:C.orange, tags:["Search","Inventory","Double-booking"],
    scale:"150M users, 6M+ listings, 2M+ nightly stays, 100M+ searches/day",
    requirements:["List/search properties by location, dates, price, amenities","Book (prevent double-booking)","Reviews, ratings, payments","Host management dashboard"],
    architecture:[
      "Search: Elasticsearch geo-search by location + date availability filter. Denormalized listing index updated async.",
      "Availability calendar: Redis bitmap per listing (1 bit per day). Fast availability check. Source of truth in DB.",
      "Booking: distributed lock on (listing_id, date_range) using Redis SETNX during booking transaction.",
      "Double-booking prevention: DB-level: unique constraint on (listing_id, date) in availability table. Row-level locking.",
      "Pricing: dynamic pricing model → precomputed price calendar per listing. Updated nightly.",
      "Reviews: after checkout, trigger review flow. Stored in PostgreSQL. Search index updated for listing score.",
    ],
    schema:"listings(listing_id, host_id, location POINT, price_per_night, amenities[], description) | bookings(booking_id, listing_id, guest_id, check_in, check_out, total_price, status) | availability(listing_id, date, is_available, price)",
    bottlenecks:["Search during popular dates: cache availability overlay on search results (eventually consistent)","Booking race condition: two users booking same dates simultaneously → DB constraint rejects second attempt","Hot listings: celebrity home listed → Redis lock contention → queue requests"],
    tricky:"Two-phase booking: 1) hold/reserve (soft lock, 15-min TTL) 2) confirm (payment → update DB → release lock). Prevents payment failures leaving listings locked forever." },

  { name:"Stock Exchange / Trading System", icon:"📈", difficulty:"Hard", color:C.red, tags:["Order Book","Low Latency","Matching Engine"],
    scale:"NYSE: 4–10B shares/day, sub-microsecond matching, 99.9999% uptime requirement",
    requirements:["Place orders (market, limit, stop-loss)","Order matching engine (price-time priority)","Market data feed (real-time prices)","Trade settlement, portfolio management"],
    architecture:[
      "Order book: in-memory data structure (sorted map: price → queue of orders). NO database in critical path.",
      "Matching engine: single-threaded for correctness (no concurrent modification). 50K–1M orders/sec.",
      "Price-time priority: best bid meets best ask. If multiple orders at same price → FIFO.",
      "Market data: matched trades → published to Kafka → broadcast to all subscribers (WebSocket/FIX protocol).",
      "Persistence: event log of all orders and trades → async write to DB for recovery.",
      "Co-location: HFT firms physically co-locate servers at exchange to minimize network latency.",
    ],
    schema:"orders(order_id, user_id, symbol, side ENUM[BUY,SELL], type ENUM[MARKET,LIMIT], quantity, price, status, created_at) | trades(trade_id, buy_order_id, sell_order_id, symbol, quantity, price, executed_at)",
    bottlenecks:["Matching engine is single point: replicate state via event log → warm standby for failover","Market data distribution: fan-out to 1000s of subscribers via Kafka partitioned by symbol","Settlement: T+2 day settlement process, async, batch","Lock-free data structures for order book: ConcurrentSkipListMap"],
    tricky:"Single-threaded matching engine intentional: eliminates locking overhead, ensures deterministic ordering. Throughput: process 1M orders/sec on modern CPU single core with in-memory order book." },

  { name:"Payment System (Stripe-like)", icon:"💳", difficulty:"Hard", color:C.green, tags:["ACID","Idempotency","Reconciliation"],
    scale:"500M transactions/day, 99.9999% uptime, $1T+ processed annually",
    requirements:["Accept payments (card, bank, crypto)","Payout to merchants","Fraud detection","Reconciliation, reporting, compliance"],
    architecture:[
      "Idempotency key: client sends unique key per payment. Server stores result → duplicate requests return same response.",
      "Payment state machine: CREATED → PROCESSING → SUCCEEDED/FAILED. Persisted in PostgreSQL with ACID.",
      "Card processing: PSP gateway (Stripe, Adyen). Async webhook for settlement confirmation.",
      "Fraud detection: rule engine + ML model. Runs in <100ms before authorizing. Flag suspicious → manual review.",
      "Double-spend prevention: DB-level idempotency key unique constraint. Redis lock during processing.",
      "Ledger: immutable append-only double-entry ledger. Never UPDATE, only INSERT. Assets = Liabilities + Equity.",
    ],
    schema:"payments(payment_id UUID PK, idempotency_key UNIQUE, amount DECIMAL(19,4), currency, status ENUM, merchant_id, customer_id, created_at) | ledger_entries(entry_id, payment_id, account_id, amount, type ENUM[DEBIT,CREDIT], created_at)",
    bottlenecks:["Idempotency at scale: Redis cache of recent idempotency keys (last 24hr) for fast dedup","Reconciliation: batch job compares internal ledger with PSP reports. Discrepancies → alert","Fraud ML: async scoring acceptable for low-risk. Sync for high-value transactions."],
    tricky:"Exactly-once payment processing: idempotency key + database unique constraint ensures money never debited twice even with retries. This is the #1 requirement in payments." },

  { name:"Google Drive / File Storage", icon:"📁", difficulty:"Medium", color:C.blue, tags:["Chunking","Delta Sync","Conflict Resolution"],
    scale:"1B+ users, 15GB free per user, 10M concurrent connections",
    requirements:["Upload/download files of any size","Real-time sync across devices","Sharing and collaboration","Version history, recovery"],
    architecture:[
      "Chunking: split files into 4MB chunks. Each chunk stored in object storage (S3) with content hash as key.",
      "Deduplication: same content hash = same chunk. Store once, reference many times. Massive storage savings.",
      "Delta sync: client computes changed chunks only, uploads only diffs. Efficient for large files with small edits.",
      "Metadata service: PostgreSQL stores file hierarchy, chunk references, version history.",
      "Real-time sync: long poll or WebSocket for sync notifications. Server pushes 'sync needed' events.",
      "Conflict resolution: last-write-wins for non-text. Vector clocks for ordering. Create conflict copy for text.",
    ],
    schema:"files(file_id, user_id, name, parent_folder_id, size, current_version_id, created_at) | file_versions(version_id, file_id, chunk_ids[], created_at, checksum) | chunks(chunk_hash PK, s3_key, size)",
    bottlenecks:["Large file upload: multipart S3 upload with parallel chunk uploads","Sync storm: user reconnects after offline → batch sync, not one-by-one","Hot folders: shared team folders with many editors → collaborative editing requires OT or CRDT"],
    tricky:"Resumable uploads: client saves upload progress (uploaded chunk list). On resume, skip already-uploaded chunks. Critical for mobile on flaky connections." },

  { name:"Distributed ID Generator", icon:"🔑", difficulty:"Medium", color:C.purple, tags:["Snowflake","Monotonic","Sharding"],
    scale:"10K+ IDs/ms per node, globally unique, no coordination required",
    requirements:["Globally unique IDs","Roughly time-sortable","No single point of failure","High throughput (100K+ /sec)"],
    architecture:[
      "Twitter Snowflake: 64-bit integer = 41-bit timestamp (ms) + 10-bit machine ID + 12-bit sequence",
      "41-bit timestamp → 69 years from epoch. Custom epoch (e.g., Jan 1 2020) extends useful range.",
      "12-bit sequence → 4096 IDs per ms per node. 10-bit machine ID → 1024 nodes max.",
      "No coordination needed between nodes. Each node self-sufficient.",
      "Clock rollback problem: NTP adjustment can cause duplicate IDs. Detect and wait or use logical clock.",
      "UUID v4: simpler but random (no sort), 128-bit (storage overhead), no timestamp. ULIDs: URL-safe Snowflake alternative.",
    ],
    schema:"No schema — pure computation. Machine ID allocated from Zookeeper on startup. Stored in config.",
    bottlenecks:["Machine ID pool: 1024 max nodes. Use worker registration in Zookeeper with ephemeral nodes","Clock skew: detect backwards clock jump, wait until caught up","Sequence exhaustion: > 4096 IDs/ms → sleep until next millisecond"],
    tricky:"Snowflake IDs are K-sortable (sortable within same timestamp), enabling sequential DB inserts which reduce B-tree fragmentation — better cache performance than random UUIDs." },

  { name:"Web Crawler / Search Indexer", icon:"🕷️", difficulty:"Medium", color:C.teal, tags:["BFS","Bloom Filter","Politeness"],
    scale:"1B pages, re-crawl every 4 weeks, 10K pages/sec, 500TB HTML storage",
    requirements:["Discover and download web pages","Respect robots.txt, rate limits","Handle duplicates, redirects","Feed search index with fresh content"],
    architecture:[
      "URL Frontier: priority queue (BFS/DFO with freshness scoring). Redis sorted set by priority score.",
      "Bloom filter: 1B URLs × 10 bits/URL = 10Gb memory. Check if URL seen before adding to frontier.",
      "Fetcher workers: pull URL from frontier → DNS resolve (cache) → HTTP GET → store raw HTML.",
      "Politeness: rate limit per domain (robots.txt Crawl-delay header). One fetcher thread per domain.",
      "Deduplication: SHA-256 hash of normalized HTML content. Simhash for near-duplicate detection.",
      "Link extractor: parse HTML → extract links → normalize → add unseen URLs to frontier.",
    ],
    schema:"urls(url TEXT PK, url_hash, status ENUM[PENDING,FETCHED,FAILED], last_crawled_at, content_hash, priority_score) | content(content_hash PK, raw_html, headers, fetched_at)",
    bottlenecks:["DNS resolution: cache DNS results per domain (DNS TTL), async resolver","Spider trap: URL parameters create infinite loops → set max depth, detect repeated path patterns","Fresh content: re-crawl priority based on content change frequency (sitemaps help)"],
    tricky:"Politeness is critical: if crawler ignores robots.txt or hammers servers, IP gets blocked. Separate fetcher queue per domain with rate limiting." },

  { name:"Rate Limiter Service", icon:"🚦", difficulty:"Medium", color:C.accent, tags:["Token Bucket","Redis","Distributed"],
    scale:"1M+ req/sec through limiter, < 5ms decision latency, distributed across regions",
    requirements:["Limit requests per user, IP, API key","Multiple limit tiers (free, pro, enterprise)","Return Retry-After header","Distributed — works across all API instances"],
    architecture:[
      "Token Bucket (chosen): tokens refill at rate R, bucket capacity B. Allows bursts. Most intuitive.",
      "Sliding Window Counter: count requests in current window + weighted fraction of previous window.",
      "Storage: Redis for distributed state. INCR + EXPIRE for fixed window. Sorted Set for sliding window log.",
      "Atomicity: Redis Lua script for atomic read-check-increment. Prevents race conditions.",
      "Local cache: in-process cache of rate limit state (50ms TTL). Reduces Redis calls by 90%.",
      "Response: 429 Too Many Requests + Retry-After: 30 header + X-RateLimit-Remaining.",
    ],
    schema:"No permanent schema. Redis keys: 'ratelimit:{user_id}:{window}' → COUNT (EXPIRE = window_size). Config: rate_limits(tier ENUM, requests_per_second, burst_size)",
    bottlenecks:["Redis latency: < 1ms for most ops. Use pipelining for multiple limit checks","Distributed: each datacenter has own Redis. Accept slight over-limit across regions (global sync too slow)","Config changes: hot reload rate limit configs without restart"],
    tricky:"Sliding window log vs counter: log stores all timestamps (exact, memory heavy at high QPS). Counter: O(1) memory, slight inaccuracy at window boundaries. Counter is correct choice at scale." },

  { name:"News Feed (Facebook)", icon:"📰", difficulty:"Hard", color:C.blue, tags:["Feed Ranking","Fan-out","EdgeRank"],
    scale:"3B users, 500M+ feed updates/day, < 300ms feed load time",
    requirements:["Personalized news feed from friends/pages","Rank posts by relevance (not just recency)","Real-time updates for new posts","Filter spam, click-bait"],
    architecture:[
      "Fan-out on write: on post, push post_id to all friend timelines in Redis (cap at 500 posts per user feed).",
      "Feed ranking: 3-stage ML pipeline. Candidate retrieval → scoring (EdgeRank: affinity × weight × decay) → diversity filter.",
      "Affinity score: interaction history with this person/page. Weight: post type (video > photo > link > status). Time decay: newer = higher.",
      "Aggregation service: merges cached timeline with real-time updates. Deduplicates seen posts.",
      "Read path: Redis timeline → fetch post metadata from Memcache → rank with ML model → return paginated results.",
      "Notifications: separate pipeline. Friend posts → Kafka → notification worker → push/email.",
    ],
    schema:"posts(post_id BIGINT, user_id, content, post_type, created_at) | user_feed(user_id, post_ids[] [Redis List, cap 500]) | post_interactions(user_id, post_id, type ENUM, timestamp)",
    bottlenecks:["Fan-out for users with 5000 friends: async fan-out via Kafka consumer group","Feed ranking ML inference: pre-score candidates in batch, serve from cache","Privacy filtering: filter deleted/unfriended posts at read time (not at write time)"],
    tricky:"Content ranking separates Facebook from Twitter chronological feed. The EdgeRank formula (and modern ML replacement) is the secret sauce — always discuss ranking when designing social feeds." },

  { name:"Live Streaming (Twitch-like)", icon:"📺", difficulty:"Hard", color:C.red, tags:["RTMP","HLS","CDN","Chat"],
    scale:"30M+ DAU, 9M+ monthly streamers, 1B+ hours watched/month, < 20 sec latency",
    requirements:["Low-latency live video streaming","Live chat at scale","Stream discovery and search","Clip creation, VOD recording","Gifting, subscriptions, ads"],
    architecture:[
      "Ingest: Streamer → RTMP → Ingest server (Nginx-RTMP). Multiple ingest PoPs globally.",
      "Transcoding: Ingest server → transcoding workers → multiple quality outputs (360p→1080p) → HLS/DASH segments.",
      "Distribution: HLS segments → CDN edge nodes. Viewers pull segments every 2–10 seconds.",
      "Low latency: LL-HLS (Low Latency HLS) with partial segments. Reduces latency from 10s to 2–3s.",
      "Chat: separate WebSocket service. Chat messages → Redis pub/sub per channel → broadcast to viewers.",
      "VOD: record stream segments to S3. Generate playlist file after stream ends. Available immediately.",
    ],
    schema:"streams(stream_id, streamer_id, title, category, started_at, viewer_count) | chat_messages(stream_id, message_id, user_id, content, timestamp) [Cassandra, TTL 90 days] | vods(vod_id, stream_id, s3_manifest_url, duration)",
    bottlenecks:["Chat at 1M concurrent viewers: rate limit 20 msg/30s per user. Batch chat events in 100ms buckets.","Viewer count: approximate with HyperLogLog in Redis. Exact count not needed.","CDN capacity: coordinate with CDN providers for large events (championship games)"],
    tricky:"Clip creation: viewer specifies 30-60 second window → server identifies S3 segments covering that time range → stitches HLS playlist → transcodes to MP4. All async, ready in < 30 seconds." },

  { name:"Distributed Message Queue", icon:"📬", difficulty:"Hard", color:C.purple, tags:["Kafka Architecture","Partitions","Consumer Groups"],
    scale:"Kafka: 1M msgs/sec per broker, 100TB+ data, billions of messages/day",
    requirements:["Durable message storage (replay-able)","At-least-once / exactly-once delivery","Consumer groups for parallel processing","High throughput, low latency"],
    architecture:[
      "Topics: logical stream of messages. Partitioned for parallelism (N partitions = N parallel consumers max).",
      "Partition key: determines which partition message lands in. Same key → same partition → ordered.",
      "Replication: each partition has 1 leader + N-1 followers. Producer writes to leader, followers replicate.",
      "Consumer groups: each group gets all messages independently. Within group: each partition consumed by one consumer.",
      "Offset: consumer tracks position in partition. On crash, restart from last committed offset.",
      "Compaction: log compaction retains latest value per key (useful for change data capture).",
    ],
    schema:"Kafka has no schema by default. Schema Registry (Confluent) enforces Avro/Protobuf schemas. topics(topic_name, partition_count, replication_factor, retention_ms, cleanup_policy)",
    bottlenecks:["Producer throughput: batching + compression (lz4/snappy) → 10× throughput improvement","Consumer lag: monitor max.consumer.lag metric. Scale consumers if lag grows","Partition count: can't reduce, only increase. Plan partition count for max consumer parallelism."],
    tricky:"Exactly-once semantics: producer idempotence (enable.idempotence=true) + transactional API. Consumer: commit offset in same transaction as DB write. Very complex — prefer at-least-once + idempotent consumers." },
];

function QuestionsContent() {
  const [sel, setSel] = useState(null);
  const [filter, setFilter] = useState("All");
  const diffs = ["All","Medium","Hard"];
  const diffColor = { Medium:C.green, Hard:C.red };
  const filtered = filter==="All" ? questions : questions.filter(q => q.difficulty===filter);
  return (
    <div>
      <SectionHeader label="Classic Questions" color={C.pink} title="20+ System Design Questions" subtitle="Comprehensive approach for every major interview question — architecture, schema, bottlenecks, tricky parts" />
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
        {diffs.map(d => (
          <button key={d} onClick={() => setFilter(d)} style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${filter===d?C.accent:C.border}`, background:filter===d?`${C.accent}18`:"transparent", color:filter===d?C.accent:C.muted, cursor:"pointer", fontSize:12, fontWeight:600 }}>{d}</button>
        ))}
        <span style={{ marginLeft:"auto", color:C.muted, fontSize:12, alignSelf:"center" }}>{filtered.length} questions</span>
      </div>
      <motion.div
        style={{ display:"flex", flexDirection:"column", gap:8 }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {filtered.map((q, i) => (
          <motion.div
            key={i}
            onClick={() => setSel(sel===q.name?null:q.name)}
            style={{ background:sel===q.name?`${q.color}0a`:C.surface, border:`1px solid ${sel===q.name?q.color+"33":C.border}`, borderRadius:12, overflow:"hidden", cursor:"pointer" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{
              scale: 1.02,
              boxShadow: `0 8px 30px ${q.color}40`,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{ padding:"14px 18px", display:"flex", alignItems:"center", gap:12 }}>
              <motion.span
                style={{ fontSize:20 }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {q.icon}
              </motion.span>
              <span style={{ flex:1, color:C.text, fontWeight:700, fontSize:14 }}>{q.name}</span>
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                {q.tags.slice(0,2).map((t,j) => (
                  <motion.div
                    key={j}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + j * 0.05, type: "spring", stiffness: 200 }}
                  >
                    <Tag t={t} c={q.color} />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Tag t={q.difficulty} c={diffColor[q.difficulty]||C.muted} />
                </motion.div>
              </div>
              <motion.span
                style={{ color:C.muted, marginLeft:8 }}
                animate={{ rotate: sel===q.name ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {sel===q.name?"▴":"▾"}
              </motion.span>
            </div>
            <AnimatePresence initial={false}>
              {sel===q.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <motion.div
                    style={{ padding:"0 18px 18px" }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.08
                        }
                      }
                    }}
                  >
                    <motion.div
                      style={{ background:`${q.color}0a`, borderRadius:10, padding:"10px 14px", marginBottom:12, fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:q.color }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      📊 {q.scale}
                    </motion.div>

                    {q.diagram && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, scale: 0.9 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div style={{ color:q.color, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>🏗️ ARCHITECTURE DIAGRAM</div>
                        <ArchitectureDiagram questionType={q.diagram} />
                      </motion.div>
                    )}

                    {q.metrics && (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <div style={{ color:C.green, fontSize:11, fontWeight:800, fontFamily:"monospace", marginTop:16, marginBottom:8 }}>📈 KEY METRICS</div>
                        <MetricsPanel metrics={q.metrics} />
                      </motion.div>
                    )}

                    <motion.div
                      style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12, marginTop:16 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        style={{ background:C.bg, borderRadius:10, padding:12 }}
                        whileHover={{ scale: 1.02, boxShadow: `0 4px 20px ${C.blue}30` }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{ color:C.blue, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>REQUIREMENTS</div>
                        {q.requirements.map((r, j) => (
                          <motion.div
                            key={j}
                            style={{ display:"flex", gap:6, marginBottom:4 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + j * 0.03 }}
                          >
                            <span style={{ color:C.blue }}>•</span>
                            <span style={{ color:C.muted, fontSize:12 }}>{r}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div
                        style={{ background:C.bg, borderRadius:10, padding:12 }}
                        whileHover={{ scale: 1.02, boxShadow: `0 4px 20px ${C.red}30` }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{ color:C.red, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>BOTTLENECKS</div>
                        {q.bottlenecks.map((b, j) => (
                          <motion.div
                            key={j}
                            style={{ display:"flex", gap:6, marginBottom:4 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + j * 0.03 }}
                          >
                            <span style={{ color:C.red }}>⚡</span>
                            <span style={{ color:C.muted, fontSize:12 }}>{b}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                    <motion.div
                      style={{ background:C.surface2, borderRadius:10, padding:12, marginBottom:12 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.01, boxShadow: `0 4px 20px ${q.color}30` }}
                    >
                      <div style={{ color:q.color, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:8 }}>ARCHITECTURE APPROACH</div>
                      {q.architecture.map((a, j) => (
                        <motion.div
                          key={j}
                          style={{ display:"flex", gap:8, marginBottom:5 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + j * 0.05 }}
                        >
                          <span style={{ color:q.color, flexShrink:0, fontWeight:700 }}>{j+1}.</span>
                          <span style={{ color:C.text, fontSize:13, lineHeight:1.5 }}>{a}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      style={{ background:C.bg, borderRadius:8, padding:"10px 14px", marginBottom:10, fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:C.green }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span style={{ color:C.muted, fontWeight:800 }}>SCHEMA: </span>{q.schema}
                    </motion.div>
                    <motion.div
                      style={{ background:`${C.accent}15`, border:`1px solid ${C.accent}33`, borderRadius:8, padding:"10px 14px" }}
                      variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: { opacity: 1, scale: 1 }
                      }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, boxShadow: `0 4px 20px ${C.accent}40` }}
                    >
                      <span style={{ color:C.accent, fontSize:11, fontWeight:800 }}>🎯 TRICKY PART  </span>
                      <span style={{ color:C.text, fontSize:13 }}>{q.tricky}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ───────── TRADEOFFS ─────────
const tradeoffs = [
  { title:"SQL vs NoSQL", color:C.accent,
    sql:{ label:"SQL (Relational)", pros:["ACID transactions — no partial failures","Complex queries: JOINs, aggregations, GROUP BY","Schema enforcement catches bugs early","Mature tooling: ORMs, migration frameworks","FK constraints enforce data integrity"], cons:["Horizontal scaling requires sharding (complex)","Schema changes require migrations","Object-relational impedance mismatch","Write throughput ceiling"] },
    nosql:{ label:"NoSQL", pros:["Horizontal scale built-in (most types)","Flexible/evolving schema","High write throughput (Cassandra, Mongo)","Data model matches application objects","Geographic distribution (DynamoDB Global Tables)"], cons:["Eventual consistency by default","Limited query flexibility (by design)","Weaker transaction support (improving)","Less mature tooling and expertise"] },
    verdict:"SQL: financial data, complex relationships, reporting. NoSQL: high scale, flexible schema, simple access patterns. Most production systems use both." },
  { title:"Monolith vs Microservices", color:C.blue,
    sql:{ label:"Monolith", pros:["Simple development and deployment","Easy debugging (single process)","No network latency between components","Single DB transaction spans all data","Easier to refactor"], cons:["Scaling: must scale entire app, not parts","Technology lock-in","Team size bottleneck (Conway's Law)","Long build/deploy cycles at scale"] },
    nosql:{ label:"Microservices", pros:["Independent scaling per service","Technology choice per service","Independent deploy → faster release","Fault isolation","Smaller, focused codebases"], cons:["Distributed systems complexity","Network latency between services","Distributed transactions hard (Saga pattern)","Operational overhead (K8s, service mesh)","Harder debugging (distributed tracing needed)"] },
    verdict:"Start monolith. Extract services when: different scaling needs, separate teams, independent deploy requirements, different tech stacks. Don't start with microservices." },
  { title:"Push vs Pull (Fan-out)", color:C.green,
    sql:{ label:"Fan-out on Write (Push)", pros:["Fast reads — timeline pre-computed","No real-time computation on read","Simple read path: just fetch from Redis"], cons:["Write amplification: O(followers) writes","Celebrity problem: 100M follower write storm","Wasted work: user may not check feed","Storage: N timelines of same tweet"] },
    nosql:{ label:"Fan-out on Read (Pull)", pros:["No write amplification","Always fresh content","Efficient for inactive users","Handles celebrities naturally"], cons:["Slow reads: must merge N followee feeds","N DB queries per feed load (or scatter-gather)","Cache complexity for read-time aggregation"] },
    verdict:"Hybrid: Push for normal users (< 1M followers). Pull for celebrities. This is exactly how Twitter/Instagram work." },
  { title:"Sync vs Async Communication", color:C.purple,
    sql:{ label:"Synchronous (REST/gRPC)", pros:["Simple programming model","Immediate error feedback","Easier debugging and tracing","Natural request-response flow"], cons:["Cascading failures: A→B→C all fail if C fails","Tight coupling between services","Blocked threads waiting for response","Timeout configuration complexity"] },
    nosql:{ label:"Asynchronous (Events/Queue)", pros:["Decoupled services (publisher ≠ consumer)","Buffer traffic spikes (queue absorbs bursts)","Retry on failure, built-in","Better throughput (batch processing)"], cons:["Complex error handling (DLQ, retries)","Eventual consistency — state takes time to propagate","Harder to debug (distributed tracing essential)","At-least-once: must handle duplicates (idempotency)"] },
    verdict:"Sync for: user-facing critical path, immediate response needed. Async for: notifications, email, analytics, media processing, any background work." },
  { title:"CP vs AP Systems (CAP)", color:C.teal,
    sql:{ label:"CP (Consistency + Partition Tolerance)", pros:["Always returns correct, consistent data","No stale reads","Financial correctness guaranteed","Simple application logic (no reconciliation)"], cons:["Less available (will refuse reads/writes during partition)","Higher latency (coordination required)","Harder to scale globally"] },
    nosql:{ label:"AP (Availability + Partition Tolerance)", pros:["Always responds (even with stale data)","Lower latency (no cross-region coordination)","Easier to scale globally","Higher availability (no request refused)"], cons:["May return stale data","Application must handle conflicts","Eventual consistency complexity"] },
    verdict:"CP: banking, inventory (exact count matters), user authentication. AP: social feeds, product catalog views, DNS, shopping carts. Partitions are rare — normal operation: choose based on latency vs consistency." },
  { title:"Normalization vs Denormalization", color:C.orange,
    sql:{ label:"Normalized (3NF)", pros:["No data duplication → less storage","Consistent updates (one place)","Flexible querying","Easier to reason about"], cons:["JOINs required for queries (slower)","Cache-unfriendly (must join in cache too)","Query complexity grows with relationships"] },
    nosql:{ label:"Denormalized", pros:["Read performance: all data in one query","Cache-friendly: store precomputed result","Simpler queries","Works well with document DBs"], cons:["Data duplication → more storage","Update complexity: must update all copies","Stale denormalized data on partial update","Harder to maintain consistency"] },
    verdict:"Normalize first, denormalize for specific read-heavy paths. CQRS: write normalized SQL, read denormalized projections. Never premature denormalization." },
  { title:"Strong vs Eventual Consistency", color:C.red,
    sql:{ label:"Strong Consistency", pros:["Every read returns latest write","No need to handle stale data in app","Correct for financial operations","Simple mental model"], cons:["Higher latency (synchronous replication)","Less available during partitions","Hard to achieve globally","Prevents horizontal read scaling (must read from primary)"] },
    nosql:{ label:"Eventual Consistency", pros:["Lower latency reads (from nearest replica)","Higher availability","Scales globally (multi-region active-active)","No coordination overhead"], cons:["May return stale data","Application must handle conflicts (CRDTs, last-write-wins)","Testing harder (need to simulate lag)","User confusion (posted comment not visible immediately)"] },
    verdict:"Strong for: payments, inventory, auth tokens, anything transactional. Eventual for: social likes/views, product catalog reads, social feeds, DNS, analytics counters." },
];

function TradeoffsContent() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <SectionHeader label="Trade-offs" color={C.teal} title="Key Architectural Trade-offs" subtitle="Interviewers want reasoned decisions — not just correct answers. Show your thinking." />
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {tradeoffs.map((t, i) => (
          <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
            <div onClick={() => setSel(sel===i?null:i)} style={{ padding:"14px 18px", display:"flex", alignItems:"center", cursor:"pointer", borderBottom:sel===i?`1px solid ${C.border}`:"none", background:sel===i?`${t.color}0a`:"transparent" }}>
              <span style={{ color:t.color, fontWeight:800, fontSize:15, flex:1 }}>{t.title}</span>
              <span style={{ color:C.muted }}>{sel===i?"▴":"▾"}</span>
            </div>
            <AnimatePresence initial={false}>
              {sel===i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
                      {[t.sql, t.nosql].map((side, j) => (
                        <div key={j} style={{ padding:"16px 18px", borderRight:j===0?`1px solid ${C.border}`:"none" }}>
                          <div style={{ color:j===0?t.color:C.blue, fontWeight:700, fontSize:13, marginBottom:12 }}>{side.label}</div>
                          <div style={{ marginBottom:6 }}>
                            <div style={{ color:C.green, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:5 }}>✅ PROS</div>
                            {side.pros.map((p, k) => (
                              <div key={k} style={{ display:"flex", gap:6, marginBottom:3 }}>
                                <span style={{ color:C.green, flexShrink:0, fontSize:12 }}>+</span>
                                <span style={{ color:C.muted, fontSize:12 }}>{p}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div style={{ color:C.red, fontSize:11, fontWeight:800, fontFamily:"monospace", marginBottom:5 }}>❌ CONS</div>
                            {side.cons.map((c, k) => (
                              <div key={k} style={{ display:"flex", gap:6, marginBottom:3 }}>
                                <span style={{ color:C.red, flexShrink:0, fontSize:12 }}>-</span>
                                <span style={{ color:C.muted, fontSize:12 }}>{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ padding:"12px 18px", borderTop:`1px solid ${C.border}`, background:`${t.color}08` }}>
                      <span style={{ color:t.color, fontSize:11, fontWeight:800, fontFamily:"monospace" }}>🎯 VERDICT  </span>
                      <span style={{ color:C.text, fontSize:13 }}>{t.verdict}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── NUMBERS ─────────
const numberCategories = [
  { name:"Latency Reference", color:C.accent, icon:"⏱️", items:[
    { label:"L1 Cache Hit", value:"~1 ns", note:"In-CPU cache" },
    { label:"L2 Cache Hit", value:"~4 ns", note:"Still on-chip" },
    { label:"L3 Cache Hit", value:"~10 ns", note:"Shared between cores" },
    { label:"RAM Access", value:"~100 ns", note:"100× slower than L1" },
    { label:"Mutex Lock/Unlock", value:"~25 ns", note:"Linux x86" },
    { label:"Send 1KB over 1Gbps LAN", value:"~10 μs", note:"Local network" },
    { label:"Read 4KB from SSD", value:"~150 μs", note:"NVMe SSD" },
    { label:"HDD Disk Seek", value:"~10 ms", note:"10,000× slower than RAM" },
    { label:"Round trip within DC", value:"~0.5 ms", note:"Same datacenter" },
    { label:"Round trip US East↔West", value:"~40 ms", note:"Cross-country" },
    { label:"Round trip US↔Europe", value:"~80 ms", note:"Transatlantic" },
    { label:"Round trip US↔Australia", value:"~150 ms", note:"Pacific" },
    { label:"Redis GET", value:"~0.1 ms", note:"Local network Redis" },
    { label:"PostgreSQL simple query", value:"~1–5 ms", note:"With connection pool" },
    { label:"S3 GET request", value:"~20–100 ms", note:"Same region" },
  ]},
  { name:"Throughput Reference", color:C.blue, icon:"🚀", items:[
    { label:"Redis ops/sec (single node)", value:"~1M", note:"Simple GET/SET" },
    { label:"Cassandra writes/sec", value:"~500K", note:"Single node" },
    { label:"PostgreSQL transactions/sec", value:"~10K–50K", note:"Optimized config" },
    { label:"Kafka messages/sec", value:"~1M", note:"Per broker" },
    { label:"Nginx requests/sec", value:"~100K", note:"Static files" },
    { label:"1Gbps network bandwidth", value:"125 MB/s", note:"Theoretical max" },
    { label:"10Gbps DC network", value:"1.25 GB/s", note:"Modern DC fabric" },
    { label:"NVMe SSD sequential read", value:"~3.5 GB/s", note:"PCIe 3.0" },
    { label:"RAM bandwidth", value:"~50 GB/s", note:"DDR4 dual channel" },
  ]},
  { name:"Scale Benchmarks", color:C.green, icon:"📊", items:[
    { label:"Twitter peak QPS", value:"~150K", note:"Reads + writes" },
    { label:"Facebook DAU", value:"2B+", note:"Daily active users" },
    { label:"Google searches/day", value:"8.5B", note:"~100K/sec" },
    { label:"WhatsApp messages/day", value:"100B", note:"1.15M/sec" },
    { label:"Netflix streaming data", value:"15% global internet", note:"Peak hours" },
    { label:"AWS S3 objects stored", value:"200 trillion+", note:"As of 2023" },
    { label:"YouTube hours uploaded/min", value:"500 hours", note:"Continuously" },
    { label:"Uber trips/day", value:"20M+", note:"Global" },
    { label:"Stripe payment volume", value:"$1 trillion/year", note:"Annual" },
  ]},
  { name:"Storage Sizes", color:C.purple, icon:"💾", items:[
    { label:"ASCII char", value:"1 byte", note:"UTF-8: 1-4 bytes" },
    { label:"Short tweet (280 chars)", value:"~280 bytes", note:"Text only" },
    { label:"Average web page HTML", value:"~50 KB", note:"Without assets" },
    { label:"Profile photo (compressed)", value:"~100 KB", note:"JPEG" },
    { label:"1 minute audio (MP3)", value:"~1 MB", note:"128kbps" },
    { label:"1 minute HD video (H.264)", value:"~100 MB", note:"1080p 30fps" },
    { label:"1 minute 4K video", value:"~375 MB", note:"Compressed" },
    { label:"Genome sequence (human)", value:"~1.5 GB", note:"Compressed" },
    { label:"Average app server RAM", value:"32–256 GB", note:"EC2 instances" },
  ]},
  { name:"Availability Math", color:C.teal, icon:"🛡️", items:[
    { label:"99% (two nines)", value:"87.6 hrs/yr", note:"3.65 days downtime" },
    { label:"99.5%", value:"43.8 hrs/yr", note:"" },
    { label:"99.9% (three nines)", value:"8.76 hrs/yr", note:"~9 hours" },
    { label:"99.95%", value:"4.38 hrs/yr", note:"" },
    { label:"99.99% (four nines)", value:"52.6 min/yr", note:"Industry standard" },
    { label:"99.999% (five nines)", value:"5.26 min/yr", note:"Telco grade" },
    { label:"99.9999% (six nines)", value:"31.5 sec/yr", note:"Extremely rare" },
    { label:"Two 99.9% services in series", value:"99.8% combined", note:"Multiply availabilities" },
    { label:"Three 99.9% in parallel", value:"99.9999%", note:"Parallel improves" },
  ]},
  { name:"Time Conversions", color:C.red, icon:"🕐", items:[
    { label:"1 million seconds", value:"~11.5 days", note:"" },
    { label:"1 billion seconds", value:"~31.7 years", note:"" },
    { label:"Requests/day → QPS", value:"÷ 86,400", note:"86K ≈ 100K easy math" },
    { label:"Peak QPS rule of thumb", value:"2–5× average", note:"Accounts for spikes" },
    { label:"Seconds in a day", value:"86,400", note:"Round to 100K" },
    { label:"Seconds in a month", value:"~2.5M", note:"~86K × 30" },
    { label:"Seconds in a year", value:"~31.5M", note:"~π × 10M" },
  ]},
];

function NumbersContent() {
  const [sel, setSel] = useState(0);
  const cat = numberCategories[sel];
  return (
    <div>
      <SectionHeader label="Numbers & Benchmarks" color={C.teal} title="Numbers Every Engineer Must Know" subtitle="Memorize these — they come up in almost every estimation and architecture discussion" />
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
        {numberCategories.map((c, i) => (
          <button key={i} onClick={() => setSel(i)} style={{ padding:"7px 13px", borderRadius:8, border:`1px solid ${sel===i?c.color:C.border}`, background:sel===i?`${c.color}18`:"transparent", color:sel===i?c.color:C.muted, cursor:"pointer", fontSize:12, fontWeight:600 }}>
            {c.icon} {c.name}
          </button>
        ))}
      </div>
      <div style={{ background:C.surface, border:`1px solid ${cat.color}22`, borderRadius:14, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, background:`${cat.color}0a` }}>
          <span style={{ color:cat.color, fontWeight:800, fontSize:14 }}>{cat.icon} {cat.name}</span>
        </div>
        <div>
          {cat.items.map((item, i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 180px 1fr", gap:16, padding:"10px 18px", borderBottom:i<cat.items.length-1?`1px solid ${C.border}`:"none", alignItems:"center" }}>
              <span style={{ color:C.muted, fontSize:13 }}>{item.label}</span>
              <span style={{ color:cat.color, fontFamily:"'JetBrains Mono',monospace", fontSize:14, fontWeight:700, textAlign:"center" }}>{item.value}</span>
              <span style={{ color:C.dim, fontSize:12 }}>{item.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── TIPS ─────────
const tipSections = [
  { cat:"🎯 Interview Communication", color:C.accent, items:[
    { title:"Narrate everything", body:"Interviewers cannot read minds. Say every assumption, every decision, every trade-off out loud as you make it." },
    { title:"Draw while talking", body:"Never describe a system without drawing it. Even a rough sketch dramatically improves clarity. Use boxes and arrows." },
    { title:"Check in frequently", body:"Every 5 minutes: 'Does this direction make sense?' or 'Should I go deeper here or move on?' Shows collaboration." },
    { title:"Flag what you're simplifying", body:"'I'll skip auth for now and come back if time permits' — sets expectations, shows awareness." },
    { title:"Don't wait for perfect", body:"Start with a simple solution, then improve. Interviewers want to see your reasoning process, not just the final state." },
  ]},
  { cat:"🧠 Technical Instincts", color:C.blue, items:[
    { title:"Start monolith, justify splitting", body:"Never start with microservices. Say 'I'll start monolithic, but I'd split into services if X, Y, Z...' This shows maturity." },
    { title:"Default to proven tech", body:"PostgreSQL, Redis, Kafka, S3, Nginx. Only introduce exotic technology if you can justify why proven tech falls short." },
    { title:"Every choice needs a reason", body:"Not 'use Kafka' but 'use Kafka because we need replay-ability and ordering guarantees within a partition.'" },
    { title:"Question your assumptions", body:"'I assumed read-heavy — is that correct? If it's write-heavy, I'd change X and Y in my design.'" },
    { title:"Design for failure first", body:"For every component: 'What happens when this dies?' Design the recovery before the interviewer asks." },
  ]},
  { cat:"💬 Phrases That Impress", color:C.green, items:[
    { title:"On estimation", body:'"Let me calculate the scale first before I commit to a database choice — the access patterns will differ significantly."' },
    { title:"On trade-offs", body:'"The trade-off here is X for Y. Given our consistency requirements for payments, I\'d choose X even at the cost of Y."' },
    { title:"On reliability", body:'"This is a single point of failure — I\'d mitigate it with an active-active pair behind DNS failover."' },
    { title:"On scale", body:'"At current scale, this is fine. If we hit 10× traffic in 2 years, the first bottleneck would be the DB write path — I\'d address it with sharding on user_id."' },
    { title:"On monitoring", body:'"I\'d instrument this with: p99 latency metric, error rate alert at >1%, and consumer lag alert for the Kafka pipeline."' },
  ]},
  { cat:"🚩 Red Flags to Avoid", color:C.red, items:[
    { title:"Jumping straight to microservices", body:"Proposing Kubernetes, service mesh, and 12 microservices for a system with 1000 users signals over-engineering." },
    { title:"'We\'ll add redundancy later'", body:"Never defer reliability. Interviewers mark this as a failure. Reliability is not a feature, it's foundational." },
    { title:"Skipping estimation", body:"Drawing architecture without knowing the scale. Design decisions change completely between 1K and 1M QPS." },
    { title:"Silver bullet thinking", body:"'Just use Redis for everything' or 'Kafka will solve this' without justification. Every tool has trade-offs." },
    { title:"Monologue for 30+ minutes", body:"Talking without pausing to check in. Interview is a collaborative conversation, not a lecture." },
  ]},
  { cat:"📚 Study Resources", color:C.purple, items:[
    { title:"System Design Interview Vol 1 & 2 — Alex Xu", body:"The gold standard. Read Vol 1 first. Most questions map directly to chapters here." },
    { title:"Designing Data-Intensive Applications — Martin Kleppmann", body:"Deep dive into distributed systems fundamentals. Read Ch. 1-3, 5-7 for interviews." },
    { title:"ByteByteGo Newsletter + YouTube", body:"Alex Xu's weekly system design posts. Watch the animated architecture videos — very clear." },
    { title:"High Scalability Blog (highscalability.com)", body:"Real-world architecture deep dives: 'How Twitter handles 150K tweets/sec' etc. Incredibly valuable." },
    { title:"Grokking the System Design Interview (Educative.io)", body:"Good for beginner-intermediate. More accessible than Kleppmann. Start here if overwhelmed." },
  ]},
  { cat:"📋 Interview Day Checklist", color:C.teal, items:[
    { title:"First 2 minutes", body:"Restate the problem in your own words. Confirm scope. Ask 1-2 clarifying questions maximum." },
    { title:"Estimation phase", body:"Write numbers on whiteboard/doc as you calculate. Show your work. DAU → QPS → Storage → Bandwidth." },
    { title:"API before architecture", body:"Define 3-5 core endpoints. This anchors your architecture to real use cases." },
    { title:"Draw top-down", body:"Client → Edge → LB → Services → Databases. Left to right or top to bottom. Label everything." },
    { title:"End with self-critique", body:"'The biggest risk in my design is X, and I\'d address it by Y. Given more time, I\'d also investigate Z.'" },
  ]},
];

function TipsContent() {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <SectionHeader label="Pro Tips" color={C.red} title="Tips From Senior Engineers" subtitle="What separates good candidates from great ones in system design interviews" />
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {tipSections.map((section, i) => (
          <div key={i} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"14px 18px", background:`${section.color}0d`, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ color:section.color, fontWeight:800, fontSize:14 }}>{section.cat}</span>
            </div>
            <div style={{ padding:"8px 0" }}>
              {section.items.map((item, j) => (
                <div key={j} onClick={() => setSel(sel===`${i}-${j}`?null:`${i}-${j}`)}
                  style={{ padding:"10px 18px", borderBottom:j<section.items.length-1?`1px solid ${C.border}`:"none", cursor:"pointer", background:sel===`${i}-${j}`?`${section.color}08`:"transparent", transition:"all 0.15s" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                    <span style={{ color:section.color, fontSize:14, marginTop:1 }}>›</span>
                    <div style={{ flex:1 }}>
                      <span style={{ color:C.text, fontSize:13, fontWeight:600 }}>{item.title}</span>
                      <AnimatePresence initial={false}>
                        {sel===`${i}-${j}` && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ color:C.muted, fontSize:13, lineHeight:1.6, marginTop:6 }}>{item.body}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── NETWORKING ─────────

const NetworkFlowDiagram = ({ type }) => {
  const flows = {
    "tcp-handshake": (
      <div style={{ background: C.bg, borderRadius: 12, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start" }}>
          <ComponentBox icon="💻" label="Client" color={C.blue} delay={0} />
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40 }}>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 10 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <FlowingArrow color={C.green} delay={0.8} />
              <span style={{ color: C.green, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>SYN</span>
            </motion.div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 10, flexDirection: "row-reverse" }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div style={{ transform: "scaleX(-1)" }}><FlowingArrow color={C.purple} delay={1.5} /></div>
              <span style={{ color: C.purple, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>SYN-ACK</span>
            </motion.div>
            <motion.div
              style={{ display: "flex", alignItems: "center", gap: 10 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              <FlowingArrow color={C.accent} delay={2.2} />
              <span style={{ color: C.accent, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>ACK</span>
            </motion.div>
          </div>
          <ComponentBox icon="🖥️" label="Server" color={C.red} delay={0.3} />
        </div>
        <motion.div
          style={{ marginTop: 20, padding: "8px 12px", background: `${C.green}15`, borderRadius: 8, textAlign: "center" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <span style={{ color: C.green, fontSize: 11, fontWeight: 800 }}>✅ Connection Established: </span>
          <span style={{ color: C.text, fontSize: 11 }}>3-Way Handshake Complete</span>
        </motion.div>
      </div>
    ),
    "http-request": (
      <div style={{ background: C.bg, borderRadius: 12, padding: 20, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <ComponentBox icon="🌐" label="Browser" color={C.blue} delay={0} />
          <FlowingArrow color={C.blue} delay={0.3} />
          <ComponentBox icon="🔐" label="DNS" color={C.green} delay={0.15} />
          <FlowingArrow color={C.green} delay={0.6} />
          <ComponentBox icon="⚡" label="TCP Handshake" color={C.purple} delay={0.3} />
          <FlowingArrow color={C.purple} delay={0.9} />
          <ComponentBox icon="🌐" label="HTTP Request" color={C.accent} delay={0.45} />
          <FlowingArrow color={C.accent} delay={1.2} />
          <ComponentBox icon="🖥️" label="Server" color={C.red} delay={0.6} />
        </div>
      </div>
    ),
    "osi-layers": (
      <div style={{ background: C.bg, borderRadius: 12, padding: 20, marginTop: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
          {[
            { num: 7, name: "Application", desc: "HTTP, DNS, SMTP", color: C.blue },
            { num: 6, name: "Presentation", desc: "SSL/TLS, Encryption", color: C.green },
            { num: 5, name: "Session", desc: "Session Management", color: C.purple },
            { num: 4, name: "Transport", desc: "TCP, UDP", color: C.accent },
            { num: 3, name: "Network", desc: "IP, Routing", color: C.pink },
            { num: 2, name: "Data Link", desc: "MAC, Switches", color: C.teal },
            { num: 1, name: "Physical", desc: "Cables, Signals", color: C.red }
          ].map((layer, i) => (
            <motion.div
              key={i}
              style={{
                background: `${layer.color}15`,
                border: `2px solid ${layer.color}`,
                borderRadius: 8,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12
              }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <span style={{ color: layer.color, fontSize: 20, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", minWidth: 30 }}>L{layer.num}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>{layer.name}</div>
                <div style={{ color: C.muted, fontSize: 11 }}>{layer.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  };
  return flows[type] || null;
};

const networkingTopics = [
  { level: "Basic", color: C.blue, topics: [
    { name: "OSI Model & TCP/IP Stack",
      flow: "osi-layers",
      desc: "7-layer OSI model provides conceptual framework for network communication. Each layer has specific responsibility and communicates with layers directly above/below. TCP/IP model is practical 4-layer implementation: Application, Transport, Internet, Link.",
      why: "Foundation for troubleshooting network issues, understanding where protocols operate, and designing network systems. Interviewers test this to verify networking fundamentals.",
      examples: "• Layer 7 (Application): HTTP, HTTPS, DNS, SMTP, FTP\n• Layer 4 (Transport): TCP (reliable, ordered), UDP (fast, unreliable)\n• Layer 3 (Network): IP routing, packet forwarding\n• Layer 2 (Data Link): MAC addresses, switches, Ethernet frames\n• Layer 1 (Physical): cables, electrical signals, WiFi radio waves\n• Real-world: Browser makes HTTP request → DNS query (L7) → TCP handshake (L4) → IP routing (L3) → Ethernet frame (L2) → physical transmission (L1)",
      tradeoffs: "Layered architecture:\n✅ Modularity (change one layer without affecting others)\n✅ Standardization (interoperability between vendors)\n✅ Abstraction (application doesn't need to know physical details)\n❌ Overhead (each layer adds headers)\n❌ Performance cost (processing through layers)",
      protocols: ["HTTP", "HTTPS", "DNS", "TCP", "UDP", "IP", "Ethernet"],
      numbers: "Typical packet overhead: TCP/IP ~40 bytes (20-byte IP + 20-byte TCP header)\nEthernet frame: 14-byte header + 1500-byte payload (MTU)\nEach OSI layer adds 5-20 bytes header overhead" },
    { name: "TCP vs UDP",
      flow: "tcp-handshake",
      desc: "TCP (Transmission Control Protocol): connection-oriented, reliable, ordered delivery via 3-way handshake (SYN, SYN-ACK, ACK). Guarantees delivery through acknowledgments and retransmission. UDP (User Datagram Protocol): connectionless, unreliable, no ordering guarantees. Fire-and-forget for speed.",
      why: "Fundamental protocol choice affecting latency and reliability. TCP for correctness (web, APIs, file transfer). UDP for speed when loss is tolerable (live video, gaming, DNS). Interviewers expect you to articulate when to use each.",
      examples: "• TCP use cases: HTTP/HTTPS, database connections, file transfer (FTP), email (SMTP), SSH\n• UDP use cases: DNS queries (port 53), video streaming (Netflix, YouTube), VoIP (Zoom, Skype), online gaming (CS:GO, Fortnite), live broadcasts\n• TCP 3-way handshake: Client sends SYN → Server responds SYN-ACK → Client sends ACK → connection established\n• UDP: no handshake, just send datagram immediately\n• Hybrid: QUIC (HTTP/3) = UDP + custom reliability layer",
      tradeoffs: "TCP:\n✅ Reliable (guaranteed delivery, ordered)\n✅ Flow control (prevents overwhelming receiver)\n✅ Congestion control (fair bandwidth sharing)\n❌ Higher latency (handshake + retransmission delays)\n❌ Head-of-line blocking (lost packet blocks entire stream)\n\nUDP:\n✅ Low latency (no connection setup)\n✅ No head-of-line blocking\n✅ Multicast/broadcast support\n❌ Unreliable (packets may drop or arrive out of order)\n❌ No congestion control (can flood network)",
      protocols: ["TCP 3-way handshake", "UDP datagram"],
      numbers: "TCP handshake: +1 RTT overhead (50-100ms cross-region, 1-5ms same region)\nTCP retransmission timeout: typically 200ms-1s\nUDP latency: ~10-50ms (1 RTT, no setup)\nPacket loss tolerance: TCP 0%, UDP can handle 1-5% loss (video codecs compensate)\nTCP header: 20 bytes, UDP header: 8 bytes" },
    { name: "HTTP/HTTPS Request Flow",
      flow: "http-request",
      desc: "Complete lifecycle of web request: Browser checks DNS cache → DNS lookup → TCP 3-way handshake → TLS handshake (HTTPS only) → HTTP request sent → Server processes → HTTP response → Connection close or keep-alive. HTTPS adds TLS encryption layer.",
      why: "Understanding request lifecycle helps optimize performance (reduce latency, enable caching, parallelize requests). Critical for debugging slow page loads and designing efficient APIs.",
      examples: "• HTTP request flow:\n  1. DNS: example.com → 93.184.216.34 (20-100ms)\n  2. TCP handshake: SYN, SYN-ACK, ACK (50-100ms RTT)\n  3. TLS handshake (HTTPS): ClientHello, ServerHello, key exchange (100-300ms)\n  4. HTTP request: GET /api/users HTTP/1.1\n  5. Server processing: database query, business logic (10-500ms)\n  6. HTTP response: 200 OK + JSON payload\n  7. Connection: keep-alive (reuse) or close\n• Total latency: DNS (cached) + TCP (50ms) + TLS (150ms) + server (100ms) + network (50ms) = ~350ms minimum",
      tradeoffs: "HTTPS (TLS):\n✅ Encryption (confidentiality)\n✅ Authentication (verify server identity)\n✅ Integrity (detect tampering)\n❌ Latency cost: +100-300ms (TLS handshake)\n❌ CPU cost: encryption/decryption overhead\n\nHTTP (plain):\n✅ Faster (no TLS overhead)\n❌ No security (plain text, vulnerable to MITM attacks)\n❌ Deprecated (browsers mark as 'not secure')",
      protocols: ["HTTP/1.1", "HTTP/2", "HTTP/3 (QUIC)", "TLS 1.2", "TLS 1.3"],
      numbers: "Typical request latency breakdown:\n- DNS lookup: 20-120ms (cached: <1ms)\n- TCP handshake: 50-100ms (1 RTT)\n- TLS handshake: 100-300ms (TLS 1.2: 2 RTTs, TLS 1.3: 1 RTT)\n- Server processing: 10-500ms\n- Data transfer: 10-100ms\nOptimization: TLS session resumption saves 100ms, HTTP/2 connection reuse saves 150ms" },
    { name: "DNS Resolution",
      desc: "Domain Name System translates human-readable domains to IP addresses. Hierarchical and distributed system. Query flow: Browser cache → OS cache → Router cache → ISP recursive resolver → Root nameserver → TLD (.com) nameserver → Authoritative nameserver → IP returned and cached.",
      why: "DNS is on critical path for every new connection. Slow DNS = slow site. Understanding caching, TTL, and GeoDNS helps optimize global latency. DNS outages can take down entire services.",
      examples: "• DNS lookup hierarchy for google.com:\n  1. Browser cache (check if recently resolved)\n  2. OS cache (check local DNS cache)\n  3. Router cache (home router DNS cache)\n  4. ISP recursive resolver (8.8.8.8, 1.1.1.1)\n  5. Root nameserver: . → returns .com nameserver\n  6. TLD nameserver: .com → returns google.com authoritative NS\n  7. Authoritative nameserver: google.com → 142.250.80.46\n  8. Cache result with TTL (e.g., 300 seconds)\n• Modern: DNS over HTTPS (DoH), DNS over TLS (DoT) for privacy\n• GeoDNS: Route53 returns different IPs based on user location (US users → us-east-1, EU → eu-west-1)",
      tradeoffs: "DNS Caching:\n✅ Fast lookups (cached: <1ms vs 20-120ms)\n✅ Reduces load on DNS servers\n❌ Stale data (TTL controls freshness)\n❌ Slow failover (must wait for TTL to expire)\n\nTTL (Time To Live):\n✅ Short TTL (60s): fast failover, fresh data\n❌ Short TTL: more DNS queries, higher load\n✅ Long TTL (3600s): fewer queries, less load\n❌ Long TTL: slow failover, stale data risk",
      protocols: ["DNS (UDP port 53)", "DoH (DNS over HTTPS)", "DoT (DNS over TLS)"],
      numbers: "DNS query latency: 20-120ms (uncached), <1ms (cached)\nTypical TTL: 60-300 seconds (1-5 minutes) for dynamic, 3600+ seconds for static\nDNS query size: ~50-100 bytes (fits in 1 UDP packet)\nGlobal DNS traffic: ~1 trillion queries/day\nDNS cache hit ratio: 80-95% (most domains cached)\nFailover time: TTL + propagation delay (typically 5-15 minutes)" },
  ]},
  { level: "Intermediate", color: C.green, topics: [
    { name: "Load Balancing Algorithms",
      desc: "Distribute traffic across backend servers. L4 (Transport Layer): operates on TCP/IP, faster. Algorithms: Round Robin (sequential), Least Connections (route to least busy), IP Hash (sticky sessions). L7 (Application Layer): operates on HTTP, smarter routing. Algorithms: URL-based, Header-based, Weighted Round Robin, Least Response Time.",
      why: "Different algorithms fit different use cases. Round Robin for uniform backends. Least Connections for varying request complexity. IP Hash for stateful applications. Health checks essential to avoid routing to dead nodes.",
      examples: "• Round Robin: Request 1 → Server A, Request 2 → Server B, Request 3 → Server C (cycles through servers)\n• Least Connections: Route to server with fewest active connections (adaptive to load)\n• IP Hash: hash(client_ip) mod N → ensures same client always hits same server (sticky sessions)\n• AWS ALB (L7): /api/* → API fleet, /static/* → static file servers, header-based routing for canary deployments\n• AWS NLB (L4): ultra-low latency (<100μs), handles millions of requests/sec",
      tradeoffs: "L4 vs L7:\n✅ L4: Faster (no parsing), handles any protocol (TCP/UDP), 100μs latency\n❌ L4: No content-based routing, can't see HTTP headers/URLs\n✅ L7: Smart routing (URL, header, cookie-based), SSL termination, caching\n❌ L7: Slower (must parse HTTP), higher latency (1-5ms)\n\nAlgorithms:\nRound Robin: ✅ Simple ❌ Ignores server load\nLeast Connections: ✅ Adapts to load ❌ Requires connection tracking\nIP Hash: ✅ Sticky sessions ❌ Uneven distribution if traffic skewed",
      protocols: ["L4 (Transport)", "L7 (Application)", "Health checks (TCP/HTTP)"],
      numbers: "AWS ALB (L7): ~1-5ms latency, $16-100/month\nAWS NLB (L4): <100μs latency, handles 1M+ requests/sec\nHealth check interval: 5-30 seconds\nTypical setup: 3-10 backend servers per load balancer\nConnection limit: NLB handles millions, ALB handles 100K+ concurrent connections" },
    { name: "WebSocket & Long Polling",
      desc: "Real-time communication techniques. HTTP: request-response, stateless, not suitable for real-time. Long Polling: client sends request, server holds connection open until data available, responds, client immediately re-polls. WebSocket: persistent full-duplex TCP connection, upgraded from HTTP handshake, bi-directional (client ↔ server). Server-Sent Events (SSE): uni-directional (server → client), HTTP-based.",
      why: "Real-time features are common (chat, notifications, live updates, collaborative editing). WebSocket best for bi-directional (chat, gaming). SSE good for server-to-client (notifications, live feeds). Long polling is legacy fallback.",
      examples: "• WebSocket: Slack/WhatsApp chat (messages go both ways), multiplayer games (game state sync), Google Docs (collaborative editing)\n• SSE: Live stock tickers, sports scores, notification feeds, server monitoring dashboards\n• Long Polling: legacy real-time apps, fallback when WebSocket blocked by firewall\n• WebSocket upgrade: HTTP GET /chat → Upgrade: websocket → HTTP 101 Switching Protocols → ws:// connection established\n• Pattern: Browser → HTTP upgrade → WebSocket → send/receive messages → close connection",
      tradeoffs: "WebSocket:\n✅ Full-duplex (bi-directional, low latency)\n✅ Efficient (low overhead, persistent connection)\n❌ Stateful (harder to scale, requires sticky sessions)\n❌ Firewall issues (some proxies block WebSocket)\n\nSSE (Server-Sent Events):\n✅ Simple (EventSource API, HTTP-based)\n✅ Auto-reconnect on disconnect\n✅ Stateless HTTP (easier to scale)\n❌ Uni-directional (server → client only)\n❌ Browser connection limit (6 per domain)\n\nLong Polling:\n✅ Works everywhere (plain HTTP)\n❌ High overhead (constant re-polling, full HTTP headers)\n❌ Scalability issues (many open connections)",
      protocols: ["WebSocket (ws:// wss://)", "HTTP Long Polling", "SSE (Server-Sent Events)"],
      numbers: "WebSocket overhead: ~2 bytes per frame (vs 500+ bytes HTTP)\nWebSocket connections per server: 10K-100K (C10K problem)\nSSE overhead: ~100 bytes HTTP headers per message\nLong polling latency: ~50-500ms (polling interval)\nWebSocket latency: <10ms (no polling delay)\nSSE browser limit: 6 connections per domain" },
    { name: "CDN & Edge Caching",
      desc: "Content Delivery Network distributes static assets across global edge locations close to end users. Origin Pull model: CDN caches content on first request (cache miss), serves from cache on subsequent requests (cache hit). TTL (Time To Live) controls cache freshness. Invalidation purges stale content.",
      why: "Dramatically reduce latency (serve from nearest edge, 10-200ms savings). Offload origin traffic (90%+ cache hit rate means 10× less load on origin servers). DDoS protection (absorb attacks at edge). Essential for global apps.",
      examples: "• Cloudflare: 300+ edge locations globally, caches HTML, CSS, JS, images\n• Akamai: serves 30% of global web traffic, used by Apple, Microsoft\n• AWS CloudFront: integrates with S3, Lambda@Edge for custom logic\n• Cache workflow: Request → Edge (cache miss) → Fetch from origin → Cache at edge with TTL → Serve from cache (subsequent hits)\n• Use cases: Static assets (images, CSS, JS), video streaming (Netflix), software downloads, API responses (with short TTL)",
      tradeoffs: "✅ Low latency (serve from nearest edge, 10-200ms savings)\n✅ High availability (edge survives origin outage)\n✅ Offload origin (10× less traffic with 90% hit rate)\n✅ DDoS protection (absorb attacks at edge)\n❌ Stale data risk (TTL controls freshness)\n❌ Cost (data transfer, request fees)\n❌ Invalidation complexity (purge cache globally)",
      protocols: ["HTTP caching (Cache-Control, ETag, Expires)", "Anycast routing"],
      numbers: "Cache hit ratio: 80-99% (depends on content type)\nLatency savings: 50-200ms (edge vs origin)\nOrigin offload: 90% hit rate → 10× less origin traffic\nCloudflare edge locations: 300+ cities globally\nTypical TTL: 3600s (1 hour) for static assets, 60-300s for semi-dynamic\nCDN cost: $0.01-0.10 per GB (cheaper than origin bandwidth)" },
    { name: "SSL/TLS Handshake",
      desc: "Secure communication protocol for HTTPS. TLS handshake establishes encrypted session: Client Hello (supported ciphers) → Server Hello (chosen cipher, certificate) → Client verifies certificate → Key exchange (RSA or ECDHE) → Generate session keys → Encrypted data transfer. TLS 1.3 optimized to 1-RTT (vs TLS 1.2's 2-RTT).",
      why: "HTTPS mandatory for modern web (SEO, browser security warnings, data protection). TLS handshake adds latency — understanding it helps optimize (TLS 1.3, session resumption, OCSP stapling). Certificate management critical for security.",
      examples: "• TLS 1.2 handshake (2-RTT):\n  1. ClientHello: supported ciphers, TLS version\n  2. ServerHello: chosen cipher, certificate chain\n  3. Client verifies cert (CA chain, expiry, hostname)\n  4. Key exchange (RSA or Diffie-Hellman)\n  5. Both sides derive session keys\n  6. Finished messages (encrypted with session key)\n• TLS 1.3 handshake (1-RTT): combines steps, faster\n• Session resumption: reuse session key from previous connection (0-RTT)\n• OCSP stapling: server provides certificate revocation status (saves client lookup)",
      tradeoffs: "TLS 1.3:\n✅ 1-RTT handshake (vs 2-RTT in TLS 1.2)\n✅ 0-RTT session resumption\n✅ Modern ciphers (removes legacy RSA)\n❌ Not universally supported (old clients)\n\nTLS 1.2:\n✅ Widely supported\n❌ 2-RTT handshake (slower)\n❌ Legacy ciphers (security risk)\n\nPerformance optimizations:\n✅ Session resumption: saves 100-200ms\n✅ OCSP stapling: saves 50-100ms\n❌ Certificate chain validation: adds 50-100ms",
      protocols: ["TLS 1.2 (2-RTT)", "TLS 1.3 (1-RTT)", "Certificate chains", "OCSP stapling"],
      numbers: "TLS 1.2 handshake: 100-300ms (2 RTTs: 50-100ms × 2 + processing)\nTLS 1.3 handshake: 50-150ms (1 RTT + processing)\nSession resumption: ~0-10ms (0-RTT with TLS 1.3)\nCertificate validation: 50-100ms (chain verification + OCSP)\nHandshake CPU cost: ~1-5ms server processing\nTypical optimization: TLS 1.3 + session resumption saves 150-250ms" },
  ]},
  { level: "Advanced", color: C.purple, topics: [
    { name: "HTTP/2 Multiplexing & Server Push",
      desc: "HTTP/2 major upgrade: single TCP connection for multiple parallel requests (multiplexing), binary framing (not text), header compression (HPACK), server push (server sends resources before client requests). Eliminates HTTP/1.1 head-of-line blocking at application layer (but TCP-level HOL blocking remains).",
      why: "HTTP/2 is default for modern web. Multiplexing allows 100+ concurrent requests on 1 connection (vs 6 connections in HTTP/1.1). Header compression saves bandwidth. Showing HTTP/2 knowledge demonstrates modern web understanding.",
      examples: "• HTTP/1.1: 6 parallel TCP connections, serial requests per connection\n• HTTP/2: 1 TCP connection, 100+ parallel streams (requests)\n• Multiplexing: Request /index.html, /style.css, /app.js all on same connection simultaneously\n• HPACK compression: cookies/headers compressed 80-90% (especially repetitive headers)\n• Server Push: server pushes /style.css and /app.js immediately after /index.html request (before browser parses HTML)\n• Stream prioritization: critical resources (CSS) get higher priority than images\n• Adoption: ~50% of web uses HTTP/2 (2024)",
      tradeoffs: "✅ Multiplexing: 100+ concurrent requests on 1 connection (vs 6 connections in HTTP/1.1)\n✅ Header compression: 80-90% bandwidth savings\n✅ Server push: preload critical resources (CSS, JS)\n✅ Binary protocol: faster parsing\n❌ TCP head-of-line blocking: packet loss blocks all streams\n❌ Server push often unused (browsers cache aggressively)\n❌ Complexity: binary protocol harder to debug than text HTTP/1.1",
      protocols: ["HTTP/2 (binary framing)", "HPACK compression", "Stream prioritization"],
      numbers: "HTTP/1.1: 6 TCP connections, each 1 RTT setup = 6× overhead\nHTTP/2: 1 connection, 100+ streams multiplexed\nHeader compression: 80-90% reduction (cookies + headers)\nLatency savings: 20-50% faster page loads vs HTTP/1.1\nAdoption: HTTP/2 ~50% of web (2024)" },
    { name: "QUIC & HTTP/3",
      desc: "QUIC (Quick UDP Internet Connections): UDP-based transport protocol with built-in TLS, multiple independent streams (no TCP head-of-line blocking), 0-RTT connection resumption, connection migration (survives IP changes). HTTP/3 is HTTP over QUIC. Solves TCP's fundamental issues.",
      why: "Next-generation protocol solving TCP's head-of-line blocking. Faster connection setup (0-RTT). Mobile-friendly (WiFi ↔ cellular handoff seamless). Google, Cloudflare, Facebook adopted. Showing HTTP/3 knowledge signals cutting-edge awareness.",
      examples: "• QUIC advantages: UDP-based (no kernel TCP stack), built-in TLS (can't be stripped), 0-RTT connection resume\n• HTTP/3: Multiplexing without TCP head-of-line blocking (packet loss only affects 1 stream)\n• 0-RTT: Client resumes previous connection instantly (no handshake), saves 50-150ms\n• Connection migration: Mobile switches WiFi → cellular, connection survives (no reset)\n• Adoption: Google (YouTube, Search), Cloudflare, Facebook, ~25% of web traffic (2024)\n• Fallback: HTTP/3 tries first, falls back to HTTP/2 if UDP blocked by firewall",
      tradeoffs: "✅ No TCP head-of-line blocking (independent streams)\n✅ 0-RTT connection resume (50-150ms savings)\n✅ Connection migration (mobile-friendly)\n✅ Built-in TLS (can't be stripped)\n❌ UDP blocked by some firewalls (requires HTTP/2 fallback)\n❌ Less mature tooling (debugging, monitoring)\n❌ Higher CPU usage (userspace implementation vs kernel TCP)",
      protocols: ["QUIC (UDP-based)", "HTTP/3", "0-RTT handshake"],
      numbers: "HTTP/3 0-RTT: saves 50-150ms (vs TLS 1.3 1-RTT)\nPacket loss impact: HTTP/2 (TCP) blocks all streams, HTTP/3 (QUIC) only affects 1 stream\nLatency improvement: 20-40% faster on lossy networks (mobile, satellite)\nAdoption: HTTP/3 ~25% of web traffic (2024)\nConnection migration: WiFi ↔ cellular handoff seamless (0 downtime)" },
    { name: "Anycast & GeoDNS",
      desc: "Anycast routing: same IP address announced from multiple geographic locations via BGP. Network routes packets to nearest location (lowest latency). GeoDNS: DNS server returns different IP addresses based on client's geographic location (query from US → US IP, query from EU → EU IP).",
      why: "Global low latency (route to nearest datacenter), automatic failover (if one location fails, traffic routes to next nearest), DDoS mitigation (distribute attack across multiple locations). Critical for CDN, DNS providers, global services.",
      examples: "• Cloudflare Anycast: 1.1.1.1 announced from 300+ cities globally via BGP, client routed to nearest\n• Google DNS: 8.8.8.8 anycast from dozens of locations\n• AWS Route 53: GeoDNS with geolocation routing (US users → us-east-1, EU → eu-west-1)\n• DDoS mitigation: Attack on 1.1.1.1 distributed across 300+ edge locations (10-100 Gbps per location vs 1 Tbps centralized)\n• Failover: Location goes down → BGP withdraws route → traffic reroutes to next nearest (automatic, ~1-5 minute)\n• Pattern: Client query → nearest edge location → process request locally (low latency)",
      tradeoffs: "Anycast:\n✅ Low latency (route to nearest location)\n✅ Automatic failover (BGP rerouting)\n✅ DDoS mitigation (distribute attack)\n❌ Stateless only (TCP connections may route to different location mid-session)\n❌ BGP complexity (requires AS number, routing expertise)\n\nGeoDNS:\n✅ Flexible (return different IPs per region)\n✅ Works with stateful services\n❌ DNS caching delays (TTL)\n❌ Less accurate (based on DNS resolver location, not client)",
      protocols: ["BGP Anycast", "DNS GeoDNS", "Active-active multi-region"],
      numbers: "Anycast latency savings: 50-200ms (route to nearest vs single global datacenter)\nCloudflare anycast: 300+ cities, 95% of internet users within 50ms\nDDoS mitigation: 1 Tbps attack distributed across 300 locations = 3-4 Gbps each (manageable)\nBGP convergence time: 1-5 minutes (failover delay)\nGeoDNS: DNS TTL determines failover speed (300s = 5-minute delay)" },
    { name: "TCP Congestion Control & BBR",
      desc: "TCP congestion control prevents network overload. Legacy algorithms (TCP Reno, Cubic): react to packet loss (reduce rate after loss detected). BBR (Bottleneck Bandwidth and Round-trip propagation time): proactive, model-based. Measures bottleneck bandwidth and RTT, finds optimal sending rate without causing loss.",
      why: "Legacy TCP reacts to loss (too late, throughput already degraded). BBR proactively finds optimal rate, achieving 2-4× higher throughput on lossy networks (satellite, mobile, international). Google uses BBR for YouTube. Shows advanced networking knowledge.",
      examples: "• TCP Reno/Cubic (loss-based): send packets → packet loss → reduce sending rate by 50% → slowly increase → repeat\n• BBR (model-based): continuously measure bottleneck bandwidth and RTT → send at optimal rate (maximize throughput without causing queue buildup)\n• Use case: Satellite internet (high latency, packet loss) → TCP Cubic gets 10 Mbps, BBR gets 40 Mbps (4× improvement)\n• Google YouTube: BBR improves video streaming throughput 2-4× on congested networks\n• Linux kernel: BBR available since 4.9 (2016), enabled via sysctl",
      tradeoffs: "TCP Reno/Cubic (loss-based):\n✅ Mature, widely deployed\n✅ Fair bandwidth sharing (AIMD algorithm)\n❌ Reacts to loss (throughput degraded before reacting)\n❌ Poor performance on lossy links (mistakenly reduces rate)\n\nBBR (model-based):\n✅ Proactive (finds optimal rate before loss)\n✅ 2-4× higher throughput on lossy networks\n✅ Low latency (avoids queue buildup)\n❌ Fairness issues (can be aggressive with legacy TCP)\n❌ Less mature (edge cases being refined)",
      protocols: ["TCP Reno", "TCP Cubic", "BBR v1", "BBR v2"],
      numbers: "BBR throughput improvement: 2-4× on lossy networks (satellite, mobile)\nSatellite example: TCP Cubic 10 Mbps → BBR 40 Mbps\nBufferbloat reduction: BBR reduces latency by 10-100ms (avoids queue buildup)\nAdoption: Google (YouTube, Search), Dropbox, Spotify\nLinux kernel: BBR since 4.9 (2016), enable via sysctl net.ipv4.tcp_congestion_control=bbr" },
    { name: "BGP & Internet Routing",
      desc: "BGP (Border Gateway Protocol): routing protocol between autonomous systems (AS) on the Internet. Each AS announces IP prefixes it owns. BGP path selection: prefer shortest AS path, then local preference, then MED (multi-exit discriminator). No built-in security (BGP hijacking possible).",
      why: "Critical for multi-region cloud deployments, traffic engineering, DDoS mitigation. Understanding BGP shows infrastructure depth. BGP misconfigurations or hijacks can blackhole traffic globally (YouTube 2008, Cloudflare 2020).",
      examples: "• AS (Autonomous System): organization with unique AS number (e.g., AS15169 = Google)\n• Route announcement: AS15169 announces 8.8.8.0/24 → propagates globally via BGP\n• Path selection: prefer shorter AS path (3 hops better than 5 hops)\n• Anycast: Cloudflare announces 1.1.1.1 from 300+ locations → each AS independently announces same prefix\n• BGP hijack: Malicious AS announces 8.8.8.0/24 (Google's prefix) → traffic routes to attacker (YouTube 2008 incident)\n• Traffic engineering: Prepend AS path (make route look longer) to steer traffic away\n• Use case: AWS Direct Connect uses BGP, Cloudflare uses BGP anycast",
      tradeoffs: "✅ Scalable (routes entire Internet, 900K+ prefixes)\n✅ Flexible (policy-based routing, traffic engineering)\n✅ Decentralized (no single point of control)\n❌ No built-in security (BGP hijacking possible)\n❌ Slow convergence (minutes to propagate route changes)\n❌ Configuration errors can cause global outages",
      protocols: ["BGP-4", "AS numbers", "Route announcements", "RPKI (security extension)"],
      numbers: "Global BGP routes: ~900K IPv4 prefixes, ~150K IPv6 prefixes\nBGP convergence time: 1-5 minutes (global route propagation)\nAS count: ~70K autonomous systems globally\nBGP table size: ~900MB (full Internet routing table)\nIncidents: YouTube hijack 2008 (Pakistan Telecom), Cloudflare 2020 (route leak)" },
  ]},
];

function NetworkingContent() {
  const [sel, setSel] = useState(null);
  const [levelFilter, setLevelFilter] = useState("All");
  const levels = ["All", "Basic", "Intermediate", "Advanced"];
  const filtered = levelFilter === "All" ? networkingTopics : networkingTopics.filter(g => g.level === levelFilter);

  return (
    <div>
      <SectionHeader
        label="Networking Fundamentals"
        color={C.blue}
        title="Basic to Advanced Networking"
        subtitle="Complete networking guide: OSI layers, protocols, HTTP evolution, load balancing, CDN, and modern networking (HTTP/2, QUIC, BBR)"
      />

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
        {levels.map(l => (
          <button key={l} onClick={() => setLevelFilter(l)}
            style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${levelFilter===l?C.blue:C.border}`, background:levelFilter===l?`${C.blue}18`:"transparent", color:levelFilter===l?C.blue:C.muted, cursor:"pointer", fontSize:12, fontWeight:600 }}>
            {l}
          </button>
        ))}
      </div>

      {filtered.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ padding: "4px 12px", background: `${group.color}20`, border: `1px solid ${group.color}`, borderRadius: 20, color: group.color, fontSize: 12, fontWeight: 800 }}>
              {group.level}
            </div>
            <div style={{ height: 1, flex: 1, background: `${group.color}30` }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {group.topics.map((topic, ti) => {
              const key = `${gi}-${ti}`;
              const isOpen = sel === key;
              return (
                <motion.div
                  key={ti}
                  onClick={() => setSel(isOpen ? null : key)}
                  style={{
                    background: isOpen ? `${group.color}0a` : C.surface,
                    border: `1px solid ${isOpen ? group.color+"44" : C.border}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    overflow: "hidden"
                  }}
                  whileHover={{ scale: 1.01, borderColor: `${group.color}88` }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                    <motion.span
                      style={{ fontSize: 20 }}
                      animate={{ rotate: isOpen ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      🌐
                    </motion.span>
                    <span style={{ flex: 1, color: C.text, fontWeight: 700, fontSize: 14 }}>{topic.name}</span>
                    {topic.protocols && (
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {topic.protocols.slice(0, 2).map((p, pi) => (
                          <Tag key={pi} t={p} c={group.color} />
                        ))}
                      </div>
                    )}
                    <motion.span
                      style={{ color: C.muted }}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ▾
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "0 18px 18px" }}>
                          {topic.flow && <NetworkFlowDiagram type={topic.flow} />}

                          <div style={{ background: C.bg, borderRadius: 10, padding: 14, marginTop: 12 }}>
                            <div style={{ color: group.color, fontSize: 11, fontWeight: 800, fontFamily: "monospace", marginBottom: 8 }}>📖 DEFINITION</div>
                            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{topic.desc}</p>
                          </div>

                          <div style={{ background: `${C.accent}15`, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "10px 14px", marginTop: 12 }}>
                            <span style={{ color: C.accent, fontSize: 11, fontWeight: 800, fontFamily: "monospace" }}>💡 WHY IT MATTERS  </span>
                            <span style={{ color: C.text, fontSize: 13 }}>{topic.why}</span>
                          </div>

                          {topic.examples && (
                            <div style={{ background: C.bg, borderRadius: 10, padding: 14, marginTop: 12 }}>
                              <div style={{ color: C.green, fontSize: 11, fontWeight: 800, fontFamily: "monospace", marginBottom: 8 }}>✅ REAL-WORLD EXAMPLES</div>
                              <pre style={{ color: C.muted, fontSize: 12, lineHeight: 1.8, margin: 0, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "pre-wrap" }}>{topic.examples}</pre>
                            </div>
                          )}

                          {topic.tradeoffs && (
                            <div style={{ background: `${C.red}0f`, borderRadius: 10, padding: 14, marginTop: 12 }}>
                              <div style={{ color: C.red, fontSize: 11, fontWeight: 800, fontFamily: "monospace", marginBottom: 8 }}>⚖️ TRADEOFFS</div>
                              <pre style={{ color: C.muted, fontSize: 12, lineHeight: 1.8, margin: 0, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "pre-wrap" }}>{topic.tradeoffs}</pre>
                            </div>
                          )}

                          {topic.protocols && (
                            <div style={{ marginTop: 12 }}>
                              <div style={{ color: group.color, fontSize: 11, fontWeight: 800, fontFamily: "monospace", marginBottom: 6 }}>🔧 PROTOCOLS & TECH</div>
                              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                {topic.protocols.map((p, pi) => (
                                  <Tag key={pi} t={p} c={group.color} />
                                ))}
                              </div>
                            </div>
                          )}

                          {topic.numbers && (
                            <div style={{ background: `${C.accent}0f`, borderRadius: 10, padding: 14, marginTop: 12 }}>
                              <div style={{ color: C.accent, fontSize: 11, fontWeight: 800, fontFamily: "monospace", marginBottom: 8 }}>📊 NUMBERS & SCALE</div>
                              <pre style={{ color: C.muted, fontSize: 12, lineHeight: 1.8, margin: 0, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "pre-wrap" }}>{topic.numbers}</pre>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────── MAIN APP ─────────
// Theme Switcher Component
const ThemeSwitcher = ({ currentTheme, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const C = themes[currentTheme];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          background: C.surface,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 18,
          padding: 0,
          transition: 'all 0.2s'
        }}
        title="Change theme"
      >
        {themes[currentTheme].icon}
      </button>

      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 44,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 8,
              minWidth: 180,
              zIndex: 999,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ color: C.muted, fontSize: 10, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, marginBottom: 6, padding: '0 8px' }}>THEME</div>
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: 'none',
                  background: currentTheme === key ? `${C.accent}18` : 'transparent',
                  color: currentTheme === key ? C.accent : C.text,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: currentTheme === key ? 700 : 500,
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  marginBottom: 2
                }}
              >
                <span style={{ fontSize: 16 }}>{theme.icon}</span>
                <span style={{ flex: 1 }}>{theme.name}</span>
                {currentTheme === key && <span style={{ color: C.accent, fontSize: 16 }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const viewMap = { framework:FrameworkContent, concepts:ConceptsContent, components:ComponentsContent, databases:DatabasesContent, patterns:PatternsContent, networking:NetworkingContent, questions:QuestionsContent, tradeoffs:TradeoffsContent, numbers:NumbersContent, tips:TipsContent };

export default function App() {
  const [active, setActive] = useState("framework");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Get current theme colors - this overrides the module-level C within this component's scope
  const C = themes[currentTheme];

  // Define navItems inside component so it uses the dynamic C
  const navItems = [
    { id:"framework", icon:"⚡", label:"Framework", color:C.accent },
    { id:"concepts", icon:"🧠", label:"Concepts", color:C.blue },
    { id:"components", icon:"🧩", label:"Components", color:C.green },
    { id:"databases", icon:"🗄️", label:"Databases", color:C.purple },
    { id:"patterns", icon:"📐", label:"Patterns", color:C.red },
    { id:"networking", icon:"🌐", label:"Networking", color:C.blue },
    { id:"questions", icon:"🏗️", label:"Questions", color:C.pink },
    { id:"tradeoffs", icon:"⚖️", label:"Trade-offs", color:C.teal },
    { id:"numbers", icon:"🔢", label:"Numbers", color:C.orange },
    { id:"tips", icon:"🎯", label:"Pro Tips", color:C.red },
  ];

  const ActiveView = viewMap[active];
  const nav = navItems.find(n => n.id === active);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',system-ui,sans-serif", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
        button { font-family:inherit; }

        /* Mobile responsive utilities */
        .mobile-only { display: none; }
        .desktop-only { display: flex; }
        .top-bar-badges { display: flex; gap: 6px; }
        .sidebar { width: 200px; }
        .main-content { padding: 28px; }

        /* Responsive grid overrides for mobile */
        @media (max-width: 768px) {
          .mobile-only { display: flex; }
          .desktop-only { display: none; }
          .top-bar-badges { display: none; }
          .sidebar {
            position: fixed;
            left: ${mobileMenuOpen ? '0' : '-100%'};
            top: 61px;
            width: 260px;
            height: calc(100vh - 61px);
            z-index: 300;
            transition: left 0.3s ease;
            box-shadow: ${mobileMenuOpen ? '2px 0 8px rgba(0,0,0,0.1)' : 'none'};
          }
          .main-content { padding: 16px; }

          /* Make all 2-column and 3-column grids stack on mobile */
          [style*="gridTemplateColumns"]:not([style*="repeat"]) {
            grid-template-columns: 1fr !important;
          }

          /* Responsive diagram adjustments */
          [style*="display: flex"][style*="justifyContent: space-around"] {
            flex-direction: column;
            gap: 20px;
          }

          /* Reduce font sizes on mobile for better readability */
          pre {
            font-size: 11px !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          /* Better tag wrapping on mobile */
          [style*="flexWrap: wrap"] {
            gap: 4px !important;
          }

          /* Adjust arrow diagrams for mobile */
          svg {
            max-width: 100%;
            height: auto;
          }

          /* Ensure buttons don't get too small */
          button {
            min-height: 44px;
            -webkit-tap-highlight-color: transparent;
          }
        }

        @media (max-width: 480px) {
          .main-content { padding: 12px; }

          /* Even smaller fonts for very small screens */
          pre {
            font-size: 10px !important;
          }

          /* Reduce padding in cards */
          [style*="padding: 14px"] {
            padding: 10px !important;
          }

          /* Scale down large text on very small screens */
          [style*="fontSize: 28"] {
            font-size: 24px !important;
          }

          [style*="fontSize: 32"] {
            font-size: 26px !important;
          }
        }
      `}</style>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 299,
            top: 61
          }}
        />
      )}

      {/* Top bar */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"14px 16px", display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:200 }}>
        {/* Mobile menu button */}
        <button
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            background: C.bg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            cursor: 'pointer',
            padding: 0
          }}
        >
          <span style={{ width: 18, height: 2, background: C.text, borderRadius: 1 }} />
          <span style={{ width: 18, height: 2, background: C.text, borderRadius: 1 }} />
          <span style={{ width: 18, height: 2, background: C.text, borderRadius: 1 }} />
        </button>

        <div style={{ width:32, height:32, borderRadius:9, background:`${C.accent}20`, border:`1px solid ${C.accent}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink: 0 }}>🏗️</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ color:C.text, fontWeight:900, fontSize:15, letterSpacing:"-0.3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>System Design Interview</div>
          <div className="desktop-only" style={{ color:C.muted, fontSize:11, fontFamily:"'JetBrains Mono',monospace" }}>Complete Reference Guide · 2024 Edition</div>
        </div>
        <div className="top-bar-badges" style={{ marginLeft:"auto", display: 'flex', gap: 6, alignItems: 'center' }}>
          {["🟢 FAANG Level","⏱ 45–60 min","📚 9 Sections","🏗️ 20 Questions"].map((b, i) => (
            <span key={i} style={{ padding:"4px 10px", borderRadius:20, background:C.bg, border:`1px solid ${C.border}`, color:C.muted, fontSize:11, fontFamily:"'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{b}</span>
          ))}
        </div>
        <ThemeSwitcher currentTheme={currentTheme} onChange={setCurrentTheme} />
      </div>

      <div style={{ display:"flex", minHeight:"calc(100vh - 61px)" }}>
        {/* Sidebar */}
        <div className="sidebar" style={{ borderRight:`1px solid ${C.border}`, padding:"16px 10px", background:C.surface, position:"sticky", top:61, height:"calc(100vh - 61px)", overflowY:"auto", flexShrink:0 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => { setActive(n.id); setMobileMenuOpen(false); }}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:8, border:"none", background:active===n.id?`${n.color}18`:"transparent", color:active===n.id?n.color:C.muted, cursor:"pointer", textAlign:"left", fontSize:12, fontWeight:active===n.id?800:500, marginBottom:2, transition:"all 0.15s" }}>
              <span style={{ fontSize:14, flexShrink:0 }}>{n.icon}</span>
              <span style={{ flex:1 }}>{n.label}</span>
              {active===n.id && <span style={{ width:5, height:5, borderRadius:"50%", background:n.color, flexShrink:0 }} />}
            </button>
          ))}
          <div style={{ marginTop:20, padding:12, background:C.bg, borderRadius:10, border:`1px solid ${C.border}` }}>
            <div style={{ color:C.accent, fontSize:10, fontWeight:800, fontFamily:"'JetBrains Mono',monospace", marginBottom:6, letterSpacing:1 }}>THE 8 STEPS</div>
            {["Clarify","Estimate","API","Architecture","Deep Dive","Scale","Reliability","Review"].map((s, i) => (
              <div key={i} style={{ color:C.dim, fontSize:11, padding:"2px 0", display:"flex", gap:5 }}>
                <span style={{ color:C.accent, fontFamily:"monospace", fontSize:10 }}>{String(i+1).padStart(2,"0")}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="main-content" style={{ flex:1, overflowY:"auto", minWidth:0 }}>
          <div style={{ maxWidth:1100, margin: "0 auto" }}>
            <ActiveView />
          </div>
        </div>
      </div>
    </div>
  );
}
