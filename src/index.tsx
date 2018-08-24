import { initializeIcons } from "office-ui-fabric-react/lib/Icons"
import { loadTheme } from "office-ui-fabric-react/lib/Styling"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Board from "./Board"
import Header from "./Header"
import "./index.css"
import reducers from "./reducers"
import registerServiceWorker from "./registerServiceWorker"

initializeIcons(/* optional base url */)

loadTheme({
  fonts: { medium: { fontFamily: "sans-serif" } },
  palette: {
    themePrimary: "#ffa000",
    themeDarker: "#ffa000",
    themeDark: "#ffa000",
    themeDarkAlt: "#ffa000",
    neutralPrimary: "#ffffff",
    neutralLight: "#191b22",
  },
  semanticColors: {
    bodyBackground: "#313543",
    menuItemBackgroundHovered: "#292d37",
  },
})

const store = createStore(reducers, window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]())

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <>
      <Header />
      <Board />
    </>
  </Provider>,
  document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
