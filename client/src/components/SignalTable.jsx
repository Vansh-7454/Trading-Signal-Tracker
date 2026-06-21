import { useEffect, useState } from "react";
import api from "../services/api";

function SignalTable() {
  const [signals, setSignals] = useState([]);

  // Fetch all signals
  const fetchSignals = async () => {
    try {
      const res = await api.get("/signals");

      const updatedSignals = await Promise.all(
        res.data.map(async (signal) => {
          const statusRes = await api.get(`/signals/${signal.id}/status`);
          return statusRes.data;
        })
      );

      setSignals(updatedSignals);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete signal
  const deleteSignal = async (id) => {
    try {
      await api.delete(`/signals/${id}`);
      alert("Signal Deleted Successfully");
      fetchSignals();
    } catch (error) {
      console.error(error);
      alert("Error deleting signal");
    }
  };

  useEffect(() => {
    fetchSignals();

    const interval = setInterval(fetchSignals, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Signal Dashboard</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Direction</th>
            <th>Entry</th>
            <th>Target</th>
            <th>Stop Loss</th>
            <th>Status</th>
            <th>Current Price</th>
            <th>ROI (%)</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {signals.map((signal) => (
            <tr key={signal.id}>
              <td>{signal.symbol}</td>
              <td>{signal.direction}</td>
              <td>{signal.entry_price}</td>
              <td>{signal.target_price}</td>
              <td>{signal.stop_loss}</td>
              <td
  className={
    signal.status === "OPEN"
      ? "status-open"
      : signal.status === "TARGET_HIT"
      ? "status-target"
      : signal.status === "STOPLOSS_HIT"
      ? "status-stop"
      : "status-expired"
  }
>
  {signal.status}
</td>
              <td>{signal.current_price ?? "-"}</td>
              <td>{signal.realized_roi ?? "-"}</td>
              <td>
                <button
 
  className="delete-btn"
  onClick={() => deleteSignal(signal.id)}
>
  Delete
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SignalTable;