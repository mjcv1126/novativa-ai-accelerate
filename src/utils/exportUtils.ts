
export const exportToCSV = (data: any[], filename: string, headers: { [key: string]: string }) => {
  // Create CSV header
  const csvHeaders = Object.values(headers).join(',');
  
  // Create CSV rows
  const csvRows = data.map(item => {
    return Object.keys(headers).map(key => {
      let value = item[key];
      
      // Handle nested objects
      if (typeof value === 'object' && value !== null) {
        if (key.includes('.')) {
          const keys = key.split('.');
          value = keys.reduce((obj, k) => obj?.[k], item);
        } else {
          value = JSON.stringify(value);
        }
      }
      
      // Handle dates
      if (value instanceof Date) {
        value = value.toLocaleDateString('es-ES');
      }
      
      // Escape quotes and wrap in quotes if contains comma
      if (typeof value === 'string') {
        value = value.replace(/"/g, '""');
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = `"${value}"`;
        }
      }
      
      return value || '';
    }).join(',');
  });
  
  // Combine header and rows
  const csvContent = [csvHeaders, ...csvRows].join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const contactsCSVHeaders = {
  'first_name': 'Nombre',
  'last_name': 'Apellido',
  'phone': 'Teléfono',
  'email': 'Email',
  'company': 'Empresa',
  'country_name': 'País',
  'stage.name': 'Etapa',
  'created_at': 'Fecha Creación',
  'last_contact_date': 'Último Contacto'
};

export const activitiesCSVHeaders = {
  'title': 'Título',
  'activity_type': 'Tipo',
  'description': 'Descripción',
  'contact.first_name': 'Nombre Contacto',
  'contact.last_name': 'Apellido Contacto',
  'contact.phone': 'Teléfono Contacto',
  'scheduled_date': 'Fecha Programada',
  'scheduled_time': 'Hora Programada',
  'is_completed': 'Completada',
  'created_at': 'Fecha Creación'
};
