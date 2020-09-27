import { h } from 'preact'
import * as styles from './TimeRing.m.css'

interface TimeRingProps {
  percentRemaining: number
}

// The circumference of a circle with radius 45
const FULL_CIRCLE_LENGTH = (2 * Math.PI * 45)

const getCircleLength = (percentRemaining: number): number => {
  return Math.floor(percentRemaining * FULL_CIRCLE_LENGTH) - 1
}

export function TimeRing (props: TimeRingProps) {
  return (
    <svg class={styles.timer} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <g class={styles.timerCircle}>
        <circle class={styles.timerPathElapsed} cx='50' cy='50' r='45' />
        <path
          id='base-timer-path-remaining'
          stroke-dasharray={
            `${getCircleLength(props.percentRemaining)} ${FULL_CIRCLE_LENGTH}`
          }
          class={[styles.pathRemaining, styles.remainingPathColor].join(' ')}
          d='
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          '
        />
      </g>
    </svg>
  )
}
