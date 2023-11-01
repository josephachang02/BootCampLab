import { useContext } from 'react';
import { primaryContext } from '../../context/primaryContext';
import './index.css';

const CampsDisplay = () => {

  const { camps } = useContext(primaryContext);

  return (
    <div>
      {camps.map((camp) => {
        return <div key={camp._id}>
          <h3>{camp.name}</h3>
          <p>{camp.price}</p>
          </div>
      })}
    </div>
  )
}

export default CampsDisplay