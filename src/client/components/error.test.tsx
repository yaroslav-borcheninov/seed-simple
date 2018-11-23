import React from "react"
import { shallow } from "enzyme"

import Error from "./error"

describe("Error", () => {
  it("should render", () => {
    expect(shallow(<Error />)).toMatchSnapshot()
  })
})
