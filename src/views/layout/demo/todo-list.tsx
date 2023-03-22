import { Card, Form, Input, Button, Checkbox } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useDesign } from '@/hooks/web/useDesign'
import { useState } from 'react'

import './style/todo-list.scss'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

function TodoList() {
  const { prefixCls } = useDesign('todo-list')

  const handleAdd = (e) => {}

  const [list, setList] = useState([
    {
      finished: false,
      content: 'list1'
    },
    {
      finished: true,
      content: 'list12'
    }
  ])

  const handleCheck = (index: number, $event: CheckboxChangeEvent) => {
    const item = list[index]
    item.finished = !item.finished
    const res = list.splice(index, 1, item)
    console.log(res, index)
    setList(res)
  }

  return (
    <Card className={prefixCls} title="THINGS TO DO" hoverable>
      <Form className="flex">
        <Form.Item className="flex-1 mr-1">
          <Input name="addContent"></Input>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleAdd}>Add</Button>
        </Form.Item>
      </Form>
      {list.map((item, index) => {
        return (
          <div
            className={`${prefixCls}_item flex items-center`}
            key={item.content}
          >
            <Checkbox
              className="mr-2"
              checked={item.finished}
              onChange={(evt) => handleCheck(index, evt)}
            />
            <span className={item.finished ? 'finished' : ''}>
              {item.content}
            </span>
          </div>
        )
      })}
      <div className={`${prefixCls}_func-list flex items-center px-2`}>
        <PlusCircleOutlined />
        <span className="ml-4">{list.length} </span>
      </div>
    </Card>
  )
}

export default TodoList
