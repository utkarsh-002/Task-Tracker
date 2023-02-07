import PropTypes from 'prop-types'


const Button = ({color,text,onClick}) => {
  return (
    <div>
      <button style={{backgroundColor: color}} onClick={onClick} className='btn'>{text}</button>
    </div>
  )
}

Button.defaultProps = {
    color: "Blue",
    text: "text here",
}

Button.propTypes ={
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
}
export default Button
