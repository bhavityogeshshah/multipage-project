import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const data = useLoaderData();

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={data.events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}
export default EventsPage;


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
export function loader() {
  return defer({
    events: loadEvents()
  })
}