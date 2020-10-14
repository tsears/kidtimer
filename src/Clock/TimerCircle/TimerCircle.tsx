import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import * as styles from './TimerCircle.m.css'
import { TimeReadout } from './TimeReadout'
import { TimeRing } from './TimeRing'
// @ts-ignore
import tick from '@/assets/audio/tick/tick.mp3'

interface TimerSettings {
  hours: number
  minutes: number
  active: boolean
  countdownDone: () => void
}

const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000

const durationInMs = (hours: number, minutes:number): number => {
  const durationHours = hours || 0
  const durationMinutes = minutes || 0

  return (
    (durationHours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND) + // eslint-disable-line max-len
    (durationMinutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
  )
}

export function TimerCircle (props: TimerSettings) {
  const audio = new Audio(tick)
  audio.volume = 0.1

  const [lastTick, setLastTick] = useState<number>(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [percentRemaining, setPercentRemaining] = useState<number>(1)
  const reset = () => {
    setIsActive(false)
    setStartTime(0)
    setEndTime(0)
    setPercentRemaining(100)
    setLastTick(0)
    audio.load() // stop playback
  }

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        if (Date.now() > endTime || !isActive) {
          setIsActive(false)
          return
        }
        // re-calc percent remaining
        const fullInterval = (endTime - startTime)
        const remainingFraction = (endTime - Date.now()) / fullInterval
        setPercentRemaining(
          remainingFraction - ((1 / fullInterval) * (1 - remainingFraction))
        )

        if (Date.now() - lastTick > 900) {
          audio.load()
          audio.play()
          setLastTick(Date.now())
        }
      }, 1000)
    } else {
      clearInterval(interval)
      props.countdownDone()
      reset()
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
    } else {
      setIsActive(false)
      reset()
    }
  }, [props.active])

  return (
    <div class={styles.timerContainer}>
      <TimeRing percentRemaining={percentRemaining} />
      <span class={styles.timerLabel}>
        <TimeReadout endTime={endTime} />
      </span>
    </div>
  )
}
