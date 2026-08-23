import type { Project } from "@/data/projects";
import { TechIcon } from "./TechIcon";

export function ProjectVisual({
  kind,
  expanded = false,
}: {
  kind: Project["preview"];
  expanded?: boolean;
}) {
  return (
    <div
      className={`project-visual visual-${kind} ${expanded ? "is-expanded" : ""}`}
      aria-hidden="true"
    >
      <div className="visual-chrome">
        <span />
        <span />
        <span />
        <b>RR / SYSTEM PREVIEW</b>
      </div>
      {kind === "lead" ? <LeadVisual /> : null}
      {kind === "content" ? <ContentVisual /> : null}
      {kind === "synoptix" ? <SynoptixVisual /> : null}
      {kind === "automotive" ? <AutomotiveVisual /> : null}
      {kind === "homedash" ? <HomedashVisual /> : null}
      {kind === "commerce" ? <CommerceVisual /> : null}
    </div>
  );
}

function LeadVisual() {
  return (
    <div className="lead-canvas">
      <div className="lead-pipeline">
        {["Lead", "Consent", "Suppress", "Local time", "Send"].map((label, index) => (
          <div className="micro-node" key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
            {index < 4 ? <i className="packet" /> : null}
          </div>
        ))}
      </div>
      <div className="lead-reply">
        <div className="message-bubble">Interested in the blue model.</div>
        <div className="classifier">Reply classifier</div>
        <div className="reply-branches">
          <span className="is-positive">Dealer queue</span>
          <span>Human review</span>
          <span className="is-negative">Suppress</span>
        </div>
      </div>
      <div className="visual-status"><span /> All safety checks active</div>
    </div>
  );
}

function ContentVisual() {
  return (
    <div className="content-canvas">
      <div className="media-stack">
        <div className="media-card media-image"><span>IMG</span><i /></div>
        <div className="media-card media-video"><span>VID</span><i /></div>
        <div className="media-card media-carousel"><span>CAR</span><i /></div>
      </div>
      <div className="ai-transform">
        <div className="ai-ring"><TechIcon id="openai" /></div>
        <span>Schema analysis</span>
        <i className="packet" />
      </div>
      <div className="report-sheet">
        <header><TechIcon id="googleSheets" /> Live report</header>
        {["Hook", "Format", "Angle", "CTA"].map((label, index) => (
          <div className="report-row" key={label}>
            <span>{label}</span><i style={{ width: `${78 - index * 9}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SynoptixVisual() {
  return (
    <div className="synoptix-canvas">
      <aside>
        <span className="syn-mark">S</span>
        <i /><i /><i /><i />
      </aside>
      <div className="chat-panel">
        <header>Enterprise assistant <span>Online</span></header>
        <div className="chat-line is-user">Evaluate the latest request set.</div>
        <div className="chat-line is-agent">Analysis complete. Safety and quality results are ready.</div>
        <div className="chat-input">Ask Synoptix… <b>↗</b></div>
      </div>
      <div className="eval-panel">
        <div className="metric"><span>Quality</span><b>Evaluated</b></div>
        <div className="metric"><span>Safety</span><b>Monitored</b></div>
        <div className="chart-bars">
          {[42, 68, 55, 82, 64, 91, 74].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="service-row"><TechIcon id="azure" /><TechIcon id="microsoftGraph" /><TechIcon id="fastapi" /></div>
      </div>
    </div>
  );
}

function AutomotiveVisual() {
  return (
    <div className="automotive-canvas">
      <div className="vehicle-stage">
        <div className="car-outline"><i /><i /></div>
        <div className="filter-pills"><span>Electric</span><span>SUV</span><span>Under 30k</span></div>
      </div>
      <div className="inventory-grid">
        {["01", "02", "03"].map((number) => (
          <div className="inventory-card" key={number}>
            <div className="car-thumb" /><span>Vehicle {number}</span><b>View details</b>
          </div>
        ))}
      </div>
      <div className="mini-map"><i className="road one" /><i className="road two" /><span /><span /><span /></div>
    </div>
  );
}

function HomedashVisual() {
  return (
    <div className="homedash-canvas">
      <div className="dashboard-shell">
        <aside><b>H</b><i /><i /><i /><i /></aside>
        <main>
          <header><span>Good morning</span><i /></header>
          <div className="dash-metrics"><span>Properties<b>12</b></span><span>Open tasks<b>08</b></span><span>Leases<b>24</b></span></div>
          <div className="dash-body"><div className="property-list"><i /><i /><i /></div><div className="maintenance-card"><b>AI maintenance</b><span>Request triaged</span><em>Assigned</em></div></div>
        </main>
      </div>
      <div className="responsive-device"><span /><i /><i /></div>
    </div>
  );
}

function CommerceVisual() {
  return (
    <div className="commerce-canvas">
      <header><b>DARWAZA</b><span>New / Collections / Objects</span><i>Bag 02</i></header>
      <div className="product-grid">
        {["Clay", "Indigo", "Sand"].map((label, index) => (
          <div className="product-tile" key={label}>
            <div className={`product-image product-${index + 1}`}><span /></div>
            <p>{label} collection <b>Explore</b></p>
          </div>
        ))}
      </div>
      <div className="checkout-strip"><span>Cart verified</span><i /><span>Delivery set</span><i /><b>Checkout →</b></div>
    </div>
  );
}
