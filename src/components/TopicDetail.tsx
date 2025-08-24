import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import type { TopicData } from "../types/types";
import { withBase } from "../utils/withBase";
import useRevealOnScroll from "../hooks/useRevealOnScroll";
import Carousel from "../components/Carousel";
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
      style={{ borderRadius: 14 }}
    />
  );
}

const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const hasNonEmpty = (arr: unknown): boolean => Array.isArray(arr) && arr.length > 0;

export default function TopicDetail() {
  const { slug = "" } = useParams();
  const topic = getBySlug(slug);

  const gallery = useMemo(() => asArray<string>(topic?.gallery), [topic]);

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
            borderTopRightRadius: 18,
          }}
          loading="eager"
          decoding="async"
        />

        <div className={styles.body}>
          <h1 style={{ marginTop: 0 }}>
            {topic.emoji ? <span style={{ marginRight: 8 }}>{topic.emoji}</span> : null}
            {topic.title}
          </h1>

          <p style={{ color: "var(--muted)", lineHeight: 1.65 }}>
            {topic.longDescription}
          </p>

          {hasNonEmpty(topic.items) && (
            <>
              <h2>Highlights</h2>
              <div className={styles.itemsGrid}>
                {topic!.items!.map((raw: any, idx: number) => {
                  const sections = asArray<{ heading: string; content: string }>(raw.sections);
                  const images = hasNonEmpty(raw.images)
                    ? asArray<string>(raw.images)
                    : raw.image
                    ? [raw.image as string]
                    : [];

                  const rich = sections.length > 0 || images.length > 0;

                  if (rich) {
                    return (
                      <article key={idx} className={`neu-surface ${styles.item}`}>

                        <h3 className={styles.itemTitle}>
                          {raw.emoji ? <span style={{ marginRight: 6 }}>{raw.emoji}</span> : null}
                          {raw.title}
                        </h3>


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
                            style={{ width: "100%", maxWidth: 520, borderRadius: 14 }}
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

          {gallery.length > 0 && (
            <>
              <h2>Gallery</h2>
              <div className="gallery">
                {gallery.map((g, idx) => (
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
