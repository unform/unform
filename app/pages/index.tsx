import { useEffect, useRef } from 'react'

import Head from 'next/head'

import { Input, Textarea } from '@unform/components'
import { SubmitHandler, FormHandles, Scope } from '@unform/core'
// import { NumberFormat } from '@unform/react-number-format'
import { Form } from '@unform/web'

// import Input from '../components/Input'

interface FormData {
  teste: string
  date: string
}

export default function Home() {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = (data, { reset }) => {
    if (!data.date) {
      formRef.current.setFieldError('date', 'choose a date')
    }
    // alert(JSON.stringify(data, null, 2))

    // reset()
  }

  useEffect(() => {
    // formRef.current.setFieldValue('terms', 'yes')
    // formRef.current.setFieldValue('preferences', 'music')
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{
          date: '20/03',
          personal: {
            preferences: ['code', 'music'],
            terms: 'yes',
          },
        }}
      >
        <div>
          <Input id="email" name="teste" type="email" value="wow@gmail.com" />
          <label htmlFor="radio">wow</label>
        </div>
        <div>
          <Input id="name" name="wow" type="text" />
          <label htmlFor="radio">name</label>
        </div>

        <div>
          <Input type="radio" id="yes" name="terms" value="yes" />
          <label htmlFor="yes"> yes </label>

          <Input type="radio" id="false" name="terms" value="no" />
          <label htmlFor="false"> no </label>
        </div>

        <Scope path="personal">
          <div>
            <Input type="checkbox" id="code" name="preferences" value="code" />
            <label htmlFor="code"> Codificação </label>

            <Input
              type="checkbox"
              id="music"
              name="preferences"
              value="music"
            />
            <label htmlFor="music"> música </label>
          </div>
        </Scope>

        <Textarea name="bio" />
        <button type="submit">submit</button>
      </Form>
    </div>
  )
}
