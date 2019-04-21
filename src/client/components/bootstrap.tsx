import React, { useState, useEffect } from "react"

import Loader from "./loader"
import Error from "./error"

type Props<T> = {
  url: string
  children(props: T): React.ReactElement
}

type State<T> = {
  loading: boolean
  error: boolean
  data: T | null
}

const useBootstrapState = <T extends {}>(url: string) => {
  const [state, setState] = useState<State<T>>({
    loading: false,
    error: false,
    data: null,
  })

  const setLoading = () => {
    setState({
      loading: true,
      error: false,
      data: null,
    })
  }

  const setData = (data: T) => {
    setState({
      loading: false,
      error: false,
      data,
    })
  }

  const setError = () => {
    setState({
      loading: false,
      error: true,
      data: null,
    })
  }

  const fetchData = async () => {
    setLoading()

    try {
      const response = await fetch(url)

      if (response.ok) {
        const data: T = await response.json()
        setData(data)
      } else {
        setError()
      }
    } catch {
      setError()
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return state
}

const Bootstrap = <T extends {}>(props: Props<T>) => {
  const state = useBootstrapState<T>(props.url)

  return state.loading ? (
    <Loader />
  ) : state.error ? (
    <Error />
  ) : !state.data ? null : (
    props.children(state.data)
  )
}

export default Bootstrap
