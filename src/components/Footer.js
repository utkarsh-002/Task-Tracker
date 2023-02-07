import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyrigth &copy; 2023</p>
      <Link to="/about" className='link'>About</Link>
    </footer>
  )
}

export default Footer
