import styled, { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: sans-serif;
    margin: 0;
  }
`

export const Container = styled.div`
  height: 100vh;
  padding: 20px;
`

export const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
