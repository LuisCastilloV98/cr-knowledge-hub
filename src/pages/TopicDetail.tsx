import { useParams, Link } from "react-router-dom";
import type { TopicData } from "../types";
import { withBase } from "../utils/withBase";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

const dataModules = import.meta.glob("../assets/data/*.json", { eager: true });

function getBySlug(slug: string): TopicData | undefined {
  const all = Object.values(dataModules).map((m: any) => m.default as TopicData);
  return all.find(t => t.slug === slug);
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
      style={{ borderRadius: 14 }}
    />
  );
}

export default function TopicDetail() {
  const { slug = "" } = useParams();
  const topic = getBySlug(slug);

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
        <img
          src={withBase(topic.wideImage)}
          alt={topic.title}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18
          }}
          loading="eager"
          decoding="async"
        />

        <div style={{ padding: "18px" }}>
          <h1 style={{ marginTop: 0 }}>
            {topic.emoji ? <span style={{ marginRight: 8 }}>{topic.emoji}</span> : null}
            {topic.title}
          </h1>

          <p style={{ color: "var(--muted)" }}>{topic.longDescription}</p>

          {topic.textImage && (
            <div
              className="grid"
              style={{
                gridTemplateColumns: "minmax(220px, 360px) 1fr",
                alignItems: "start",
                margin: "16px 0"
              }}
            >
              <img
                src={withBase(topic.textImage)}
                alt=""
                style={{ width: "100%", borderRadius: 16 }}
                loading="lazy"
                decoding="async"
              />
              <p style={{ margin: 0 }} />
            </div>
          )}

          {topic.items && topic.items.length > 0 && (
            <>
              <h2>Highlights</h2>
              <ul>
                {topic.items.map((it, i) => (
                  <li key={i} style={{ marginBottom: 14 }}>
                    <strong>
                      {it.emoji ? `${it.emoji} ` : ""}
                      {it.title}:
                    </strong>{" "}
                    {it.description}
                    {it.image && (
                      <figure style={{ marginTop: 8, marginBottom: 0 }}>
                        <img
                          src={withBase(it.image)}
                          alt={it.title}
                          style={{ width: "100%", maxWidth: 520, borderRadius: 14 }}
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Si quieres, añade captions usando una propiedad futura */}
                        {/* <figcaption className="tag">{it.caption}</figcaption> */}
                      </figure>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}

          {topic.gallery && topic.gallery.length > 0 && (
            <>
              <h2>Gallery</h2>
              <div className="gallery">
                {topic.gallery.map((g, idx) => (
                  <RevealImg key={idx} src={g} alt={`${topic.title} ${idx + 1}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
