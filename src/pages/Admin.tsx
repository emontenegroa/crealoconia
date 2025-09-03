import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, Edit, Trash2, Eye, Filter, RefreshCw, Copy, CheckSquare, Square } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface FormSubmission {
  id: string;
  email: string;
  form_data: any;
  created_at: string;
  updated_at: string;
  completed: boolean;
  attempt_number: number;
}

interface AdminFilters {
  email: string;
  completed: boolean | null;
  dateFrom: string;
  dateTo: string;
  hasLovablePrompt: boolean | null;
}

export default function Admin() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [filters, setFilters] = useState<AdminFilters>({
    email: '',
    completed: null,
    dateFrom: '',
    dateTo: '',
    hasLovablePrompt: null
  });
  const { toast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [submissions, filters]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      console.log('Intentando cargar submissions...');
      
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Respuesta de Supabase:', { data, error });
      
      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }
      
      console.log(`Cargados ${data?.length || 0} registros`);
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: "Error",
        description: `No se pudieron cargar los datos: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...submissions];

    if (filters.email) {
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.completed !== null) {
      filtered = filtered.filter(sub => sub.completed === filters.completed);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(sub => 
        new Date(sub.created_at) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(sub => 
        new Date(sub.created_at) <= new Date(filters.dateTo)
      );
    }

    if (filters.hasLovablePrompt !== null) {
      filtered = filtered.filter(sub => {
        const hasPrompt = sub.form_data?.generatedPrompts?.lovablePrompt;
        return filters.hasLovablePrompt ? !!hasPrompt : !hasPrompt;
      });
    }

    setFilteredSubmissions(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Completado', 'Fecha Creación', 'Intentos', 'Tiene Prompt Lovable', 'Marca', 'Quien Eres'];
    
    const csvData = filteredSubmissions.map(sub => [
      sub.email,
      sub.completed ? 'Sí' : 'No',
      new Date(sub.created_at).toLocaleDateString('es-ES'),
      sub.attempt_number,
      sub.form_data?.generatedPrompts?.lovablePrompt ? 'Sí' : 'No',
      sub.form_data?.marca || '',
      sub.form_data?.quien_eres || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `form_submissions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: "Exportación completada",
      description: `Se exportaron ${filteredSubmissions.length} registros`
    });
  };

  const exportLovablePrompts = () => {
    const submissionsWithPrompts = filteredSubmissions.filter(sub => 
      sub.form_data?.generatedPrompts?.lovablePrompt
    );

    const jsonData = submissionsWithPrompts.map(sub => ({
      email: sub.email,
      fecha: sub.created_at,
      marca: sub.form_data?.marca,
      lovablePrompt: sub.form_data?.generatedPrompts?.lovablePrompt,
      superPrompt: sub.form_data?.generatedPrompts?.superPrompt
    }));

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { 
      type: 'application/json;charset=utf-8;' 
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lovable_prompts_${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    toast({
      title: "Prompts exportados",
      description: `Se exportaron ${submissionsWithPrompts.length} prompts de Lovable`
    });
  };

  const updateSubmission = async (id: string, updates: Partial<FormSubmission>) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await loadSubmissions();
      setEditMode(false);
      setSelectedSubmission(null);

      toast({
        title: "Actualización exitosa",
        description: "Los datos se actualizaron correctamente"
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el registro",
        variant: "destructive"
      });
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadSubmissions();
      toast({
        title: "Eliminación exitosa",
        description: "El registro se eliminó correctamente"
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el registro",
        variant: "destructive"
      });
    }
  };

  const deleteMultipleSubmissions = async () => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .in('id', selectedIds);

      if (error) throw error;

      await loadSubmissions();
      setSelectedIds([]);
      setShowDeleteConfirm(false);
      
      toast({
        title: "Eliminación exitosa",
        description: `Se eliminaron ${selectedIds.length} registros correctamente`
      });
    } catch (error) {
      console.error('Error deleting multiple submissions:', error);
      toast({
        title: "Error",
        description: "No se pudieron eliminar los registros",
        variant: "destructive"
      });
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubmissions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubmissions.map(sub => sub.id));
    }
  };

  const toggleSelectSubmission = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setFilters({
      email: '',
      completed: null,
      dateFrom: '',
      dateTo: '',
      hasLovablePrompt: null
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <>
              <Button 
                onClick={() => setShowDeleteConfirm(true)} 
                variant="destructive" 
                size="sm"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar {selectedIds.length} seleccionados
              </Button>
              <Button 
                onClick={() => setSelectedIds([])} 
                variant="outline" 
                size="sm"
              >
                Cancelar selección
              </Button>
            </>
          )}
          <Button onClick={loadSubmissions} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={exportLovablePrompts} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar Prompts
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="email-filter">Email</Label>
              <Input
                id="email-filter"
                placeholder="Buscar por email..."
                value={filters.email}
                onChange={(e) => setFilters({...filters, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="completed-filter">Estado</Label>
              <Select
                value={filters.completed === null ? 'all' : filters.completed.toString()}
                onValueChange={(value) => setFilters({
                  ...filters, 
                  completed: value === 'all' ? null : value === 'true'
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="true">Completados</SelectItem>
                  <SelectItem value="false">Pendientes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-from">Desde</Label>
              <Input
                id="date-from"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="date-to">Hasta</Label>
              <Input
                id="date-to"
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="lovable-filter">Prompt Lovable</Label>
              <Select
                value={filters.hasLovablePrompt === null ? 'all' : filters.hasLovablePrompt.toString()}
                onValueChange={(value) => setFilters({
                  ...filters, 
                  hasLovablePrompt: value === 'all' ? null : value === 'true'
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="true">Con Prompt</SelectItem>
                  <SelectItem value="false">Sin Prompt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Button onClick={clearFilters} variant="ghost" size="sm">
              Limpiar filtros
            </Button>
            <Badge variant="secondary">
              {filteredSubmissions.length} de {submissions.length} registros
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de datos */}
      <Card>
        <CardHeader>
          <CardTitle>Envíos de Formulario</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Cargando datos...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-12">
                      <Checkbox
                        checked={selectedIds.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Seleccionar todos"
                      />
                    </th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Estado</th>
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-left p-2">Marca</th>
                    <th className="text-left p-2">Prompt Lovable</th>
                    <th className="text-left p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <Checkbox
                          checked={selectedIds.includes(submission.id)}
                          onCheckedChange={() => toggleSelectSubmission(submission.id)}
                          aria-label={`Seleccionar ${submission.email}`}
                        />
                      </td>
                      <td className="p-2">{submission.email}</td>
                      <td className="p-2">
                        <Badge variant={submission.completed ? "default" : "secondary"}>
                          {submission.completed ? "Completado" : "Pendiente"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        {new Date(submission.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="p-2">{submission.form_data?.marca || '-'}</td>
                      <td className="p-2">
                        <Badge variant={submission.form_data?.generatedPrompts?.lovablePrompt ? "default" : "outline"}>
                          {submission.form_data?.generatedPrompts?.lovablePrompt ? "Sí" : "No"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => setSelectedSubmission(submission)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Detalles del Envío</DialogTitle>
                              </DialogHeader>
                              <SubmissionDetails submission={submission} />
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setEditMode(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente el registro de {submission.email}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteSubmission(submission.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de confirmación de eliminación múltiple */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación múltiple?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán permanentemente {selectedIds.length} registros seleccionados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMultipleSubmissions} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar {selectedIds.length} registros
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de edición */}
      {editMode && selectedSubmission && (
        <EditSubmissionModal
          submission={selectedSubmission}
          onClose={() => {
            setEditMode(false);
            setSelectedSubmission(null);
          }}
          onUpdate={updateSubmission}
        />
      )}
    </div>
  );
}

// Componente para mostrar detalles
const SubmissionDetails: React.FC<{ submission: FormSubmission }> = ({ submission }) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado",
        description: `${label} copiado al portapapeles`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles",
        variant: "destructive"
      });
    }
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="form-data">Datos del Formulario</TabsTrigger>
        <TabsTrigger value="prompts">Prompts Generados</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input value={submission.email} readOnly />
          </div>
          <div>
            <Label>Estado</Label>
            <Input value={submission.completed ? "Completado" : "Pendiente"} readOnly />
          </div>
          <div>
            <Label>Fecha de Creación</Label>
            <Input value={new Date(submission.created_at).toLocaleString('es-ES')} readOnly />
          </div>
          <div>
            <Label>Número de Intento</Label>
            <Input value={submission.attempt_number.toString()} readOnly />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="form-data">
        <div className="space-y-4">
          {Object.entries(submission.form_data || {}).map(([key, value]) => {
            if (key === 'generatedPrompts') return null;
            return (
              <div key={key}>
                <Label>{key}</Label>
                <Textarea 
                  value={typeof value === 'string' ? value : JSON.stringify(value, null, 2)} 
                  readOnly 
                  className="min-h-[60px]"
                />
              </div>
            );
          })}
        </div>
      </TabsContent>
      
      <TabsContent value="prompts">
        <div className="space-y-6">
          {submission.form_data?.generatedPrompts?.superPrompt && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Super Prompt</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(submission.form_data.generatedPrompts.superPrompt, "Super Prompt")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
              </div>
              <Textarea 
                value={submission.form_data.generatedPrompts.superPrompt} 
                readOnly 
                className="min-h-[200px]"
              />
            </div>
          )}
          {submission.form_data?.generatedPrompts?.lovablePrompt && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Prompt para Lovable</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(submission.form_data.generatedPrompts.lovablePrompt, "Prompt para Lovable")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
              </div>
              <Textarea 
                value={submission.form_data.generatedPrompts.lovablePrompt} 
                readOnly 
                className="min-h-[200px]"
              />
            </div>
          )}
          {!submission.form_data?.generatedPrompts?.superPrompt && !submission.form_data?.generatedPrompts?.lovablePrompt && (
            <p className="text-muted-foreground text-center py-8">No hay prompts generados para este envío</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Modal de edición
const EditSubmissionModal: React.FC<{
  submission: FormSubmission;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<FormSubmission>) => void;
}> = ({ submission, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: submission.email,
    completed: submission.completed,
    form_data: JSON.stringify(submission.form_data, null, 2)
  });

  const handleSave = () => {
    try {
      const parsedFormData = JSON.parse(formData.form_data);
      onUpdate(submission.id, {
        email: formData.email,
        completed: formData.completed,
        form_data: parsedFormData
      });
    } catch (error) {
      alert('Error en el formato JSON de los datos del formulario');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Envío</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="edit-completed"
              checked={formData.completed}
              onChange={(e) => setFormData({...formData, completed: e.target.checked})}
            />
            <Label htmlFor="edit-completed">Completado</Label>
          </div>
          
          <div>
            <Label htmlFor="edit-form-data">Datos del Formulario (JSON)</Label>
            <Textarea
              id="edit-form-data"
              value={formData.form_data}
              onChange={(e) => setFormData({...formData, form_data: e.target.value})}
              className="min-h-[300px] font-mono"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};