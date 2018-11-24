import React from "react"

import Strings from "../../shared/strings"

type State = {
  show: boolean
}

class Loader extends React.Component {
  timeoutId?: number

  state: State = {
    show: false,
  }

  showLoader = () => {
    this.setState({ show: true })
  }

  componentDidMount() {
    this.timeoutId = window.setTimeout(this.showLoader, 1000)
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeoutId)
  }

  render() {
    return !this.state.show ? null : <div>{Strings["common.loading"]}</div>
  }
}

export default Loader
