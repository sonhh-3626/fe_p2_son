import React from 'react';
import { Mail } from 'lucide-react';

export default function UserInfo({ avatar, name, email }: { avatar: string; name: string; email: string }) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <Mail className="w-3 h-3" />
          {email}
        </div>
      </div>
    </div>
  );
}
