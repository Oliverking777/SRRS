import React from 'react';

import { useData } from '../../../Components/Contextprovider/ContextProvider';

const Dashb = ({ onNavigate }) => {
  const { reportStats, recentReports } = useData();
  return (
    <>
      <div className="dashboard-header">
        <div className="dashboard-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <h1>Dashboard</h1>
        </div>
        <p>Track and manage health-related reports in your area.</p>
        <button className="new-report-btn" onClick={() => onNavigate('newReport')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          New Report
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Reports</h3>
            <p>All submitted reports</p>
            <div className="stat-number">{reportStats.total.toLocaleString()}</div>
          </div>
          <div className="progress-bar blue">
            <div className="progress" style={{ width: `${Math.min((reportStats.total / 200) * 100, 100)}%` }}></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Critical Reports</h3>
            <p>Reports requiring immediate attention</p>
            <div className="stat-number">{reportStats.critical.toLocaleString()}</div>
          </div>
          <div className="progress-bar red">
            <div className="progress" style={{ width: `${Math.min((reportStats.critical / 20) * 100, 100)}%` }}></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>New Reports Today</h3>
            <p>Reports submitted in the last 24 hours</p>
            <div className="stat-number">{reportStats.new.toLocaleString()}</div>
          </div>
          <div className="progress-bar blue">
            <div className="progress" style={{ width: `${Math.min((reportStats.new / 10) * 100, 100)}%` }}></div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h3>Resolved Reports</h3>
            <p>Reports marked as resolved</p>
            <div className="stat-number">{reportStats.resolved.toLocaleString()}</div>
          </div>
          <div className="progress-bar green">
            <div className="progress" style={{ width: `${Math.min((reportStats.resolved / 200) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div className="recent-reports">
        <h2>Recent Reports</h2>
        <p>List of recently submitted reports</p>
        
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.title}</td>
                <td>
                  <span className={`status-badge ${report.status.toLowerCase()}`}>
                    {report.status}
                  </span>
                </td>
                <td>{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashb;