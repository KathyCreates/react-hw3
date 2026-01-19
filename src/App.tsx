import ControlledForm from "./components/ControlledForm";
import UncontrolledForm from "./components/UncontrolledForm";
import FetchData from "./components/FetchData";
import "./index.css";

export default function App() {
  return (
    <div style={page}>
      <header style={header}>
        <h1 style={{ margin: 0 }}>React Forms: Controlled vs Uncontrolled + Fetch</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
          TSX • useState • useRef • useEffect • async/await
        </p>
      </header>

      <main style={grid}>
        <ControlledForm />
        <UncontrolledForm />
        <FetchData />
      </main>

      <footer style={footer}>
        <small style={{ color: "#6b7280" }}>© {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f3f4f6",
  padding: 20,
};

const header: React.CSSProperties = {
  maxWidth: 980,
  margin: "0 auto 16px",
  padding: 16,
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
};

const grid: React.CSSProperties = {
  maxWidth: 980,
  margin: "0 auto",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr",
};

const footer: React.CSSProperties = {
  maxWidth: 980,
  margin: "16px auto 0",
  textAlign: "center",
};
