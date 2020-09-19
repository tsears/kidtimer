import { h } from 'preact'
import * as styles from './Button.m.css'
import { classList } from '../utils'

interface ButtonInfo {
  text: string;
  color: string;
}

export function Button (props: ButtonInfo) {
  return (
    <button class={classList({
      [styles.button]: true,
      [styles.dark]: props.color === 'dark',
    })}
    >{props.text}</button>
  )
}
