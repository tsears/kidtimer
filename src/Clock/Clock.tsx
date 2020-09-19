import { h } from 'preact'
import * as styles from './Clock.m.css'
import { TimerCircle } from './TimerCircle'
import { NumberInput, Button } from '@/genericComponents'

export function Clock () {
  return (
    <div class={styles.clock}>
      <TimerCircle />
      <div class={styles.timerSettings}>
        Set timer for <NumberInput /> hour and <NumberInput /> minute(s)
      </div>
      <div class={styles.timerGo}>
        <Button text='Start' color='dark' />
      </div>
    </div>
  )
}
