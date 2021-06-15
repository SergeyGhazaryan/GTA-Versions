import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data';

const VersionInformation = () => {
  let { id } = useParams();

  const information = useMemo(() => {
    if (!data[id - 1].information) return;
    return data[id - 1].information;
  }, [id]);

  return information;
};

export default VersionInformation;
