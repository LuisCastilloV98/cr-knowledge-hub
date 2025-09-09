import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { TopicData, TopicItem, TopicItemSection } from "../types/types";
import { withBase } from "../utils/withBase";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import Carousel from "../components/Carousel";
import LightboxViewer from "../components/LightboxViewer";
import styles from "./TopicDetail.module.css";

const dataModules = import.meta.glob<{ default: TopicData }>(
  "../assets/data/*.json",
  { eager: true }
);

function getAllTopics(): TopicData[] {
  return Object.values(dataModules)
    .map((m) => m.default)
    .filter((t) => t && typeof t.slug === "string" && typeof t.title === "string");
}

function getBySlug(slug: string): TopicData | undefined {
  const all = getAllTopics();
  return all.find((t) => t.slug === slug);
}

function RevealImg({ src, alt }: { src: string; alt: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLImageElement>();
  return (
    <img
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      src={withBase(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ borderRadius: 14, width: "100%", height: "auto", display: "block" }}
    />
  );
}

const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const hasNonEmpty = (arr: unknown): boolean => Array.isArray(arr) && arr.length > 0;

// Normalize references → accepts either strings or objects with {label?, url}
type RefItem = { label?: string; url: string };
const normalizeRefs = (v: unknown): RefItem[] => {
  if (!Array.isArray(v)) return [];
  const out: RefItem[] = [];
  for (const it of v) {
    if (typeof it === "string" && it.trim()) {
      out.push({ url: it.trim() });
    } else if (it && typeof it === "object") {
      const url = (it as any).url;
      const label = (it as any).label;
      if (typeof url === "string" && url.trim()) {
        out.push({ url: url.trim(), label: typeof label === "string" ? label.trim() : undefined });
      }
    }
  }
  return out;
};

export default function TopicDetail() {
  const { slug = "" } = useParams();
  const topic = getBySlug(slug);

  const gallery = useMemo(() => asArray<string>(topic?.gallery), [topic]);
  const references = useMemo(() => normalizeRefs(topic?.references as unknown), [topic]);

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const openAt = (idx: number) => { setLbIndex(idx); setLbOpen(true); };
  const close = () => setLbOpen(false);

  if (!topic) {
    return (
      <main className="container">
        <p>Topic not found.</p>
        <Link className="btn" to="/">← Back</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link className="btn" to="/">← Back</Link>

      <section style={{ marginTop: 16 }} className="neu-surface">
        {/* Header image */}
        <img
          src={withBase(topic.wideImage)}
          alt={topic.title}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            display: "block",
          }}
          loading="eager"
          decoding="async"
        />

        <div className={styles.body}>
          {/* Title */}
          <h1 style={{ marginTop: 0 }}>
            {topic.emoji ? <span style={{ marginRight: 8 }}>{topic.emoji}</span> : null}
            {topic.title}
          </h1>

          {/* Long description */}
          <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
            {topic.longDescription}
          </p>

          {/* Highlights Section */}
          {hasNonEmpty(topic.items) && (
            <>
              <h2>Highlights</h2>
              <div className={styles.itemsGrid}>
                {topic!.items!.map((raw: TopicItem, idx: number) => {
                  const sections = asArray<TopicItemSection>((raw as any).sections);
                  const images = hasNonEmpty(raw.images)
                    ? asArray<string>(raw.images)
                    : raw.image
                    ? [raw.image as string]
                    : [];

                  const rich = sections.length > 0 || images.length > 0;

                  if (rich) {
                    return (
                      <article key={idx} className={`neu-surface ${styles.item}`}>
                        {/* Item title */}
                        <h3 className={styles.itemTitle}>
                          {raw.emoji ? <span style={{ marginRight: 6 }}>{raw.emoji}</span> : null}
                          {raw.title}
                        </h3>

                        {/* Item media: carousel or single image */}
                        <div className={styles.itemMedia}>
                          {images.length > 1 ? (
                            <Carousel images={images} ariaLabel={`${raw.title} images`} />
                          ) : images.length === 1 ? (
                            <img
                              src={withBase(images[0])}
                              alt={raw.title}
                              loading="lazy"
                              decoding="async"
                              style={{
                                width: "100%",
                                height: "var(--carousel-h, 320px)",
                                objectFit: "cover",
                                display: "block",
                                borderRadius: 16,
                              }}
                            />
                          ) : null}
                        </div>

                        {/* Item text and sections */}
                        <div className={styles.itemText}>
                          {sections.length > 0 ? (
                            <div style={{ display: "grid", gap: 12 }}>
                              {sections.map((sec, sidx) => (
                                <section key={sidx}>
                                  <h4 style={{ margin: "10px 0 6px" }}>{sec.heading}</h4>
                                  <p>{sec.content}</p>
                                </section>
                              ))}
                            </div>
                          ) : raw.description ? (
                            <p>{raw.description}</p>
                          ) : null}
                        </div>
                      </article>
                    );
                  }

                  // Fallback for simple items without sections/images
                  return (
                    <li key={idx} style={{ marginBottom: 12, listStyle: "disc inside" }}>
                      <strong>
                        {raw.emoji ? `${raw.emoji} ` : ""}
                        {raw.title}:
                      </strong>{" "}
                      {raw.description}
                      {raw.image && (
                        <div style={{ marginTop: 8 }}>
                          <img
                            src={withBase(raw.image)}
                            alt={raw.title}
                            style={{ width: "100%", maxWidth: 520, borderRadius: 14, display: "block" }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
              </div>
            </>
          )}

          {/* Gallery Section */}
          {gallery.length > 0 && (
            <>
              <h2>Gallery</h2>

              <div className="gallery">
                {gallery.map((g, idx) => (
                  <button
                    key={idx}
                    className="gallery-btn"
                    onClick={() => openAt(idx)}
                    aria-label={`Open image ${idx + 1}`}
                    style={{ padding: 0, border: 0, background: "transparent" }}
                  >
                    <RevealImg src={g} alt={`${topic.title} ${idx + 1}`} />
                  </button>
                ))}
              </div>

              <LightboxViewer
                open={lbOpen}
                index={lbIndex}
                images={gallery}
                onClose={close}
              />
            </>
          )}

          {/* References Section */}
          {references.length > 0 && (
            <>
              <h2 style={{ marginTop: 24 }}>References</h2>
              <ul style={{ display: "grid", gap: 8, paddingLeft: 18 }}>
                {references.map((ref, idx) => (
                  <li key={idx} style={{ lineHeight: 1.6 }}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "underline" }}
                    >
                      {ref.label ?? ref.url}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
