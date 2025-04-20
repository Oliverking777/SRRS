import React from 'react'
import { useState } from 'react';
import { Filter, Search, MoreVertical, Plus } from 'lucide-react';

const Adminusers = () => {
    const initialUsers = [
        {
          id: 1,
          name: 'Olivia Martin',
          email: 'olivia.martin@example.com',
          role: 'User',
          status: 'Active',
          reports: 24,
          lastActive: '2 hours ago',
          location: 'North Region'
        },
        {
          id: 2,
          name: 'Jackson Lee',
          email: 'jackson.lee@example.com',
          role: 'User',
          status: 'Active',
          reports: 13,
          lastActive: '4 hours ago',
          location: 'East Region'
        },
        {
          id: 3,
          name: 'Isabella Nguyen',
          email: 'isabella.nguyen@example.com',
          role: 'Researcher',
          status: 'Active',
          reports: 42,
          lastActive: '1 day ago',
          location: 'South Region'
        },
        {
          id: 4,
          name: 'William Chen',
          email: 'william.chen@example.com',
          role: 'Healthcare',
          status: 'Active',
          reports: 31,
          lastActive: '2 days ago',
          location: 'West Region'
        },
        {
          id: 5,
          name: 'Sofia Rodriguez',
          email: 'sofia.rodriguez@example.com',
          role: 'Admin',
          status: 'Active',
          reports: 56,
          lastActive: 'Just now',
          location: 'Central Area'
        },
        {
          id: 6,
          name: 'Ethan Johnson',
          email: 'ethan.johnson@example.com',
          role: 'User',
          status: 'Inactive',
          reports: 7,
          lastActive: '2 weeks ago',
          location: 'North Region'
        },
        {
          id: 7,
          name: 'Mia Williams',
          email: 'mia.williams@example.com',
          role: 'Researcher',
          status: 'Pending',
          reports: 0,
          lastActive: 'Never',
          location: 'East Region'
        }
      ];
    
      const [users, setUsers] = useState(initialUsers);
      const [searchTerm, setSearchTerm] = useState('');
      const [roleFilter, setRoleFilter] = useState('');
      const [statusFilter, setStatusFilter] = useState('');
      const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
      const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    
      // Get unique roles and statuses for filters
      const roles = [...new Set(initialUsers.map(user => user.role))];
      const statuses = [...new Set(initialUsers.map(user => user.status))];
    
      // Filter users based on search term, role filter, and status filter
      const filteredUsers = initialUsers.filter(user => {
        const matchesSearch = 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter ? user.role === roleFilter : true;
        const matchesStatus = statusFilter ? user.status === statusFilter : true;
        
        return matchesSearch && matchesRole && matchesStatus;
      });
    
      // Handlers for filters
      const handleRoleFilter = (role) => {
        setRoleFilter(role === roleFilter ? '' : role);
        setIsRoleDropdownOpen(false);
      };
    
      const handleStatusFilter = (status) => {
        setStatusFilter(status === statusFilter ? '' : status);
        setIsStatusDropdownOpen(false);
      };


      const styles = {
        container: {
        
          backgroundColor: '#f9fafb',
          minHeight: '100vh',
          padding: '24px',
          width: '95%',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        },
        wrapper: {
          maxWidth: '100%',
          margin: '0 auto',
          
        },
        header: {
          marginBottom: '16px'
        },
        title: {
          fontSize: '24px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '4px'
        },
        subtitle: {
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '24px'
        },
        statsGrid: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        },
        statCard: {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        },
        statLabel: {
          fontSize: '14px',
          fontWeight: '500',
          color: '#6b7280'
        },
        statValue: {
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          marginTop: '4px'
        },
        statSubtext: {
          fontSize: '14px',
          color: '#6b7280'
        },
        systemUsersCard: {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '24px'
        },
        sectionTitle: {
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '4px'
        },
        sectionSubtitle: {
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '20px'
        },
        searchFilterBar: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          flexWrap: 'wrap',
          gap: '12px'
        },
        searchContainer: {
          position: 'relative',
          flexGrow: 1,
          maxWidth: '500px'
        },
        searchInput: {
          width: '100%',
          padding: '8px 8px 8px 36px',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          fontSize: '14px'
        },
        searchIcon: {
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9ca3af'
        },
        filterContainer: {
          display: 'flex',
          gap: '8px'
        },
        filterButton: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: 'pointer'
        },
        addButton: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: 'pointer'
        },
        dropdownMenu: {
          position: 'absolute',
          right: '0',
          marginTop: '4px',
          width: '180px',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 10
        },
        dropdownItem: {
          padding: '8px 12px',
          fontSize: '14px',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        },
        table: {
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0'
        },
        tableHeader: {
          textAlign: 'left',
          padding: '12px 16px',
          fontSize: '12px',
          fontWeight: '500',
          color: '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '1px solid #e5e7eb'
        },
        tableRow: {
          borderBottom: '1px solid #e5e7eb'
        },
        tableCell: {
          padding: '16px',
          fontSize: '14px',
          color: '#374151'
        },
        userCell: {
          display: 'flex',
          alignItems: 'center'
        },
        avatar: {
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#e5e7eb',
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '500'
        },
        userInfo: {
          marginLeft: '12px'
        },
        userName: {
          fontSize: '14px',
          fontWeight: '500',
          color: '#111827'
        },
        userEmail: {
          fontSize: '14px',
          color: '#6b7280'
        },
        badge: {
          display: 'inline-flex',
          alignItems: 'center',
          padding: '2px 8px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '500'
        },
        userBadge: {
          backgroundColor: '#3b82f6',
          color: '#ffffff'
        },
        adminBadge: {
          backgroundColor: '#fee2e2',
          color: '#ef4444'
        },
        researcherBadge: {
          backgroundColor: '#dcfce7',
          color: '#16a34a'
        },
        healthcareBadge: {
          backgroundColor: '#dbeafe',
          color: '#2563eb'
        },
        activeBadge: {
          backgroundColor: '#dcfce7',
          color: '#16a34a'
        },
        inactiveBadge: {
          backgroundColor: '#ffedd5',
          color: '#ea580c'
        },
        pendingBadge: {
          backgroundColor: '#dbeafe',
          color: '#2563eb'
        },
        actionButton: {
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#6b7280'
        },
        tableFooter: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb'
        },
        footerText: {
          fontSize: '14px',
          color: '#6b7280'
        },
        footerButtons: {
          display: 'flex',
          gap: '8px'
        },
        footerButton: {
          padding: '6px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          backgroundColor: '#ffffff',
          cursor: 'pointer'
        }
      };
    

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>User Management</h1>
          <p style={styles.subtitle}>View and manage user accounts, roles, and permissions.</p>
        </div>
        
        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {/* Total Users */}
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Users</div>
            <div style={styles.statValue}>2,841</div>
            <div style={{...styles.statSubtext, color: '#16a34a'}}>+7% from last month</div>
          </div>
          
          {/* Active Users */}
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Active Users</div>
            <div style={styles.statValue}>2,584</div>
            <div style={styles.statSubtext}>91% of total users</div>
          </div>
          
          {/* New Registrations */}
          <div style={styles.statCard}>
            <div style={styles.statLabel}>New Registrations</div>
            <div style={styles.statValue}>147</div>
            <div style={styles.statSubtext}>In the last 30 days</div>
          </div>
          
          {/* Healthcare Professionals */}
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Healthcare Professionals</div>
            <div style={styles.statValue}>432</div>
            <div style={styles.statSubtext}>15% of total users</div>
          </div>
        </div>
        
        {/* System Users Section */}
        <div style={styles.systemUsersCard}>
          <h2 style={styles.sectionTitle}>System Users</h2>
          <p style={styles.sectionSubtitle}>Manage registered users and their access permissions</p>
          
          {/* Search and Filter Bar */}
          <div style={styles.searchFilterBar}>
            <div style={styles.searchContainer}>
              <div style={styles.searchIcon}>
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={styles.filterContainer}>
              {/* Role Filter */}
              <div style={{ position: 'relative' }}>
                <button
                  style={styles.filterButton}
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                >
                  <Filter size={16} />
                  <span>{roleFilter || 'Role'}</span>
                </button>
                
                {isRoleDropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    {roles.map(role => (
                      <button
                        key={role}
                        style={{
                          ...styles.dropdownItem,
                          backgroundColor: roleFilter === role ? '#eff6ff' : 'transparent',
                          color: roleFilter === role ? '#2563eb' : '#374151'
                        }}
                        onClick={() => handleRoleFilter(role)}
                      >
                        {role}
                      </button>
                    ))}
                    <button
                      style={{
                        ...styles.dropdownItem,
                        borderTop: '1px solid #e5e7eb'
                      }}
                      onClick={() => {
                        setRoleFilter('');
                        setIsRoleDropdownOpen(false);
                      }}
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
              
              {/* Status Filter */}
              <div style={{ position: 'relative' }}>
                <button
                  style={styles.filterButton}
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <Filter size={16} />
                  <span>{statusFilter || 'Status'}</span>
                </button>
                
                {isStatusDropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    {statuses.map(status => (
                      <button
                        key={status}
                        style={{
                          ...styles.dropdownItem,
                          backgroundColor: statusFilter === status ? '#eff6ff' : 'transparent',
                          color: statusFilter === status ? '#2563eb' : '#374151'
                        }}
                        onClick={() => handleStatusFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                    <button
                      style={{
                        ...styles.dropdownItem,
                        borderTop: '1px solid #e5e7eb'
                      }}
                      onClick={() => {
                        setStatusFilter('');
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>
              
              {/* Add User Button */}
              <button style={styles.addButton}>
                <Plus size={16} />
                Add User
              </button>
            </div>
          </div>
          
          {/* Users Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>User</th>
                  <th style={styles.tableHeader}>Role</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Reports</th>
                  <th style={styles.tableHeader}>Last Active</th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <div style={styles.userCell}>
                        <div style={styles.avatar}>
                          {user.name.charAt(0)}
                        </div>
                        <div style={styles.userInfo}>
                          <div style={styles.userName}>{user.name}</div>
                          <div style={styles.userEmail}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.badge,
                        ...(user.role === 'User' ? styles.userBadge : 
                            user.role === 'Admin' ? styles.adminBadge : 
                            user.role === 'Researcher' ? styles.researcherBadge : 
                            styles.healthcareBadge)
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.badge,
                        ...(user.status === 'Active' ? styles.activeBadge : 
                            user.status === 'Inactive' ? styles.inactiveBadge : 
                            styles.pendingBadge)
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {user.reports}
                    </td>
                    <td style={styles.tableCell}>
                      {user.lastActive}
                    </td>
                    <td style={styles.tableCell}>
                      {user.location}
                    </td>
                    <td style={styles.tableCell}>
                      <button style={styles.actionButton}>
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div style={styles.tableFooter}>
            <div style={styles.footerText}>
              Showing {filteredUsers.length} of {filteredUsers.length} users
            </div>
            <div style={styles.footerButtons}>
              <button style={styles.footerButton}>Export</button>
              <button style={styles.footerButton}>Archive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminusers