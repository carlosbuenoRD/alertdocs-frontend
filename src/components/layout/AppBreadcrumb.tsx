import { BreadCrumb } from 'primereact/breadcrumb'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import DocumentCard from "../documents/DocumentCard";
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { Badge } from 'primereact/badge'
import { Calendar, CalendarProps } from 'primereact/calendar'
import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import Chat from '../Chat'
import CreateModal from '../documents/CreateModal'
import { getNotifications } from '@/redux/reducers/users'

const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
]

const AppBreadcrumb = (props: any) => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector((state) => state.user)

  const [search, setSearch] = useState('')
  const [selectedCities, setSelectedCities] = useState([])
  const [dates2, setDates2] = useState<any>('')
  const [createModal, setCreateModal] = useState<boolean>(false)

  const [chat, setChat] = useState<any>(false)

  const location = useLocation()

  let items

  useEffect(() => {
    dispatch(getNotifications())
  }, [])

  if (location.pathname === '/dashboard') {
    items = [{ label: 'Dashboard' }]
  }
  if (location.pathname === '/documentos') {
    items = [{ label: 'Documentos' }]
  }
  if (location.pathname === '/flujos') {
    items = [{ label: 'Administracion' }]
  }
  if (location.pathname === '/kanba') {
    items = [{ label: 'Kanban' }]
  }
  if (location.pathname.includes('/perfil')) {
    items = [{ label: 'Perfil' }]
  }

  if (location.pathname === '/procesos') {
    items = [{ label: 'Procesos' }]
  }
  if (location.pathname.includes('/area/')) {
    items = [{ label: 'Area' }]
  }
  if (location.pathname.includes('/direcciones/')) {
    items = [{ label: 'Direccion' }]
  }
  if (location.pathname.includes('/department/')) {
    items = [{ label: 'Departamento' }]
  }
  if (location.pathname === '/areas') {
    items = [{ label: 'Areas' }]
  }
  if (location.pathname === '/reports') {
    items = [{ label: 'Reportes' }]
  }

  if (location.pathname.includes('/reports/')) {
    items = [{ label: 'Detalle de reporte' }]
  }

  const isStatic = () => {
    return props.menuMode === 'static'
  }

  return (
    <div className='layout-breadcrumb-container'>
      <div className='layout-breadcrumb-left-items'>
        {isStatic() && (
          <button
            className='menu-button p-link'
            onClick={props.onMenuButtonClick}
          >
            <i className='pi pi-bars'></i>
          </button>
        )}

        <BreadCrumb
          model={items}
          className={`layout-breadcrumb font-bold ${
            location.pathname === '/' && 'dark'
          }`}
        />
      </div>

      <Button tooltip='Añadir documento' onClick={() => setCreateModal(true)}>
        <i className='pi pi-plus' />
      </Button>

      {/* SEARCH */}
      <div className='layout-breadcrumb-right-items'>
        <button
          tabIndex={0}
          className='search-icon p-link'
          onClick={props.breadcrumbClick}
        >
          <i className='pi pi-search'></i>
        </button>

        {/* CONTAINER */}
        <div
          className={classNames('search-wrapper', {
            'active-search-wrapper': props.searchActive,
          })}
        >
          <div className='search-box'>
            <button className='btn-search'>
              <i className='pi pi-search'></i>
            </button>
            <input
              type='text'
              className='input-search'
              placeholder='Escribe para buscar...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className={`search-box-results shadow-2 z-3 ${search && 'p-5'} `}
              style={{ height: search ? 'fit-content' : '0px' }}
            >
              <div className='flex'>
                <div className='p-float-label mr-2'>
                  <MultiSelect
                    display='chip'
                    optionLabel='name'
                    value={selectedCities}
                    options={cities}
                    onChange={(e: MultiSelectProps) =>
                      setSelectedCities(e.value)
                    }
                    className='w-12rem'
                  />
                  <label htmlFor='search'>Filtro de Procesos</label>
                </div>
                <div className='p-input-icon-right p-float-label mr-2'>
                  <i className='pi pi-calendar' />
                  <Calendar
                    id='range'
                    value={dates2}
                    onChange={(e: CalendarProps) => setDates2(e.value)}
                    selectionMode='range'
                    readOnlyInput
                  />
                  <label htmlFor='search'>Filtrar por fecha</label>
                </div>
              </div>

              <hr />

              <h3 className='mb-5'>Documentos</h3>
              <div className='grid gap-2'>
                {/* <DocumentCard notProgress />
                <DocumentCard notProgress />
                <DocumentCard notProgress /> */}
              </div>
              <hr />

              <h3 className='mb-5'>Flujos</h3>
              <div className='grid gap-2'>
                <div className='card shadow-2'>Proceso de nomina</div>
                <div className='card shadow-2'>Proceso de nomina</div>
                <div className='card shadow-2'>Proceso de nomina</div>
              </div>
            </div>
          </div>
        </div>

        <span className='layout-rightmenu-button-desktop mr-2'>
          <Button
            icon='pi pi-comment'
            className='layout-rightmenu-button p-button-secondary'
            onClick={() => setChat(true)}
          ></Button>
        </span>

        <span className='layout-rightmenu-button-desktop'>
          <Button
            icon='pi pi-inbox'
            className='p-overlay-badge layout-rightmenu-button p-button-secondary h-full overflow-visible'
            onClick={props.onRightMenuButtonClick}
          >
            {notifications?.length > 0 && (
              <Badge
                value={notifications?.length || 0}
                severity='danger'
                className='text-xs'
              ></Badge>
            )}
          </Button>
        </span>

        <span className='layout-rightmenu-button-mobile'>
          <Button
            icon='pi pi-bookmark'
            className='layout-rightmenu-button'
            onClick={props.onRightMenuButtonClick}
          ></Button>
        </span>
      </div>

      <Chat open={chat} onClose={() => setChat(false)} />
      {createModal && (
        <CreateModal
          visible={createModal}
          onHide={() => setCreateModal(false)}
        />
      )}
    </div>
  )
}

export default AppBreadcrumb
