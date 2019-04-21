import React, { useState, useEffect } from "react"

import { Center } from "../styled"
import Strings from "../../shared/strings"

const Loader = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShow(true), 1000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return !show ? null : <Center>{Strings["common.loading"]}</Center>
}

export default Loader
