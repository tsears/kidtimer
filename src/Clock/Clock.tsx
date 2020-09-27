import { h, JSX } from 'preact'
import { useState } from 'preact/hooks'
import * as styles from './Clock.m.css'
import { TimerCircle } from './TimerCircle'
import { NumberInput, Button as buttonFn } from '@/genericComponents'

export function Clock () {
  const [hours, setHours] = useState<number | undefined>(0)
  const [minutes, setMinutes] = useState<number | undefined>(0)
  const [active, setActive] = useState<boolean>(false)

  const handleHoursChange =
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      setHours(parseInt(currentTarget.value))
    }

  const handleMinutesChange =
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      setMinutes(parseInt(currentTarget.value))
    }

  const toggle = () => {
    setActive(!active)
  }

  const StartButton = buttonFn(styles.start)
  const StopButton = buttonFn(styles.stop)

  const getButton = () =>
    active ? <StopButton onClick={toggle}>Stop</StopButton>
      : <StartButton onClick={toggle}>Start</StartButton>

  return (
    <div class={styles.clock}>
      <TimerCircle
        hours={hours}
        minutes={minutes}
        active={active}
        countdownDone={toggle}
      />
      <div class={styles.timerSettings}>
        Set timer for <NumberInput onInput={handleHoursChange} /> hour(s) and
        <NumberInput onInput={handleMinutesChange} /> minute(s)
      </div>
      <div class={styles.timerGo}>
        {getButton()}
      </div>
    </div>
  )
}
