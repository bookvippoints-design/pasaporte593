import { useState, useEffect } from 'react'
import BusinessCard from '../components/BusinessCard'
import Footer from '../components/Footer'
import { supabase } from '../supabase'

export default function Listings() {
  const [businesses, setBusinesses] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const [{ data: biz }, { data: cats }] = await Promise.all([
        supabase.from('businesses').select('*, categories(name, icon), promotions(id, title, type, value, valid_until, active)').eq('active', true).order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ])
      setBusinesses(biz || [])
      setCategories(cats || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = businesses.filter(b => {
    const matchCat = activeCategory === 'Todos' || b.categories?.name === activeCategory
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || (b.city || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div>
      <section className="bg-brand-navy py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Directorio</span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl mt-2 mb-4">Establecimientos participantes</h1>
          <p className="font-body text-white/70 text-base max-w-xl mx-auto leading-relaxed">Encuentra tu próxima parada, visita el local, sella tu pasaporte y acumula puntos BookVipPoints.</p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Buscar establecimiento o ciudad..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 font-body text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-orange" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 flex-nowrap">
            <button onClick={() => setActiveCategory('Todos')} className={`flex-shrink-0 font-body text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${activeCategory === 'Todos' ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Todos</button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={`flex-shrink-0 font-body text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${activeCategory === cat.name ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🗺️</div>
              <p className="font-heading font-semibold text-brand-navy text-lg mb-2">Sin resultados</p>
              <p className="font-body text-gray-500 text-sm">Intenta con otra categoría o búsqueda.</p>
            </div>
          ) : (
            <>
              <p className="font-body text-gray-400 text-sm mb-6">{filtered.length} establecimiento{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(b => <BusinessCard key={b.id} business={b} />)}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}