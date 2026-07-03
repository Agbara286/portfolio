import React, { useState, useEffect, useMemo } from "react";

interface Post {
  id: string;
  title: string;
  created_at: string;
  content: string;
}

function readEnv(key: string) {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch (_) {}
  return undefined;
}

const DEMO_POSTS: Post[] = [
  {
    id: "auth-middleware-rewrite",
    title: "Rewrote the auth middleware, again",
    created_at: "2026-06-24T10:00:00Z",
    content:
      "Third rewrite this year. The old version bolted refresh-token rotation onto session middleware that was never designed for it, so every edge case became a special-cased if-statement.\n\nThis pass separates the two concerns entirely: a thin session layer that only knows about cookies, and a token service that owns rotation, revocation, and clock skew.\n\nThe result is about 40% less code, but more importantly it's code I can explain in one sentence per module.",
  },
  {
    id: "queue-backpressure",
    title: "Notes on why the queue kept backing up",
    created_at: "2026-06-18T10:00:00Z",
    content:
      "Turned out it wasn't the workers. Consumer count was fine, throughput per worker was fine, but the producer had no backpressure signal at all — it just kept publishing regardless of queue depth.\n\nAdded a simple watermark: past 5k pending jobs, producers start blocking on publish instead of firing and forgetting. Ugly, but it converts an invisible failure into a visible, boring slowdown.\n\nNext step is proper credit-based flow control, but this bought us the weekend.",
  },
];

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(1, Math.round((now - then) / 1000));
  const units: [string, number][] = [
    ["y", 31536000],
    ["mo", 2592000],
    ["d", 86400],
    ["h", 3600],
    ["m", 60],
  ];
  for (const [label, secs] of units) {
    const v = Math.floor(diffSec / secs);
    if (v >= 1) return `${v}${label} ago`;
  }
  return "just now";
}

interface PortfolioBlogProps {
  apiUrl?: string;
  apiKey?: string;
}

export default function PortfolioBlog({ apiUrl, apiKey }: PortfolioBlogProps) {
  const resolvedUrl = apiUrl || readEnv("VITE_SAINT_CMS_URL");
  const resolvedKey = apiKey || readEnv("VITE_SAINT_CMS_KEY");

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingDemo, setUsingDemo] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      if (!resolvedUrl) {
        if (!cancelled) {
          setPosts(DEMO_POSTS);
          setUsingDemo(true);
          setIsLoading(false);
        }
        return;
      }

      try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (resolvedKey) headers["Authorization"] = `Bearer ${resolvedKey}`;

        const response = await fetch(resolvedUrl, { method: "GET", headers });
        
        if (!response.ok) {
          throw new Error(`Saint CMS responded with ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          const rawArray = Array.isArray(data) ? data : (data.data || data.content || []);
          
          if (rawArray.length > 0) {
            const sanitizedPosts = rawArray.map((post: any) => ({
              ...post,
              id: String(post.id),
            }));
            setPosts(sanitizedPosts);
            setUsingDemo(false);
          } else {
            setPosts(DEMO_POSTS);
            setUsingDemo(true);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setPosts(DEMO_POSTS);
          setUsingDemo(true);
          setIsLoading(false);
        }
      }
    }

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [resolvedUrl, resolvedKey]);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [posts]
  );

  const active = sorted.find((p) => p.id === selectedId) || sorted[0];

  return (
    <section className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-2xl font-sans text-zinc-100">
      
      {/* Clean Header */}
      <div className="p-8 border-b border-zinc-800 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white m-0">Engineering Log</h1>
        <span className="text-sm text-zinc-500 font-mono tracking-wide">
          {sorted.length > 0 ? `${sorted.length} ENTRIES` : "LOADING"}
        </span>
      </div>

      {usingDemo && !isLoading && (
        <div className="mx-8 mt-6 p-4 border border-zinc-800 bg-zinc-950 rounded-lg text-sm text-zinc-400">
          Viewing preview data. Connect your Saint CMS endpoint via Vite environment variables to go live.
        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-[500px]">
        
        
        <div className="border-b md:border-b-0 md:border-r border-zinc-800 p-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-md bg-zinc-900 animate-pulse mb-2" />
            ))
          ) : sorted.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">No entries found.</div>
          ) : (
            sorted.map((post) => {
              const isActive = active && post.id === active.id;
              return (
                <button
                  key={post.id}
                  className={`w-full text-left p-4 rounded-md cursor-pointer mb-1 transition-colors duration-150 ${
                    isActive 
                      ? "bg-zinc-900 border-l-2 border-white" 
                      : "bg-transparent border-l-2 border-transparent hover:bg-zinc-900/50"
                  }`}
                  onClick={() => setSelectedId(post.id)}
                >
                  <div className="text-zinc-500 text-xs mb-1.5 uppercase tracking-wider font-mono">
                    {relativeTime(post.created_at)}
                  </div>
                  <div className={`text-sm leading-snug font-medium ${isActive ? "text-white" : "text-zinc-300"}`}>
                    {post.title}
                  </div>
                </button>
              );
            })
          )}
        </div>

       
        <div className="p-8 md:p-12 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent bg-[#050505]">
          {isLoading ? (
             <div className="h-48 rounded-md bg-zinc-900 animate-pulse" />
          ) : !active ? (
            <div className="flex h-full items-center justify-center text-zinc-500 text-sm">
              Select an entry to read.
            </div>
          ) : (
            <article className="max-w-2xl">
              <header className="mb-10">
                <time className="text-zinc-500 text-sm font-mono tracking-wide uppercase">
                  {new Date(active.created_at).toLocaleDateString(undefined, { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </time>
                <h2 className="text-3xl font-semibold text-white mt-3 leading-tight tracking-tight">
                  {active.title}
                </h2>
              </header>
              
              <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
                {(active.content || "").split("\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}