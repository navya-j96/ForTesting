import { useState } from 'react';
import { PlusCircle, Search, Filter, Shield, Edit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { bayerSansClasses } from '../lib/bayer-sans';
import { useBrandComplianceStore } from '../store/brandComplianceStore';
import { BrandRuleEditor } from '../components/brandcompliance/BrandRuleEditor';
import { BrandRulePreview } from '../components/brandcompliance/BrandRulePreview';

export const BrandComplianceSettings = () => {
  const { brandRules, addBrandRule, updateBrandRule, deleteBrandRule } = useBrandComplianceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewRule, setPreviewRule] = useState<string | null>(null);
  
  const filteredRules = brandRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || rule.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'logo', label: 'Logo' },
    { value: 'color', label: 'Color' },
    { value: 'typography', label: 'Typography' },
    { value: 'imagery', label: 'Imagery' },
    { value: 'layout', label: 'Layout' },
    { value: 'cta', label: 'Call to Action' },
    { value: 'legal', label: 'Legal' },
  ];
  
  const handleSaveNew = (data: any) => {
    addBrandRule(data);
    setIsCreating(false);
  };
  
  const handleUpdate = (data: any) => {
    if (selectedRule) {
      updateBrandRule(selectedRule, data);
      setSelectedRule(null);
    }
  };
  
  const handleDelete = () => {
    if (selectedRule && window.confirm('Are you sure you want to delete this brand rule?')) {
      deleteBrandRule(selectedRule);
      setSelectedRule(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={bayerSansClasses.heading.h2}>Brand Compliance</h1>
        <Button 
          icon={<PlusCircle size={18} />}
          onClick={() => {
            setSelectedRule(null);
            setIsCreating(true);
          }}
          disabled={isCreating}
        >
          New Brand Rule
        </Button>
      </div>
      
      {isCreating ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={bayerSansClasses.heading.h3}>Create New Brand Rule</h2>
            <Button 
              variant="ghost" 
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </div>
          <BrandRuleEditor onSave={handleSaveNew} />
        </div>
      ) : selectedRule ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={bayerSansClasses.heading.h3}>Edit Brand Rule</h2>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRule(null)}
            >
              Cancel
            </Button>
          </div>
          <BrandRuleEditor 
            brandRule={brandRules.find(rule => rule.id === selectedRule)} 
            onSave={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ) : previewRule ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={bayerSansClasses.heading.h3}>Brand Rule Preview</h2>
            <div className="space-x-2">
              <Button 
                variant="outline"
                icon={<Edit size={18} />}
                onClick={() => {
                  setSelectedRule(previewRule);
                  setPreviewRule(null);
                }}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setPreviewRule(null)}
              >
                Back to List
              </Button>
            </div>
          </div>
          <BrandRulePreview 
            brandRule={brandRules.find(rule => rule.id === previewRule)!} 
          />
        </div>
      ) : (
        <>
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <Input
                  placeholder="Search brand rules..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-500" />
                <Select
                  options={categoryOptions}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-48"
                />
              </div>
            </div>
            
            <div className="mt-6">
              {filteredRules.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rule
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <Shield size={20} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="default">
                              {rule.category}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 line-clamp-2">
                              {rule.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={rule.isRequired ? 'error' : 'success'}
                            >
                              {rule.isRequired ? 'Required' : 'Optional'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPreviewRule(rule.id)}
                              >
                                Preview
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Edit size={16} />}
                                onClick={() => setSelectedRule(rule.id)}
                              >
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Shield size={48} className="mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No brand rules found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || categoryFilter
                      ? 'Try adjusting your search or filters'
                      : 'Create your first brand rule to get started'}
                  </p>
                  {!searchTerm && !categoryFilter && (
                    <Button onClick={() => setIsCreating(true)}>
                      Create Brand Rule
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className={`${bayerSansClasses.heading.h4} text-blue-800 mb-3`}>About Brand Compliance</h3>
            <p className="text-blue-700 mb-4">
              Brand compliance rules ensure that all your advertising materials adhere to your brand guidelines.
              These rules are automatically applied to check and enforce brand consistency across campaigns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Required Rules</h4>
                <p className="text-sm text-blue-600">
                  These rules cannot be overridden and must be followed for all campaigns.
                  They represent core brand requirements.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Optional Rules</h4>
                <p className="text-sm text-blue-600">
                  These rules can be overridden at the campaign level when necessary,
                  providing flexibility while maintaining guidance.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Visual Preview</h4>
                <p className="text-sm text-blue-600">
                  Use the preview feature to see how rules will be applied to your creative assets
                  before finalizing campaigns.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
