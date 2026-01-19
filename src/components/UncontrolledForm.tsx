import { useRef, useState } from "react";

export default function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const agreeRef = useRef<HTMLInputElement | null>(null);

  const [result, setResult] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = nameRef.current?.value ?? "";
    const agree = agreeRef.current?.checked ?? false;

    setResult(`Uncontrolled submit: ім'я="${name}", згода=${agree ? "так" : "ні"}`);

    // (необов’язково) очистити DOM-значення вручну:
    if (nameRef.current) nameRef.current.value = "";
    if (agreeRef.current) agreeRef.current.checked = false;
  }

  return (
    <section style={card}>
      <h2 style={h2}>UncontrolledForm (useRef)</h2>

      <form onSubmit={onSubmit} style={stack}>
        <label style={label}>
          Ім&apos;я
          <input ref={nameRef} placeholder="Введіть ім'я" style={input} />
        </label>

        <label style={{ ...label, flexDirection: "row", gap: 10, alignItems: "center" }}>
          <input ref={agreeRef} type="checkbox" />
          Погоджуюсь з умовами
        </label>

        <button type="submit" style={button}>
          Надіслати
        </button>

        {result ? <div style={resultBox}>{result}</div> : null}

        <small style={muted}>
          Тут React не контролює value/checked — ми читаємо значення з DOM через refs.
        </small>
      </form>
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

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };

const label: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 6 };

const input: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  outline: "none",
};

const muted: React.CSSProperties = { color: "#6b7280" };

const button: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #111827",
  cursor: "pointer",
  background: "#111827",
  color: "#fff",
};

const resultBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 10,
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
};
