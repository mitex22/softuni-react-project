import './UserListItem.css';
import { Link } from 'react-router-dom';
import { pathToUrl } from '../../../utils/pathUtils';
import PATH from '../../../paths/paths';
import { FaArrowRight } from 'react-icons/fa';

const UserListItem = ({ userName }) => {
    return (
        <>
            <div className="user-list-item-card">
                <div className="user-list-item-content">
                    <h5 className="user-list-item-title">{userName}'s Portfolio</h5>
                    <Link
                        to={pathToUrl(PATH.USER_PORTFOLIO, { userName })}
                        className="user-list-item-link"
                    >
                        Browse Portfolio
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserListItem;
