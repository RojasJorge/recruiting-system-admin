import {useStoreState} from "easy-peasy";

const Label = term => {
  // const academic = JSON.parse(localStorage.getItem('academic_level'));
  // const careers = JSON.parse(localStorage.getItem('career'));
  
  // const career = useStoreState(state => state.collections.career)

  const allData = [].concat([]);

  if (allData.find(e => e.id === term)) {
  
    console.log(allData.find(e => e.id === term).name)
    return allData.find(e => e.id === term).name;
  }

  return (
    <div>
      {term}
    </div>
  );
};

export default Label;
