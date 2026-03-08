import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const C = {
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
};

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
      minWidth: 100
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
    { term:"Availability Nines", def:"99% = 87.6hr/yr | 99.9% = 8.7hr | 99.99% = 52min | 99.999% = 5.3min | 99.9999% = 31sec. Each nine costs exponentially more.", why:"Know the math — interviewers ask this" },
    { term:"Replication Strategies", def:"Sync replication: primary waits for replica ACK. Strong consistency, higher latency. Async: fire-and-forget. Risk of data loss on failover but faster.", why:"Sync for financial data, async for social content" },
    { term:"Active-Active vs Active-Passive", def:"Active-Active: all nodes serve traffic, instant failover, but conflict resolution needed. Active-Passive: standby promotes on failure, simpler but wastes resources.", why:"Active-active preferred for global apps; active-passive for DBs" },
    { term:"Consensus Algorithms", def:"Raft (Etcd, CockroachDB) and Paxos (Chubby) for leader election and distributed agreement. Require majority quorum (n/2+1 nodes).", why:"Understanding Raft shows distributed systems depth" },
    { term:"RPO & RTO", def:"RPO = Recovery Point Objective: max data loss (last backup). RTO = Recovery Time Objective: max downtime. Financial: RPO=0, RTO=minutes.", why:"Business requirements drive backup and replication strategy" },
  ]},
  { name:"Consistency Models", color:C.green, icon:"⚖️", items:[
    { term:"CAP Theorem", def:"Distributed system can guarantee only 2 of: Consistency (same data everywhere), Availability (always responds), Partition Tolerance (survives network splits). P is non-negotiable in practice → choose CP or AP.", why:"Every NoSQL choice maps to this" },
    { term:"Strong Consistency", def:"Every read gets latest write. Requires 2-phase commit or Raft quorum. Zookeeper, HBase. Higher latency.", why:"Payments, inventory, anything financial" },
    { term:"Eventual Consistency", def:"Nodes converge after some time. DNS, shopping carts, social likes. Much faster and more available.", why:"Social media, analytics, non-critical counters" },
    { term:"Read-Your-Writes", def:"After a write, that user always sees their own write. Achieve with: sticky sessions, read from primary after write, version vectors.", why:"Critical for UX — users expect to see their own posts" },
    { term:"Linearizability", def:"Strongest model: operations appear instantaneous and globally ordered. Very expensive. Spanner achieves via TrueTime atomic clocks.", why:"Rare requirement; mention when showing off" },
    { term:"PACELC Theorem", def:"Extension of CAP: in case of Partition (P) → Availability vs Consistency. Else (E, no partition) → Latency vs Consistency. More practical model.", why:"More nuanced than CAP alone" },
  ]},
  { name:"Caching Deep Dive", color:C.purple, icon:"⚡", items:[
    { term:"Cache-Aside (Lazy Loading)", def:"App checks cache → miss → read DB → populate cache → return. Most common. Data only cached when needed. Stale on DB writes.", why:"Default choice for most read-heavy systems" },
    { term:"Write-Through", def:"Write to cache AND DB synchronously. Cache always fresh. Double-write latency. Good for read-after-write consistency.", why:"User profiles, product catalog where stale reads are bad" },
    { term:"Write-Behind (Write-Back)", def:"Write to cache only → async flush to DB. Very fast writes. Risk of data loss if cache crashes before flush.", why:"High-write, loss-tolerant: game scores, view counters" },
    { term:"Read-Through", def:"Cache sits between app and DB. On miss, cache fetches from DB itself. Transparent to app.", why:"Simplifies app code; cache library handles DB calls" },
    { term:"Cache Eviction Policies", def:"LRU (Least Recently Used) — default Redis. LFU (Least Frequently Used) — better for popularity-skewed data. TTL — explicit expiry. Random.", why:"LFU for viral content, LRU for sessions" },
    { term:"Cache Stampede / Thundering Herd", def:"Many simultaneous cache misses on same key → DB overload. Solutions: mutex lock, probabilistic early expiry (PER), background refresh.", why:"Must mention mitigation strategy" },
  ]},
  { name:"Networking Fundamentals", color:C.teal, icon:"🌐", items:[
    { term:"DNS & Load Balancing", def:"DNS round robin, Anycast routing. GeoDNS routes to nearest region. TTL determines cache duration — shorter TTL = faster failover.", why:"Global traffic management starting point" },
    { term:"TCP vs UDP", def:"TCP: reliable, ordered, connection-based. HTTP/1.1, HTTP/2, gRPC. UDP: unreliable but fast. DNS, video streaming, gaming.", why:"WebRTC uses UDP. Know when order matters" },
    { term:"HTTP/1.1 vs HTTP/2 vs HTTP/3", def:"HTTP/1.1: one request/connection. HTTP/2: multiplexing, header compression, server push. HTTP/3: QUIC over UDP, 0-RTT, solves head-of-line blocking.", why:"HTTP/2 is default for most APIs now" },
    { term:"WebSockets vs Long Polling vs SSE", def:"WebSocket: full duplex, persistent. Best for chat, gaming. Long Polling: client waits for response, re-polls. SSE: server pushes, one-directional. Best for notifications.", why:"Real-time systems design pivot point" },
    { term:"gRPC", def:"Google's RPC using Protocol Buffers (binary, typed). 5–7× faster than REST/JSON. HTTP/2 native. Great for internal microservice comms.", why:"Internal service-to-service in microservices" },
  ]},
  { name:"Partitioning & Sharding", color:C.red, icon:"🗂️", items:[
    { term:"Horizontal Partitioning (Sharding)", def:"Split rows across nodes by shard key. Hash-based (even dist) vs Range-based (range queries) vs Directory-based (lookup table).", why:"Only solution when data > single node capacity" },
    { term:"Vertical Partitioning", def:"Split columns across tables. Store hot columns (name, email) separately from cold blobs (bio, avatar). Reduces row size, improves cache efficiency.", why:"Normalize hot vs cold data access patterns" },
    { term:"Consistent Hashing", def:"Hash ring where nodes own key ranges. On node add/remove, only 1/N of keys reassigned. Virtual nodes for even distribution.", why:"Distributed cache and DB sharding standard technique" },
    { term:"Hot Spot / Skew Problem", def:"'Celebrity problem': one shard gets disproportionate traffic. Solutions: salting (append random suffix), per-celebrity caching, read replica per shard.", why:"Always discuss this when mentioning sharding" },
    { term:"Cross-Shard Queries", def:"Queries spanning shards require scatter-gather: fan out to all shards, aggregate results. Expensive. Avoid with denormalization or data locality design.", why:"Major constraint that drives schema design" },
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
      desc: "7-layer model: Application (HTTP/DNS) → Presentation (TLS) → Session → Transport (TCP/UDP) → Network (IP) → Data Link (MAC) → Physical",
      why: "Foundation for understanding how data travels through networks. Each layer has specific responsibility.",
      protocols: ["HTTP", "HTTPS", "DNS", "TCP", "UDP", "IP", "Ethernet"],
      useCase: "Every network communication uses this stack — from browser to server" },
    { name: "TCP vs UDP",
      flow: "tcp-handshake",
      desc: "TCP: connection-oriented, reliable, ordered delivery with 3-way handshake. UDP: connectionless, fast, no guarantees.",
      why: "Choose TCP for reliability (HTTP, file transfer), UDP for speed (video streaming, gaming, DNS)",
      protocols: ["TCP 3-way handshake (SYN, SYN-ACK, ACK)", "UDP datagram"],
      useCase: "TCP: web pages, APIs. UDP: live video, VoIP, online games, DNS lookups" },
    { name: "HTTP/HTTPS Request Flow",
      flow: "http-request",
      desc: "Browser → DNS lookup → TCP handshake → TLS handshake (HTTPS) → HTTP request → Server response → Connection close",
      why: "Understanding HTTP lifecycle helps debug latency, optimize loading, implement caching",
      protocols: ["HTTP/1.1", "HTTP/2 (multiplexing)", "HTTP/3 (QUIC)", "TLS 1.2/1.3"],
      useCase: "Every web request: GET /api/users → 200 OK. HTTPS adds TLS encryption (443 port)" },
    { name: "DNS Resolution",
      desc: "Recursive query: Browser cache → OS cache → Router cache → ISP DNS → Root server → TLD server → Authoritative DNS",
      why: "DNS is critical path. Slow DNS = slow site. Use DNS prefetch, minimize lookups, CDN for geo-distributed DNS",
      protocols: ["DNS (UDP port 53)", "DoH (DNS over HTTPS)", "DoT (DNS over TLS)"],
      useCase: "google.com → 142.250.80.46. Typical lookup: 20-120ms. Cached: <1ms" },
  ]},
  { level: "Intermediate", color: C.green, topics: [
    { name: "Load Balancing Algorithms",
      desc: "L4 (TCP): Round Robin, Least Connections, IP Hash. L7 (HTTP): URL-based, Header-based, Weighted Round Robin, Least Response Time",
      why: "Different algorithms fit different traffic patterns. Sticky sessions need IP Hash. Health checks prevent routing to dead nodes",
      protocols: ["L4 (Transport)", "L7 (Application)", "Health check protocols"],
      useCase: "AWS ALB (L7): route /api → API servers, /static → CDN. NLB (L4): ultra-low latency" },
    { name: "WebSocket & Long Polling",
      desc: "HTTP: req-res, stateless. Long Polling: client polls with timeout. WebSocket: persistent bidirectional TCP connection (upgrade from HTTP)",
      why: "Real-time apps need WebSocket (chat, gaming, live feeds). Fallback: Server-Sent Events (SSE) for unidirectional",
      protocols: ["WebSocket (ws:// wss://)", "HTTP Long Polling", "SSE"],
      useCase: "Chat apps (WhatsApp), live sports scores, collaborative editing (Google Docs)" },
    { name: "CDN & Edge Caching",
      desc: "Edge locations cache static assets close to users. Origin pull: CDN fetches from origin on cache miss. TTL controls freshness",
      why: "Reduce latency (serve from nearest edge), offload origin traffic, DDoS protection",
      protocols: ["HTTP caching headers (Cache-Control, ETag)", "Anycast routing"],
      useCase: "Cloudflare, Akamai: cache images, JS, CSS. 90% cache hit rate → 10x less origin load" },
    { name: "SSL/TLS Handshake",
      desc: "Client Hello → Server Hello (certificate) → Client verifies cert → Key exchange (RSA/ECDHE) → Session keys → Encrypted data",
      why: "HTTPS is mandatory. TLS 1.3 reduces handshake to 1-RTT (vs 2-RTT in TLS 1.2). Use session resumption for faster reconnects",
      protocols: ["TLS 1.2", "TLS 1.3", "Certificate chains", "ALPN for HTTP/2"],
      useCase: "Every HTTPS request. ~100-300ms handshake cost. Optimize: OCSP stapling, session tickets" },
  ]},
  { level: "Advanced", color: C.purple, topics: [
    { name: "HTTP/2 Multiplexing & Server Push",
      desc: "Single TCP connection, multiple parallel streams, header compression (HPACK), server can push resources before requested",
      why: "Eliminates head-of-line blocking (HTTP/1.1), reduces latency, better use of bandwidth. But TCP-level HOL blocking remains",
      protocols: ["HTTP/2 (binary framing)", "HPACK compression", "Stream prioritization"],
      useCase: "Modern browsers + servers. Push critical CSS/JS. Multiplexing: 100 requests on 1 connection" },
    { name: "QUIC & HTTP/3",
      desc: "QUIC: UDP-based, built-in TLS, multiple streams without TCP HOL blocking. HTTP/3 runs on QUIC. 0-RTT connection resumption",
      why: "Solves TCP's head-of-line blocking. Faster connection setup. Mobile-friendly (connection migration on IP change)",
      protocols: ["QUIC (UDP)", "HTTP/3", "0-RTT handshake"],
      useCase: "Google, Cloudflare, Facebook use HTTP/3. 30%+ faster page loads on lossy networks" },
    { name: "Anycast & GeoDNS",
      desc: "Anycast: same IP announced from multiple locations, routed to nearest. GeoDNS: return different IPs based on user location",
      why: "Global low latency, automatic failover, DDoS mitigation (distribute attack across edges)",
      protocols: ["BGP Anycast", "DNS GeoDNS", "Active-active multi-region"],
      useCase: "Cloudflare: 1.1.1.1 anycast to 200+ cities. AWS Route 53: geolocation routing" },
    { name: "TCP Congestion Control & BBR",
      desc: "Congestion control: slow start → congestion avoidance → fast retransmit. BBR (Bottleneck Bandwidth and RTT): model-based, not loss-based",
      why: "Legacy: TCP Reno/Cubic react to packet loss (too late). BBR: proactively finds optimal rate. 2-4x throughput on lossy links",
      protocols: ["TCP Reno", "TCP Cubic", "BBR v1/v2"],
      useCase: "Google uses BBR for YouTube. Critical for high-latency/lossy networks (satellite, mobile)" },
    { name: "BGP & Internet Routing",
      desc: "BGP: Border Gateway Protocol routes traffic between autonomous systems (AS). Path selection: shortest AS path, local pref, MED",
      why: "Critical for multi-region deployments, traffic engineering, DDoS mitigation. BGP hijacks can blackhole traffic",
      protocols: ["BGP-4", "AS numbers", "Route announcements"],
      useCase: "AWS announces prefixes via BGP. Cloudflare uses BGP anycast. Incidents: YouTube BGP hijack 2008" },
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
                            <div style={{ color: group.color, fontSize: 11, fontWeight: 800, fontFamily: "monospace", marginBottom: 8 }}>📖 DESCRIPTION</div>
                            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{topic.desc}</p>
                          </div>

                          <div style={{ background: `${C.accent}15`, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "10px 14px", marginTop: 12 }}>
                            <span style={{ color: C.accent, fontSize: 11, fontWeight: 800 }}>💡 WHY IT MATTERS  </span>
                            <span style={{ color: C.text, fontSize: 13 }}>{topic.why}</span>
                          </div>

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

                          {topic.useCase && (
                            <div style={{ background: `${C.green}15`, borderRadius: 8, padding: "10px 14px", marginTop: 12 }}>
                              <span style={{ color: C.green, fontSize: 11, fontWeight: 800 }}>✅ REAL-WORLD USE  </span>
                              <span style={{ color: C.text, fontSize: 13 }}>{topic.useCase}</span>
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

const viewMap = { framework:FrameworkContent, concepts:ConceptsContent, components:ComponentsContent, databases:DatabasesContent, patterns:PatternsContent, networking:NetworkingContent, questions:QuestionsContent, tradeoffs:TradeoffsContent, numbers:NumbersContent, tips:TipsContent };

export default function App() {
  const [active, setActive] = useState("framework");
  const ActiveView = viewMap[active];
  const nav = navItems.find(n => n.id === active);
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',system-ui,sans-serif", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&family=Playfair+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
        button { font-family:inherit; }
      `}</style>

      {/* Top bar */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"14px 24px", display:"flex", alignItems:"center", gap:14, position:"sticky", top:0, zIndex:200 }}>
        <div style={{ width:32, height:32, borderRadius:9, background:`${C.accent}20`, border:`1px solid ${C.accent}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏗️</div>
        <div>
          <div style={{ color:C.text, fontWeight:900, fontSize:15, letterSpacing:"-0.3px" }}>System Design Interview</div>
          <div style={{ color:C.muted, fontSize:11, fontFamily:"'JetBrains Mono',monospace" }}>Complete Reference Guide · 2024 Edition</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
          {["🟢 FAANG Level","⏱ 45–60 min","📚 9 Sections","🏗️ 20 Questions"].map((b, i) => (
            <span key={i} style={{ padding:"4px 10px", borderRadius:20, background:C.bg, border:`1px solid ${C.border}`, color:C.muted, fontSize:11, fontFamily:"'JetBrains Mono',monospace" }}>{b}</span>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", minHeight:"calc(100vh - 61px)" }}>
        {/* Sidebar */}
        <div style={{ width:200, borderRight:`1px solid ${C.border}`, padding:"16px 10px", background:C.surface, position:"sticky", top:61, height:"calc(100vh - 61px)", overflowY:"auto", flexShrink:0 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setActive(n.id)}
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
        <div style={{ flex:1, padding:28, overflowY:"auto", minWidth:0 }}>
          <div style={{ maxWidth:1100 }}>
            <ActiveView />
          </div>
        </div>
      </div>
    </div>
  );
}
