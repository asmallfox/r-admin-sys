import React from 'react'

import { Form, Input, Select } from 'antd'
import { isNil } from '@/utils/is'

interface FormItemFactoryProps {
  component?: string
  attrs?: Record<string, unknown>
}

export default function FormItemFactory(props: FormItemFactoryProps) {
  const { component, attrs } = props
  const formElement = () => {
    if (isNil(component) || component === 'Input') {
      return <Input {...attrs} />
    } else if (component === 'Select') {
      return <Select {...attrs} />
    } else {
      return <div>FormItemFactory</div>
    }
  }
  return formElement()
}
