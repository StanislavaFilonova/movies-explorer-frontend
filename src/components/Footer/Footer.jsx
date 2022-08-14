import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {

    const location = useLocation();
    const islocationProfile = location.pathname === "/profile";
    const islocationSignIn = location.pathname === "/sign-in";
    const islocationSignUp = location.pathname === "/sign-up";
    const islocationPrivate = islocationProfile || islocationSignIn || islocationSignUp;

    return (
        <footer className="footer">
            {!islocationPrivate &&
                <div className="footer__box">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <div className="footer__table">
                <p className="footer__copyright">&copy; 2022</p>
                <nav className="footer__contacts">
                <a
                href="https://practicum.yandex.ru"
                target="_blank"
                className="active__link"
                rel = "noreferrer noopener">
                <p className="footer__contact">Яндекс.Практикум</p>
                </a>
                <a
                href="https://github.com/yandex-praktikum"
                target="_blank"
                className="active__link"
                rel = "noreferrer noopener">
                <p className="footer__contact">Github</p>
                </a>
                <a
                href="https://vk.com/yandex.practicum"
                target="_blank"
                className="active__link"
                rel = "noreferrer noopener">
                <p className="footer__contact">ВКонтакте</p>
                </a>
                </nav>
                </div>
                </div>
            }
        </footer>
    )
}

export default Footer;
