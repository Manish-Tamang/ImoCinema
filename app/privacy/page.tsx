export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 font-ibm-plex">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>

      <div className="prose prose-gray space-y-4">
        <p className="text-sm text-gray-600">Last updated: January 2024</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            CineHamster does not collect personal information. We do not require user accounts or store any personal
            data. Your movie searches and viewing preferences are not tracked or stored.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may use essential cookies to ensure proper functionality. These cookies do not store personal
            information and are necessary for the website to work correctly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Third-Party Content</h2>
          <p className="text-gray-700 leading-relaxed">
            Movie content is sourced from third-party providers. We are not responsible for the privacy practices of
            these external services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our support channels.
          </p>
        </section>
      </div>
    </div>
  )
}
