import { useEffect, useRef } from 'react'

interface SecureIframeProps {
  src: string
  title: string
}

export default function SecureIframe({ src, title }: SecureIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      try {
        // Prevent navigation
        iframe.contentWindow?.location.replace('about:blank')
      } catch (error) {
        console.error('Error handling iframe load:', error)
      }
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="w-full h-full"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="no-referrer"
      loading="lazy"
      style={{ border: 'none' }}
    />
  )
} 