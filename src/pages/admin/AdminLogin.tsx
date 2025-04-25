
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const { error } = await login(values.email, values.password);
      if (error) {
        toast({
          title: 'Error de inicio de sesión',
          description: 'Por favor verifica tus credenciales e intenta de nuevo.',
          variant: 'destructive',
        });
        console.error('Login error:', error);
      } else {
        toast({
          title: 'Inicio de sesión exitoso',
          description: 'Bienvenido al panel admin.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error. Por favor intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Novativa</title>
      </Helmet>
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit"
                  className="w-full bg-novativa-teal hover:bg-novativa-lightTeal mt-4" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminLogin;
