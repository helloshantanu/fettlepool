import React, { Component } from 'react'

export class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="t-header">
                    
                    <div className="t-header-content-wrapper">
                        <div className="t-header-content">
                            <button className="t-header-toggler t-header-mobile-toggler d-block d-lg-none">
                                <i className="mdi mdi-menu"></i>
                            </button>
                            <form action="/" className="t-header-search-box">
                                <div className="input-group">
                                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" autoComplete="off" />
                                    <button className="btn btn-primary" type="submit"><i className="mdi mdi-arrow-right-thick"></i></button>
                                </div>
                            </form>
                            <ul className="nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="/" id="notificationDropdown" data-toggle="dropdown" aria-expanded="false">
                                        <i className="mdi mdi-bell-outline mdi-1x"></i>
                                    </a>
                                    <div className="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="notificationDropdown">
                                        <div className="dropdown-header">
                                            <h6 className="dropdown-title">Notifications</h6>
                                            <p className="dropdown-title-text">You have 4 unread notification</p>
                                        </div>
                                        <div className="dropdown-body">
                                            <div className="dropdown-list">
                                                <div className="icon-wrapper rounded-circle bg-inverse-primary text-primary">
                                                    <i className="mdi mdi-alert"></i>
                                                </div>
                                                <div className="content-wrapper">
                                                    <small className="name">Storage Full</small>
                                                    <small className="content-text">Server storage almost full</small>
                                                </div>
                                            </div>
                                            <div className="dropdown-list">
                                                <div className="icon-wrapper rounded-circle bg-inverse-success text-success">
                                                    <i className="mdi mdi-cloud-upload"></i>
                                                </div>
                                                <div className="content-wrapper">
                                                    <small className="name">Upload Completed</small>
                                                    <small className="content-text">3 Files uploded successfully</small>
                                                </div>
                                            </div>
                                            <div className="dropdown-list">
                                                <div className="icon-wrapper rounded-circle bg-inverse-warning text-warning">
                                                    <i className="mdi mdi-security"></i>
                                                </div>
                                                <div className="content-wrapper">
                                                    <small className="name">Authentication Required</small>
                                                    <small className="content-text">Please verify your password to continue using cloud services</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-footer">
                                            <a href="/">View All</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="/" id="messageDropdown" data-toggle="dropdown" aria-expanded="false">
                                        <i className="mdi mdi-message-outline mdi-1x"></i>
                                        <span className="notification-indicator notification-indicator-primary notification-indicator-ripple"></span>
                                    </a>
                                    <div className="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="messageDropdown">
                                        <div className="dropdown-header">
                                            <h6 className="dropdown-title">Messages</h6>
                                            <p className="dropdown-title-text">You have 4 unread messages</p>
                                        </div>
                                        <div className="dropdown-body">
                                            <div className="dropdown-list">
                                                <div className="image-wrapper">
                                                    <img className="profile-img" src="/assets/images/profile/male/image_1.png" alt="" />
                                                    <div className="status-indicator rounded-indicator bg-success"></div>
                                                </div>
                                                <div className="content-wrapper">
                                                    <small className="name">Clifford Gordon</small>
                                                    <small className="content-text">Lorem ipsum dolor sit amet.</small>
                                                </div>
                                            </div>
                                            <div className="dropdown-list">
                                                <div className="image-wrapper">
                                                    <img className="profile-img" src="/assets/images/profile/female/image_2.png" alt="" />
                                                    <div className="status-indicator rounded-indicator bg-success"></div>
                                                </div>
                                                <div className="content-wrapper">
                                                    <small className="name">Rachel Doyle</small>
                                                    <small className="content-text">Lorem ipsum dolor sit amet.</small>
                                                </div>
                                            </div>
                                            <div className="dropdown-list">
                                                <div className="image-wrapper">
                                                    <img className="profile-img" src="/assets/images/profile/male/image_3.png" alt="" />
                                                    <div className="status-indicator rounded-indicator bg-warning"></div>
                                                </div>
                                                <div className="content-wrapper">
                                                    <small className="name">Lewis Guzman</small>
                                                    <small className="content-text">Lorem ipsum dolor sit amet.</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-footer">
                                            <a href="/">View All</a>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link" href="/" id="appsDropdown" data-toggle="dropdown" aria-expanded="false">
                                        <i className="mdi mdi-apps mdi-1x"></i>
                                    </a>
                                    <div className="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="appsDropdown">
                                        <div className="dropdown-header">
                                            <h6 className="dropdown-title">Apps</h6>
                                            <p className="dropdown-title-text mt-2">Authentication required for 3 apps</p>
                                        </div>
                                        <div className="dropdown-body border-top pt-0">
                                            <a className="dropdown-grid" href="/">
                                                <i className="grid-icon mdi mdi-jira mdi-2x"></i>
                                                <span className="grid-tittle">Jira</span>
                                            </a>
                                            <a className="dropdown-grid" href="/">
                                                <i className="grid-icon mdi mdi-trello mdi-2x"></i>
                                                <span className="grid-tittle">Trello</span>
                                            </a>
                                            <a className="dropdown-grid" href="/">
                                                <i className="grid-icon mdi mdi-artstation mdi-2x"></i>
                                                <span className="grid-tittle">Artstation</span>
                                            </a>
                                            <a className="dropdown-grid" href="/">
                                                <i className="grid-icon mdi mdi-bitbucket mdi-2x"></i>
                                                <span className="grid-tittle">Bitbucket</span>
                                            </a>
                                        </div>
                                        <div className="dropdown-footer">
                                            <a href="/">View All</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
