export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 font-ibm-plex">
      <h1 className="text-3xl font-bold text-gray-900">About ImoCinema</h1>

      <div className="prose prose-gray">
        <p className="text-lg text-gray-700 leading-relaxed">
        ImoCinema is a minimalistic movie streaming platform designed to provide a clean and simple way to discover
          and watch your favorite movies.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Our platform focuses on user experience with a clutter-free interface, fast search capabilities, and reliable
          streaming options. We believe that finding and watching movies should be straightforward and enjoyable.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Features</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Fast and accurate movie search</li>
          <li>• High-quality movie posters and details</li>
          <li>• Multiple streaming server options</li>
          <li>• Responsive design for all devices</li>
          <li>• Clean, minimalistic interface</li>
        </ul>
      </div>
    </div>
  )
}
