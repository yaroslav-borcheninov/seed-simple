import React from "react"
import { shallow, ShallowWrapper } from "enzyme"

import Bootstrap from "./bootstrap"
import Item from "./item"

jest.mock("./bootstrap", () => () => null)

describe("Item", () => {
  let component: ShallowWrapper

  beforeEach(() => {
    const props = {
      match: { params: { id: "123" } },
    }
    component = shallow(<Item {...props as any} />)
  })

  it("should pass url to Bootstrap", () => {
    expect(component.find(Bootstrap).prop("url")).toEqual("/api/items/123")
  })

  it("should render data", () => {
    expect(
      component.find(Bootstrap).prop("children")({
        id: "123",
        title: "item 123",
      })
    ).toMatchSnapshot()
  })
})
