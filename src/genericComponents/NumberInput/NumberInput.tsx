import { h, JSX } from 'preact'
import * as styles from './NumberInput.m.css'

interface NumberInputProps {
  onInput?: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void
}

export function NumberInput (props: NumberInputProps) {
  return (
    <input class={styles.numberInput} onInput={props.onInput} type='number' />
  )
}
