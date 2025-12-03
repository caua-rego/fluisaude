import { Facebook, Instagram, Linkedin, Twitter, Droplets } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-[#F5F5F7] text-foreground py-20 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
          <div className="md:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-foreground text-background p-1.5 rounded-lg">
                <Droplets className="h-5 w-5 fill-current" />
              </div>
              <span className="font-semibold text-xl tracking-tight">
                FluiSaúde
              </span>
            </Link>
            <p className="text-gray-500 max-w-xs font-medium">
              Simplificando a gestão de saúde corporativa para empresas que
              valorizam pessoas.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">
              Plataforma
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-600">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Para Colaboradores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Para RH
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Planos e Preços
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">
              Empresa
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-600">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-400">
              Legal
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-600">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Termos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500 font-medium">
            <p>© 2025 FluiSaúde. Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}