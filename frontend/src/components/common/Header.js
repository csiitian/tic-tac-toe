import {auth} from "../../firebase/firebaseConfig";
import styled from "styled-components";

function Header() {
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log('User signed out');
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    };

    return (
        <HeaderContainer>
            <HeaderContent>
                <span>Welcome, {auth.currentUser?.email}</span>
                <button onClick={handleLogout}>Logout</button>
            </HeaderContent>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 4px 2px -2px gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: 40px;
    margin-right: 40px;

    button {
        background: darkslategray;
        border: 1px solid black;
        color: white;
        cursor: pointer;
        padding: 10px;
        &:hover {
            text-decoration: underline;
        }
    }
`;
