import React from "react"
import { render } from "@testing-library/react"

import Error from "./error"

describe("Error", () => {
  it("should render", () => {
    expect(render(<Error />).container).toMatchSnapshot()
  })
})
