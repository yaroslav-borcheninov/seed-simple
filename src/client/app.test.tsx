import App from "./app"

jest.mock("./components/bootstrap", () => () => null)

describe("App", () => {
  it("should render", () => {
    expect(App).toMatchSnapshot()
  })
})
