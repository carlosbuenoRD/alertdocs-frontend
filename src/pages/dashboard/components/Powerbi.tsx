import React from 'react'

function Powerbi() {
  return (
    <div className='card shadow-1'>
      <div>
        <iframe
          src='https://app.powerbi.com/view?r=eyJrIjoiYjAyMTc2OGEtNzFkYS00ODNhLTgxYTktNDhmNGY1YTFkNzI1IiwidCI6Ijg3M2FiNjNmLWUxNTQtNGQ0OC04ZTI5LTA5MTA4NmUwMTg1NSIsImMiOjF9'
          width='100%'
          height='1000px'
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  )
}

export default Powerbi
