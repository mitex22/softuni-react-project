import './UserList.css';

import AuthContext from "../../contexts/authContext";
import { useGetAllPortfolioUsers } from "../../hooks/useUsers";

import Spinner from '../common/Spinner';
import { useContext, useState } from "react";
import UserListItem from "./user-list-item/UserListItem";

const UserList = () => {

    const { username } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [users] = useGetAllPortfolioUsers(setLoading, username);

    return (
        <>
            <section className="user-list-section">
                <div className="user-list-container">
                    <h1 className="user-list-title">Users Portfolios</h1>

                    <p className="user-list-subtitle">Take a look at what other users own</p>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) : users.length > 0
                        ? <div className="user-list-grid">
                            {
                                users.map((userName) => (
                                    <UserListItem
                                        key={userName}
                                        userName={userName}
                                    />
                                ))
                            }
                        </div>
                        : (
                            <p className="user-list-empty">No users available</p>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default UserList;