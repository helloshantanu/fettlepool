import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { Chart } from "react-google-charts";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import moment, { now } from "moment";

export default class Dashboard extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      data: [],
      analytics:[],
      s1:0,
      s2:0,
      s3:0,
      s4:0,
      s5:0,
      s6:0,
      s7:0,
      e1:0,
      e2:0,
      e3:0,
      e4:0,
      e5:0,
      e6:0,
      e7:0,
      loading: false,
      snackbar: false,
      snackbarMsg: ''
    }
  }
  
  async componentDidMount() {

    if (localStorage.getItem('admin') == null)
      this.props.history.push('/login');
    
    var token = 'Bearer ' + localStorage.getItem('token')

    await axios({
      method: 'post',
      url: 'https://api.fettlepool.in/api/analytics/dashboardAnalytics',
      headers: {
        'Authorization': token
      },
      data: {
        scope: "access_secure_users_data"
      }
    }).then(response => {
      if (response.status == 200) {
        this.setState({
          data: response.data
        })
      }
    })
      .catch(error => {
        console.log(error);
      });


    await axios({
      method: 'post',
      url: 'https://api.fettlepool.in/api/analytics/getAnalytics',
      headers: {
        'Authorization': token
      },
      data: {
        scope: "access_secure_users_data"
      }
    }).then(response => {
      if (response.status == 200) {
        this.state.analytics = response.data['data'].map((x) => x)
        this.setState({
          s1: this.state.analytics[0]['curWeekSessions'][1],
          s2: this.state.analytics[0]['curWeekSessions'][2],
          s3: this.state.analytics[0]['curWeekSessions'][3],
          s4: this.state.analytics[0]['curWeekSessions'][4],
          s5: this.state.analytics[0]['curWeekSessions'][5],
          s6: this.state.analytics[0]['curWeekSessions'][6],
          s7: this.state.analytics[0]['curWeekSessions'][7],
          e1: this.state.analytics[0]['curWeekEarnings'][1],
          e2: this.state.analytics[0]['curWeekEarnings'][2],
          e3: this.state.analytics[0]['curWeekEarnings'][3],
          e4: this.state.analytics[0]['curWeekEarnings'][4],
          e5: this.state.analytics[0]['curWeekEarnings'][5],
          e6: this.state.analytics[0]['curWeekEarnings'][6],
          e7: this.state.analytics[0]['curWeekEarnings'][7],
        })
      }
    })
      .catch(error => {
        console.log(error);
      });
    
    
    if (this.state.analytics.length == 0 && moment().isoWeekday()==4){
      await axios({
        method: 'post',
        url: 'https://api.fettlepool.in/api/analytics/weeklyAnalytics',
        headers: {
          'Authorization': token
        },
        data: {
          scope: "access_secure_users_data"
        }
      }).then(response => {
        if (response.status == 200) {
          // window.location.reload();
        }
      })
        .catch(error => {
          console.log(error);
        });
      }
      else{
      
      if (this.state.analytics.length != 0){
        var start_date = moment(this.state.analytics[0]['createdOn'], 'YYYY-MM-DD HH:mm:ss');
        var end_date = moment(moment().toISOString(), 'YYYY-MM-DD HH:mm:ss');
        var duration = moment.duration(end_date.diff(start_date));
        var days = duration.asDays();

        if (days >= 7) {
          await axios({
            method: 'post',
            url: 'https://api.fettlepool.in/api/analytics/weeklyAnalytics',
            headers: {
              'Authorization': token
            },
            data: {
              scope: "access_secure_users_data"
            }
          }).then(response => {
            if (response.status == 200) {
              // window.location.reload();
            }
          })
            .catch(error => {
              console.log(error);
            });
        }
      }      

      }

        
  }
  
  render() {
    return (
      <div>
        <div class="page-body" >
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={this.state.snackbar}
            message={<span style={{ textAlign: 'center' }}>{this.state.snackbarMsg}</span>}
          />

          <Sidebar history={this.props.history} />

          <div class="page-content-wrapper" style={{ marginTop: '0px', padding: '0px' }}>
            <div class="custom-header" style={{ backgroundColor: 'white', height: '100px', paddingLeft: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '2px solid', borderColor: '#f2f4f9' }}>
              <div>
                
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <h1 style={{ fontSize: '36px', paddingLeft: '10px', color: 'white', fontFamily: 'poppins', fontWeight: 'bolder' }}>
                    <i class="mdi mdi-gauge" style={{ fontSize: '36px', paddingRight: '6px', color: 'white' }}></i>Dashboard</h1>
                </div>
              
              </div>
            </div>
            <div class="page-content-wrapper-inner" style={{ paddingTop: '30px' }}>
              <div class="content-viewport">
                <div class="row">

                  <div class="col-md-3 col-sm-6 col-6 equel-grid" >
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ec9f05', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-account-multiple" style={{ fontSize: '25px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Total Users</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>{this.state.data['users']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingLeft: '25px', }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ec9f05', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-clipboard-account-outline" style={{ fontSize: '25px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Registered Users</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>{this.state.data['usersRg']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingLeft: '25px', }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ec9f05', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-history" style={{ fontSize: '25px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Transactions</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>₹ {this.state.data['transactions']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingLeft: '25px', }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#ec9f05', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-cash-multiple" style={{ fontSize: '25px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Total Earnings</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>₹ {this.state.data['earnings']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-6 col-md-6 equel-grid" style={{ paddingTop: '25px', paddingRight: '10px' }}>
                    <div class="grid">
                      <div class="grid-body">
                        <Chart
                          width={'500px'}
                          height={'300px'}
                          chartType="Bar"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Days', 'Sessions'],
                            ['Mon', this.state.s1],
                            ['Tues', this.state.s2],
                            ['Wed', this.state.s3],
                            ['Thurs', this.state.s4],
                            ['Fri', this.state.s5],
                            ['Satur', this.state.s6],
                            ['Sun', this.state.s7],

                          ]}
                          options={{
                            colors: ['#EC9F05'],
                            is3D: true,
                            chart: {
                              title: 'Total Sessions',
                              subtitle: 'Total Number of Sessions accessed in this week.',
                            },
                          }}

                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 equel-grid" style={{ paddingTop: '25px', paddingLeft: '10px' }}>
                    <div class="grid">
                      <div class="grid-body">
                        <Chart
                          width={'500px'}
                          height={'300px'}
                          chartType="Bar"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Days', 'Earnings'],
                            ['Mon', this.state.e1],
                            ['Tues', this.state.e2],
                            ['Wed', this.state.e3],
                            ['Thurs', this.state.e4],
                            ['Fri', this.state.e5],
                            ['Satur', this.state.e6],
                            ['Sun', this.state.e7],

                          ]}
                          options={{
                            colors: ['#647DEE'],
                            is3D: true,
                            chart: {
                              title: 'Total Earnings',
                              subtitle: 'Total Earnings in this week.',
                            },
                          }}

                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingTop: '20px' }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#647dee', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-dumbbell" style={{ fontSize: '25px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Sessions</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>{this.state.data['sessions']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingTop: '20px', paddingLeft: '25px' }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#647dee', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-coffee" style={{ fontSize: '20px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Fettle Shakes</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>{this.state.data['items']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingTop: '20px', paddingLeft: '25px' }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#647dee', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-card-text-outline" style={{ fontSize: '25px', paddingTop: '3px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Shakes</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>{this.state.data['menus']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-6 col-6 equel-grid" style={{ paddingTop: '20px', paddingLeft: '25px' }}>
                    <div class="grid dashboard-cards" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#647dee', height: '50px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', alignItems: 'center' }}>
                          <i class="mdi mdi-account-badge" style={{ fontSize: '25px', paddingTop: '5px', paddingRight: '6px', color: 'white' }}></i>
                          <p class="text-black" style={{ fontSize: '25px', paddingTop: '5px', fontFamily: 'poppins', fontWeight: 'bold', color: 'white' }}>Admins</p>
                        </div>
                        <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                          <h3 class=" mt-4" style={{ fontSize: '30px', fontFamily: 'poppins', fontWeight: 'bold' }}>{this.state.data['admins']}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div class="col-lg-6 equel-grid" style={{ paddingTop: '20px', paddingBottom: '20px', }}>
                    <div class="grid" >
                      <div class="grid-body" >
                        <p class="card-title">Percent Change in Sessions Weekly</p>
                        <div style={{ textAlign: 'center' }}><Chart
                          width={'100%'}
                          height={'100%'}
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Sessions', 'Weekly'],
                            ['Current', 6],
                            ['Remaining', 4]
                          ]}
                          options={{
                            colors: ['#EC9F05', '#d6d6d6'],
                            pieHole: 0.8,
                          }}
                        /></div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div class="col-lg-6 equel-grid" style={{ paddingTop: '20px', paddingBottom: '20px', }}>
                    <div class="grid" >
                      <div class="grid-body" >
                        <p class="card-title">Percent Change in Earnings Weekly</p>
                        <div style={{ textAlign: 'center' }}><Chart
                          width={'100%'}
                          height={'100%'}
                          chartType="PieChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ['Sessions', 'Weekly'],
                            ['Current', 7],
                            ['Remaining', 3]
                          ]}
                          options={{
                            colors: ['#647DEE', '#d6d6d6'],
                            pieHole: 0.8,
                          }}
                        /></div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


