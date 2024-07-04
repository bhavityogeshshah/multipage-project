import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom"
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {

  const { event, events } = useRouteLoaderData('event-detail');


  return (
    <div>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {laodedEvent => <EventItem event={laodedEvent} />}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={events} fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
          {laodedEvents => <EventsList events={laodedEvents} />}
        </Await>
      </Suspense>


    </div>
  )
}

export default EventDetailPage;

async function loadEvent(id) {

  const response = await fetch('http://localhost:8080/events/' + id)
  if (!response.ok) {
    throw json({ message: 'Could not fetch details of selected elements' },
      { status: 500 });
  } else {
    const resData = await response.json()
    return resData.event;
  }
}


async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events'};
    throw json({ message: 'Could not fetch elements' },
      { status: 500 });
  } else {
    const resData = await response.json()
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId

  return defer({
    event: loadEvent(id),
    events: loadEvents()
  })
}




export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  })

  if (!response.ok) {
    throw json({ message: 'Could not delete event' },
      { status: 500 });
  }
  return redirect('/events');
}