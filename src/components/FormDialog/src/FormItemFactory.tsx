import React from 'react'

import { Input, Select } from 'antd'

import { isNil } from '@/utils/is'

interface FormItemFactoryProps {
  component?: string
  attrs?: Record<string, unknown>
}

export default function FormItemFactory(props: FormItemFactoryProps) {
  const { component, attrs } = props
  console.log(attrs)
  const formElement = () => {
    if (isNil(component) || component === 'Input') {
      return <Input {...attrs} />
    } else if (component === 'Select') {
      return <Select {...attrs} />
    } else {
      // return React.createElement(component, { ...attrs })
      return <div>FormItemFactory</div>
    }
  }
  return formElement()
}
