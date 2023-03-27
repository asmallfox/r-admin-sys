import { Card, Form, Input, Button, Checkbox } from 'antd'
import { useDesign } from '@/hooks/web/useDesign'
import React, { useEffect, useState } from 'react'

import { useMessage } from '@/hooks/web/useMessage'
import { getTodoListApi, addTodoListApi } from '@/api'
import './style/todo-list.scss'

interface TodoListItem {
  id?: string | number
  content: string
  finished: boolean
}

function TodoList() {
  const { prefixCls } = useDesign('todo-list')

  const { createMessage } = useMessage()

  const [form] = Form.useForm()

  const [list, setList] = useState<TodoListItem[]>([])
  const [btnDisabled, setBtnDisabled] = useState(true)

  const handleFinish = async (values: { content: string }) => {
    const { content } = values
    if (!content) return
    const exist = list.some((item) => item.content === content)
    if (exist) {
      createMessage.warning({
        content: '标签内容已存在'
      })
    } else {
      try {
        const requestParams = {
          content,
          finished: false
        }
        setBtnDisabled(true)
        await addTodoListApi(requestParams)
        await fetchData()
        form.resetFields()
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value === '') {
      setBtnDisabled(true)
    } else if (btnDisabled) {
      setBtnDisabled(false)
    }
  }

  const handleCheck = (index: number) => {
    list[index].finished = !list[index].finished
    setList([...list])
  }

  const fetchData = async () => {
    try {
      const res = await getTodoListApi()
      if (res?.rows?.length) {
        setList([...res.rows])
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card className={prefixCls} title="THINGS TO DO" hoverable>
      <Form form={form} className="flex" onFinish={handleFinish}>
        <Form.Item className="flex-1 mr-1" name="content">
          <Input placeholder="请输入要添加标签内容" onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" disabled={btnDisabled}>
            Add
          </Button>
        </Form.Item>
      </Form>
      <div className={`${prefixCls}-container`}>
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
              <span
                className={`${
                  item.finished ? 'finished' : ''
                } ${prefixCls}_item_content`}
              >
                {item.content}
              </span>
            </div>
          )
        })}
      </div>
      <div className={`${prefixCls}_func-list flex items-center px-2`}>
        <span>count: {list.length} </span>
      </div>
    </Card>
  )
}

export default TodoList
