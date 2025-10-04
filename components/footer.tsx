import Link from "next/link"

const footerLinks = {
  Product: ["Marketplace", "Pricing", "Documentation", "API Reference"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Community", "GitHub", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-black/[0.96] bg-grid-white/[0.02] px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="mb-3 sm:mb-4 flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="font-mono text-base sm:text-lg font-bold text-white">A</span>
              </div>
              <span className="text-base sm:text-lg font-semibold text-white">Axion</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs">Build, deploy, and monetize AI agents instantly.</p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="min-w-0">
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-white">{category}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs sm:text-sm text-slate-400 transition-colors hover:text-white block truncate">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 border-t border-slate-800 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Axion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
