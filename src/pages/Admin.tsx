import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createClient } from '@supabase/supabase-js';
import { useEmailHandling } from '@/hooks/useEmailHandling';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { TagInput } from '@/components/ui/TagInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Download, Edit, Trash2, Eye, Filter, RefreshCw, CheckSquare, Square, Mail, Loader2, CheckCircle, AlertTriangle, Copy, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface FormSubmission {
  id: string;
  email: string;
  form_data: any;
  created_at: string;
  updated_at: string;
  completed: boolean;
  attempt_number: number;
  tags: string[];
}

interface AdminFilters {
  email: string;
  completed: boolean | null;
  dateFrom: string;
  dateTo: string;
  hasLovablePrompt: boolean | null;
  tag: string;
}

interface AdminProps {
  onLogout: () => void;
}

export default function Admin({ onLogout }: AdminProps) {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'email-tests'>('submissions');
  const [emailTesting, setEmailTesting] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState<any>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [selectedEmailSubmission, setSelectedEmailSubmission] = useState<FormSubmission | null>(null);
  const [emailType, setEmailType] = useState<'custom' | 'follow-up'>('custom');
  const [customEmailSubject, setCustomEmailSubject] = useState('');
  const [customEmailContent, setCustomEmailContent] = useState('');
  const [filters, setFilters] = useState<AdminFilters>({
    email: '',
    completed: null,
    dateFrom: '',
    dateTo: '',
    hasLovablePrompt: null,
    tag: ''
  });
  const { toast } = useToast();
  const { sendTestEmail } = useEmailHandling();

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
      
      // Get admin session from localStorage
      const adminSession = localStorage.getItem('admin_session');
      
      if (!adminSession) {
        toast({
          title: "Sesión expirada",
          description: "Por favor, inicia sesión nuevamente",
          variant: "destructive"
        });
        onLogout();
        return;
      }

      const sessionData = JSON.parse(adminSession);

      // Use edge function to get data with admin privileges
      const { data, error } = await supabase.functions.invoke('admin-data', {
        body: { 
          email: sessionData.email,
          action: 'get_submissions'
        }
      });

      console.log('Respuesta de admin-data:', { data, error });
      
      if (error) {
        console.error('Error de admin-data:', error);
        throw new Error(error.message || 'Error de función admin');
      }

      if (data?.error) {
        throw new Error(data.error);
      }
      
      console.log(`Cargados ${data?.submissions?.length || 0} registros`);
      setSubmissions(data?.submissions || []);
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

    if (filters.tag) {
      filtered = filtered.filter(sub => 
        sub.tags && sub.tags.some(tag => 
          tag.toLowerCase().includes(filters.tag.toLowerCase())
        )
      );
    }

    setFilteredSubmissions(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Completado', 'Fecha Creación', 'Intentos', 'Tiene Prompt Lovable', 'Marca', 'Quien Eres'];
    
    const csvData = filteredSubmissions.map(sub => [
      sub.email,
      sub.completed ? 'Sí' : 'No',
      new Date(sub.created_at).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
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
      // Get admin session from localStorage
      const adminSession = localStorage.getItem('admin_session');
      if (!adminSession) {
        onLogout();
        return;
      }
      const sessionData = JSON.parse(adminSession);

      const { data, error } = await supabase.functions.invoke('admin-data', {
        body: { 
          email: sessionData.email,
          action: 'update_submission',
          data: { id, updates }
        }
      });

      if (error || data?.error) {
        throw new Error(data?.error || error?.message || 'Error updating submission');
      }

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
      // Get admin session from localStorage
      const adminSession = localStorage.getItem('admin_session');
      if (!adminSession) {
        onLogout();
        return;
      }
      const sessionData = JSON.parse(adminSession);

      const { data, error } = await supabase.functions.invoke('admin-data', {
        body: { 
          email: sessionData.email,
          action: 'delete_submission',
          data: { id }
        }
      });

      if (error || data?.error) {
        throw new Error(data?.error || error?.message || 'Error deleting submission');
      }

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
      console.log('Intentando eliminar registros:', selectedIds);
      
      if (selectedIds.length === 0) {
        toast({
          title: "Error",
          description: "No hay registros seleccionados",
          variant: "destructive"
        });
        return;
      }

      // Get admin session from localStorage
      const adminSession = localStorage.getItem('admin_session');
      if (!adminSession) {
        onLogout();
        return;
      }
      const sessionData = JSON.parse(adminSession);

      const { data, error } = await supabase.functions.invoke('admin-data', {
        body: { 
          email: sessionData.email,
          action: 'delete_multiple_submissions',
          data: { ids: selectedIds }
        }
      });

      console.log('Resultado de eliminación:', { data, error });

      if (error || data?.error) {
        throw new Error(data?.error || error?.message || 'Error deleting submissions');
      }

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
        description: `No se pudieron eliminar los registros: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const runEmailTest = async () => {
    setEmailTesting(true);
    setEmailTestResult(null);

    try {
      console.log('🧪 Iniciando prueba del sistema de email...');
      
      // Enviar email de prueba a la cuenta configurada
      const result = await sendTestEmail('esteban.montenegro@gmail.com');
      
      setEmailTestResult({
        success: true,
        message: 'Email de prueba enviado exitosamente',
        data: result
      });

      toast({
        title: "✅ Prueba exitosa",
        description: "El email de prueba se envió correctamente",
      });

    } catch (error) {
      console.error('💥 Error en prueba:', error);
      
      setEmailTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
        error: error
      });

      toast({
        title: "❌ Error en prueba",
        description: "Hubo un problema al enviar el email",
        variant: "destructive",
      });
    } finally {
      setEmailTesting(false);
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
      hasLovablePrompt: null,
      tag: ''
    });
  };

  const handleWhatsAppContact = (submission: FormSubmission) => {
    const name = submission.form_data?.marca || submission.email;
    const message = `Hola ${name}! Te escribo desde CrealoconIA. ¿Cómo estás?`;
    const url = `https://wa.me/56962791772?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = (submission: FormSubmission, type: 'custom' | 'follow-up') => {
    setSelectedEmailSubmission(submission);
    setEmailType(type);
    if (type === 'follow-up') {
      setCustomEmailSubject('¿Completamos tu sitio web en CrealoconIA?');
      setCustomEmailContent(`Hola ${submission.form_data?.marca || submission.email},

Vimos que iniciaste el proceso en CrealoconIA, pero no llegaste a completar las preguntas.
Esas preguntas son la clave: con ellas nuestro sistema crea tu sitio web automáticamente, con textos, diseño y estructura pensados para tu proyecto.

👉 Si completas el formulario ahora, podrás tener tu sitio en minutos y revisarlo de inmediato.

Completar formulario aquí: ${window.location.origin}

¿Por qué vale la pena terminarlo?
✅ Obtienes un sitio web real, no una demo
✅ Hecho a partir de tus respuestas, sin plantillas genéricas
✅ Disponible para revisión gratuita antes de decidir avanzar
✅ Una forma rápida de ver tu negocio en digital sin dolores de cabeza técnicos

Recuerda: quienes completan el formulario reciben su sitio web listo para ver, navegar y evaluar.

El siguiente paso está en tus manos:
👉 Completar formulario aquí: ${window.location.origin}

Si tienes dudas, escríbeme directo a WhatsApp: +56 9 6279 1772

Saludos,
Esteban Montenegro
Fundador de CrealoconIA
📲 WhatsApp: +56 9 6279 1772`);
    } else {
      setCustomEmailSubject('');
      setCustomEmailContent('');
    }
    setShowEmailDialog(true);
  };

  const sendCustomEmail = async () => {
    if (!selectedEmailSubmission || !customEmailSubject || !customEmailContent) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    try {
      setEmailTesting(true);
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          type: emailType,
          email: selectedEmailSubmission.email,
          submissionId: selectedEmailSubmission.id,
          data: {
            subject: customEmailSubject,
            message: customEmailContent,
            name: selectedEmailSubmission.form_data?.marca || selectedEmailSubmission.email
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Email enviado",
        description: `Email enviado correctamente a ${selectedEmailSubmission.email}`,
      });
      
      setShowEmailDialog(false);
      setSelectedEmailSubmission(null);
      setCustomEmailSubject('');
      setCustomEmailContent('');
      // Recargar datos para mostrar el tag actualizado
      loadSubmissions();
    } catch (error: any) {
      console.error('Error enviando email:', error);
      toast({
        title: "Error",
        description: `Error al enviar email: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setEmailTesting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header con controles fijos - botones horizontalmente alineados */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
        <Button 
          onClick={onLogout}
          variant="outline" 
          size="sm"
          className="bg-background/90 backdrop-blur-sm border-border shadow-sm h-9"
        >
          Salir
        </Button>
        <ThemeToggle />
      </div>
      
      <div className="pt-12 sm:pt-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Panel de Administración</h1>
      
      {/* Navegación por pestañas */}
      <div className="flex gap-2 mb-6 border-b">
        <Button
          onClick={() => setActiveTab('submissions')}
          variant={activeTab === 'submissions' ? 'default' : 'ghost'}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Formularios
        </Button>
        <Button
          onClick={() => setActiveTab('email-tests')}
          variant={activeTab === 'email-tests' ? 'default' : 'ghost'}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Pruebas de Email
        </Button>
      </div>

        {activeTab === 'submissions' && (
          <>
            {/* Título y botones principales - responsive mejorado */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Formularios Enviados</h2>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {selectedIds.length > 0 && (
                  <>
                    <Button 
                      onClick={() => setShowDeleteConfirm(true)} 
                      variant="destructive" 
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar ({selectedIds.length})
                    </Button>
                    <Button 
                      onClick={() => setSelectedIds([])} 
                      variant="outline" 
                      size="sm"
                    >
                      Cancelar
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
                  <Filter className="w-4 h-4" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                    <Label htmlFor="tag-filter">Tag</Label>
                    <TagFilterSelect
                      value={filters.tag}
                      onChange={(value) => setFilters({...filters, tag: value})}
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
                    <table className="w-full border-collapse min-w-[800px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 w-12">
                            <Checkbox
                              checked={selectedIds.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                              onCheckedChange={toggleSelectAll}
                              aria-label="Seleccionar todos"
                            />
                          </th>
                          <th className="text-left p-2 min-w-[200px]">Email</th>
                          <th className="text-left p-2 min-w-[100px]">Estado</th>
                          <th className="text-left p-2 min-w-[100px]">Fecha</th>
                          <th className="text-left p-2 min-w-[150px]">Marca</th>
                          <th className="text-left p-2 min-w-[120px]">Tags</th>
                          <th className="text-left p-2 min-w-[120px]">Prompt Lovable</th>
                          <th className="text-left p-2 min-w-[200px]">Acciones</th>
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
                            <td className="p-2 break-all max-w-[200px]">{submission.email}</td>
                            <td className="p-2">
                              <Badge variant={submission.completed ? "default" : "secondary"}>
                                {submission.completed ? "Completado" : "Pendiente"}
                              </Badge>
                            </td>
                            <td className="p-2 text-sm whitespace-nowrap">
                              {new Date(submission.created_at).toLocaleString('es-ES', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="p-2 max-w-[150px] truncate" title={submission.form_data?.marca || '-'}>{submission.form_data?.marca || '-'}</td>
                            <td className="p-2">
                              <div className="flex flex-wrap gap-1">
                                {submission.tags && submission.tags.length > 0 ? (
                                  <TagDisplayList tags={submission.tags} />
                                ) : (
                                  <span className="text-muted-foreground text-sm">Sin tags</span>
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <Badge variant={submission.form_data?.generatedPrompts?.lovablePrompt ? "default" : "outline"}>
                                {submission.form_data?.generatedPrompts?.lovablePrompt ? "Sí" : "No"}
                              </Badge>
                            </td>
                              <td className="p-2">
                                <div className="flex gap-1 flex-wrap">
                                  <Dialog>
                                    <DialogTrigger>
                                      <Button 
                                        size="sm" 
                                        variant="ghost"
                                        onClick={() => setSelectedSubmission(submission)}
                                        title="Ver detalles"
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
                                   title="Editar"
                                 >
                                   <Edit className="w-4 h-4" />
                                 </Button>

                                 <Button 
                                   size="sm" 
                                   variant="ghost"
                                   onClick={() => handleWhatsAppContact(submission)}
                                   className="text-green-600 hover:text-green-700"
                                   title="Contactar por WhatsApp"
                                 >
                                   <MessageCircle className="w-4 h-4" />
                                 </Button>

                                  <Select onValueChange={(value) => handleSendEmail(submission, value as 'custom' | 'follow-up')}>
                                    <SelectTrigger className="h-8 w-8 p-0">
                                      <Mail className="w-4 h-4 text-blue-600" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="custom">Email personalizado</SelectItem>
                                      <SelectItem value="follow-up">Email seguimiento</SelectItem>
                                    </SelectContent>
                                  </Select>
                                 
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Button size="sm" variant="ghost" title="Eliminar">
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
          </>
        )}

        {activeTab === 'email-tests' && (
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold">Pruebas del Sistema</h2>
            
            {/* Panel de Prueba de Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Prueba de Sistema de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg border">
                  <h3 className="font-medium mb-3">Configuración Actual</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex justify-between">
                      <span>Proveedor:</span>
                      <span>Brevo API v3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Key:</span>
                      <span className="text-green-600">Configurada</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email destino:</span>
                      <span>esteban.montenegro@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Edge Function:</span>
                      <span>send-email</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={runEmailTest} 
                  disabled={emailTesting}
                  className="w-full"
                >
                  {emailTesting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando prueba...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Ejecutar Prueba
                    </>
                  )}
                </Button>

                {emailTestResult && (
                  <div className={`p-4 rounded-lg border ${
                    emailTestResult.success 
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-500/30' 
                      : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-500/30'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {emailTestResult.success ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`font-medium ${
                        emailTestResult.success ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                      }`}>
                        {emailTestResult.success ? 'Prueba Exitosa' : 'Error en Prueba'}
                      </span>
                    </div>
                    
                    <p className={`text-sm ${
                      emailTestResult.success ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200'
                    }`}>
                      {emailTestResult.message}
                    </p>

                    {emailTestResult.success && (
                      <div className="mt-3 text-xs text-green-600 dark:text-green-300 space-y-1">
                        <p>El sistema de email está funcionando correctamente</p>
                        <p>Revisa la bandeja de entrada de esteban.montenegro@gmail.com</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Información del Sistema */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-medium">Kit IA - Email System</h4>
                    <div className="text-muted-foreground space-y-2">
                      <div className="flex justify-between">
                        <span>Edge Function:</span>
                        <span>Activa</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Secretos:</span>
                        <span>Configurados</span>
                      </div>
                      <div className="flex justify-between">
                        <span>API:</span>
                        <span>Brevo v3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Templates:</span>
                        <span>3 tipos</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Tipos de Email</h4>
                    <div className="text-muted-foreground space-y-2">
                      <div className="flex justify-between">
                        <span>Test:</span>
                        <span>Verificación</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmación:</span>
                        <span>Cliente</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin:</span>
                        <span>Esteban</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estado:</span>
                        <span className="text-green-600">Funcionales</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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

      {/* Dialog para envío de emails personalizados */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {emailType === 'custom' ? 'Enviar Email Personalizado' : 'Enviar Email de Seguimiento'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Destinatario</Label>
              <Input
                id="recipient"
                value={selectedEmailSubmission?.email || ''}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                value={customEmailSubject}
                onChange={(e) => setCustomEmailSubject(e.target.value)}
                placeholder="Asunto del email"
              />
            </div>
            <div>
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                value={customEmailContent}
                onChange={(e) => setCustomEmailContent(e.target.value)}
                placeholder="Contenido del email"
                className="min-h-[300px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
                disabled={emailTesting}
              >
                Cancelar
              </Button>
              <Button
                onClick={sendCustomEmail}
                disabled={emailTesting || !customEmailSubject || !customEmailContent}
              >
                {emailTesting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Email'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
            <Input value={new Date(submission.created_at).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })} readOnly />
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
// Component for tag filter dropdown
const TagFilterSelect: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [allTags, setAllTags] = useState<{ name: string; color: string }[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('name, color')
          .order('name');
        
        if (error) throw error;
        setAllTags(data || []);
      } catch (error) {
        console.error('Error loading tags:', error);
      }
    };
    
    loadTags();
  }, []);

  return (
    <Select value={value || "all"} onValueChange={(val) => onChange(val === "all" ? "" : val)}>
      <SelectTrigger>
        <SelectValue placeholder="Seleccionar tag..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos los tags</SelectItem>
        {allTags.filter(tag => tag.name && tag.name.trim() !== '').map((tag) => (
          <SelectItem key={tag.name} value={tag.name}>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border" 
                style={{ backgroundColor: tag.color }}
              />
              {tag.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Component for displaying tags with colors
const TagDisplayList: React.FC<{ tags: string[] }> = ({ tags }) => {
  const [allTags, setAllTags] = useState<{ name: string; color: string }[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('name, color');
        
        if (error) throw error;
        setAllTags(data || []);
      } catch (error) {
        console.error('Error loading tags:', error);
      }
    };
    
    loadTags();
  }, []);

  const getTagColor = (tagName: string) => {
    const tag = allTags.find(t => t.name === tagName);
    return tag?.color || '#3b82f6';
  };

  return (
    <>
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className="text-xs"
          style={{ 
            backgroundColor: getTagColor(tag) + '20', 
            color: getTagColor(tag), 
            borderColor: getTagColor(tag) 
          }}
        >
          {tag}
        </Badge>
      ))}
    </>
  );
};

const EditSubmissionModal: React.FC<{
  submission: FormSubmission;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<FormSubmission>) => void;
}> = ({ submission, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: submission.email,
    completed: submission.completed,
    form_data: JSON.stringify(submission.form_data, null, 2),
    tags: submission.tags || []
  });

  const handleSave = () => {
    try {
      const parsedFormData = JSON.parse(formData.form_data);
      onUpdate(submission.id, {
        email: formData.email,
        completed: formData.completed,
        form_data: parsedFormData,
        tags: formData.tags
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
            <Label htmlFor="edit-tags">Tags</Label>
            <TagInput
              value={formData.tags}
              onChange={(newTags) => setFormData({...formData, tags: newTags})}
              placeholder="Buscar o crear tags..."
            />
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