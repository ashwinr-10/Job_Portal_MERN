import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-2">ProConnect.io</h2>
            <p className="text-sm text-gray-600">
              Connecting top talent with forward-thinking companies.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Job Seekers</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><a  className="hover:underline">Browse Jobs</a></li>
              <li><a  className="hover:underline">Create Account</a></li>
              <li><a  className="hover:underline">Career Resources</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Employers</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><a  className="hover:underline">Post a Job</a></li>
              <li><a  className="hover:underline">Pricing</a></li>
              <li><a  className="hover:underline">Talent Solutions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Company</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><a  className="hover:underline">About Us</a></li>
              <li><a  className="hover:underline">Blog</a></li>
              <li><a  className="hover:underline">Contact</a></li>
              <li><a  className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 mb-2 md:mb-0">
            © {new Date().getFullYear()} ProConnect.io. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
