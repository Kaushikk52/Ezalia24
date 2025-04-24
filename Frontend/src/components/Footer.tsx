import { Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900  text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Ezalia24</h3>
          <p className="text-purple-200">
            GrowthMatrix is a growth marketing agency that specialize in
            delivering iterative and data-driven growth operations for
            fast-growing companies.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-purple-200 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-purple-200 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-purple-200 hover:text-white"
              >
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-purple-200 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/services"
                className="text-purple-200 hover:text-white"
              >
                Influencer Marketing
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-purple-200 hover:text-white"
              >
                Content Strategy
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-purple-200 hover:text-white"
              >
                Brand Growth
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-purple-200 hover:text-white"
              >
                Analytics
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2">
            <li className="text-purple-200 flex">
              <Mail className=" mr-2" /> <a href="mailto:partnership@growthmatrix.agency"> partnership@growthmatrix.agency</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center text-purple-200">
          <p>&copy; 2024 All Rights Reserved By Ezalia24</p>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/company/growthmatrixagency"
            className="text-white hover:text-blue-400 transition-colors duration-200"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">Linkedin</span>
          </a>
          <a
            href="https://x.com/growthmatrixx"
            className="text-white hover:text-blue-400 transition-colors duration-200"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}
