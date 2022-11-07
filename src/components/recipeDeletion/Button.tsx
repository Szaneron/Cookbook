import './button.scss';
const Button = (props: any) => {
  return (
    <button onClick={props.onClick} className="btn">
      {props.text}
    </button>
  );
};
export default Button;
