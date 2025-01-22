import React from 'react'
import "./footer.css"
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";


const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <p>
                &copy; 2024 E-Learning Platform. All rights reserved. <br />
                 Made with ❤️ <a href="">kartik narwal</a>
            </p>
            <div className="social-links">
                <a href="https://www.linkedin.com/in/kartik-narwal-64206225b/" target='_blank'>
                <AiFillLinkedin />
                </a>
                <a href="https://github.com/kartiknarwal" target='_blank'>
                <AiFillGithub />
                </a>
                <a href="https://www.instagram.com/narwal._kartik" target='_blank'>
                <AiFillInstagram />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer
