import React from 'react'
import EventsNavigation from '../components/EventsNavigation'
import { Outlet } from 'react-router-dom'

const EventsRoot = () => {
  return (
    <div>
      <EventsNavigation />
      <Outlet />
    </div>
  )
}

export default EventsRoot