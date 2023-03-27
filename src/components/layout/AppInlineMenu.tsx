import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { classNames } from 'primereact/utils'
import { useAppDispatch } from '@/redux/store'
import { removeAuth } from '@/redux/reducers/auth'
import { useAppSelector } from '@/redux/store'
import { kanbaSocket, notifySocket } from '@/sockets'

const AppInlineMenu = (props: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const isSlim = () => {
    return props.menuMode === 'slim'
  }

  const isStatic = () => {
    return props.menuMode === 'static'
  }

  const isSidebar = () => {
    return props.menuMode === 'sidebar'
  }

  const isMobile = () => {
    return window.innerWidth <= 991
  }

  const handleLogOut = () => {
    dispatch(removeAuth(''))
    notifySocket.emit('logout')
    kanbaSocket.emit('logout')
    navigate('/')
  }

  return (
    <>
      {!isMobile() && (isStatic() || isSlim() || isSidebar()) && (
        <div
          className={classNames('layout-inline-menu', {
            'layout-inline-menu-active': props.activeInlineProfile,
          })}
        >
          <button
            className='layout-inline-menu-action p-link'
            onClick={props.onChangeActiveInlineMenu}
          >
            <img
              src='/assets/images/mypic.png'
              alt='avatar'
              style={{ width: '44px', height: '44px', objectFit: 'fill' }}
            />
            <span className='layout-inline-menu-text text-sm'>
              {user?.name}
            </span>
            <i className='layout-inline-menu-icon pi pi-angle-down'></i>
          </button>
          <CSSTransition
            classNames='p-toggleable-content'
            timeout={{ enter: 1000, exit: 450 }}
            in={props.activeInlineProfile}
            unmountOnExit
          >
            <ul className='layout-inline-menu-action-panel'>
              <li className='layout-inline-menu-action-item'>
                <button className='p-link' onClick={handleLogOut}>
                  <i className='pi pi-power-off pi-fw'></i>
                  <span>Logout</span>
                </button>
              </li>
              <li className='layout-inline-menu-action-item'>
                <button className='p-link' onClick={props.onConfigButtonClick}>
                  <i className='pi pi-cog pi-fw'></i>
                  <span>Settings</span>
                </button>
              </li>
              <li className='layout-inline-menu-action-item'>
                <button className='p-link' onClick={() => navigate('/perfil')}>
                  <i className='pi pi-user pi-fw'></i>
                  <span>Profile</span>
                </button>
              </li>
            </ul>
          </CSSTransition>
        </div>
      )}
    </>
  )
}

export default AppInlineMenu
