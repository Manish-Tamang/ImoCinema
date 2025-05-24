import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-header-height-footer-height)] py-12">
      <Image 
        src="/404.png" 
        alt="404 Not Found Illustration" 
        width={500} 
        height={300}
        className="max-w-full h-auto mb-8"
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      <h1 className="text-4xl font-bold font-ibm-plex text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-lg font-ibm-plex text-gray-600 mb-8">
        Could not find the requested resource
      </p>
      <Link href="/" className="bg-[#FF6363] text-white px-4 py-2 rounded-md font-ibm-plex">
        Return Home
      </Link>
    </div>
  )
} 