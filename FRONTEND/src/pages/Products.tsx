import { products } from '@/data/products'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Products() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <section className="container mx-auto px-6 mb-24 text-center">
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 animate-fade-in-up opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          Nossos Produtos
        </h1>
        <p
          className="text-2xl text-gray-500 max-w-3xl mx-auto animate-fade-in-up-delay-1 opacity-0 font-medium"
          style={{ animationFillMode: 'forwards' }}
        >
          Soluções desenhadas para cada etapa da jornada de saúde da sua
          empresa. Simples, integradas e humanas.
        </p>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className={cn(
                'group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 ease-apple hover:-translate-y-2 animate-fade-in-up-delay-2 opacity-0',
              )}
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                animationFillMode: 'forwards',
              }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 p-8 flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl shadow-sm transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8 flex-grow font-medium">
                  {product.shortDescription}
                </p>
                <div className="flex items-center text-accent font-semibold text-lg mt-auto">
                  Saiba mais{' '}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}