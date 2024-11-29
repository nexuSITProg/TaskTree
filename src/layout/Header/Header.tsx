import { NewTask } from '../../components/NewTask/NewTask';
import './Header.style.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="" alt="logo" className="header__logo__img" />
        <span className="header__logo__title">TaskTree</span>
      </div>
      <NewTask />
    </header>
  )
}