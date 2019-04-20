import React from "react"
import { render } from "react-testing-library"

import NotFound from "./not-found"

describe("NotFound", () => {
  it("should render", () => {
    expect(render(<NotFound />).container).toMatchSnapshot()
  })
})
