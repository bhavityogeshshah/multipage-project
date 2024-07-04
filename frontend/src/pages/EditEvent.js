import { useRouteLoaderData } from 'react-router-dom'
import EventForm from '../components/EventForm'
const EditEventPage = () => {
  const data = useRouteLoaderData('event-detail');
  const event =data.event;
  return (
    <div>
      <EventForm event={event} method='PATCH'/>
    </div>
  )
}

export default EditEventPage