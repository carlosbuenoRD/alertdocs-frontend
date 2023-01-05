import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppMenu from './AppMenu'
const AppTopbar = (props: any) => {
  const onTopbarSubItemClick = (event: any) => {
    event.preventDefault()
  }

  const navigate = useNavigate()

  return (
    <>
      <div className='layout-topbar'>
        <div className='layout-topbar-left'>
          <button
            className='topbar-menu-button p-link'
            onClick={props.onMenuButtonClick}
          >
            <i className='pi pi-bars'></i>
          </button>

          <button className='logo p-link' onClick={() => navigate('/')}>
            <img src={`assets/images/Logo-cupula.png`} alt='logo' />
          </button>

          <h4 className='m-0 ml-2 uppercase text-white'>Alertdoc</h4>
        </div>

        <AppMenu
          model={props.items}
          menuMode={props.menuMode}
          colorScheme={props.colorScheme}
          menuActive={props.menuActive}
          activeInlineProfile={props.activeInlineProfile}
          onSidebarMouseOver={props.onSidebarMouseOver}
          onSidebarMouseLeave={props.onSidebarMouseLeave}
          toggleMenu={props.onToggleMenu}
          onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
          onMenuClick={props.onMenuClick}
          onRootMenuItemClick={props.onRootMenuItemClick}
          onMenuItemClick={props.onMenuItemClick}
        />
      </div>
    </>
  )
}

export default AppTopbar
