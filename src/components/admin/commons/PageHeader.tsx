interface PageHeaderProps {
  title: string;
  buttonText: string;
  onAddNew: () => void;
}

export default function PageHeader({
  title,
  buttonText,
  onAddNew
}: PageHeaderProps) {
 return (
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
    <button
      onClick={onAddNew}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      {buttonText}
    </button>
  </div>
);
}
