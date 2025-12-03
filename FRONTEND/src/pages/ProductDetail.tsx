import { useParams, Link, Navigate } from 'react-router-dom'
import { products } from '@/data/products'
import { Button } from '@/components/ui/button'
import { Check, ChevronLeft } from 'lucide-react'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div
          className="mb-12 animate-fade-in-up opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-foreground transition-colors bg-gray-100 px-4 py-2 rounded-full"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para Produtos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div
            className="order-2 lg:order-1 animate-fade-in-up-delay-1 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
              {product.name}
            </h1>
            <p className="text-2xl text-gray-500 leading-relaxed mb-12 text-balance font-medium">
              {product.fullDescription}
            </p>

            <div className="space-y-6 mb-12">
              <h3 className="text-xl font-bold text-foreground">
                Principais Recursos:
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-gray-600 font-medium text-lg"
                  >
                    <div className="mt-1 bg-accent/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 py-7 text-lg shadow-lg hover:scale-105 transition-all">
                Solicitar Proposta
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-10 py-7 text-lg border-gray-200 hover:bg-gray-50"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>

          <div
            className="order-1 lg:order-2 animate-fade-in-up-delay-2 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 bg-white aspect-square lg:aspect-[4/3]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1500 ease-apple"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}