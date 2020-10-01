const locale = term => {
  const labels = {
    yes: 'Si',
    no: 'No',
    true: 'Si',
    false: 'No',
    female: 'Femenino',
    male: 'Masculino',
    single: 'Soltero (a)',
    married: 'Casado (a)',
    freelance: 'Independiente',
    practice: 'Prácticas',
    temporary: 'Temporal',
    full: 'Tiempo completo',
    Full_time: 'Tiempo completo',
    part: 'Medio tiempo',
    vacationer: 'Vacacionista',
    inLocation: 'En locación',
    remote: 'Remoto',
    semiRemote: 'Semiremoto',
    personal: 'Personal',
    home: 'Residencial',
    other: 'Otro',
    work: 'Trabajo',
    own: 'Propia',
    rented: 'Rentada',
    family: 'Familiar',
    fixed: 'Fijo',
    flex: 'Flexible',
    daytime: 'Diurno',
    night: 'Nocturno',
    mix: 'Mixto',
    office: 'Oficina',
    branch: 'Sucursal',
    indifferent: 'Indiferente',
    vehicle: 'Automóvil',
    motorcycle: 'Motocicleta',
  };

  return labels[term] || term;
};

export default locale;
