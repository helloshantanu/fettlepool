import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Sidebar extends Component {

  logout(e) {
    localStorage.clear();
    this.props.history.push('/login');
    // e.preventDefault();
    
}
    render() {
        return (
            <div style={{paddingTop:'10px'}}>
                <div class="sidebar" style={{paddingTop:'0px'}}>
                    {/* <div class="user-profile">
                        <div class="display-avatar animated-avatar">
                            <img class="profile-img img-lg rounded-circle" src="../assets/images/copy.jpg" alt="" />
                        </div>
                        <div class="info-wrapper">
                            <p class="user-name">Shubham Mishra</p>
                            
                        </div>
                    </div> */}
              <div  style={{ justifyContent: 'center', paddingTop: '40px' }}>
                <a href="/">
                  <img className="logo" src="/assets/images/signup.png" style={{ width: '10rem' }} alt="" />
                  {/* <img className="logo-mini" src="/assets/images/logo_mini.svg" alt="" /> */}
                </a>
                {/* <h3 style={{fontWeight:'bold'}}>Fettle Pool</h3> */}

              </div>
                    <ul class="navigation-menu">
                        {/* <li class="nav-category-divider">MAIN</li> */}
                        <li>
                            <Link to="/dashboard">
                                <span class="link-title">Dashboard</span>
                                <i class="mdi mdi-gauge link-icon"></i>
                            </Link>
                        </li>
                        {/* <li>
          <a href="#sample-pages" data-toggle="collapse" aria-expanded="false">
            <span class="link-title">Sample Pages</span>
            <i class="mdi mdi-flask link-icon"></i>
          </a>
          <ul class="collapse navigation-submenu" id="sample-pages">
            <li>
              <a href="pages/sample-pages/login_1.html" target="_blank">Login</a>
            </li>
            <li>
              <a href="pages/sample-pages/error_2.html" target="_blank">Error</a>
            </li>
          </ul>
        </li> */}
                        {/* <li>
          <a href="#ui-elements" data-toggle="collapse" aria-expanded="false">
            <span class="link-title">UI Elements</span>
            <i class="mdi mdi-bullseye link-icon"></i>
          </a>
          <ul class="collapse navigation-submenu" id="ui-elements">
            <li>
              <a href="pages/ui-components/buttons.html">Buttons</a>
            </li>
            <li>
              <a href="pages/ui-components/tables.html">Tables</a>
            </li>
            <li>
              <a href="pages/ui-components/typography.html">Typography</a>
            </li>
          </ul>
        </li> */}
                        <li>
                            <Link to="/register">
                                <span class="link-title">User Registration</span>
                                <i class="mdi mdi-clipboard-outline link-icon"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/log">
                                <span class="link-title">Entry Log</span>
                                <i class="mdi mdi-chart-donut link-icon"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/allTransactions">
                                <span class="link-title">All Transactions</span>
                                <i class="mdi mdi-wallet link-icon"></i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <span class="link-title">Users</span>
                                <i class="mdi mdi-account-edit link-icon"></i>
                            </Link>
                        </li>
                        <li>  <Link to="/gyms">
                          <span class="link-title">Gyms</span>
                          <i class="mdi mdi-store link-icon"></i>
                        </Link>
                        </li>
                        {/* <li class="nav-category-divider">DOCS</li> */}
                        <li>  <Link to="/fettleshakes">
                                <span class="link-title">Fettle Shakes</span>
                                <i class="mdi mdi-coffee link-icon"></i>
                              </Link>
                        </li>
                        <li>  <Link to="/verifyadmin">
                                <span class="link-title">Verify Admin</span>
                                <i class="mdi mdi-account-badge link-icon"></i>
                              </Link>
                        </li>
                        <li>  <Link to="/addgym">
                                <span class="link-title">Gym Registeration</span>
                                <i class="mdi mdi-store link-icon"></i>
                              </Link>
                        </li>
                        <li>  <Link to="/adminlog">
                                <span class="link-title">Admin Log</span>
                                  <i class="mdi mdi-account-arrow-left link-icon"></i>
                              </Link>
                        </li>
                        <li>  <Link to="/admincard">
                                <span class="link-title">Admin Card</span>
                                <i class="mdi mdi-book-lock link-icon"></i>
                              </Link>
                        </li>
                        <li onClick={(e) => this.logout(e)}>  
                            <Link >
                              <span class="link-title">Log Out</span>
                              <i class="mdi mdi-power link-icon"></i>
                            </Link>
                        </li>
                    </ul>
                    {/* <div class="sidebar-upgrade-banner">
        <p class="text-gray">Upgrade to <b class="text-primary">PRO</b> for more exciting features</p>
        <a class="btn upgrade-btn" target="_blank" rel="noopener noreferrer" href="https://www.uxcandy.co/product/label-pro-admin-template/">Upgrade to PRO</a>
      </div> */}
                </div>
            </div>
        )
    }
}

export default Sidebar
