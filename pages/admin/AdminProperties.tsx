import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Property } from '@/types';
import { Plus, Trash2, Edit, X, Save, Image as ImageIcon, Search, MapPin, Filter, MoreHorizontal, BedDouble, Ruler, Check } from 'lucide-react';

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
      <div className="pb-20">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
               <h1 className="text-3xl font-bold text-nesty-dark tracking-tight">Propriétés</h1>
               <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <span className="bg-gray-200 text-xs font-bold px-2 py-0.5 rounded text-gray-600">{properties.length}</span>
                  <span>biens en gestion</span>
               </div>
            </div>
            <button
               onClick={handleAddNew}
               className="bg-nesty-accent text-nesty-darker px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white hover:text-nesty-accent border-2 border-transparent hover:border-nesty-accent transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 shadow-nesty-accent/20"
            >
               <Plus size={20} strokeWidth={3} /> Ajouter un bien
            </button>
         </div>

         {/* Filters & Search */}
         <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
               <input
                  type="text"
                  placeholder="Rechercher par nom, ville..."
                  className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none focus:bg-gray-50 text-nesty-dark font-medium transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2 border-l border-gray-100 pl-2">
               <div className="relative">
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <select
                     className="appearance-none bg-gray-50 hover:bg-gray-100 border border-transparent rounded-xl pl-10 pr-8 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer transition-colors"
                     value={locationFilter}
                     onChange={(e) => setLocationFilter(e.target.value)}
                  >
                     <option value="All">Toutes les villes</option>
                     <option value="Marina">Marina Agadir</option>
                     <option value="Talborjt">Talborjt</option>
                     <option value="Sonaba">Sonaba</option>
                     <option value="Founty">Founty</option>
                  </select>
               </div>
            </div>
         </div>

         <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs uppercase font-bold tracking-wider">
                     <tr>
                        <th className="p-6 font-bold">Bien Immobilier</th>
                        <th className="p-6 font-bold">Localisation</th>
                        <th className="p-6 font-bold">Prix</th>
                        <th className="p-6 font-bold">Caractéristiques</th>
                        <th className="p-6 font-bold text-center">Status</th>
                        <th className="p-6 font-bold text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredProperties.length === 0 ? (
                        <tr>
                           <td colSpan={6} className="p-20 text-center text-gray-400">
                              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                 <Search size={32} />
                              </div>
                              <p className="font-medium">Aucun bien ne correspond à votre recherche.</p>
                              <button onClick={() => { setSearchTerm(''); setLocationFilter('All'); }} className="mt-4 text-nesty-accent font-bold hover:underline">Réinitialiser les filtres</button>
                           </td>
                        </tr>
                     ) : (
                        filteredProperties.map(prop => (
                           <tr key={prop.id} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="p-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-24 h-16 rounded-xl overflow-hidden shadow-sm relative group-hover:shadow-md transition-all">
                                       <img src={prop.image} alt="" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div>
                                       <div className="font-bold text-nesty-dark text-base">{prop.title}</div>
                                       <div className="text-xs font-medium text-gray-400 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">{prop.type}</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-6">
                                 <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                    <div className="p-1.5 bg-gray-100 rounded-full text-gray-400"><MapPin size={12} /></div>
                                    {prop.location}
                                 </div>
                              </td>
                              <td className="p-6">
                                 <span className="font-bold text-nesty-dark bg-nesty-accent/10 text-nesty-darker px-3 py-1 rounded-lg text-sm">{prop.displayPrice}</span>
                              </td>
                              <td className="p-6 text-sm text-gray-500">
                                 <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5" title="Surface"><Ruler size={14} /> {prop.specs.surface}</span>
                                    <span className="flex items-center gap-1.5" title="Chambres"><BedDouble size={14} /> {prop.specs.rooms}</span>
                                 </div>
                              </td>
                              <td className="p-6 text-center">
                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 shadow-sm border border-green-200">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                    Actif
                                 </span>
                              </td>
                              <td className="p-6 text-right">
                                 <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(prop)} className="p-2 text-gray-500 hover:text-nesty-accent hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-all shadow-sm" title="Modifier">
                                       <Edit size={16} />
                                    </button>
                                    <button onClick={() => deleteProperty(prop.id)} className="p-2 text-gray-500 hover:text-red-500 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-all shadow-sm" title="Supprimer">
                                       <Trash2 size={16} />
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
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-nesty-darker/80 backdrop-blur-md animate-fade-in">
               <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm">
                     <h2 className="text-2xl font-bold text-nesty-dark flex items-center gap-2">
                        {editingId ? <Edit size={24} className="text-nesty-accent" /> : <Plus size={24} className="text-nesty-accent" />}
                        {editingId ? 'Modifier le bien' : 'Ajouter une propriété'}
                     </h2>
                     <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-white hover:shadow-md transition text-gray-400 hover:text-red-500 border border-transparent hover:border-gray-100"><X size={20} /></button>
                  </div>

                  <div className="overflow-y-auto p-8 flex-grow custom-scrollbar bg-white">
                     <form id="propertyForm" onSubmit={handleSubmit} className="space-y-8">
                        {/* General Info */}
                        <div className="space-y-5">
                           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <span className="w-8 h-[1px] bg-gray-200"></span>
                              Informations Générales
                              <span className="flex-grow h-[1px] bg-gray-200"></span>
                           </h3>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="md:col-span-2">
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'annonce</label>
                                 <input required type="text" placeholder="Ex: Luxueux Appartement Vue Mer" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                              </div>

                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Localisation</label>
                                 <div className="relative">
                                    <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select className="w-full pl-10 pr-4 p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all font-medium appearance-none" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}>
                                       <option value="">Choisir...</option>
                                       <option value="Marina Agadir">Marina Agadir</option>
                                       <option value="Talborjt">Talborjt</option>
                                       <option value="Sonaba">Sonaba</option>
                                       <option value="Founty">Founty</option>
                                    </select>
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                       <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Type de bien</label>
                                 <select className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all font-medium" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="Apartment">Appartement</option>
                                    <option value="Studio">Studio</option>
                                    <option value="Villa">Villa</option>
                                 </select>
                              </div>

                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Prix (MAD)</label>
                                 <div className="relative">
                                    <input required type="number" className="w-full p-3.5 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all font-bold text-nesty-dark" value={formData.rawPrice} onChange={e => setFormData({ ...formData, rawPrice: Number(e.target.value) })} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold bg-white px-2 py-1 rounded shadow-sm border border-gray-100">MAD</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Specs */}
                        <div className="space-y-5">
                           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <span className="w-8 h-[1px] bg-gray-200"></span>
                              Caractéristiques
                              <span className="flex-grow h-[1px] bg-gray-200"></span>
                           </h3>
                           <div className="grid grid-cols-3 gap-4">
                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Surface</label>
                                 <input required type="text" placeholder="ex: 90 m²" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all font-medium" value={formData.specs.surface} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, surface: e.target.value } })} />
                              </div>
                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">Chambres</label>
                                 <div className="flex items-center">
                                    <button type="button" onClick={() => setFormData({ ...formData, specs: { ...formData.specs, rooms: Math.max(0, formData.specs.rooms - 1) } })} className="p-3.5 bg-gray-100 rounded-l-xl hover:bg-gray-200">-</button>
                                    <input required type="number" className="w-full p-3.5 bg-gray-50 border-y border-gray-200 focus:outline-none text-center font-bold" value={formData.specs.rooms} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, rooms: Number(e.target.value) } })} />
                                    <button type="button" onClick={() => setFormData({ ...formData, specs: { ...formData.specs, rooms: formData.specs.rooms + 1 } })} className="p-3.5 bg-gray-100 rounded-r-xl hover:bg-gray-200">+</button>
                                 </div>
                              </div>
                              <div>
                                 <label className="block text-sm font-bold text-gray-700 mb-2">ROI estimé</label>
                                 <input type="text" placeholder="~8%" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all font-medium text-green-600" value={formData.specs.roi} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, roi: e.target.value } })} />
                              </div>
                           </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-5">
                           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <span className="w-8 h-[1px] bg-gray-200"></span>
                              Détails & Média
                              <span className="flex-grow h-[1px] bg-gray-200"></span>
                           </h3>

                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                              <textarea required rows={4} className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all resize-none placeholder:text-gray-300" placeholder="Décrivez les points forts du bien..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                           </div>

                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Image Principale (URL)</label>
                              <div className="flex gap-2">
                                 <div className="relative flex-grow">
                                    <ImageIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="https://..." className="w-full pl-10 pr-4 p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all font-mono text-sm" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                 </div>
                              </div>

                              {formData.image && (
                                 <div className="mt-4 h-48 rounded-2xl overflow-hidden border border-gray-200 relative shadow-sm group">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                       <span className="text-white text-xs font-bold bg-black/30 px-2 py-1 rounded backdrop-blur-md">Aperçu</span>
                                    </div>
                                 </div>
                              )}
                           </div>

                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Équipements (séparés par des virgules)</label>
                              <input type="text" placeholder="Wifi, Piscine, Parking, Vue Mer..." className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-nesty-accent/10 focus:border-nesty-accent focus:bg-white outline-none transition-all" value={formData.amenities.join(', ')} onChange={handleAmenitiesChange} />
                              <div className="flex flex-wrap gap-2 mt-3">
                                 {['Wifi', 'Climatisation', 'Piscine', 'Parking', 'Jardin', 'Balcon', 'Ascenseur'].map(tag => (
                                    <button
                                       type="button"
                                       key={tag}
                                       className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${formData.amenities.includes(tag) ? 'bg-nesty-darker text-white border-nesty-darker shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                       onClick={() => {
                                          const newAmenities = formData.amenities.includes(tag)
                                             ? formData.amenities.filter(a => a !== tag)
                                             : [...formData.amenities, tag];
                                          setFormData({ ...formData, amenities: newAmenities });
                                       }}
                                    >
                                       {formData.amenities.includes(tag) && <Check size={10} className="inline mr-1" />}
                                       {tag}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>

                  <div className="p-6 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm flex justify-end gap-3 z-10">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-gray-600 font-bold hover:bg-white hover:text-red-500 hover:shadow-sm rounded-xl transition border border-transparent hover:border-gray-100">Annuler</button>
                     <button type="submit" form="propertyForm" className="px-8 py-3 bg-nesty-darker text-white font-bold rounded-xl hover:bg-nesty-accent hover:text-nesty-darker transition flex items-center gap-2 shadow-xl shadow-nesty-darker/10 transform hover:-translate-y-0.5">
                        <Save size={18} /> Enregistrer le bien
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default AdminProperties;