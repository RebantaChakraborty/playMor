import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
    const toggleLibraryStatus = () => {
        setLibraryStatus(!libraryStatus);

    }
    return (
        <div className="nav">
            <h1>playMor</h1>
            <button onClick={toggleLibraryStatus}>
                <FontAwesomeIcon icon={faMusic} />
                Library
            </button>

        </div>
    );

}


export default Nav;