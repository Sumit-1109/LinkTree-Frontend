import './LandingPage.css'

import logoImage from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const navigate = useNavigate();

    return (
      <div className="landingPage">
        <div className="ladingPageNavBar">
            <div className="landingPage-navBar-box">
                <div className="landingPage-navBar-logo">
                    <div className="logo-img">
                        <img src={logoImage} alt="spark" />
                    </div>
                    <div className="logo-heading-name">
                        <span>SPARK</span>
                        <div className="superScript">
                            <p>TM</p>
                        </div>
                    </div>
                    <div className="logo-separator">
                        <span className='logo-separator-line'>|</span>
                    </div>
                    <div className="logo-subHeading">
                        Marketplace
                    </div>
                </div>

                <div className="redirect-to-signUp">
                        <button onClick={() => navigate('/signup')}>Sign up free</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default LandingPage
  