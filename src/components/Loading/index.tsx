import { SyncLoader } from 'react-spinners';
import './styles.css'

type LoadingProps = {
  title: string;
}

export const Loading = ({ title }: LoadingProps) => {
  return (
    <div className="loading-container">
        <SyncLoader color='#fe3e6d' />
        <p className="loading-title">{title}</p>
    </div>
  )
}
