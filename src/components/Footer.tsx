import { VislyLogo, MeetingInsightsLogo } from './icons/Icons';

interface FooterProps {
  onSaveDraft?: () => void;
  onSendInvite?: () => void;
}

export default function Footer({ onSaveDraft, onSendInvite }: FooterProps) {
  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft();
    } else {
      console.log('Save draft clicked');
    }
  };

  const handleSendInvite = () => {
    if (onSendInvite) {
      onSendInvite();
    } else {
      console.log('Send invite clicked');
    }
  };

  return (
    <footer className="py-4 px-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1"></div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSaveDraft}
            className="py-2 px-4 text-gray-600 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            Save Draft
          </button>
          <button 
            onClick={handleSendInvite}
            className="py-2 px-4 bg-amber-500 text-white text-sm font-medium rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            Send Invite
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-gray-500 mt-4 justify-center">
        <MeetingInsightsLogo className="h-5 w-5 text-amber-500" />
        <span>© 2023 SmartMeet. All rights reserved.</span>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2 justify-center">
        <span>Made with</span>
        <VislyLogo className="h-4" />
      </div>
    </footer>
  );
}