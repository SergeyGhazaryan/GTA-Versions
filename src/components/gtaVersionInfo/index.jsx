import { useParams } from 'react-router-dom';
import { data } from '../../data';

const GtaVersionInfo = () => {
  const { id } = useParams();

  const information = () => {
    const selectedVersion = data.find((d) => d.id == id);
    if (!selectedVersion) return;
    return selectedVersion.information;
  };

  return <div>{information}</div>;
};

export default GtaVersionInfo;
