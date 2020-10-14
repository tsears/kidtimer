import { h, JSX } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import NoSleep from 'nosleep.js'
import * as styles from './Clock.m.css'
import { TimerCircle } from './TimerCircle'
import { NumberInput, Button as buttonFn } from '@/genericComponents'
// @ts-ignore
import alarm from '@/assets/audio/alarm/alarm.mp3'

const noSleep = new NoSleep()

export function Clock () {
  const [hours, setHours] = useState<number | undefined>(0)
  const [minutes, setMinutes] = useState<number | undefined>(10)
  const [active, setActive] = useState<boolean>(false)
  const [userCancelled, setUserCancelled] = useState<boolean>(false)

  const audio = new Audio(alarm)

  const handleHoursChange =
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      setHours(parseInt(currentTarget.value))
    }

  const handleMinutesChange =
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      setMinutes(parseInt(currentTarget.value))
    }

  const disableNoSleep = () => {
    try {
      noSleep.disable()
    } catch {
      // it'll throw if there was never a sleep enabled.  drop it, we don't care
    }
  }

  const start = () => {
    setActive(true)
  }

  const stop = () => {
    setUserCancelled(true)
    setActive(false)
  }

  useEffect(() => {
    if (active) {
      noSleep.enable()
    } else {
      disableNoSleep()
    }
  }, [active])

  const countdownDone = () => {
    setActive(false)
    disableNoSleep()

    if (!userCancelled) {
      audio.play()
    }

    setUserCancelled(false)
  }

  const StartButton = buttonFn(styles.start)
  const StopButton = buttonFn(styles.stop)

  const getButton = () =>
    active ? <StopButton onClick={stop}>Stop</StopButton>
      : <StartButton onClick={start}>Start</StartButton>

  return (
    <div class={styles.clock}>
      <TimerCircle
        hours={hours}
        minutes={minutes}
        active={active}
        countdownDone={countdownDone}
      />
      <div class={styles.timerSettings}>
        Set timer for

        <NumberInput
          onInput={handleHoursChange}
          min={0}
        />

        hour(s) and

        <NumberInput
          onInput={handleMinutesChange}
          min={0}
          value={minutes}
        />

        minute(s)
      </div>
      <div class={styles.timerGo}>
        {getButton()}
      </div>
    </div>
  )
}
