import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

type LoadState = "idle" | "loading" | "success" | "error";

export default function FetchData() {
  const [state, setState] = useState<LoadState>("idle");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setState("loading");
        setError("");

        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as Post[];
        if (!isMounted) return;

        setPosts(data);
        setState("success");
      } catch (e) {
        if (!isMounted) return;

        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
        setState("error");
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section style={card}>
      <h2 style={h2}>FetchData (useEffect + async)</h2>

      {state === "loading" ? <p>Завантаження...</p> : null}

      {state === "error" ? (
        <div style={errorBox}>
          <strong>Помилка:</strong> {error}
        </div>
      ) : null}

      {state === "success" ? (
        <ul style={list}>
          {posts.map((p) => (
            <li key={p.id} style={item}>
              <strong>{p.title}</strong>
              <p style={{ margin: "6px 0 0" }}>{p.body}</p>
            </li>
          ))}
        </ul>
      ) : null}

      {state === "idle" ? <p>Очікую запуск...</p> : null}
    </section>
  );
}

const card: React.CSSProperties = {
  padding: 16,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  background: "#fff",
};

const h2: React.CSSProperties = { margin: 0, marginBottom: 12 };

const errorBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 10,
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#991b1b",
};

const list: React.CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 10 };

const item: React.CSSProperties = {
  padding: 12,
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  background: "#f9fafb",
};
