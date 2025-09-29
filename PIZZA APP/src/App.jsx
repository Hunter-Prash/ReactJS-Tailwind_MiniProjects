import React, { useState } from 'react'

const App = () => {
  const [toggle, setToggle] = useState(false)
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false) // track if interval is active

  const handleClick = () => {
    const temp = !toggle
    setRunning(true) // batched

    if (temp === true) {
      let id = setInterval(() => {
        setCount(prev => {
          if (prev === 5) {
            clearInterval(id)
            setRunning(false)
          } else prev = prev + 1
          return prev
        })
      }, 1000)
    }
    else if (temp === false) {
      let id = setInterval(() => {
        setCount(prev => {
          if (prev === 0) {
            clearInterval(id)
            setRunning(false) // enable button again
          } else prev = prev - 1
          return prev
        })
      }, 1000)
    }
    setToggle(!toggle)//batched
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f4f4f4" }}>
      <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "20px" }}>{count}</h2>
      <button
        onClick={handleClick}
        disabled={running} // 🔥 disable when running
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          background: running ? "#aaa" : "#007bff",
          color: "white",
          cursor: running ? "not-allowed" : "pointer"
        }}
      >
        {running ? "Running..." : "Click"}
      </button>
    </div>
  )
}

export default App
