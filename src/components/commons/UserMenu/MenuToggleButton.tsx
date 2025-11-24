import { FaBars, FaChevronDown } from 'react-icons/fa';

interface MenuToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuToggleButton({
  isOpen,
  onClick = () => {}
}: MenuToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
    >
      <FaBars className="w-5 h-5" />
      <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}
