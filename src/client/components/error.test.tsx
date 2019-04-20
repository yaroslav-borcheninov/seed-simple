import React from "react"
import { render } from "react-testing-library"

import Error from "./error"

describe("Error", () => {
  it("should render", () => {
    expect(render(<Error />).container).toMatchSnapshot()
  })
})
