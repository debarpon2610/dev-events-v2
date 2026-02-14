import ExploreBtn from './exploreBtn';
import EventCard from '@/components/ui/event-card';


const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

const HomePage = async () => {


  return (
    <div className='relative -top-12.5 text-center mt-10 mb-20 ml-5 mr-5'>
      <h1 >Dev Events</h1>


      <h3 className='text-gradient2 mt-5'>The One Stop Solution to All Your Future Dev Events</h3>

      <p className='mt-5'><span className='text-gradient2'>Keep yourself updated with all the latest Dev Events that might concern you. Never miss another </span><br/>
      <span className='text-gradient2'>Hackathon, Developer's Meet or Coding Workshop with Dev Events by your side.</span></p>

      <ExploreBtn id='explore-btn' classname="mt-8"/>

      
        <div className='mt-20 space-y-7' id='events'>
        <h3 className='text-gradient1 underline'>Upcoming Events</h3>
        <ul className='events'>
          <>    </>
        </ul>

      </div>
      
    </div>
  )
}

export default HomePage