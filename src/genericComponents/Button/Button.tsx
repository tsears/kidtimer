import { h, JSX } from 'preact'
import * as styles from './Button.m.css'
import { classList } from '../utils'

interface ButtonInfo {
  text: string;
  color: string;
  onClick?: (e: JSX.TargetedEvent<HTMLInputElement, MouseEvent>) => void
}

export function Button (props: ButtonInfo) {
  return (
    <button
      onClick={props.onClick}
      class={classList({
        [styles.button]: true,
        [styles.dark]: props.color === 'dark',
      })}
    >{props.text}</button>
  )
}
