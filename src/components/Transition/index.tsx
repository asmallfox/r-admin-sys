import React from 'react'
import Transition from './src/Transition'

export function useTransition(Comp: any) {
  const TransitionComp = () => {
    return <Transition>{Comp}</Transition>
  }
  return {
    Transition: TransitionComp()
  }
}

export { Transition }
