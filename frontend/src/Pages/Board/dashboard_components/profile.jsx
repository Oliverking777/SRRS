import React, { useState } from 'react';

const ProfileCont = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Metropolitan Area',
    bio: 'Healthcare worker focused on community wellness and disease prevention.',
    medicalBackground: 'Yes',
    memberSince: '2025',
    reports: '24'
  });

  const [activeTab, setActiveTab] = useState('Profile Information');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({...profile});

  const recentReports = [
    {
      id: 1,
      type: 'Respiratory Infection',
      date: 'July 5, 2025',
      location: 'Downtown District',
      status: 'Active'
    },
    {
      id: 2,
      type: 'Gastrointestinal Illness',
      date: 'June 20, 2025',
      location: 'North Region',
      status: 'Resolved'
    },
    {
      id: 3,
      type: 'Viral Infection',
      date: 'May 15, 2025',
      location: 'East Side Area',
      status: 'Resolved'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({...formData});
    setEditing(false);
  };

  return (
    <div className="profile-container" style={{ fontFamily: 'Arial, sans-serif', color: '#333',padding:'10px' }}>
      <div className="tabs" style={{ borderBottom: '1px solid #e6e6e6', marginBottom: '20px' }}>
        <button 
          className={activeTab === 'Profile Information' ? 'active-tab' : ''}
          style={{ 
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'Profile Information' ? '2px solid #4169e1' : 'none',
            fontSize: '14px',
            padding: '12px 20px',
            marginRight: '10px',
            fontWeight: activeTab === 'Profile Information' ? '600' : '400',
            color: activeTab === 'Profile Information' ? '#4169e1' : '#666',
            cursor: 'pointer',
          }}
          onClick={() => setActiveTab('Profile Information')}
        >
          Profile Information
        </button>
        <button
          className={activeTab === 'Reporting History' ? 'active-tab' : ''}
          style={{ 
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'Reporting History' ? '2px solid #4169e1' : 'none',
            fontSize: '14px',
            padding: '12px 20px',
            fontWeight: activeTab === 'Reporting History' ? '600' : '400',
            color: activeTab === 'Reporting History' ? '#4169e1' : '#666',
            cursor: 'pointer',
          }}
          onClick={() => setActiveTab('Reporting History')}
        >
          Reporting History
        </button>
      </div>

      {activeTab === 'Profile Information' ? (
        <>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Profile Overview */}
            <div className="profile-overview" style={{ 
              flex: '1', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Profile Overview</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#ddd',
                  fontSize: '24px'
                }}>
                  ?
                </div>
                
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 4px 0' }}>{profile.fullName}</h3>
                <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px 0' }}>{profile.email}</p>
                
                <div style={{ 
                  display: 'flex', 
                  width: '100%', 
                  justifyContent: 'center', 
                  fontSize: '13px',
                  color: '#666',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {profile.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    {profile.reports} reports
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Member since {profile.memberSince}
                  </div>
                </div>
              </div>
              
              <button style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e6e6e6',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: '#333',
                fontSize: '14px',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Edit Profile
              </button>
            </div>

            {/* Profile Information */}
            <div className="profile-details" style={{ 
              flex: '2', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Profile Information</h2>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>View your current profile information</p>
              
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Full Name</label>
                <div style={{ 
                  padding: '10px', 
                  fontSize: '14px', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '4px' 
                }}>
                  {profile.fullName}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Email</label>
                <div style={{ 
                  padding: '10px', 
                  fontSize: '14px', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '4px' 
                }}>
                  {profile.email}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Phone Number</label>
                  <div style={{ 
                    padding: '10px', 
                    fontSize: '14px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '4px' 
                  }}>
                    {profile.phone}
                  </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Location</label>
                  <div style={{ 
                    padding: '10px', 
                    fontSize: '14px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '4px' 
                  }}>
                    {profile.location}
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Bio</label>
                <div style={{ 
                  padding: '10px', 
                  fontSize: '14px', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '4px',
                  minHeight: '80px' 
                }}>
                  {profile.bio}
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Brief description for your profile. Maximum 160 characters.</p>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>Medical Background</label>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px', 
                  fontSize: '14px', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '4px' 
                }}>
                  {profile.medicalBackground}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Do you have a professional medical background?</p>
              </div>
            </div>
          </div>

          {/* Contact & Emergency Information Section */}
          <div className="emergency-info" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginTop: '20px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Contact & Emergency Information</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>This information will be used in case of emergency alerts in your area</p>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', color: '#666' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Phone Number</label>
                  <div style={{ fontSize: '14px' }}>{profile.phone}</div>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', color: '#666' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Primary Location</label>
                  <div style={{ fontSize: '14px' }}>{profile.location}</div>
                </div>
              </div>
            </div>
            
            <p style={{ fontSize: '12px', color: '#666', marginTop: '16px' }}>Emergency contact information can be updated in your account settings</p>
          </div>
        </>
      ) : (
        // Reporting History Tab Content
        <>
          <div className="reporting-summary" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Reporting Summary</h2>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* Total Reports Card */}
              <div style={{ 
                flex: 1, 
                border: '1px solid #e6e6e6', 
                borderRadius: '8px', 
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4169e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span style={{ fontSize: '14px', color: '#666' }}>Total Reports</span>
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0' }}>24</h3>
                <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>Since January 2025</p>
              </div>
              
              {/* Contribution Level Card */}
              <div style={{ 
                flex: 1, 
                border: '1px solid #e6e6e6', 
                borderRadius: '8px', 
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4169e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span style={{ fontSize: '14px', color: '#666' }}>Contribution Level</span>
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0' }}>Silver</h3>
                <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>15 more reports to Gold</p>
              </div>
              
              {/* Last Report Card */}
              <div style={{ 
                flex: 1, 
                border: '1px solid #e6e6e6', 
                borderRadius: '8px', 
                padding: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4169e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span style={{ fontSize: '14px', color: '#666' }}>Last Report</span>
                </div>
                <h3 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0' }}>2 days ago</h3>
                <p style={{ fontSize: '13px', color: '#666', margin: '0' }}>On July 5, 2025</p>
              </div>
            </div>
          </div>
          
          {/* Recent Reports Section */}
          <div className="recent-reports" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Recent Reports</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>Your most recent sickness reports and their current status</p>
            
            {/* Reports List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentReports.map(report => (
                <div key={report.id} style={{ 
                  border: '1px solid #e6e6e6',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#f0f4ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4169e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>{report.type}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#666' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {report.date}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {report.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    backgroundColor: report.status === 'Active' ? '#e6f1ff' : '#e6fff0',
                    color: report.status === 'Active' ? '#4169e1' : '#00a86b',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {report.status}
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Reports Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#4169e1',
                border: '1px solid #e6e6e6',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                View All Reports
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCont;