import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Channel = 'campaigns' | 'analytics' | 'bots' | 'templates' | 'users';

interface UserFormData {
  user_name: string;
  user_email: string;
  role: 'admin' | 'user';
  channels: Channel[];
}

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  isEditing?: boolean;
}

const availableChannels: { value: Channel; label: string }[] = [
  { value: 'campaigns', label: 'Campaigns' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'bots', label: 'Bots' },
  { value: 'templates', label: 'Templates' },
  { value: 'users', label: 'Users' }
];

export function UserFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false
}: UserFormDialogProps) {
  const [formData, setFormData] = useState<UserFormData>({
    user_name: initialData?.user_name || '',
    user_email: initialData?.user_email || '',
    role: initialData?.role || 'user',
    channels: initialData?.channels || ['users'] // Default to users channel
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    // Username validation
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Username is required';
    } else if (formData.user_name.length < 2 || formData.user_name.length > 100) {
      newErrors.user_name = 'Username must be between 2 and 100 characters';
    }

    // Email validation
    if (!formData.user_email) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address';
    }

    // Channels validation (only if role is user)
    if (formData.role === 'user' && formData.channels.length === 0) {
      newErrors.channels = 'Please select at least one channel';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // If role is admin, give access to all channels
      const finalData = {
        ...formData,
        channels: formData.role === 'admin' ? availableChannels.map(c => c.value) : formData.channels
      };
      onSubmit(finalData);
      onOpenChange(false);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Handle role changes
      if (field === 'role') {
        if (value === 'admin') {
          newData.channels = []; // Admin gets all channels implicitly
        } else {
          newData.channels = ['users']; // User role always has users channel
        }
      }
      return newData;
    });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleChannel = (channel: Channel) => {
    // Don't allow removing the users channel
    if (channel === 'users') return;

    handleInputChange('channels', 
      formData.channels.includes(channel)
        ? formData.channels.filter(c => c !== channel)
        : [...formData.channels, channel]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="user_name">Username</Label>
            <Input
              id="user_name"
              value={formData.user_name}
              onChange={(e) => handleInputChange('user_name', e.target.value)}
              placeholder="Enter username"
              className={errors.user_name ? 'border-red-500' : ''}
            />
            {errors.user_name && (
              <p className="text-xs text-red-500">{errors.user_name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="user_email">Email</Label>
            <Input
              id="user_email"
              type="email"
              value={formData.user_email}
              onChange={(e) => handleInputChange('user_email', e.target.value)}
              placeholder="Enter email"
              className={errors.user_email ? 'border-red-500' : ''}
            />
            {errors.user_email && (
              <p className="text-xs text-red-500">{errors.user_email}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'admin' | 'user') => 
                handleInputChange('role', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Channel Selection (only show if role is user) */}
          {formData.role === 'user' && (
            <div className="space-y-2">
              <Label>Channel Access</Label>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {availableChannels.map((channel) => (
                  <div key={channel.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel.value}
                      checked={channel.value === 'users' || formData.channels.includes(channel.value)}
                      onCheckedChange={() => toggleChannel(channel.value)}
                      disabled={channel.value === 'users'}
                    />
                    <Label htmlFor={channel.value} className="text-sm font-normal">
                      {channel.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.channels && (
                <p className="text-xs text-red-500">{errors.channels}</p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              {isEditing ? 'Update User' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}