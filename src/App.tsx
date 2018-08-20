import * as React from "react"
import "./App.css"

class App extends React.Component {
  public render() {
    const columns = ["Backlog", "In progress", "Needs review", "Done"]

    return (
      <div className="App">
        {columns.map((col) => (
          <div className={`col col-${col}`} key={col}>
            <div className="header">{col}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default App
