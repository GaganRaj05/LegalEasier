import "./Cards.css";
const Cards = ({children, classname})=> {
    return (
        <div className={classname}>
            {children}
        </div>
    )
}

export default Cards;