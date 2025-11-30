import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Property } from '../../types';
import { Plus, Trash2, Edit, X, Save, Image as ImageIcon, Search, MapPin, Filter } from 'lucide-react';

const AdminProperties: React.FC = () => {
  const { properties, addProperty, deleteProperty, updateProperty } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');

  const initialFormState: Property = {
    id: 0,
    title: '',
    location: '',
    type: 'Apartment',
    rawPrice: 0,
    displayPrice: '',
    description: '',
    image: '',
    images: [],
    specs: {
      surface: '',
      rooms: 1,
      roomsDisplay: '',
      roi: ''
    },
    amenities: []
  };

  const [formData, setFormData] = useState<Property>(initialFormState);

  const handleEdit = (prop: Property) => {
    setFormData(prop);
    setEditingId(prop.id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto-generate display strings if empty
    const processedData = {
      ...formData,
      displayPrice: formData.displayPrice || `${formData.rawPrice.toLocaleString()} MAD`,
      specs: {
        ...formData.specs,
        roomsDisplay: formData.specs.roomsDisplay || `${formData.specs.rooms} Chambre${formData.specs.rooms > 1 ? 's' : ''}`,
        roi: formData.specs.roi || "~8% Rentabilité"
      },
      image: formData.image || "https://picsum.photos/800/600"
    };

    if (editingId) {
      updateProperty(editingId, processedData);
    } else {
      addProperty(processedData);
    }
    setIsModalOpen(false);
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, amenities: val.split(',').map(s => s.trim()) });
  };

  // Filter properties
  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All' || prop.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nesty-dark">Propriétés</h1>
          <p className="text-gray-500 mt-1">Gérez votre portefeuille immobilier.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-nesty-accent text-nesty-darker px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-nesty-accentDark hover:text-white transition shadow-lg shadow-nesty-accent/20"
        >
          <Plus size={20} /> Ajouter un bien
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
               type="text" 
               placeholder="Rechercher un bien..." 
               className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nesty-accent/50 focus:bg-white transition"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
             <Filter size={18} className="text-gray-400" />
             <select 
               className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 outline-none focus:border-nesty-accent"
               value={locationFilter}
               onChange={(e) => setLocationFilter(e.target.value)}
             >
                <option value="All">Toutes localisations</option>
                <option value="Marina">Marina Agadir</option>
                <option value="Talborjt">Talborjt</option>
                <option value="Sonaba">Sonaba</option>
                <option value="Founty">Founty</option>
             </select>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-5">Bien</th>
                <th className="p-5">Localisation</th>
                <th className="p-5">Prix</th>
                <th className="p-5">Specs</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400">
                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search size={24} />
                     </div>
                     <p>Aucun bien trouvé.</p>
                  </td>
                </tr>
              ) : (
                filteredProperties.map(prop => (
                  <tr key={prop.id} className="hover:bg-slate-50 transition group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img src={prop.image} alt="" className="w-20 h-14 object-cover rounded-lg shadow-sm group-hover:scale-105 transition duration-300" />
                        <div>
                           <div className="font-bold text-nesty-dark">{prop.title}</div>
                           <div className="text-xs text-gray-400">{prop.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-gray-600">
                       <div className="flex items-center gap-1.5 text-sm">
                          <MapPin size={14} className="text-gray-400" /> {prop.location}
                       </div>
                    </td>
                    <td className="p-5">
                       <span className="font-bold text-nesty-dark">{prop.displayPrice}</span>
                    </td>
                    <td className="p-5 text-sm text-gray-500">
                       {prop.specs.surface} • {prop.specs.roomsDisplay}
                    </td>
                    <td className="p-5 text-center">
                       <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          Actif
                       </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(prop)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Modifier">
                           <Edit size={18} />
                        </button>
                        <button onClick={() => deleteProperty(prop.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Supprimer">
                           <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-nesty-dark">{editingId ? 'Modifier le bien' : 'Ajouter une propriété'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-red-500"><X size={20} /></button>
            </div>
            
            <div className="overflow-y-auto p-6 flex-grow custom-scrollbar">
               <form id="propertyForm" onSubmit={handleSubmit} className="space-y-6">
                  {/* General Info */}
                  <div className="space-y-4">
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Informations Générales</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">Titre de l'annonce</label>
                           <input required type="text" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">Localisation</label>
                           <select className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}>
                              <option value="">Choisir...</option>
                              <option value="Marina Agadir">Marina Agadir</option>
                              <option value="Talborjt">Talborjt</option>
                              <option value="Sonaba">Sonaba</option>
                              <option value="Founty">Founty</option>
                           </select>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">Prix (Nombre)</label>
                           <div className="relative">
                              <input required type="number" className="w-full p-2.5 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.rawPrice} onChange={e => setFormData({...formData, rawPrice: Number(e.target.value)})} />
                              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">MAD</span>
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">Type de bien</label>
                           <select className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                              <option value="Apartment">Appartement</option>
                              <option value="Studio">Studio</option>
                              <option value="Villa">Villa</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-4 pt-2">
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Caractéristiques</h3>
                     <div className="grid grid-cols-3 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">Surface</label>
                           <input required type="text" placeholder="ex: 90 m²" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.specs.surface} onChange={e => setFormData({...formData, specs: {...formData.specs, surface: e.target.value}})} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">Chambres</label>
                           <input required type="number" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.specs.rooms} onChange={e => setFormData({...formData, specs: {...formData.specs, rooms: Number(e.target.value)}})} />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1.5">ROI estimé</label>
                           <input type="text" placeholder="~8% Rentabilité" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.specs.roi} onChange={e => setFormData({...formData, specs: {...formData.specs, roi: e.target.value}})} />
                        </div>
                     </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 pt-2">
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Détails & Média</h3>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                        <textarea required rows={4} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">URL Image Principale</label>
                        <div className="flex gap-2">
                           <input type="text" placeholder="https://..." className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                           <div className="p-2.5 bg-gray-100 rounded-lg text-gray-500"><ImageIcon size={20} /></div>
                        </div>
                        {formData.image && (
                           <div className="mt-2 h-32 rounded-lg overflow-hidden border border-gray-200 relative">
                              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                           </div>
                        )}
                     </div>
                     
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Équipements</label>
                        <input type="text" placeholder="wifi, pool, ac, parking" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nesty-accent/20 focus:border-nesty-accent outline-none transition" value={formData.amenities.join(', ')} onChange={handleAmenitiesChange} />
                        <div className="flex flex-wrap gap-2 mt-2">
                           {['wifi', 'ac', 'pool', 'parking', 'tv'].map(tag => (
                              <span key={tag} className={`text-xs px-2 py-1 rounded cursor-pointer border ${formData.amenities.includes(tag) ? 'bg-nesty-accent text-white border-nesty-accent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'}`} onClick={() => {
                                 const newAmenities = formData.amenities.includes(tag) 
                                    ? formData.amenities.filter(a => a !== tag)
                                    : [...formData.amenities, tag];
                                 setFormData({...formData, amenities: newAmenities});
                              }}>
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </div>
                  </div>
               </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
               <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button>
               <button type="submit" form="propertyForm" className="px-6 py-2.5 bg-nesty-darker text-white font-bold rounded-xl hover:bg-nesty-accent hover:text-nesty-darker transition flex items-center gap-2 shadow-lg">
                  <Save size={18} /> Enregistrer
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;