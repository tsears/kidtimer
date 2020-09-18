import { h } from 'preact'
import * as styles from './NumberInput.m.css'

export function NumberInput () {
  return (
    <input class={styles.numberInput} type='number' />
  )
}
