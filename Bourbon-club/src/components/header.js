import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, {useContext} from "react"
import {FirebaseContext} from './firebase'
import styled from 'styled-components'

const LogoutLink = styled.span`
  cursor: pointer;
  color: #fff;
  &:hover{
    text-decoration: underline;
  }
`;

const HeaderWrapper = styled.header`
      background: rebeccapurple;
      margin-bottom: 1.45rem;
`;

const HeaderContent = styled.div`
      margin: 0 auto;
      max-width: 960px;
      padding: 1.45rem 1.0875rem;
      display: flex;

      >h1{
        margin: 0;
        flex-grow: 1;

        >a{
          color: #fff;
          text-decoration: none;
        }
      } 
    >div{
          margin: auto 0;
        } 
`;

const UserInfo = styled.div`
  text-align: right;
  color: #fff;
`;

const LoginLink = styled.div`
  margin: 0;
  a{
    color: #fff;
  }
`;
const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`;
const AdminLinks = styled.span`
  a{
    color: #fff;
    text-decoration: none;
  }
`;



const Header = ({ siteTitle }) => {
  const {firebase, user} = useContext(FirebaseContext);

  console.log(user);

function handleLogoutClick() {
  firebase.logout().then(() => navigate('/login'))
}

return (
  <HeaderWrapper>
    <HeaderContent>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
          <div>
            {!!user && !!user.email &&
              <UserInfo>
                Hej {user.username ||user.email}
                <div>
                  {!!user.isAdmin && 
                  <>
                  <AdminLinks>
                    <Link to="/ny-bourbon">
                    Tilføj bourbon
                    </Link>
                    <Divider />
                    <Link to="/ny-cocktail">
                    Tilføj cocktail
                    <Divider/>
                    </Link>
                    </AdminLinks>
                   </>
                  }
                  <LogoutLink onClick={handleLogoutClick}>
                    Log ud
                  </LogoutLink>
                </div>
              </UserInfo>
            }
            {(!user || !user.email) &&
              <LoginLink>
                <Link to="/login">
                  Log ind
                  </Link>
                <Divider />
                <Link to="/register">
                  Registrer
                  </Link>
              </LoginLink>
            }
          </div>
    </HeaderContent>
  </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
