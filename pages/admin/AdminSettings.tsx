import React, { useState, useRef } from 'react';
import { Save, User, Bell, Lock, Globe, Upload } from 'lucide-react';
import { useData } from '@/context/DataContext';

const AdminSettings: React.FC = () => {
    const { adminProfile, updateAdminProfile } = useData();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Profile State
    const [profile, setProfile] = useState({
        firstName: adminProfile.firstName,
        lastName: adminProfile.lastName,
        email: adminProfile.email,
        bio: adminProfile.bio,
        avatar: adminProfile.avatar || ''
    });

    // Notification State
    const [notifications, setNotifications] = useState(adminProfile.notifications);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert("La taille de l'image ne doit pas dépasser 5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setLoading(true);
        // Simulate API call and update context
        setTimeout(() => {
            updateAdminProfile({
                ...adminProfile,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                bio: profile.bio,
                avatar: profile.avatar,
                notifications: notifications
            });
            setLoading(false);
            alert('Paramètres enregistrés avec succès !');
        }, 800);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-nesty-dark font-heading">Paramètres</h1>
                    <p className="text-gray-500 mt-1">Gérez vos préférences et la configuration du compte</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-nesty-darker text-white px-5 py-2.5 rounded-xl font-bold hover:bg-nesty-accent hover:text-nesty-darker transition shadow-lg shadow-nesty-darker/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <Save size={18} className={loading ? 'animate-spin' : ''} />
                    <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
                </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'profile' ? 'bg-nesty-accent/10 text-nesty-dark' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <User size={18} /> Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'notifications' ? 'bg-nesty-accent/10 text-nesty-dark' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Bell size={18} /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'security' ? 'bg-nesty-accent/10 text-nesty-dark' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Lock size={18} /> Sécurité
                    </button>
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'general' ? 'bg-nesty-accent/10 text-nesty-dark' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Globe size={18} /> Général
                    </button>
                </div>

                {/* Settings Content */}
                <div className="flex-grow">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl font-bold text-nesty-dark mb-4">Informations du Profil</h3>
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-nesty-asphalt flex items-center justify-center text-white text-2xl font-bold ring-4 ring-gray-50 overflow-hidden relative">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</span>
                                    )}
                                </div>

                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/gif"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition flex items-center gap-2"
                                    >
                                        <Upload size={16} /> Changer la photo
                                    </button>
                                    <p className="text-xs text-gray-400 mt-2">JPG, GIF ou PNG. Max 5MB.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Prénom</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={profile.firstName}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nesty-accent/50 outline-none font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={profile.lastName}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nesty-accent/50 outline-none font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nesty-accent/50 outline-none font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bio</label>
                                    <textarea
                                        rows={4}
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-nesty-accent/50 outline-none font-medium"
                                        placeholder="Une brève description..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl font-bold text-nesty-dark mb-4">Préférences de Notification</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <p className="font-bold text-nesty-dark">Emails de réservation</p>
                                        <p className="text-sm text-gray-500">Recevoir une alerte pour chaque nouvelle réservation</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                        <input
                                            type="checkbox"
                                            id="toggle1"
                                            className="peer absolute opacity-0 w-0 h-0"
                                            checked={notifications.reservations}
                                            onChange={() => handleNotificationChange('reservations')}
                                        />
                                        <label htmlFor="toggle1" className="block cursor-pointer w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-nesty-accent transition-colors before:content-[''] before:absolute before:left-1 before:top-1 before:bg-white before:w-4 before:h-4 before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div>
                                        <p className="font-bold text-nesty-dark">Nouveaux messages</p>
                                        <p className="text-sm text-gray-500">Alertes instantanées pour les messages entrants</p>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                                        <input
                                            type="checkbox"
                                            id="toggle2"
                                            className="peer absolute opacity-0 w-0 h-0"
                                            checked={notifications.messages}
                                            onChange={() => handleNotificationChange('messages')}
                                        />
                                        <label htmlFor="toggle2" className="block cursor-pointer w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-nesty-accent transition-colors before:content-[''] before:absolute before:left-1 before:top-1 before:bg-white before:w-4 before:h-4 before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholders for other tabs */}
                    {(activeTab === 'security' || activeTab === 'general') && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <Lock size={48} className="mb-4 opacity-20" />
                            <p>Paramètres bientôt disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
