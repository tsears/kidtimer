import { h, render } from 'preact'
import 'reset.css'
import 'global.css'
import * as styles from './main.m.css'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)

  render(<p class={styles.app}>Hello World (preact)</p>, el)
})
