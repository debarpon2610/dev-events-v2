import Image from "next/image"
import Link from "next/link"


interface EventCardProps {
    title: string;
    image: string;
    slug:string;
    location: string;
    date: string;
    time: string;
}

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

const EventCard = ({ title, image, slug, location, date, time }: EventCardProps) => {
  return (
    <Link href={`${BASE_URL}/event/${slug}`} id="event-card" className="group transition-transform duration-200 ease-in-out hover:shadow-lg hover:scale-104">
        <Image src={image} alt={title} width={410} height={300} className="poster filter brightness-75 duration-200 ease-in-out transition-filter group-hover:brightness-100"/>
        <p className="title">{title}</p>
        <p className="location">{location}</p>
        <div className="date-time text-center">
            <div className="flex justify-center items-center gap-0">
              <Image src="/icons/calendar.svg" alt="Calendar Icon" width={16} height={16} className="mr-1"/> 
              <p>{date}</p>
            </div>
            <div className="flex justify-center items-center gap-0">
              <Image src="/icons/clock.svg" alt="Time Icon" width={16} height={16} className="mr-1"/> 
              <p>{time}</p>
            </div>

        </div>
    </Link>
  )}


export default EventCard