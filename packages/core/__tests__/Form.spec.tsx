import { RefObject } from 'react'

import { act, fireEvent, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect.js'

import { Form } from '../../web/lib'
import { Scope, FormHandles } from '../lib'
import { Input } from './components/Input'
import { InputWithPath } from './components/InputWithPath'
import { ObjectInput } from './components/ObjectInput'
import { CustomInputClear } from './utils/CustomInputClear'
import { CustomInputParse } from './utils/CustomInputParse'
import { render } from './utils/RenderTest'

describe('Form', () => {
  it('should render form elements', () => {
    const { container } = render(<Input name="name" />)

    expect(!!container.querySelector('input[name=name]')).toBe(true)
  })

  it('should load initial data inside form elements', () => {
    const { container, getByTestId } = render(
      <>
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
        <Input type="radio" name="terms" value="accept" data-testid="accept" />
        <Input type="radio" name="terms" value="refuse" data-testid="refuse" />
        <Input name="name" />
      </>,
      {
        initialData: {
          name: 'Diego',
          preferences: ['code', 'music'],
          terms: 'accept',
        },
      }
    )

    expect(container.querySelector('input[name=name]')).toHaveAttribute(
      'value',
      'Diego'
    )
    expect((getByTestId('music') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('code') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('accept') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('refuse') as HTMLInputElement).checked).toBe(false)
  })

  it('should return form elements data on submit', () => {
    const submitMock = jest.fn()

    const { getByTestId, getByLabelText } = render(
      <>
        <Input name="name" />
        <Scope path="address">
          <Input name="street" />
        </Scope>
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
      </>,
      {
        onSubmit: submitMock,
        initialData: {
          address: { street: 'John Doe Avenue' },
          preferences: ['code', 'music'],
        },
      }
    )

    fireEvent.change(getByLabelText('name'), {
      target: { value: 'Diego' },
    })

    fireEvent.submit(getByTestId('form'))

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: 'Diego',
        address: {
          street: 'John Doe Avenue',
        },
        preferences: expect.arrayContaining(['code', 'music']),
      },
      {
        reset: expect.any(Function),
      },
      expect.any(Object)
    )
  })

  it('should remove unmounted elements from refs', () => {
    const submitMock = jest.fn()

    const { getByTestId, rerender } = render(<Input name="name" />, {
      onSubmit: submitMock,
      initialData: { name: 'Diego' },
    })

    rerender(
      <Form data-testid="form" onSubmit={submitMock}>
        <Input name="another" />
      </Form>
    )

    fireEvent.submit(getByTestId('form'))

    expect(submitMock).toHaveBeenCalledWith(
      {
        another: 'Diego',
      },
      {
        reset: expect.any(Function),
      },
      expect.any(Object)
    )
  })

  it('should reset form data when reset helper is dispatched', () => {
    const { getByTestId, getByLabelText } = render(
      <>
        <Input name="name" />
      </>,
      { onSubmit: (_: any, { reset }: { reset: Function }) => reset() }
    )

    getByLabelText('name').setAttribute('value', 'Diego')

    fireEvent.submit(getByTestId('form'))

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('')
  })

  it('should apply data when reset is dispatched with new values', () => {
    const newData = {
      name: 'John Doe',
      tech: 'react',
    }

    const { getByTestId, getByLabelText } = render(
      <>
        <Input name="name" />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(newData),
      }
    )

    getByLabelText('name').setAttribute('value', 'Diego')

    fireEvent.submit(getByTestId('form'))

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('John Doe')
  })

  it('should be able to have custom value parser', () => {
    const submitMock = jest.fn()

    const { getByTestId } = render(
      <>
        <CustomInputParse name="name" />
      </>,
      { onSubmit: submitMock, initialData: { name: 'Diego' } }
    )

    fireEvent.submit(getByTestId('form'))

    expect(submitMock).toHaveBeenCalledWith(
      {
        name: 'Diego-test',
      },
      {
        reset: expect.any(Function),
      },
      expect.any(Object)
    )
  })

  it('should be able to have custom value clearer', () => {
    const { getByTestId, getByLabelText } = render(
      <>
        <CustomInputClear name="name" />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(),
        initialData: { name: 'Diego' },
      }
    )

    fireEvent.submit(getByTestId('form'))

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('test')
  })

  it('should be able to manually set field value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText, getByTestId } = render(
      <>
        <Input name="name" />
        <ObjectInput name="another" />
        <InputWithPath name="bio" data-testid="bio" />
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
      </>,
      {
        ref: formRef,
      }
    )

    if (formRef.current) {
      formRef.current.setFieldValue('name', 'John Doe')
      formRef.current.setFieldValue('another', { id: '5', label: 'Test' })
      formRef.current.setFieldValue('bio', 'In love with')
      formRef.current.setFieldValue('preferences', ['code', 'music'])

      const valueNonExistent = formRef.current.setFieldValue(
        'notexists',
        'John Doe'
      )

      expect(valueNonExistent).toBe(false)
    }

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('John Doe')
    expect((getByLabelText('another') as HTMLInputElement).value).toBe('5')
    expect((getByTestId('bio') as HTMLInputElement).value).toBe('In love with')
    expect((getByTestId('music') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('code') as HTMLInputElement).checked).toBe(true)
  })

  it('should be able to manually get field value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <Input name="name" />
        <ObjectInput name="description" />
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
      </>,
      {
        ref: formRef,
        initialData: {
          name: 'John Doe',
          description: 'Wee',
          preferences: ['code', 'music'],
        },
      }
    )

    if (formRef.current) {
      const nameValue = formRef.current.getFieldValue('name')
      const descriptionValue = formRef.current.getFieldValue('description')
      const preferencesValue = formRef.current.getFieldValue('preferences')
      const valueNonExistent = formRef.current.getFieldValue('notexists')

      expect(nameValue).toBe('John Doe')
      expect(descriptionValue).toBe('Wee')
      expect(preferencesValue).toEqual(
        expect.arrayContaining(['code', 'music'])
      )
      expect(valueNonExistent).toBe(false)
    }
  })

  it('should be able to manually set field error', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByText } = render(
      <>
        <Input name="name" />
      </>,
      {
        onSubmit: (_: any, { reset }: { reset: Function }) => reset(),
        ref: formRef,
      }
    )

    act(() => {
      if (formRef.current) {
        formRef.current.setFieldError('name', 'Name is required')
      }
    })

    expect(!!getByText('Name is required')).toBe(true)
  })

  it('should be able to manually get field error', async () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <Input name="name" />
      </>,
      {
        ref: formRef,
      }
    )

    act(() => {
      if (formRef.current) {
        formRef.current.setFieldError('name', 'Name is required')
      }
    })

    await waitFor(() => {
      if (formRef.current) {
        const error = formRef.current.getFieldError('name')

        expect(error).toBe('Name is required')
      }
    })
  })

  it('should be able to manually clear field value', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText, getByTestId } = render(
      <>
        <Input name="name" />
        <CustomInputClear name="bio" />
        <InputWithPath name="description" data-testid="description" />
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
        <Input type="radio" name="terms" value="accept" data-testid="accept" />
        <Input type="radio" name="terms" value="refuse" data-testid="refuse" />
      </>,
      {
        ref: formRef,
        initialData: {
          name: 'Diego',
          bio: 'Should clear',
          description: 'Wee',
          preferences: ['code'],
          terms: 'refuse',
        },
      }
    )

    if (formRef.current) {
      formRef.current.clearField('name')
      formRef.current.clearField('bio')
      formRef.current.clearField('description')
      formRef.current.clearField('preferences')
      formRef.current.clearField('terms')
    }

    expect((getByTestId('music') as HTMLInputElement).checked).toBe(false)
    expect((getByTestId('code') as HTMLInputElement).checked).toBe(false)
    expect((getByTestId('accept') as HTMLInputElement).checked).toBe(false)
    expect((getByTestId('refuse') as HTMLInputElement).checked).toBe(false)
    expect((getByLabelText('name') as HTMLInputElement).value).toBe('')
    expect((getByLabelText('bio') as HTMLInputElement).value).toBe('test')
    expect((getByTestId('description') as HTMLInputElement).value).toBe('')
  })

  it('should be able to clear input error from within it', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText } = render(<Input name="name" />, {
      ref: formRef,
    })

    act(() => {
      if (formRef.current) {
        formRef.current.setFieldError('name', 'Name is required')
      }

      fireEvent.focus(getByLabelText('name') as HTMLInputElement)
    })

    expect(formRef.current?.getFieldError('name')).toBeUndefined()
  })

  it('should be able to manually set form data', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText, getByTestId } = render(
      <>
        <Input name="name" />
        <Input name="bio" />
        <Scope path="personal">
          <Input
            type="checkbox"
            name="preferences"
            value="music"
            data-testid="music"
          />
          <Input
            type="checkbox"
            name="preferences"
            value="code"
            data-testid="code"
          />
        </Scope>
        <Input type="radio" name="terms" value="accept" data-testid="accept" />
        <Input type="radio" name="terms" value="refuse" data-testid="refuse" />
        <ObjectInput name="another" />
      </>,
      {
        ref: formRef,
      }
    )

    if (formRef.current) {
      formRef.current.setData({
        name: 'John Doe',
        bio: 'React',
        personal: {
          preferences: ['music', 'code'],
        },
        terms: 'accept',
        another: {
          id: '5',
          label: 'Test',
        },
      })
    }

    expect((getByLabelText('name') as HTMLInputElement).value).toBe('John Doe')
    expect((getByLabelText('bio') as HTMLInputElement).value).toBe('React')
    expect((getByLabelText('another') as HTMLInputElement).value).toBe('5')
    expect((getByTestId('music') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('code') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('accept') as HTMLInputElement).checked).toBe(true)
    expect((getByTestId('refuse') as HTMLInputElement).checked).toBe(false)
  })

  it('should be able to manually get form data', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <Input name="name" />
        <Input name="bio" />
      </>,
      {
        ref: formRef,
        initialData: { name: 'John Doe', bio: 'React developer' },
      }
    )

    if (formRef.current) {
      const data = formRef.current.getData()

      expect(data).toEqual({ name: 'John Doe', bio: 'React developer' })
    }
  })

  it('should be able to manually set form errors', async () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <Input name="name" />
        <Input name="bio" />
      </>,
      {
        ref: formRef,
      }
    )

    act(() => {
      if (formRef.current) {
        formRef.current.setErrors({
          name: 'Name is required',
          bio: 'Bio is required',
        })
      }
    })

    await waitFor(() => {
      if (formRef.current) {
        const errorName = formRef.current.getFieldError('name')
        const errorBio = formRef.current.getFieldError('bio')
        const errors = formRef.current.getErrors()

        expect(errorName).toBe('Name is required')
        expect(errorBio).toBe('Bio is required')
        expect(errors).toEqual({
          name: 'Name is required',
          bio: 'Bio is required',
        })
      }
    })
  })

  it('should be able to manually get field ref', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    render(
      <>
        <Input name="name" />
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
      </>,
      {
        ref: formRef,
      }
    )

    if (formRef.current) {
      const nameRef = formRef.current.getFieldRef('name')
      console.log({ nameRef })
      const preferencesRef = formRef.current.getFieldRef('preferences')
      console.log(preferencesRef)
      const refNonExistent = formRef.current.getFieldRef('notexists')

      expect(nameRef.current?.name).toBe('name')
      // expect((preferencesRef as HTMLInputElement).name).toBe('name')
      expect(refNonExistent).toBe(false)
    }
  })

  it('should be able to manually reset form', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText, getByTestId } = render(
      <>
        <Input name="name" />
        <Input
          type="checkbox"
          name="preferences"
          value="music"
          data-testid="music"
        />
        <Input
          type="checkbox"
          name="preferences"
          value="code"
          data-testid="code"
        />
        <Input type="radio" name="terms" value="accept" data-testid="accept" />
        <Input type="radio" name="terms" value="refuse" data-testid="refuse" />
      </>,
      {
        ref: formRef,
        initialData: { name: 'John Doe', preferences: 'code', terms: 'refuse' },
      }
    )

    if (formRef.current) {
      formRef.current.reset()

      expect((getByLabelText('name') as HTMLInputElement).value).toBe('')
      expect((getByTestId('music') as HTMLInputElement).checked).toBe(false)
      expect((getByTestId('code') as HTMLInputElement).checked).toBe(false)
      expect((getByTestId('accept') as HTMLInputElement).checked).toBe(false)
      expect((getByTestId('refuse') as HTMLInputElement).checked).toBe(false)
    }
  })

  it('should be able to manually reset form', () => {
    const formRef: RefObject<FormHandles> = { current: null }

    const { getByLabelText } = render(
      <>
        <Input name="name" />
        <InputWithPath name="bio" />
      </>,
      {
        ref: formRef,
        initialData: { name: 'John Doe', bio: 'John loves to code' },
      }
    )

    if (formRef.current) {
      formRef.current.reset()

      expect((getByLabelText('name') as HTMLInputElement).value).toBe('')
      expect((getByLabelText('bio') as HTMLInputElement).value).toBe('')
    }
  })
})
