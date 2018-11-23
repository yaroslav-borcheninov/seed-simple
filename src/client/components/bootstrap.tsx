import React from "react"

import Loader from "./loader"
import Error from "./error"

export type Props<T> = {
  url: string
  children(props: T): React.ReactNode
}

export type State<T> = {
  loading: boolean
  error: boolean
  data: T | null
}

class Bootstrap<T> extends React.Component<Props<T>, State<T>> {
  mounted: boolean = false

  state: State<T> = {
    loading: false,
    error: false,
    data: null,
  }

  setLoading = () => {
    this.safeSetState({
      loading: true,
      error: false,
      data: null,
    })
  }

  setData = (data: T) => {
    this.safeSetState({
      loading: false,
      error: false,
      data,
    })
  }

  setError = () => {
    this.safeSetState({
      loading: false,
      error: true,
      data: null,
    })
  }

  safeSetState(state: State<T>) {
    if (!this.mounted) {
      return
    }
    this.setState(state)
  }

  async componentDidMount() {
    this.mounted = true
    this.setLoading()

    try {
      const response = await fetch(this.props.url)

      if (response.ok) {
        const data: T = await response.json()
        this.setData(data)
      } else {
        this.setError()
      }
    } catch (_) {
      this.setError()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { loading, error, data } = this.state

    return loading ? (
      <Loader />
    ) : error ? (
      <Error />
    ) : !data ? null : (
      this.props.children(data)
    )
  }
}

export default Bootstrap
