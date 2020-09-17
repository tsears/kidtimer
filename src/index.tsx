import { h, render } from 'preact'
import './reset.css'
import './global.css'
import * as styles from './main.m.css'
import { Footer } from './Footer'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div')
  el.classList.add(styles.app)
  document.body.appendChild(el)

  render(
    <div class={styles.appContent}>
      <div class={styles.body}>
        <h1>Kid Timer!</h1>
        <h2>Help your kids know when time is up</h2>
      </div>
      <Footer />
    </div>
    , el)
})
