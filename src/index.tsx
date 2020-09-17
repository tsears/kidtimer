import { h, render } from 'preact'
import './index.html'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)

  render(<p>Hello World (preact)</p>, el)
})
