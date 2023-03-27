import React, { useState } from 'react'
import { classNames } from 'primereact/utils'
import { useAppSelector } from '@/redux/store'

const AppRightPanel = (props: any) => {
  const { notifications } = useAppSelector((state) => state.user)

  return (
    <div
      className={classNames('layout-rightmenu scroll-hidden', {
        'layout-rightmenu-active': props.rightMenuActive,
      })}
      onClick={props.onRightMenuClick}
    >
      <button
        onClick={() => props.onRightMenuActiveChange(false)}
        className='layout-rightmenu-close p-link'
      >
        <i className='pi pi-times'></i>
      </button>
      <div className='user-detail-wrapper'>
        <div className='user-detail-content'>
          <img
            src='/assets/images/mypic.png'
            alt='atlantis'
            className='user-image border-circle'
            style={{ objectFit: 'fill' }}
            width={103}
            height={104}
          />
          <span className='user-name'>Carlos Bueno Tavares</span>
        </div>
        <div className='user-tasks'>
          <div className='user-tasks-item in-progress'>
            <button className='task-number p-link'>2</button>
            <span className='task-name'>Pending</span>
          </div>
          <div className='user-tasks-item flex flex-column justify-content-center align-items-center'>
            <button className='task-number p-link'>6</button>
            <span className='task-name'>completed</span>
          </div>
          <div className='user-tasks-item'>
            <button className='task-number p-link'>38</button>
            <span className='task-name'>Faltas</span>
          </div>
        </div>
      </div>

      <div className='daily-plan-wrapper'>
        <h4 className='mb-2'>Actividades</h4>
        <ul>
          {notifications &&
            notifications?.map((notification: any) => (
              <li className='cursor-pointer card'>
                <span className='event-time'>{notification.from}</span>
                <span className='event-topic my-2'>{notification.message}</span>
                <span className='w-full text-right text-green-500 font-bold'>
                  En proceso
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default AppRightPanel
