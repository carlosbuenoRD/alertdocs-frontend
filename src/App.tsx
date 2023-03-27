import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/store'

// Utils
import { menu, menuAdmin, toastConfig } from '@/utils/data'

// Styles
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

// Prime
import PrimeReact from 'primereact/api'
import { classNames } from 'primereact/utils'
import { Tooltip } from 'primereact/tooltip'

// Components
import AppBreadcrumb from './components/layout/AppBreadcrumb'
import AppFooter from './components/layout/AppFooter'
import AppMenu from './components/layout/AppMenu'
import AppTopbar from './components/layout/AppTopbar'
import AppRightMenu from './components/layout/AppRightMenu'
import AppConfig from './components/layout/AppConfig'

//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Area from './pages/Area'
import Areas from './pages/Areas'
import MyAccount from './pages/MyAccount'
import Procesos from './pages/Procesos'
import Documents from './pages/Documents'
import Direccion from './pages/Direccion'
import Department from './pages/Department'
import NotFound from './pages/NotFound'
import notifySocket from './sockets/notify.socket'
import { Report, Reports } from './pages/reports'
import { notifyMe } from './services/Notify'
import { getNotifications } from './redux/reducers/users'
import { toast } from 'react-toastify'

function App(props: any) {
  const dispatch = useAppDispatch()

  const [rightMenuActive, setRightMenuActive] = useState(false)
  const [configActive, setConfigActive] = useState(false)
  const [menuMode, setMenuMode] = useState('sidebar')
  const [overlayMenuActive, setOverlayMenuActive] = useState(false)
  const [ripple, setRipple] = useState(true)
  const [sidebarStatic, setSidebarStatic] = useState(false)
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] =
    useState(false)
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [topbarMenuActive, setTopbarMenuActive] = useState(false)
  const [sidebarActive, setSidebarActive] = useState(false)
  const [pinActive, setPinActive] = useState(false)
  const [activeInlineProfile, setActiveInlineProfile] = useState(false)
  const [resetActiveIndex, setResetActiveIndex] = useState<boolean>(false)
  const copyTooltipRef = useRef<any>()
  const location = useLocation()
  const navigate = useNavigate()

  const { user } = useAppSelector((state) => state.auth)

  PrimeReact.ripple = true

  let rightMenuClick: any
  let configClick: any
  let menuClick: any
  let searchClick: boolean = false
  let topbarItemClick: any

  useEffect(() => {
    copyTooltipRef &&
      copyTooltipRef.current &&
      copyTooltipRef.current.updateTargetEvents()
  }, [location])

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])

  useEffect(() => {
    if (user) {
      notifySocket.emit('setup', user?._id)
      notifySocket.on('upcoming activity', () => {
        let message =
          'Tu actividad es la siguiente, Preparate para cuando sea tu turno'
        notifyMe(message)
        toast(message, toastConfig)
        dispatch(getNotifications())
      })
      notifySocket.on('ready activity', () => {
        let message =
          'Tu actividad esta lista para empezar, Realizala lo mas rapido posible!.'
        notifyMe(message)
        toast(message, toastConfig)
        dispatch(getNotifications())
      })
      notifySocket.on('devolucion created', () => {
        let message =
          'Te han devuelto una actividad, Realizala lo mas rapido posible!.'
        notifyMe(message)
        toast(message, toastConfig)
        dispatch(getNotifications())
      })
      notifySocket.on('devolucion ended', () => {
        let message =
          'Puedes continuar con tu actividad, Realizala lo mas rapido posible!.'
        notifyMe(message)
        toast(message, toastConfig)
        dispatch(getNotifications())
      })
      notifySocket.on('notify created document', () => {
        let message =
          'Has sido agregado a un documento, Mantente alerta a tu turno!.'
        notifyMe(message)
        toast(message, toastConfig)
        dispatch(getNotifications())
      })
    }
  }, [user])

  useEffect(() => {
    setResetActiveIndex(true)
    setMenuActive(false)
  }, [menuMode])

  const onDocumentClick = () => {
    if (!searchClick && searchActive) {
      onSearchHide()
    }

    if (!topbarItemClick) {
      setTopbarMenuActive(false)
    }

    if (!menuClick) {
      if (isHorizontal() || isSlim()) {
        setMenuActive(false)
        setResetActiveIndex(true)
      }

      if (overlayMenuActive || staticMenuMobileActive) {
        setOverlayMenuActive(false)
        setStaticMenuMobileActive(false)
      }

      hideOverlayMenu()
      unblockBodyScroll()
    }

    if (!rightMenuClick) {
      setRightMenuActive(false)
    }

    if (configActive && !configClick) {
      setConfigActive(false)
    }

    topbarItemClick = false
    menuClick = false
    configClick = false
    rightMenuClick = false
    searchClick = false
  }

  const onSearchHide = () => {
    setSearchActive(false)
    searchClick = false
  }

  const onMenuModeChange = (menuMode: any) => {
    setMenuMode(menuMode)
    setOverlayMenuActive(false)
  }

  const onRightMenuButtonClick = () => {
    rightMenuClick = true
    setRightMenuActive(true)
  }

  const onRightMenuClick = () => {
    rightMenuClick = true
  }

  const onRightMenuActiveChange = (active: any) => {
    setRightMenuActive(active)
  }

  const onConfigClick = () => {
    configClick = true
  }

  const onConfigButtonClick = (event: any) => {
    setConfigActive((prevState) => !prevState)
    configClick = true
    event.preventDefault()
  }

  const onRippleChange = (e: any) => {
    PrimeReact.ripple = e.value
    setRipple(e.value)
  }

  const onMenuButtonClick = (event: any) => {
    menuClick = true

    if (isOverlay()) {
      setOverlayMenuActive((prevState) => !prevState)
    }

    if (isDesktop()) {
      setStaticMenuDesktopInactive((prevState) => !prevState)
    } else {
      setStaticMenuMobileActive((prevState) => !prevState)
    }

    event.preventDefault()
  }

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false)
    setStaticMenuMobileActive(false)
  }

  const onTopbarItemClick = (event: any) => {
    topbarItemClick = true
    setTopbarMenuActive((prevState) => !prevState)
    hideOverlayMenu()
    event.preventDefault()
  }

  const onToggleMenu = (event: any) => {
    menuClick = true

    if (overlayMenuActive) {
      setOverlayMenuActive(false)
    }

    if (sidebarActive) {
      setSidebarStatic((prevState) => !prevState)
    }

    event.preventDefault()
  }

  const onSidebarMouseOver = () => {
    if (menuMode === 'sidebar' && !sidebarStatic) {
      setSidebarActive(isDesktop())
      setTimeout(() => {
        setPinActive(isDesktop())
      }, 200)
    }
  }

  const onSidebarMouseLeave = () => {
    if (menuMode === 'sidebar' && !sidebarStatic) {
      setTimeout(() => {
        setSidebarActive(false)
        setPinActive(false)
      }, 250)
    }
  }

  const onMenuClick = () => {
    menuClick = true
  }

  const onChangeActiveInlineMenu = (event: any) => {
    setActiveInlineProfile((prevState) => !prevState)
    event.preventDefault()
  }

  const onRootMenuItemClick = () => {
    setMenuActive((prevState) => !prevState)
  }

  const onMenuItemClick = (event: any) => {
    if (!event.item.items) {
      hideOverlayMenu()
      setResetActiveIndex(true)
    }

    if (!event.item.items && (isHorizontal() || isSlim())) {
      setMenuActive(false)
    }
  }

  const isHorizontal = () => {
    return menuMode === 'horizontal'
  }

  const isSlim = () => {
    return menuMode === 'slim'
  }

  const isOverlay = () => {
    return menuMode === 'overlay'
  }

  const isDesktop = () => {
    return window.innerWidth > 991
  }

  const onInputClick = () => {
    searchClick = true
  }

  const breadcrumbClick = () => {
    searchClick = true
    setSearchActive(true)
  }

  const unblockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll')
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      )
    }
  }

  const layoutClassName = classNames('layout-wrapper', {
    'layout-static': menuMode === 'static',
    'layout-overlay': menuMode === 'overlay',
    'layout-overlay-active': overlayMenuActive,
    'layout-slim': menuMode === 'slim',
    'layout-horizontal': menuMode === 'horizontal',
    'layout-active': menuActive,
    'layout-mobile-active': staticMenuMobileActive,
    'layout-sidebar': menuMode === 'sidebar',
    'layout-sidebar-static': menuMode === 'sidebar' && sidebarStatic,
    'layout-static-inactive':
      staticMenuDesktopInactive && menuMode === 'static',
    'p-ripple-disabled': !ripple,
  })

  return (
    <div className={layoutClassName} onClick={onDocumentClick}>
      <Tooltip
        ref={copyTooltipRef}
        target='.block-action-copy'
        position='bottom'
        content='Copied to clipboard'
        event='focus'
      />

      <div className={`layout-main ${location.pathname == '/' && 'ml-0'}`}>
        {location.pathname !== '/' && (
          <>
            <AppTopbar
              items={user?.isAdmin ? menuAdmin : menu}
              menuMode={menuMode}
              colorScheme={props.colorScheme}
              menuActive={menuActive}
              topbarMenuActive={topbarMenuActive}
              activeInlineProfile={activeInlineProfile}
              onTopbarItemClick={onTopbarItemClick}
              onMenuButtonClick={onMenuButtonClick}
              onSidebarMouseOver={onSidebarMouseOver}
              onSidebarMouseLeave={onSidebarMouseLeave}
              onToggleMenu={onToggleMenu}
              onChangeActiveInlineMenu={onChangeActiveInlineMenu}
              onMenuClick={onMenuClick}
              onMenuItemClick={onMenuItemClick}
              onRootMenuItemClick={onRootMenuItemClick}
              resetActiveIndex={resetActiveIndex}
            />

            <AppMenu
              model={user?.isAdmin ? menuAdmin : menu}
              onRootMenuItemClick={onRootMenuItemClick}
              onMenuItemClick={onMenuItemClick}
              onToggleMenu={onToggleMenu}
              onMenuClick={onMenuClick}
              menuMode={menuMode}
              colorScheme={props.colorScheme}
              menuActive={menuActive}
              sidebarActive={sidebarActive}
              sidebarStatic={sidebarStatic}
              pinActive={pinActive}
              onSidebarMouseLeave={onSidebarMouseLeave}
              onSidebarMouseOver={onSidebarMouseOver}
              activeInlineProfile={activeInlineProfile}
              onChangeActiveInlineMenu={onChangeActiveInlineMenu}
              resetActiveIndex={resetActiveIndex}
              onConfigButtonClick={onConfigButtonClick}
            />

            <AppBreadcrumb
              onMenuButtonClick={onMenuButtonClick}
              menuMode={menuMode}
              onRightMenuButtonClick={onRightMenuButtonClick}
              onInputClick={onInputClick}
              searchActive={searchActive}
              breadcrumbClick={breadcrumbClick}
            />
          </>
        )}

        <div
          className={`layout-main-content ${location.pathname == '/' && 'p-0'}`}
        >
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/area/:id' element={<Area />} />
            <Route path='/direcciones/:id' element={<Direccion />} />
            <Route path='/department/:id' element={<Department />} />
            <Route path='/areas' element={<Areas />} />
            <Route path='/perfil' element={<MyAccount />} />
            <Route path='/perfil/:id' element={<MyAccount />} />
            <Route path='/procesos' element={<Procesos />} />
            <Route path='/documentos' element={<Documents />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/reports/:id' element={<Report />} />
            <Route path='*' element={<NotFound />} />
            {/*
            <Route path="/flujos" element={<Flujos />} />
            <Route path="/direcciones" element={<Direcciones />} /> */}
          </Routes>
        </div>

        <AppFooter colorScheme={props.colorScheme} />
      </div>

      {location.pathname !== '/' && (
        <>
          <AppRightMenu
            rightMenuActive={rightMenuActive}
            onRightMenuClick={onRightMenuClick}
            onRightMenuActiveChange={onRightMenuActiveChange}
          />

          <AppConfig
            configActive={configActive}
            onConfigButtonClick={onConfigButtonClick}
            onConfigClick={onConfigClick}
            menuMode={menuMode}
            changeMenuMode={onMenuModeChange}
            colorScheme={props.colorScheme}
            changeColorScheme={props.onColorSchemeChange}
            theme={props.theme}
            changeTheme={props.onMenuThemeChange}
            componentTheme={props.componentTheme}
            changeComponentTheme={props.onComponentThemeChange}
            ripple={ripple}
            onRippleChange={onRippleChange}
          />
        </>
      )}
    </div>
  )
}

export default App
