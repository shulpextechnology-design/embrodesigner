export function Navigation() {
  const cartCount = 2;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">ED</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Embro Designer</h1>
              <p className="text-xs text-gray-500">Premium Designs</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/browse" className="text-sm font-medium text-gray-700 hover:text-orange-600">Browse</a>
            <a href="/designers" className="text-sm font-medium text-gray-700 hover:text-orange-600">Designers</a>
            <a href="/sale" className="text-sm font-medium text-gray-700 hover:text-orange-600">Sale</a>
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden sm:block">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search designs..." className="w-full sm:w-48 lg:w-64 h-9 pl-10 pr-4 text-sm border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:border-orange-500" />
            </div>
            <button className="flex-shrink-0 text-gray-600 hover:text-orange-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
            <button className="relative flex-shrink-0 text-gray-600 hover:text-orange-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}