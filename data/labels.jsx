import { useStoreState } from 'easy-peasy';

const Label = props => {
  const collections = useStoreState(state => state.collections);
  const careers = collections.career;
  const academic = collections.academic_level;
  const allData = [];

  careers.map(e => {
    if (e.children) {
      e.children.map(child => allData.push(child));
    }
    allData.push(e);
  });
  academic.map(e => {
    if (e.children) {
      e.children.map(child => allData.push(child));
    }
    allData.push(e);
  });

  if (allData) {
    if (allData.find(e => e.id === props.term)) {
      return <p>{allData.find(e => e.id === props.term).name}</p>;
    } else {
      return <p>{props.term}</p>;
    }
  } else {
    return <p>{props.term}</p>;
  }
};

export default Label;
