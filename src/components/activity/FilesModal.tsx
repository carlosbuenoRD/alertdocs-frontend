import React, { useState, useRef } from 'react'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchFilesByActivities } from '@/redux/reducers/files'

// Components
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'
import { FileUpload } from 'primereact/fileupload'

function FilesModal(props: any) {
  const dispatch = useAppDispatch()

  const { activity, user } = useAppSelector((state) => ({
    ...state.activity,
    ...state.auth,
  }))

  const [value, setValue] = useState('')
  const [totalSize, setTotalSize] = useState(0)
  const fileUploadRef = useRef<any>(null)

  const onUpload = () => {
    console.log('up')
  }

  const onTemplateSelect = (e: any) => {
    let _totalSize = totalSize
    e.files.forEach((file: any) => {
      _totalSize += file.size
    })

    setTotalSize(_totalSize)
  }

  const onTemplateUpload = (e: any) => {
    let _totalSize = 0
    e.files.forEach((file: any) => {
      _totalSize += file.size || 0
    })

    setTotalSize(_totalSize)
    dispatch(fetchFilesByActivities())
  }

  const onTemplateRemove = (file: any, callback: any) => {
    setTotalSize(totalSize - file.size)
    callback()
  }

  const onTemplateClear = () => {
    setTotalSize(0)
  }

  const headerTemplate = (options: any) => {
    const { className, chooseButton, uploadButton, cancelButton } = options
    const value = totalSize / 10000
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : '0 B'

    return (
      <div
        className={className}
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: '300px', height: '20px', marginLeft: 'auto' }}
        ></ProgressBar>
      </div>
    )
  }

  const itemTemplate = (file: any, props: any) => {
    return (
      <div className='flex align-items-center flex-wrap'>
        <div className='flex align-items-center' style={{ width: '40%' }}>
          <img
            alt={file.name}
            role='presentation'
            src={file.objectURL}
            width={100}
          />
          <span className='flex flex-column text-left ml-3'>
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity='warning'
          className='px-3 py-2'
        />
        <Button
          type='button'
          icon='pi pi-times'
          className='p-button-outlined p-button-rounded p-button-danger ml-auto'
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    )
  }

  const emptyTemplate = () => {
    return (
      <div className='flex align-items-center flex-column'>
        <i
          className='pi pi-image mt-3 p-5'
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className='my-5'
        >
          Drag and Drop Image Here
        </span>
      </div>
    )
  }

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined',
  }
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className:
      'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
  }
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className:
      'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
  }

  const footer = () => (
    <>
      <Button label='Cancelar' className='btn-red' onClick={props.onHide} />
      <Button label='Guardar' onClick={props.onHide} />
    </>
  )

  return (
    <Dialog
      header='Subir archivo'
      visible={props.visible}
      modal={false}
      style={{ width: '50vw' }}
      footer={() => footer()}
      onHide={props.onHide}
    >
      <div className='mt-4 flex flex-column'>
        <FileUpload
          ref={fileUploadRef}
          name='file'
          url={`http://localhost:3000/api/files/upload?activity=${activity._id}&document=${activity.documentId}&user=${user?._id}`}
          multiple
          accept='application/pdf, image/png, image/gif, image/jpeg'
          maxFileSize={1000000}
          onUpload={onTemplateUpload}
          onSelect={onTemplateSelect}
          onError={onTemplateClear}
          onClear={onTemplateClear}
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          uploadOptions={uploadOptions}
          cancelOptions={cancelOptions}
        />
      </div>
      <div className='mt-4 flex flex-column'>
        <label htmlFor='comment' className='mb-1'>
          Escribe un comentario
        </label>
        <InputTextarea
          id='comment'
          rows={5}
          cols={30}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </Dialog>
  )
}

export default FilesModal
