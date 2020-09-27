import { h } from 'preact'
import * as styles from './TimeReadout.m.css'

interface TimeReadoutProps {
  endTime: number
}

export function TimeReadout (props: TimeReadoutProps) {
  const getHumanReadableTime = (): string => {
    let humanMinutes: string
    let humanSeconds: string

    if (props.endTime === 0) {
      humanMinutes = '0'
      humanSeconds = '00'
    } else {
      // re-calc mins/secs remaining...
      const msRemaining = props.endTime - Date.now()
      const secondsRemaining = Math.floor(msRemaining / 1000)
      const minutesRemaining = Math.floor(secondsRemaining / 60)
      const fractionalSecondsRemaining = secondsRemaining % 60

      humanMinutes = minutesRemaining.toString()
      humanSeconds = fractionalSecondsRemaining < 10
        ? `0${fractionalSecondsRemaining}`
        : fractionalSecondsRemaining.toString()
    }
    return `${humanMinutes} min ${humanSeconds} sec`
  }

  return (
    <div class={styles.timeReadout}>{getHumanReadableTime()}</div>
  )
}
