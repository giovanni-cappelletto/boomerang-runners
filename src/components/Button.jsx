import './button.css'

const Button = ({ className, onClick, text, children }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>{text || children}</button>
    )
}

export default Button