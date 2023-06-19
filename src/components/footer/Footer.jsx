
import "./footer.scss"
import Wrappercomponent from "../wrapcomponent/Wrappercomponent"
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="parentfooter">
            <Wrappercomponent>
                <div className="row justify-content-center">
                    <div className="col-md-10 col-sm-6  ">
                        <ul className="d-flex justify-content-evenly mt-2 md-display-block " style={{ listStyle: 'none' }}>
                            <li className="text-light fs-3 mx-1">Tauseef Ahmad</li>
                            <li className="text-light fs-3 mx-1">Linkdin(/tauseef-ahmad-a2107523b)</li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10 text-center text-white p-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime accusamus eum ea tenetur dicta aliquam
                        distinctio ullam error provident et nesciunt unde a earum cupiditate, recusandae modi itaque quisquam laboriosam.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet commodi officia eos quae. Repellat, dolores ea?
                        Laborum, earum. Quo officia quasi maiores tempore iusto ab earum minus aperiam rem neque.
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center text-white p-2 justify-content-around">
                        <span className="me-2"> <FaFacebookF size={30} /> </span>
                        <span className="me-2"> <FaInstagram size={30} /></span>
                        <span className="me-2"> <FaTwitter size={30} /> </span>
                        <span className="me-2"> <FaLinkedin size={30} /> </span>
                    </div>
                </div>
            </Wrappercomponent>
        </div>

    )
}

export default Footer
