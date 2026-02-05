export const CATEGORY_CONFIG = [
  { label: 'Precios abusivos', value: 'precios_abusivos' },
  { label: 'Mala calidad de productos', value: 'productos_defectuosos' },
  { label: 'Mal servicio al cliente', value: 'mala_atencion' },
  { label: 'Publicidad engañosa', value: 'publicidad_enganosa' },
  { label: 'Incumplimiento de garantías', value: 'incumplimiento_garantias' },
  { label: 'Falta de información', value: 'falta_informacion' },
  { label: 'Otras irregularidades', value: 'otros' },
];

export const getCategoryLabel = (value: string) => {
  const found = CATEGORY_CONFIG.find(c => c.value === value);
  return found ? found.label : value;
};

export const getCategoryValue = (label: string) => {
  const found = CATEGORY_CONFIG.find(c => c.label === label);
  return found ? found.value : 'otros';
};
