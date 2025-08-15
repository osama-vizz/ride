import { Car, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Car className="text-primary text-2xl" />
              <span className="text-xl font-bold">RideShare Pro</span>
            </Link>
            <p className="text-slate-300 mb-4">
              Premium ride booking platform offering the best vehicles and customer experience.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-300 hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-slate-300 hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-slate-300 hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8-.568-1.07-.318-2.368.632-3.318.95-.95 2.248-1.2 3.318-.632 1.07.568 1.8 1.719 1.8 3.016 0 1.864-1.512 3.374-3.374 3.374v.36zm7.519 0c-1.297 0-2.448-.73-3.016-1.8-.568-1.07-.318-2.368.632-3.318.95-.95 2.248-1.2 3.318-.632 1.07.568 1.8 1.719 1.8 3.016 0 1.864-1.512 3.374-3.374 3.374v.36z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/rides" className="text-slate-300 hover:text-primary transition-colors" data-testid="link-browse-rides">
                  Browse Rides
                </Link>
              </li>
              <li>
                <a href="#about" className="text-slate-300 hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-300 hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#locations" className="text-slate-300 hover:text-primary transition-colors">
                  Locations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="text-slate-300 hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-300 hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-300 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span className="text-slate-300" data-testid="text-phone">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span className="text-slate-300" data-testid="text-email">support@ridesharepro.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span className="text-slate-300" data-testid="text-address">123 Business Ave, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-300">
            © 2023 RideShare Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
