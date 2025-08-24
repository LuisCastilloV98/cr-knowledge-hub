import { Link } from "react-router-dom";
import type { TopicData } from "../types";
import { withBase } from "../utils/withBase";

export default function TopicCard({ topic }: { topic: TopicData }){
  return (
    <article className="card">
      <img src={withBase(topic.cardImage)} alt={topic.title} />
      <div className="body">
        <h3 style={{margin:"0 0 6px"}}>
          {topic.emoji ? <span style={{marginRight:6}}>{topic.emoji}</span> : null}
          {topic.title}
        </h3>
        <p className="tag" style={{margin:"0 0 10px"}}>{topic.shortDescription}</p>
        <Link className="btn" to={`/topic/${topic.slug}`}>Learn more →</Link>
      </div>
    </article>
  );
}
