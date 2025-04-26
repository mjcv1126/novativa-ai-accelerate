import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import * as z from 'zod';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

const AdminLogin = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStep, setResetStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const { login, resetPassword, verifyResetCode, updatePassword, isAuthenticated, isLoading } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFormLoading(true);

    try {
      const { error } = await login(values.email, values.password);
      if (error) {
        toast({
          title: 'Error de inicio de sesión',
          description: error.message || 'Por favor verifica tus credenciales e intenta de nuevo.',
          variant: 'destructive',
        });
        console.error('Login error:', error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error. Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa tu correo electrónico.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await resetPassword(resetEmail);
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'No se pudo enviar el código de recuperación. Por favor intenta de nuevo.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Código enviado',
          description: 'Por favor revisa tu correo electrónico para el código de recuperación.',
        });
        setResetStep('code');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error. Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!resetCode) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa el código de recuperación.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await verifyResetCode(resetEmail, resetCode);
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Código inválido. Por favor intenta de nuevo.',
          variant: 'destructive',
        });
      } else {
        setResetStep('newPassword');
      }
    } catch (error) {
      console.error('Verify code error:', error);
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error. Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa tu nueva contraseña.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'La contraseña debe tener al menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await updatePassword(resetEmail, resetCode, newPassword);
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'No se pudo actualizar la contraseña. Por favor intenta de nuevo.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Contraseña actualizada',
          description: 'Tu contraseña ha sido actualizada exitosamente.',
        });
        setShowResetPassword(false);
        setResetStep('email');
        setResetEmail('');
        setResetCode('');
        setNewPassword('');
      }
    } catch (error) {
      console.error('Update password error:', error);
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error. Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResetPasswordForm = () => (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
            alt="Novativa Logo" 
            className="h-12 mx-auto mb-6" 
          />
          <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
          <CardDescription>
            {resetStep === 'email' && 'Ingresa tu correo electrónico para recibir un código de recuperación'}
            {resetStep === 'code' && 'Ingresa el código de recuperación enviado a tu correo'}
            {resetStep === 'newPassword' && 'Ingresa tu nueva contraseña'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resetStep === 'email' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-novativa-teal hover:bg-novativa-lightTeal"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar código'}
              </Button>
            </div>
          )}

          {resetStep === 'code' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Código de recuperación</FormLabel>
                <Input
                  type="text"
                  placeholder="Ingresa el código"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-novativa-teal hover:bg-novativa-lightTeal"
                onClick={handleVerifyCode}
                disabled={isLoading}
              >
                {isLoading ? 'Verificando...' : 'Verificar código'}
              </Button>
            </div>
          )}

          {resetStep === 'newPassword' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Nueva contraseña</FormLabel>
                <Input
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-novativa-teal hover:bg-novativa-lightTeal"
                onClick={handleUpdatePassword}
                disabled={isLoading}
              >
                {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => {
              setShowResetPassword(false);
              setResetStep('email');
              setResetEmail('');
              setResetCode('');
              setNewPassword('');
            }}
          >
            Volver al login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderLoginForm = () => (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
            alt="Novativa Logo" 
            className="h-12 mx-auto mb-6" 
          />
          <CardTitle className="text-2xl">Login Admin</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al panel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="tu@email.com" 
                        type="email" 
                        {...field} 
                        disabled={isFormLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        {...field} 
                        disabled={isFormLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                className="w-full bg-novativa-teal hover:bg-novativa-lightTeal mt-4" 
                disabled={isFormLoading}
              >
                {isFormLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : 'Iniciar sesión'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={() => setShowResetPassword(true)}
            disabled={isFormLoading}
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin h-8 w-8 text-novativa-teal" />
        <span className="ml-2 text-lg">Cargando...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | Novativa</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Helmet>
      {showResetPassword ? renderResetPasswordForm() : renderLoginForm()}
    </>
  );
};

export default AdminLogin;
