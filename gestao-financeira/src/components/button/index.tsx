import './style.css';

interface IButtonProps {
  text?: string;
  secondary?: boolean;
  onClick?: () => void;
}

export default function Button({ text, secondary, onClick}: IButtonProps) {
    return (
      <button onClick={onClick} className={`btn ${secondary ? 'btn-secondary' : 'btn-primary'}`}>
        {text}
      </button>
    )
  }