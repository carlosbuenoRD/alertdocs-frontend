import React, { useState, useEffect } from 'react'
import { Dialog } from 'primereact/dialog'
import { Mention } from 'primereact/mention'
import { Button } from 'primereact/button'
import { commentActivity } from '@/redux/reducers/comments'
import { useAppDispatch } from '@/redux/store'

function CommentModal(props: any) {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')
  const [customers, setCustomers] = useState<any>([])
  const [suggestions, setSuggestions] = useState<any>(null)

  const handleCreateComment = () => {
    dispatch(commentActivity(value))
    setValue('')
    props.onHide()
  }

  const footer = () => (
    <>
      <Button label='Cancelar' className='btn-red' onClick={props.onHide} />
      <Button label='Guardar' onClick={handleCreateComment} />
    </>
  )

  const onSearch = (event: any) => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query
      let suggestions

      if (!query.trim().length) {
        suggestions = [...customers]
      } else {
        suggestions = customers.filter((customer: any) => {
          return customer.nickname.toLowerCase().startsWith(query.toLowerCase())
        })
      }

      setSuggestions(suggestions)
    }, 250)
  }

  const itemTemplate = (suggestion: any) => {
    // const src = 'images/avatar/' + suggestion.representative.image;

    return (
      <div className='flex align-items-center'>
        {/* <img alt={suggestion.name} src={src} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width="32" style={{verticalAlign: 'middle'}} /> */}
        <span className='flex flex-column ml-2'>
          {suggestion.name}
          <small
            style={{ fontSize: '.75rem', color: 'var(--text-secondary-color)' }}
          >
            @{suggestion.nickname}
          </small>
        </span>
      </div>
    )
  }

  return (
    <Dialog
      header='Crear comentario'
      visible={props.visible}
      modal={false}
      style={{ width: '30vw' }}
      footer={() => footer()}
      onHide={props.onHide}
    >
      <div className='mt-2 flex flex-column'>
        <label htmlFor='comment' className='mb-1'>
          Escribe un comentario
        </label>
        <Mention
          id='comment'
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          suggestions={suggestions}
          onSearch={onSearch}
          field='nickname'
          inputClassName='w-full h-8rem'
          itemTemplate={itemTemplate}
        />
      </div>
    </Dialog>
  )
}

export default CommentModal
