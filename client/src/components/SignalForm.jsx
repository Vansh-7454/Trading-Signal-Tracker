import { useState } from "react";
import api from "../services/api";

function SignalForm() {
  const [form, setForm] = useState({
    symbol: "",
    direction: "BUY",
    entry_price: "",
    stop_loss: "",
    target_price: "",
    entry_time: "",
    expiry_time: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/signals", form);
      alert(res.data.message);

      setForm({
        symbol: "",
        direction: "BUY",
        entry_price: "",
        stop_loss: "",
        target_price: "",
        entry_time: "",
        expiry_time: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="symbol"
        placeholder="BTCUSDT"
        value={form.symbol}
        onChange={handleChange}
        required
      />

      <select
        name="direction"
        value={form.direction}
        onChange={handleChange}
      >
        <option value="BUY">BUY</option>
        <option value="SELL">SELL</option>
      </select>

      <input
        type="number"
        name="entry_price"
        placeholder="Entry Price"
        value={form.entry_price}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="stop_loss"
        placeholder="Stop Loss"
        value={form.stop_loss}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="target_price"
        placeholder="Target Price"
        value={form.target_price}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="entry_time"
        value={form.entry_time}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="expiry_time"
        value={form.expiry_time}
        onChange={handleChange}
        required
      />

      <br /><br />

      <button type="submit">
        Create Signal
      </button>
    </form>
  );
}

export default SignalForm;