import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import TopicCard from "../components/TopicCard";
import type { TopicData } from "../types/types";
import ThemeToggle from "../components/ThemeToggle";
import styles from "./Home.module.css";

const dataModules = import.meta.glob("../assets/data/*.json", { eager: true });

export default function Home(){
  const [q, setQ] = useState("");

  const topics = useMemo<TopicData[]>(() => {
    return Object.values(dataModules).map((m: any) => m.default as TopicData);
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return topics;
    return topics.filter(t =>
      (t.title?.toLowerCase().includes(term) || t.shortDescription?.toLowerCase().includes(term))
    );
  }, [q, topics]);

  return (
    <main className="container">
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>CR Knowledge Hub</h1>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <section className={`neu-surface ${styles.hero}`}>
        <div className={styles.heroBadge}>Learn English through Costa Rica</div>

        <h2 className={styles.heroTitle}>
          Discover, practice, and enjoy <span className={styles.highlight}>Pura Vida</span> content
        </h2>

        <p className={styles.heroDesc}>
          Explore curated topics about Costa Rica—national parks, wildlife, culture, gastronomy, festivals and more.
          Each page is designed to help you improve your English while learning authentic facts, stories, and places.
          Add new topics over time and grow this collaborative hub with teachers and students.
        </p>

        <div className={styles.heroStats}>
          <strong>{topics.length}</strong> topic{topics.length === 1 ? "" : "s"} available • Updated as the community contributes
        </div>
      </section>

      {/* Search */}
      <section className={styles.searchSection}>
        <SearchBar value={q} onChange={setQ} placeholder="Search by topic (title or short description)..." />
      </section>

      {/* Cards */}
      <section className="grid cards">
        {filtered.map(t => <TopicCard key={t.slug} topic={t} />)}
        {filtered.length === 0 && (
          <div className={`neu-surface ${styles.noResults}`}>
            No results. Try another keyword.
          </div>
        )}
      </section>
    </main>
  );
}
