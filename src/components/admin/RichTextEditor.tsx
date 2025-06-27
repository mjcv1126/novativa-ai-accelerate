
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Code, Eye, Type, Image, Link, Bold, Italic, Underline } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [mode, setMode] = useState<'rich' | 'html'>('rich');
  const [htmlValue, setHtmlValue] = useState(value);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    setHtmlValue(value);
  }, [value]);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        'image': handleImageInsert,
        'link': handleLinkInsert
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'code-block'
  ];

  function handleImageInsert() {
    setShowImageDialog(true);
  }

  function handleLinkInsert() {
    setShowLinkDialog(true);
  }

  const insertImage = () => {
    if (imageUrl && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        quill.insertEmbed(range.index, 'image', imageUrl);
        if (imageAlt) {
          // Set alt attribute if possible
          const images = quill.root.querySelectorAll('img');
          const lastImage = images[images.length - 1];
          if (lastImage) {
            lastImage.setAttribute('alt', imageAlt);
          }
        }
      }
    }
    setImageUrl('');
    setImageAlt('');
    setShowImageDialog(false);
  };

  const insertLink = () => {
    if (linkUrl && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        if (linkText) {
          quill.insertText(range.index, linkText);
          quill.setSelection(range.index, linkText.length);
        }
        quill.format('link', linkUrl);
      }
    }
    setLinkUrl('');
    setLinkText('');
    setShowLinkDialog(false);
  };

  const handleRichTextChange = (content: string) => {
    setHtmlValue(content);
    onChange(content);
  };

  const handleHtmlChange = (content: string) => {
    setHtmlValue(content);
    onChange(content);
  };

  const toggleMode = () => {
    setMode(mode === 'rich' ? 'html' : 'rich');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Contenido del Post</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === 'rich' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('rich')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Editor Visual
          </Button>
          <Button
            type="button"
            variant={mode === 'html' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('html')}
            className="flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            HTML
          </Button>
        </div>
      </div>

      {mode === 'rich' ? (
        <div className="border rounded-md">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={htmlValue}
            onChange={handleRichTextChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder || "Escribe el contenido de tu post aquí..."}
            style={{ minHeight: '300px' }}
          />
        </div>
      ) : (
        <Textarea
          value={htmlValue}
          onChange={(e) => handleHtmlChange(e.target.value)}
          placeholder={placeholder || "Escribe o pega tu código HTML aquí..."}
          rows={20}
          className="font-mono text-sm"
        />
      )}

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insertar Imagen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">URL de la imagen *</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            <div>
              <Label htmlFor="imageAlt">Texto alternativo</Label>
              <Input
                id="imageAlt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Descripción de la imagen"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowImageDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={insertImage}
                disabled={!imageUrl}
              >
                Insertar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insertar Enlace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="linkUrl">URL del enlace *</Label>
              <Input
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://ejemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="linkText">Texto del enlace</Label>
              <Input
                id="linkText"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Texto que se mostrará"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowLinkDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={insertLink}
                disabled={!linkUrl}
              >
                Insertar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RichTextEditor;
