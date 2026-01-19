import { useMemo, useState } from "react";

type FormState = {
  name: string;
  agree: boolean;
  role: "student" | "teacher" | "guest";
};

export default function ControlledForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    agree: false,
    role: "student",
  });

  const nameError = useMemo(() => {
    const trimmed = form.name.trim();
    if (!trimmed) return "Ім'я обовʼязкове";
    if (trimmed.length < 2) return "Мінімум 2 символи";
    return "";
  }, [form.name]);

  const canSubmit = !nameError && form.agree;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    alert(
      `✅ Controlled submit:\nІм'я: ${form.name}\nРоль: ${form.role}\nЗгода: ${form.agree ? "так" : "ні"}`
    );

    setForm({ name: "", agree: false, role: "student" });
  }

  return (
    <section style={card}>
      <h2 style={h2}>ControlledForm (useState)</h2>

      <form onSubmit={onSubmit} style={stack}>
        <label style={label}>
          Ім&apos;я
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Введіть ім'я"
            style={input}
          />
        </label>

        {nameError ? <div style={errorText}>{nameError}</div> : null}

        <label style={label}>
          Роль
          <select
            value={form.role}
            onChange={(e) =>
              setForm((p) => ({ ...p, role: e.target.value as FormState["role"] }))
            }
            style={input}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="guest">Guest</option>
          </select>
        </label>

        <label style={{ ...label, flexDirection: "row", gap: 10, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => setForm((p) => ({ ...p, agree: e.target.checked }))}
          />
          Погоджуюсь з умовами
        </label>

        <button type="submit" disabled={!canSubmit} style={button(canSubmit)}>
          Надіслати
        </button>

        <small style={muted}>
          Кнопка активна лише коли ім&apos;я валідне і чекбокс увімкнений.
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

const errorText: React.CSSProperties = { color: "#b91c1c", fontSize: 14 };

const muted: React.CSSProperties = { color: "#6b7280" };

const button = (enabled: boolean): React.CSSProperties => ({
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #111827",
  cursor: enabled ? "pointer" : "not-allowed",
  opacity: enabled ? 1 : 0.5,
  background: "#111827",
  color: "#fff",
});
