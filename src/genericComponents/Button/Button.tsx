import { h, JSX } from 'preact'
import * as styles from './Button.m.css'
import { classList } from '../utils'

export type ButtonProps = {
  onClick: (e: JSX.TargetedEvent<HTMLInputElement, MouseEvent>) => void
  className?: string
  children?: JSX.Element[] | string
}

function _button (props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      class={classList(
        styles.button,
        props.className !== undefined && props.className,
      )}
    >{props.children}</button>
  )
}

export function Button (className: string) {
  return (props: ButtonProps) => {
    return (
      <_button {...props} className={className}>{props.children}</_button>
    )
  }
}
