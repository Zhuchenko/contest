import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

const template = (props) => {
  const { assetsRoot, username } = props

  const config = { username }

  return (
    `<!doctype html>
    <html lang="ru" class="html">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Contest</title>
      </head>
      <body>
        <div id="root">
        </div>                      
        <script type="text/javascript">
         window['APP_CONFIG'] = ${JSON.stringify(config)}
        </script>
        <script async type="text/javascript" src="${assetsRoot + 'vendors.js'}"></script>
        <script async type="text/javascript" src="${assetsRoot + 'main.js'}"></script>
      </body>
    </html>`
  )
}

export default template