export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 font-ibm-plex">
      <div className="w-full max-w-[815px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">© {new Date().getFullYear()} ImoCinema. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              About
            </a>
            <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="https://www.manishtamang.com/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
