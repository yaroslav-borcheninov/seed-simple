import React from "react"
import { shallow, ShallowWrapper } from "enzyme"

import Bootstrap from "./bootstrap"
import Items from "./items"

jest.mock("./bootstrap", () => () => null)

describe("Items", () => {
  let component: ShallowWrapper

  beforeEach(() => {
    component = shallow(<Items />)
  })

  it("should pass url to Bootstrap", () => {
    expect(component.find(Bootstrap).prop("url")).toEqual("/api/items")
  })

  it("should render data", () => {
    expect(
      component.find(Bootstrap).prop("children")([
        {
          id: "123",
          title: "item 123",
        },
        {
          id: "321",
          title: "item 321",
        },
      ])
    ).toMatchSnapshot()
  })
})
