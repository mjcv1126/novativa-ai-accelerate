import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import PredefinedTags from '@/components/admin/scripts/PredefinedTags';
import NewTagForm from '@/components/admin/scripts/NewTagForm';
import CustomScripts from '@/components/admin/scripts/CustomScripts';
import MarlonIAScript from '@/components/admin/scripts/MarlonIAScript';

const AdminScripts = () => {
  const [headerScripts, setHeaderScripts] = useState<string>(() => {
    return localStorage.getItem('novativa_header_scripts') || '';
  });
  
  const [bodyStartScripts, setBodyStartScripts] = useState<string>(() => {
    return localStorage.getItem('novativa_body_start_scripts') || '';
  });
  
  const [bodyEndScripts, setBodyEndScripts] = useState<string>(() => {
    return localStorage.getItem('novativa_body_end_scripts') || '';
  });
  
  const [tagName, setTagName] = useState('');
  const [tagCode, setTagCode] = useState('');
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [tags, setTags] = useState<{ id: number; name: string; code: string; active: boolean }[]>(() => {
    const savedTags = localStorage.getItem('novativa_script_tags');
    return savedTags ? JSON.parse(savedTags) : [
      { 
        id: 1,
        name: 'Google Analytics', 
        code: `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
        active: true
      },
      { 
        id: 2,
        name: 'Facebook Pixel', 
        code: `<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.getElementsByTagName(e)[0];
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
</script>`,
        active: false
      },
      { 
        id: 3,
        name: 'HotJar', 
        code: `<!-- Hotjar -->
<script>
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:XXXXXX,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`,
        active: false
      },
    ];
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('novativa_script_tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    const applyScripts = () => {
      const headerScriptEl = document.getElementById('novativa-header-scripts');
      if (headerScriptEl) {
        headerScriptEl.innerHTML = headerScripts;
      } else if (headerScripts) {
        const newScript = document.createElement('div');
        newScript.id = 'novativa-header-scripts';
        newScript.innerHTML = headerScripts;
        document.head.appendChild(newScript);
      }

      tags.forEach(tag => {
        if (tag.active) {
          const tagId = `novativa-tag-${tag.id}`;
          const existingTag = document.getElementById(tagId);
          
          if (existingTag) {
            existingTag.innerHTML = tag.code;
          } else {
            const newTag = document.createElement('div');
            newTag.id = tagId;
            newTag.innerHTML = tag.code;
            document.head.appendChild(newTag);
          }
        } else {
          const existingTag = document.getElementById(`novativa-tag-${tag.id}`);
          if (existingTag) {
            existingTag.remove();
          }
        }
      });
    };

    if (editingTagId === null) {
      applyScripts();
    }
  }, [tags, headerScripts, editingTagId]);

  const handleAddTag = () => {
    if (tagName && tagCode) {
      const newId = Math.max(...tags.map(t => t.id), 0) + 1;
      setTags([...tags, { 
        id: newId,
        name: tagName, 
        code: tagCode, 
        active: false 
      }]);
      setTagName('');
      setTagCode('');
      toast({
        title: "Tag agregado",
        description: `Se ha agregado el tag "${tagName}" a la lista`,
      });
    }
  };

  const handleSaveScripts = (location: string) => {
    switch (location) {
      case 'header':
        localStorage.setItem('novativa_header_scripts', headerScripts);
        break;
      case 'inicio del body':
        localStorage.setItem('novativa_body_start_scripts', bodyStartScripts);
        break;
      case 'final del body':
        localStorage.setItem('novativa_body_end_scripts', bodyEndScripts);
        break;
    }

    toast({
      title: "Scripts guardados",
      description: `Los scripts para ${location} se han guardado correctamente`,
    });

    if (editingTagId === null) {
      const scriptEl = document.getElementById(`novativa-${location.replace(' ', '-')}-scripts`);
      if (scriptEl) {
        scriptEl.innerHTML = location === 'header' 
          ? headerScripts 
          : location === 'inicio del body' 
            ? bodyStartScripts
            : bodyEndScripts;
      }
    }
  };

  const handleUpdateTag = (id: number, newCode: string) => {
    const newTags = tags.map(tag =>
      tag.id === id ? { ...tag, code: newCode } : tag
    );
    setTags(newTags);
  };

  const handleToggleStatus = (id: number) => {
    if (editingTagId !== null) return;
    
    const newTags = tags.map(tag =>
      tag.id === id ? { ...tag, active: !tag.active } : tag
    );
    setTags(newTags);
    const updatedTag = newTags.find(t => t.id === id);
    if (updatedTag) {
      toast({
        title: updatedTag.active ? "Tag activado" : "Tag desactivado",
        description: `El tag "${updatedTag.name}" ha sido ${updatedTag.active ? "activado" : "desactivado"}`,
      });
    }
  };

  const handleSaveTag = (id: number, newCode: string) => {
    const newTags = tags.map(tag => 
      tag.id === id ? { ...tag, code: newCode } : tag
    );
    setTags(newTags);
    setEditingTagId(null);
    toast({
      title: "Tag actualizado",
      description: `El código del tag ha sido actualizado correctamente`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Administrar Scripts | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Administrar Scripts</h1>
        
        <Tabs defaultValue="predefined" className="space-y-4">
          <TabsList>
            <TabsTrigger value="predefined">Tags predefinidos</TabsTrigger>
            <TabsTrigger value="custom">Scripts personalizados</TabsTrigger>
            <TabsTrigger value="marlon">Marlon IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predefined">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tags predefinidos</CardTitle>
                  <CardDescription>
                    Administra tags comunes como Google Analytics, Facebook Pixel, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PredefinedTags
                    tags={tags}
                    editingTagId={editingTagId}
                    onStartEditing={setEditingTagId}
                    onCancelEditing={() => setEditingTagId(null)}
                    onSaveTag={handleSaveTag}
                    onToggleStatus={handleToggleStatus}
                    onUpdateTag={handleUpdateTag}
                  />
                  {editingTagId === null && (
                    <NewTagForm
                      tagName={tagName}
                      tagCode={tagCode}
                      onTagNameChange={setTagName}
                      onTagCodeChange={setTagCode}
                      onAddTag={handleAddTag}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <CustomScripts
              headerScripts={headerScripts}
              bodyStartScripts={bodyStartScripts}
              bodyEndScripts={bodyEndScripts}
              onHeaderScriptsChange={setHeaderScripts}
              onBodyStartScriptsChange={setBodyStartScripts}
              onBodyEndScriptsChange={setBodyEndScripts}
              onSaveScripts={handleSaveScripts}
            />
          </TabsContent>
          
          <TabsContent value="marlon">
            <MarlonIAScript />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminScripts;
