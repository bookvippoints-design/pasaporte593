import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Footer from '../components/Footer'
import { WA_URL } from '../config'
import { supabase } from '../supabase'

export default function BusinessProfile() {
  const { slug } = useParams()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    async function fetchBusiness() {
      const { data } = await supabase
        .from('businesses')
        .select('*, categories(name, icon), business_images(url, order), promotions(id, title, description, type, value, valid_until, active, promotion_images(id, image_url))')
        .eq('slug', slug)
        .eq('active', true)
        .single()
      setBusiness(data)
      setLoading(false)
    }
    fetchBusiness()
  }, [slug])

  const gallery = business?.business_images?.sort((a, b) => a.order - b.order).map(i => i.url) || []
  const activePromos = business?.promotions?.filter(p => p.active) || []

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + gallery.length) % gallery.length), [gallery.length])
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % gallery.length), [gallery.length])

  useEffect(() => {
    const handler = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, prevImage, nextImage])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-warm-bg">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">🛂</div>
        <p className="font-body text-gray-400 text-sm">Cargando...</p>
      </div>
    </div>
  )

  if (!business) return (
    <div className="min-h-screen flex items-center justify-center bg-warm-bg">
      <div className="text-center">
        <div className="text-5xl mb-4">🗺️</div>
        <h2 className="font-heading font-bold text-brand-navy text-xl mb-2">Establecimiento no encontrado</h2>
        <Link to="/establecimientos" className="font-body text-brand-orange hover:underline text-sm">← Volver al directorio</Link>
      </div>
    </div>
  )

  const mapsUrl = business.lat && business.lng
    ? `https://www.google.com/maps?q=${business.lat},${business.lng}`
    : business.address ? `https://www.google.com/maps/search/${encodeURIComponent(business.address + ' ' + (business.city || ''))}` : null

  const wazeUrl = business.lat && business.lng
    ? `https://waze.com/ul?ll=${business.lat},${business.lng}&navigate=yes` : null

  return (
    <div>
      <div className="relative h-72 md:h-96 bg-brand-navy overflow-hidden">
        {business.image_url && <img src={business.image_url} alt={business.name} className="w-full h-full object-cover opacity-60" />}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-6xl mx-auto">
          <Link to="/establecimientos" className="inline-flex items-center gap-1 font-body text-white/70 text-sm hover:text-white mb-4 transition-colors">← Directorio</Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-body text-xs font-medium text-brand-orange bg-white/10 px-2.5 py-1 rounded-full">
              {business.categories?.icon} {business.categories?.name}
            </span>
            {business.city && <span className="font-body text-white/60 text-xs">📌 {business.city}</span>}
          </div>
          <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl">{business.name}</h1>
        </div>
      </div>

      <section className="py-12 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
              <span className="text-3xl">🛂</span>
              <div>
                <p className="font-heading font-bold text-brand-navy text-sm">Sella tu pasaporte aquí</p>
                <p className="font-body text-gray-400 text-xs">Abre BookVipPoints, escanea el QR del local y los puntos se acreditan al instante.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-heading font-bold text-brand-navy text-lg mb-3">Sobre este establecimiento</h2>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{business.description}</p>
              {business.address && <p className="font-body text-gray-400 text-xs mt-3">📍 {business.address}{business.city ? `, ${business.city}` : ''}</p>}
            </div>

            {activePromos.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-heading font-bold text-brand-navy text-lg mb-4">Promociones activas</h2>
                <div className="space-y-3">
                  {activePromos.map(promo => (
                    <div key={promo.id} className="bg-warm-bg rounded-xl p-4 border border-gray-100">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{promo.type === 'puntos_extra' ? '⭐' : '🏷️'}</span>
                        <div className="flex-1">
                          <p className="font-heading font-semibold text-brand-navy text-sm">{promo.title}</p>
                          {promo.description && <p className="font-body text-gray-500 text-xs mt-0.5">{promo.description}</p>}
                          {promo.valid_until && <p className="font-body text-gray-400 text-xs mt-1">Válido hasta: {new Date(promo.valid_until).toLocaleDateString('es-EC')}</p>}
                        </div>
                      </div>
                      {promo.promotion_images && promo.promotion_images.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {promo.promotion_images.map(img => (
                            <button key={img.id} onClick={() => setLightboxIndex({ url: img.image_url })} className="hover:opacity-90 transition-opacity">
                              <img src={img.image_url} alt="" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-heading font-bold text-brand-navy text-lg mb-4">Galería</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <button key={i} onClick={() => setLightboxIndex(i)} className="rounded-xl overflow-hidden aspect-video bg-gray-100 hover:opacity-90 transition-opacity">
                      <img src={img} alt={`${business.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-brand-navy rounded-2xl p-6 text-white">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-heading font-bold text-white text-base mb-2">Acumula puntos aquí</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-4">Visita este establecimiento, escanea el QR y los puntos se acreditan en tu cuenta BookVipPoints.</p>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="font-body text-white/60 text-xs">Cada visita te acerca a tu próximo hospedaje</p>
              </div>
            </div>

            {(mapsUrl || wazeUrl) && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading font-bold text-brand-navy text-base mb-4">Cómo llegar</h3>
                <div className="space-y-2">
                  {mapsUrl && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-blue-50 text-blue-700 font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors">🗺️ Abrir en Google Maps</a>}
                  {wazeUrl && <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-cyan-50 text-cyan-700 font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-cyan-100 transition-colors">🚗 Abrir en Waze</a>}
                </div>
              </div>
            )}

            {(business.phone || business.whatsapp || business.instagram || business.facebook || business.tiktok) && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-heading font-bold text-brand-navy text-base mb-4">Contacto</h3>
                <div className="space-y-2">
                  {business.whatsapp && <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-[#25D366] text-white font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-green-500 transition-colors">💬 WhatsApp</a>}
                  {business.instagram && <a href={`https://instagram.com/${business.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-pink-50 text-pink-700 font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-pink-100 transition-colors">📸 Instagram</a>}
                  {business.facebook && <a href={`https://facebook.com/${business.facebook.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-blue-50 text-blue-700 font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors">👥 Facebook</a>}
                  {business.tiktok && <a href={`https://tiktok.com/@${business.tiktok.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-gray-900 text-white font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors">🎵 TikTok</a>}
                  {business.phone && <a href={`tel:${business.phone}`} className="flex items-center gap-2 w-full justify-center bg-gray-50 text-gray-700 font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">📞 {business.phone}</a>}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-heading font-bold text-brand-navy text-base mb-3">¿Tienes preguntas?</h3>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full justify-center bg-[#25D366] text-white font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-green-500 transition-colors">💬 Escribir por WhatsApp</a>
            </div>

            <Link to="/establecimientos" className="flex items-center justify-center gap-2 w-full bg-warm-bg text-brand-navy font-heading font-semibold text-sm px-4 py-3 rounded-xl border border-gray-200 hover:border-brand-navy transition-colors">
              ← Ver más establecimientos
            </Link>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl font-light" onClick={closeLightbox}>×</button>
          {typeof lightboxIndex === 'number' && gallery.length > 1 && <>
            <button className="absolute left-4 text-white/60 hover:text-white text-3xl px-3 py-2" onClick={e => { e.stopPropagation(); prevImage() }}>‹</button>
            <button className="absolute right-4 text-white/60 hover:text-white text-3xl px-3 py-2" onClick={e => { e.stopPropagation(); nextImage() }}>›</button>
          </>}
          <img
            src={typeof lightboxIndex === 'number' ? gallery[lightboxIndex] : lightboxIndex.url}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          {typeof lightboxIndex === 'number' && <p className="absolute bottom-4 text-white/50 text-sm">{lightboxIndex + 1} / {gallery.length}</p>}
        </div>
      )}

      <Footer />
    </div>
  )
}