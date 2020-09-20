import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import * as styles from './TimerCircle.m.css'

interface TimerSettings {
  hours: number
  minutes: number
  active: boolean
}

interface HumanTimeRemaining {
  minutes: string
  seconds: string
}

const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000
const FULL_DASH_ARRAY = 284

const durationInMs = (hours: number, minutes:number): number => {
  const durationHours = hours || 0
  const durationMinutes = minutes || 0

  return (
    (durationHours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND) + // eslint-disable-line max-len
    (durationMinutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
  )
}

export function TimerCircle (props: TimerSettings) {
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [percentRemaining, setPercentRemaining] = useState<number>(1)
  const [humanTimeRemaining, setHumanTimeRemaining] =
    useState<HumanTimeRemaining>({
      minutes: '0',
      seconds: '0',
    })

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        if (Date.now() > endTime) {
          setIsActive(false)
          return
        }
        // re-calc percent remaining
        setPercentRemaining(
          (endTime - Date.now()) / (endTime - startTime)
        )

        // re-calc mins/secs remaining...
        const msRemaining = endTime - Date.now()
        const secondsRemaining = Math.floor(msRemaining / 1000)
        const minutesRemaining = Math.floor(secondsRemaining / 60)
        const fractionalSecondsRemaining = secondsRemaining % 60

        setHumanTimeRemaining({
          minutes: minutesRemaining.toString(),
          seconds: fractionalSecondsRemaining < 10
            ? `0${fractionalSecondsRemaining}`
            : fractionalSecondsRemaining.toString(),
        })
      }, 1000)
    } else {
      clearInterval(interval)
      setIsActive(false)
      setStartTime(0)
      setEndTime(0)
      setPercentRemaining(100)
      setHumanTimeRemaining({
        minutes: '0',
        seconds: '0',
      })
    }
    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    if (props.active) {
      setIsActive(true)
      setStartTime(Date.now())
      setEndTime(
        Date.now() + durationInMs(props.hours, props.minutes)
      )
    }
  }, [props.active])

  return (
    <div class={styles.timerContainer}>
      <svg class={styles.timer} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <g class={styles.timerCircle}>
          <circle class={styles.timerPathElapsed} cx='50' cy='50' r='45' />
          <path
            id='base-timer-path-remaining'
            stroke-dasharray={
              `${Math.floor(percentRemaining * FULL_DASH_ARRAY)} ${FULL_DASH_ARRAY}`
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
      <span class={styles.timerLabel}>
        {humanTimeRemaining.minutes} min {humanTimeRemaining.seconds} sec
      </span>
    </div>
  )
}
