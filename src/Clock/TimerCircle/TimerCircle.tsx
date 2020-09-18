import { h } from 'preact'
import * as styles from './TimerCircle.m.css'

export function TimerCircle () {
  return (
    <div class={styles.timerContainer}>
      <svg class={styles.timer} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <g class={styles.timerCircle}>
          <circle class={styles.timerPathElapsed} cx='50' cy='50' r='45' />
        </g>
      </svg>
      <span class={styles.timerLabel}>
        30 min 59 sec
      </span>
    </div>
  )
}
