import "./App.css";
import SignalForm from "./components/SignalForm";
import SignalTable from "./components/SignalTable";

function App() {
  return (
    <div className="container">
      <h1>📈 Trading Signal Tracker</h1>

      <SignalForm />

      <SignalTable />
    </div>
  );
}

export default App;