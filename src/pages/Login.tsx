import Form from '@/components/login/Form'
import React, { useState } from 'react'

// Components

function Login() {
  return (
    <div className='flex align-items-center h-full login_container'>
      <div
        className='bg-blue-300 shadow-6 grid text-white'
        style={{
          width: '40vw',
          height: '100%',
          borderTopRightRadius: '80px',
          borderBottomRightRadius: '80px',
          backgroundBlendMode: 'color-doge',
        }}
      >
        <div className='col border-200 flex flex-column justify-content-center align-items-center'>
          <h1 className='mb-6 font-italic'>Iniciar sesion</h1>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default Login
