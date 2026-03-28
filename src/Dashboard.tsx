import { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { useFilter } from './hooks/useFilter';
import { Button, Input, Card, DataTable } from './components/UIComponents';
import { type User } from './types/';
import { useForm } from './hooks/useForm';

export default function Dashboard() {
  const { colors, toggleTheme, isDarkMode } = useTheme();
  
  // 1. Initial State
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Smith', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Jones', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Charlie Day', role: 'Editor', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  // 2. Custom Hooks
  const { values, handleChange, resetForm } = useForm({ name: '', role: 'User' });
  
  // Now filtering by both text AND the "Active" checkbox
  const filteredUsers = useFilter(users, search, 'name', showActiveOnly);

  // 3. Handlers
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name) return;
    const newUser: User = { 
      id: Date.now(), 
      name: values.name, 
      role: values.role, 
      status: 'Active' 
    };
    setUsers([...users, newUser]);
    resetForm();
  };

  const handleDelete = (id: number | string) => {
    if (window.confirm("Remove this member?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh', transition: '0.3s', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: colors.text, margin: 0 }}>Team Management</h1>
          <Button onClick={toggleTheme}>{isDarkMode ? '☀️ Light' : '🌙 Dark'}</Button>
        </header>

        {/* SEARCH & FILTER SECTION */}
        <Card title="Filters">
          <Input label="Search by Name" value={search} onChange={setSearch} placeholder="Filter list..." />
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.text, cursor: 'pointer', marginTop: '10px' }}>
            <input 
              type="checkbox" 
              checked={showActiveOnly} 
              onChange={(e) => setShowActiveOnly(e.target.checked)} 
              style={{ width: '18px', height: '18px' }}
            />
            Only show Active members
          </label>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '20px' }}>
          {/* ADD USER FORM */}
          <Card title="Add Member">
            <form onSubmit={handleAdd}>
              <Input label="Full Name" value={values.name} onChange={(v: string) => handleChange('name', v)} />
              <Button type="submit" variant="success">Add to Team</Button>
            </form>
          </Card>

          {/* THE DATA TABLE (With Delete Button back in action!) */}
          <Card title={`User Registry (${filteredUsers.length})`}>
            <DataTable 
              data={filteredUsers} 
              columns={['name', 'role', 'status']} 
              onDelete={handleDelete} 
            />
          </Card>
        </div>

      </div>
    </div>
  );
}