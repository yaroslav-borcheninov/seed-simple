import React from "react"
import { RouteComponentProps } from "react-router-dom"

import Bootstrap from "./bootstrap"
import { Item as ItemModel } from "../../shared/models"

type Props = {
  id: string
}

const Item = ({ match }: RouteComponentProps<Props>) => (
  <Bootstrap<ItemModel> url={`/api/items/${match.params.id}`}>
    {item => (
      <div>
        {item.id}: {item.title}
      </div>
    )}
  </Bootstrap>
)

export default Item
