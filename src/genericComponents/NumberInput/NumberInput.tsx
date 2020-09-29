import { h, JSX } from 'preact'
import * as styles from './NumberInput.m.css'

interface NumberInputProps {
  onInput?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void
  min?: number,
  max?: number,
  value?: number,
}

export function NumberInput (props: NumberInputProps) {
  return (
    <input
      class={styles.numberInput}
      onInput={props.onInput}
      min={props.min}
      max={props.max}
      value={props.value}
      type='number'
    />
  )
}
