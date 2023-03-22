import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Card, Form, Input, Button, Checkbox } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useDesign } from '@/hooks/web/useDesign'
import React, { useRef, useState } from 'react'

import { useMessage } from '@/hooks/web/useMessage'
import './style/todo-list.scss'

function TodoList() {
  const { prefixCls } = useDesign('todo-list')

  const { createMessage } = useMessage()

  const [form] = Form.useForm()

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

  const handleFinish = (values: { content: string }) => {
    const { content } = values
    if (!content) return
    const exist = list.some(item => item.content === content)
    if (exist) {
      createMessage.warning({
        content: '标签内容已存在'
      })
    } else {
      setList([{ finished: false, content }, ...list])
      form.resetFields()
    }
  }


  const handleCheck = (index: number) => {
    list[index].finished = !list[index].finished
    setList([...list])
  }

  return (
    <Card className={prefixCls} title="THINGS TO DO" hoverable>
      <Form form={form} className="flex" onFinish={handleFinish}>
        <Form.Item className="flex-1 mr-1" name="content">
          <Input placeholder="请输入要添加标签内容" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add</Button>
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
              onChange={() => handleCheck(index)}
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
