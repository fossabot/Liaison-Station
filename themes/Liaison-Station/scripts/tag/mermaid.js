/**
 * AnZhiYu
 * mermaid
 * https://github.com/mermaid-js/Liaison-Stationmermaid
 */

'use strict'

const { escapeHTML } = require('hexo-util')

function mermaid (args, content) {
  return `<div class="mermaid-wrap"><pre class="mermaid-src" hidden>
  ${escapeHTML(content)}
  </pre></div>`
}

hexo.extend.tag.register('mermaid', mermaid, { ends: true })
