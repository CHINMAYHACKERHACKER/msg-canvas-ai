import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Mail, User2, Shield, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserFormDialog } from "@/components/User/UserFormDialog";

type Channel = 'campaigns' | 'analytics' | 'bots' | 'templates' | 'users';

interface User {
  id: string;
  user_name: string;
  user_email: string;
  role: 'admin' | 'user';
  channels: Channel[];
}

// Sample data for testing
const sampleUsers: User[] = [
  {
    id: '1',
    user_name: 'John Doe',
    user_email: 'john@example.com',
    role: 'admin',
    channels: ['campaigns', 'analytics', 'bots', 'templates', 'users']
  },
  {
    id: '2',
    user_name: 'Jane Smith',
    user_email: 'jane@example.com',
    role: 'user',
    channels: ['campaigns', 'analytics', 'bots']
  },
  {
    id: '3',
    user_name: 'Bob Wilson',
    user_email: 'bob@example.com',
    role: 'user',
    channels: ['templates', 'bots']
  }
];

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <User2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user.user_name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user.user_email}</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onEdit(user)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {/* Role Badge */}
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-muted-foreground" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {user.role}
            </span>
          </div>

          {/* Channel Access */}
          {user.role === 'user' && (
            <div className="flex flex-wrap gap-1 mt-2">
              {user.channels.map((channel) => (
                <span
                  key={channel}
                  className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                >
                  {channel}
                </span>
              ))}
            </div>
          )}
          

        </div>
      </CardContent>
    </Card>
  );
}

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users] = useState<User[]>(sampleUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (userData: any) => {
    // TODO: Implement API call to create user
    console.log('Creating user:', userData);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const filteredUsers = users.filter(user => 
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.channels.some(channel => channel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Button 
          className="bg-gradient-primary hover:opacity-90"
          onClick={() => {
            setEditingUser(null);
            setShowUserForm(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No users found
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onEdit={handleEditUser} />
          ))
        )}
      </div>

      {/* User Form Dialog */}
      <UserFormDialog
        open={showUserForm}
        onOpenChange={setShowUserForm}
        onSubmit={handleAddUser}
        initialData={editingUser || undefined}
        isEditing={!!editingUser}
      />
    </div>
  );
}