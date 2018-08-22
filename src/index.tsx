import * as React from "react"
import * as ReactDOM from "react-dom"
import Board from "./Board"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import Header from "./Header"
import { initializeIcons } from "office-ui-fabric-react/lib/Icons"

import { IconContext } from "react-icons"
import { loadTheme } from "office-ui-fabric-react/lib/Styling"

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

ReactDOM.render(
  <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
    <Header />
    <Board />
  </IconContext.Provider>,
  document.getElementById("root") as HTMLElement,
)
registerServiceWorker()
