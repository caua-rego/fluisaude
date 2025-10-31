import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { createPaciente, getPacientes, updatePaciente, deletePaciente } from '@/services/api';
import { motion } from 'framer-motion';

interface Paciente {
  id?: number;
  nome: string;
  cpf: string;
  telefone?: string;
}

const PacientesCrud: React.FC = () => {
  const { toast } = useToast();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPaciente, setCurrentPaciente] = useState<Paciente | null>(null);
  const [formData, setFormData] = useState<Paciente>({ nome: '', cpf: '', telefone: '' });

  useEffect(() => {
    fetchPacientes();
  }, []);

  const fetchPacientes = async () => {
    try {
      setLoading(true);
      const response = await getPacientes();
      setPacientes(response.data);
    } catch (err) {
      setError('Erro ao buscar pacientes.');
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os pacientes.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentPaciente?.id) {
        await updatePaciente(currentPaciente.id, formData);
        toast({
          title: 'Sucesso',
          description: 'Paciente atualizado com sucesso!',
        });
      } else {
        await createPaciente(formData);
        toast({
          title: 'Sucesso',
          description: 'Paciente criado com sucesso!',
        });
      }
      setIsModalOpen(false);
      setFormData({ nome: '', cpf: '', telefone: '' });
      setCurrentPaciente(null);
      fetchPacientes();
    } catch (err) {
      setError('Erro ao salvar paciente.');
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o paciente. Verifique os dados.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (paciente: Paciente) => {
    setCurrentPaciente(paciente);
    setFormData(paciente);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este paciente?')) {
      try {
        await deletePaciente(id);
        toast({
          title: 'Sucesso',
          description: 'Paciente deletado com sucesso!',
        });
        fetchPacientes();
      } catch (err) {
        setError('Erro ao deletar paciente.');
        toast({
          title: 'Erro',
          description: 'Não foi possível deletar o paciente.',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading) return <div className="text-center text-foreground">Carregando pacientes...</div>;
  if (error) return <div className="text-center text-destructive">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-card rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-primary">Gestão de Pacientes</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setCurrentPaciente(null); setFormData({ nome: '', cpf: '', telefone: '' }); }}>Adicionar Paciente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentPaciente ? 'Editar Paciente' : 'Adicionar Novo Paciente'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" value={formData.cpf} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} />
              </div>
              <DialogFooter>
                <Button type="submit">{currentPaciente ? 'Salvar Alterações' : 'Adicionar'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {pacientes.length === 0 ? (
        <p className="text-muted-foreground">Nenhum paciente cadastrado ainda.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell className="font-medium">{paciente.id}</TableCell>
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(paciente)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(paciente.id!)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
};

export default PacientesCrud;
