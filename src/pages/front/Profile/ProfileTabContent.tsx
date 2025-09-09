import React from 'react';

interface ProfileTabContentProps {
    activeTab: string;
    onTabClick: (tab: string) => void;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({ activeTab, onTabClick }) => {
    return (
        <div className="p-5 bg-white shadow-md rounded-lg">
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 ${activeTab === 'details' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => onTabClick('details')}
                >
                    Details
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'security' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => onTabClick('security')}
                >
                    Security
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'preferences' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => onTabClick('preferences')}
                >
                    Preferences
                </button>
            </div>
            {activeTab === 'details' && <div>Profile Details Content</div>}
            {activeTab === 'security' && <div>Profile Security Content</div>}
            {activeTab === 'preferences' && <div>Profile Preferences Content</div>}
        </div>
    );
};

export default ProfileTabContent;