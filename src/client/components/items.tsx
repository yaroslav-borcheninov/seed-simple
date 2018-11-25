import React from "react"
import { Link } from "react-router-dom"

import Bootstrap from "./bootstrap"
import { Item } from "../../shared/models"
import { H1 } from "../styled"
import Strings from "../../shared/strings"

const Items = () => (
  <Bootstrap<Item[]> url="/api/items">
    {items => (
      <React.Fragment>
        <H1>{Strings["items.title"]}</H1>
        <ul>
          {items.map(i => (
            <li key={i.id}>
              <Link to={`/items/${i.id}`}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )}
  </Bootstrap>
)

export default Items
