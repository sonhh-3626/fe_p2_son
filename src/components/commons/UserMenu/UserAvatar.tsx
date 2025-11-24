import { FaChevronDown, FaBars } from 'react-icons/fa';
import { Session } from "next-auth";


interface UserAvatarProps {
  name: string;
  onClick: () => void;
  isOpen: boolean;
  session: Session | null;
}

export default function UserAvatar({ name, onClick, isOpen, session }: UserAvatarProps) {
  if (session) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold">
          {name.charAt(0)}
        </div>
        <span className="font-medium">{name}</span>
        <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        <FaBars className="w-5 h-5" />
        <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    );
  }
}
