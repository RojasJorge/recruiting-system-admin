const label = term => {
  const academic = JSON.parse(localStorage.getItem('academic_level'));
  const careers = JSON.parse(localStorage.getItem('career'));
  // const allData = Object.assign(academic, careers);
  const allData = academic.concat(careers);

  if (allData.find(e => e.id === term)) {
    return allData.find(e => e.id === term).name;
  }

  return term;
};
export default label;
