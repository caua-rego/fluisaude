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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createMedico, getMedicos, updateMedico, deleteMedico, getEspecialidades } from '@/services/api';
import { motion } from 'framer-motion';

interface Medico {
  id?: number;
  nome: string;
  crm: string;
  especialidade_id: number;
  especialidade?: {
    nome: string;
  };
}

interface Especialidade {
  id: number;
  nome: string;
}

const MedicosCrud: React.FC = () => {
  const { toast } = useToast();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentMedico, setCurrentMedico] = useState<Medico | null>(null);
  const [formData, setFormData] = useState<Medico>({ nome: '', crm: '', especialidade_id: 0 });

  useEffect(() => {
    fetchMedicos();
    fetchEspecialidadesData();
  }, []);

  const fetchMedicos = async () => {
    try {
      setLoading(true);
      const response = await getMedicos();
      setMedicos(response.data);
    } catch (err) {
      setError('Erro ao buscar médicos.');
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os médicos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEspecialidadesData = async () => {
    try {
      const response = await getEspecialidades();
      setEspecialidades(response.data);
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as especialidades.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, especialidade_id: parseInt(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentMedico?.id) {
        await updateMedico(currentMedico.id, formData);
        toast({
          title: 'Sucesso',
          description: 'Médico atualizado com sucesso!',
        });
      } else {
        await createMedico(formData);
        toast({
          title: 'Sucesso',
          description: 'Médico criado com sucesso!',
        });
      }
      setIsModalOpen(false);
      setFormData({ nome: '', crm: '', especialidade_id: 0 });
      setCurrentMedico(null);
      fetchMedicos();
    } catch (err) {
      setError('Erro ao salvar médico.');
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o médico. Verifique os dados.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (medico: Medico) => {
    setCurrentMedico(medico);
    setFormData(medico);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este médico?')) {
      try {
        await deleteMedico(id);
        toast({
          title: 'Sucesso',
          description: 'Médico deletado com sucesso!',
        });
        fetchMedicos();
      } catch (err) {
        setError('Erro ao deletar médico.');
        toast({
          title: 'Erro',
          description: 'Não foi possível deletar o médico.',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading) return <div className="text-center text-foreground">Carregando médicos...</div>;
  if (error) return <div className="text-center text-destructive">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-card rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-primary">Gestão de Médicos</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setCurrentMedico(null); setFormData({ nome: '', crm: '', especialidade_id: 0 }); }}>Adicionar Médico</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentMedico ? 'Editar Médico' : 'Adicionar Novo Médico'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="crm">CRM</Label>
                <Input id="crm" name="crm" value={formData.crm} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="especialidade_id">Especialidade</Label>
                <Select onValueChange={handleSelectChange} value={formData.especialidade_id ? String(formData.especialidade_id) : ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {especialidades.map((esp) => (
                      <SelectItem key={esp.id} value={String(esp.id)}>
                        {esp.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">{currentMedico ? 'Salvar Alterações' : 'Adicionar'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {medicos.length === 0 ? (
        <p className="text-muted-foreground">Nenhum médico cadastrado ainda.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CRM</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicos.map((medico) => (
              <TableRow key={medico.id}>
                <TableCell className="font-medium">{medico.id}</TableCell>
                <TableCell>{medico.nome}</TableCell>
                <TableCell>{medico.crm}</TableCell>
                <TableCell>{medico.especialidade?.nome || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(medico)}>Editar</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(medico.id!)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
};

export default MedicosCrud;
