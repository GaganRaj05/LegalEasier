import "./Buttons.css";

const Button = ({children,classname,onClick}) => {
    return (
        <button className={classname} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;