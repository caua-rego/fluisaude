import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Droplets, ArrowRight, Loader2 } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-200/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md px-6 z-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity mb-8"
          >
            <div className="bg-foreground text-background p-2 rounded-xl shadow-lg">
              <Droplets className="h-6 w-6 fill-current" />
            </div>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-500 font-medium">
            Acesse sua conta para gerenciar seus benefícios.
          </p>
        </div>

        <div className="glass-panel p-10 rounded-[2.5rem] bg-white/60">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email Corporativo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50 border-white/40 focus:bg-white transition-all h-14 rounded-2xl text-lg px-4"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base font-medium">
                  Senha
                </Label>
                <Link
                  to="#"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 border-white/40 focus:bg-white transition-all h-14 rounded-2xl text-lg px-4"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 text-lg font-semibold shadow-lg transition-all hover:scale-[1.02] mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Entrar <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200/50 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Ainda não tem uma conta?{' '}
              <Link
                to="#"
                className="font-semibold text-foreground hover:underline transition-colors"
              >
                Fale com o RH
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-foreground transition-colors"
          >
            &larr; Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  )
}