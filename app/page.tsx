import { Suspense } from 'react'
import HomePage from '@/components/specific client components/home';
import { Spinner } from '@/components/ui/spinner';

const page = async () => {
  return (
    <Suspense fallback={<Spinner className='size-8'/>}>
      <HomePage/>
    </Suspense>
  )
}

export default page