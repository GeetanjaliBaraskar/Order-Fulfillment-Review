import { useEffect, useState } from "react";

function App() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch Orders
  useEffect(() => {

    fetch("http://127.0.0.1:8000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));

  }, []);

  // Review Button
  const markReviewed = async (id) => {

    await fetch(`http://127.0.0.1:8000/review/${id}`, {
      method: "PUT",
    });

    const updatedOrders = orders.map((item) => {

      if (item.id === id) {
        item.reviewed = true;
      }

      return item;
    });

    setOrders(updatedOrders);
  };

  // Search + Filter
  const filteredOrders = orders.filter((item) => {

    const customer =
      item.order?.customer?.toLowerCase() || "";

    const matchesSearch =
      customer.includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all"
        ? true
        : item.match === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: "20px" }}>

      <h1>Order Review Dashboard</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search customer or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

      <br />

      {/* Filter Buttons */}
      <button onClick={() => setFilter("all")}>
        All
      </button>

      <button onClick={() => setFilter("full")}>
        Full
      </button>

      <button onClick={() => setFilter("partial")}>
        Partial
      </button>

      <button onClick={() => setFilter("order_only")}>
        Order Only
      </button>

      <button onClick={() => setFilter("delivery_only")}>
        Delivery Only
      </button>

      <hr />

      {/* Orders */}
      {
        filteredOrders.map((item) => (

          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor:
                item.match === "full"
                  ? "#d4edda"
                  : "#f8d7da",
            }}
          >

            <h2>{item.id}</h2>

            <p>
              <b>Customer:</b>{" "}
              {
                item.order
                  ? item.order.customer
                  : "No Order"
              }
            </p>

            <p>
              <b>Match:</b>{" "}
              {item.match}
            </p>

            <p>
              <b>Confidence:</b>{" "}
              {item.confidence}
            </p>

            <p>
              <b>Carrier:</b>{" "}
              {
                item.delivery
                  ? item.delivery.carrier
                  : "No Delivery"
              }
            </p>

            <p>
              <b>Status:</b>{" "}
              {
                item.delivery
                  ? item.delivery.status
                  : "Pending"
              }
            </p>

            <p>
              <b>Reviewed:</b>{" "}
              {
                item.reviewed
                  ? "Yes"
                  : "No"
              }
            </p>

            <button
              onClick={() => markReviewed(item.id)}
            >
              Mark Reviewed
            </button>

          </div>

        ))
      }

    </div>
  );
}

export default App;