import React from "react"
import { Link } from "react-router-dom"

import Bootstrap from "./bootstrap"
import { Item } from "../../shared/models"

const Items = () => (
  <Bootstrap<Item[]> url="/api/items">
    {items => (
      <ul>
        {items.map(i => (
          <li key={i.id}>
            <Link to={`/items/${i.id}`}>{i.title}</Link>
          </li>
        ))}
      </ul>
    )}
  </Bootstrap>
)

export default Items
