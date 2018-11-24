import React from "react"
import { RouteComponentProps } from "react-router-dom"

import Bootstrap from "./bootstrap"
import { Item as ItemModel } from "../../shared/models"
import { H1 } from "../styled"
import Strings from "../../shared/strings"

type Props = {
  id: string
}

const Item = ({ match }: RouteComponentProps<Props>) => (
  <Bootstrap<ItemModel> url={`/api/items/${match.params.id}`}>
    {item => (
      <React.Fragment>
        <H1>{Strings["items.title"]}</H1>
        <div>
          {item.id}: {item.title}
        </div>
      </React.Fragment>
    )}
  </Bootstrap>
)

export default Item
