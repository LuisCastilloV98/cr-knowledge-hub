import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { TopicData } from "../types/types";
import { withBase } from "../utils/withBase";
import QRPoster, { type QRPosterHandle } from "./QRPoster";

export default function TopicCard({ topic }: { topic: TopicData }) {
  const [showQR, setShowQR] = useState(false);

  // Build absolute URL for this topic page
  const relativePath = `/topic/${topic.slug}`;
  const absoluteHref = new URL(withBase(relativePath), window.location.origin).toString();

  // Hidden instance to allow direct download from the card (without opening modal)
  const posterRef = useRef<QRPosterHandle | null>(null);

  async function handleDownloadFromCard() {
    await posterRef.current?.download();
  }

  return (
    <article className="card">
      <img src={withBase(topic.cardImage)} alt={topic.title} />
      <div className="body">
        <h3 style={{ margin: "0 0 6px" }}>
          {topic.emoji ? <span style={{ marginRight: 6 }}>{topic.emoji}</span> : null}
          {topic.title}
        </h3>
        <p className="tag" style={{ margin: "0 0 10px" }}>{topic.shortDescription}</p>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="btn" to={relativePath}>Learn more →</Link>
          <button className="btn" onClick={() => setShowQR(true)}>Show QR</button>
          <button className="btn" onClick={handleDownloadFromCard}>Download QR (4K)</button>
        </div>
      </div>

      {/* Hidden QRPoster used only to serve the "Download QR (4K)" button */}
      <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <QRPoster
          ref={posterRef}
          url={absoluteHref}
          title={topic.title}
          size={3840}                // 4K export
          maxPreviewWidth={1}        // tiny preview since it's hidden
          padding={120}
          radius={120}
          qrMargin={2}
          showFooter={true}
          footerText="Scan me"
          filename={`${topic.slug}-qr-4k.png`}
          shadow={true}
          withDownloadButton={false}
        />
      </div>

      {/* Modal with a bounded-width preview (simple & stable on large screens) */}
      {showQR && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-title"
          onClick={(e) => {
            // Close only when clicking the backdrop itself
            if (e.target === e.currentTarget) setShowQR(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            zIndex: 999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "min(92vw, 560px)",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 16,
              borderRadius: 16,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              transform: "translateZ(0)",
            }}
          >
            <h2 id="qr-title" style={{ margin: "8px 0 16px", textAlign: "center" }}>
              {topic.title}
            </h2>

            {/* The preview caps its own internal render size via maxPreviewWidth */}
            <QRPoster
              url={absoluteHref}
              title={topic.title}
              size={3840}               // 4K export
              maxPreviewWidth={420}     // <= cap preview width for big screens
              padding={120}
              radius={120}
              qrMargin={2}
              showFooter={true}
              footerText="Scan me"
              filename={`${topic.slug}-qr-4k.png`}
              shadow={true}
              withDownloadButton={true}
            />

            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
              <button className="btn" onClick={() => setShowQR(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
