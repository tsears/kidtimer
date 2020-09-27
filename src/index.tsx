import { h, render } from 'preact'
import './reset.css'
import './global.css'
import * as styles from './main.m.css'
// import generic components early so consumers are able to override styles
import './genericComponents'
import { Footer } from './Footer'
import { Clock } from './Clock'

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div')
  el.classList.add(styles.app)
  document.body.appendChild(el)

  render(
    <div class={styles.appContent}>
      <div class={styles.body}>
        <h1>Kid Timer!</h1>
        <div class={styles.clockContainer}>
          <Clock />
        </div>
      </div>
      <Footer />
    </div>
    , el)
})
