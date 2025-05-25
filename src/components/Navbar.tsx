import { MeetingInsightsLogo, SearchIcon } from './icons/Icons';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-3 px-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <MeetingInsightsLogo className="h-7 w-7" />
          <span className="font-medium text-lg">SmartMeet</span>
        </div>
        <div className="flex items-center gap-6">
          <NavLink href="#" label="Meetings" active={true} />
          <NavLink href="#" label="Templates" active={false} />
          <NavLink href="#" label="Reports" active={false} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search meetings..."
            className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white border border-transparent focus:border-amber-400 w-60"
          />
          <SearchIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium">Feedback</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url("https://randomuser.me/api/portraits/women/44.jpg")' }}></div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a 
      href={href} 
      className={`text-sm font-medium transition-colors ${active ? 'text-amber-500' : 'text-gray-600 hover:text-gray-800'}`}
    >
      {label}
      {active && <div className="h-0.5 bg-amber-500 mt-2 rounded-full"></div>}
    </a>
  );
}