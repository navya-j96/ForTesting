import { useState } from 'react';
import { PlusCircle, Search, Filter, Layers, Edit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { bayerSansClasses } from '../lib/bayer-sans';
import { useSpecificationStore } from '../store/specificationStore';
import { SpecificationEditor } from '../components/specifications/SpecificationEditor';

export const SpecificationList = () => {
  const { specifications, addSpecification, updateSpecification, deleteSpecification } = useSpecificationStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  const filteredSpecs = specifications.filter(spec => 
    spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSaveNew = (data: any) => {
    addSpecification(data);
    setIsCreating(false);
  };
  
  const handleUpdate = (data: any) => {
    if (selectedSpec) {
      updateSpecification(selectedSpec, data);
      setSelectedSpec(null);
    }
  };
  
  const handleDelete = () => {
    if (selectedSpec && window.confirm('Are you sure you want to delete this specification?')) {
      deleteSpecification(selectedSpec);
      setSelectedSpec(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={bayerSansClasses.heading.h2}>Specifications</h1>
        <Button 
          icon={<PlusCircle size={18} />}
          onClick={() => {
            setSelectedSpec(null);
            setIsCreating(true);
          }}
          disabled={isCreating}
        >
          New Specification
        </Button>
      </div>
      
      {isCreating ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={bayerSansClasses.heading.h3}>Create New Specification</h2>
            <Button 
              variant="ghost" 
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </div>
          <SpecificationEditor onSave={handleSaveNew} />
        </div>
      ) : selectedSpec ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className={bayerSansClasses.heading.h3}>Edit Specification</h2>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedSpec(null)}
            >
              Cancel
            </Button>
          </div>
          <SpecificationEditor 
            specification={specifications.find(spec => spec.id === selectedSpec)} 
            onSave={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ) : (
        <>
          <Card>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <Input
                placeholder="Search specifications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-6">
              {filteredSpecs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Dimensions
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Types
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Max Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSpecs.map((spec) => (
                        <tr key={spec.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <Layers size={20} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{spec.name}</div>
                                {spec.aspectRatio && (
                                  <div className="text-sm text-gray-500">
                                    Aspect ratio: {spec.aspectRatio}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {spec.dimensions ? (
                              <span className="text-sm text-gray-900">
                                {spec.dimensions.width} ÃÂ {spec.dimensions.height} {spec.dimensions.unit}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-500">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {spec.fileTypes.map((type, index) => (
                                <Badge key={index} variant="default">
                                  {type.toUpperCase()}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {spec.maxFileSize} KB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={spec.source === 'standard' ? 'info' : 'default'}
                            >
                              {spec.source === 'standard' ? 'Standard' : 'Custom'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<Edit size={16} />}
                              onClick={() => setSelectedSpec(spec.id)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Layers size={48} className="mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No specifications found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? 'Try adjusting your search'
                      : 'Create your first specification to get started'}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsCreating(true)}>
                      Create Specification
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className={`${bayerSansClasses.heading.h4} text-blue-800 mb-3`}>About Specifications</h3>
            <p className="text-blue-700 mb-4">
              Specifications define the technical requirements for different ad formats across various channels.
              They ensure that your creative assets meet the platform requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Standard Specifications</h4>
                <p className="text-sm text-blue-600">
                  Pre-defined specifications based on industry standards for common ad formats.
                  These are regularly updated to match platform requirements.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Custom Specifications</h4>
                <p className="text-sm text-blue-600">
                  Create your own specifications for unique formats or to override standard specifications
                  with your organization's requirements.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
