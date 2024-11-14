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
            <section className='bg-gray-50 pt-20 pb-10 px-20'>
                <div className='container-xl lg:container m-auto'>
                    <h1 className="mb-4 text-slate-700 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl">Users Portfolios</h1>

                    <p className="mb-6 text-slate-600 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">Take e look at what other users own</p>

                    {loading ? (
                        <Spinner loading={loading} />
                    ) : users.length > 0
                        ? <div className='grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center'>
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
                            <p className="mb-6 text-slate-600 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 py-6">No users available</p>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default UserList;