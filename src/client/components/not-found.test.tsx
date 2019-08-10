import React from "react"
import { render } from "@testing-library/react"

import NotFound from "./not-found"

describe("NotFound", () => {
  it("should render", () => {
    expect(render(<NotFound />).container).toMatchSnapshot()
  })
})
