import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { bayerSansClasses } from '../../lib/bayer-sans';
import { BrandRule } from '../../types';

interface BrandRulePreviewProps {
  brandRule: BrandRule;
}

export const BrandRulePreview = ({ brandRule }: BrandRulePreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const renderPreviewContent = () => {
    switch (brandRule.category) {
      case 'logo':
        return (
          <div className="relative border border-gray-200 rounded-md bg-gray-50 p-4 h-64">
            <div className="absolute bg-white p-2 border border-gray-300 rounded shadow-sm"
              style={{
                top: brandRule.parameters.position?.includes('top') ? '20px' : 'auto',
                bottom: brandRule.parameters.position?.includes('bottom') ? '20px' : 'auto',
                left: brandRule.parameters.position?.includes('left') ? '20px' : 'auto',
                right: brandRule.parameters.position?.includes('right') ? '20px' : 'auto',
                width: `${brandRule.parameters.minWidth || 60}px`,
                height: `${(brandRule.parameters.minWidth || 60) / 2}px`,
              }}
            >
              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xs">
                LOGO
              </div>
            </div>
            
            {brandRule.parameters.clearanceZone && (
              <div className="absolute border border-dashed border-blue-400 bg-blue-50 bg-opacity-30"
                style={{
                  top: brandRule.parameters.position?.includes('top') 
                    ? `${20 - (brandRule.parameters.clearanceZone?.top || 0)}px` 
                    : 'auto',
                  bottom: brandRule.parameters.position?.includes('bottom') 
                    ? `${20 - (brandRule.parameters.clearanceZone?.bottom || 0)}px` 
                    : 'auto',
                  left: brandRule.parameters.position?.includes('left') 
                    ? `${20 - (brandRule.parameters.clearanceZone?.left || 0)}px` 
                    : 'auto',
                  right: brandRule.parameters.position?.includes('right') 
                    ? `${20 - (brandRule.parameters.clearanceZone?.right || 0)}px` 
                    : 'auto',
                  width: `${(brandRule.parameters.minWidth || 60) + 2 * (brandRule.parameters.clearanceZone?.right || 0)}px`,
                  height: `${(brandRule.parameters.minWidth || 60) / 2 + 2 * (brandRule.parameters.clearanceZone?.bottom || 0)}px`,
                }}
              />
            )}
          </div>
        );
        
      case 'color':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-md shadow-sm"
                style={{ backgroundColor: brandRule.parameters.color || '#CCCCCC' }}
              />
              <div>
                <p className="font-medium">{brandRule.parameters.color || '#CCCCCC'}</p>
                <p className="text-sm text-gray-500">Primary Brand Color</p>
              </div>
            </div>
            
            {brandRule.parameters.elements && (
              <div>
                <p className="text-sm font-medium mb-2">Applied to elements:</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(brandRule.parameters.elements) ? (
                    brandRule.parameters.elements.map((element, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {element}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {brandRule.parameters.elements}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="border border-gray-200 rounded-md p-4 bg-white">
              <div className="mb-4">
                <div 
                  className="h-8 w-32 rounded flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: brandRule.parameters.color || '#CCCCCC' }}
                >
                  Button
                </div>
              </div>
              
              <div className="h-4 w-3/4 mb-2" style={{ backgroundColor: brandRule.parameters.color || '#CCCCCC', opacity: 0.2 }}></div>
              <div className="h-4 w-1/2 mb-2" style={{ backgroundColor: brandRule.parameters.color || '#CCCCCC', opacity: 0.2 }}></div>
              <div className="h-4 w-2/3" style={{ backgroundColor: brandRule.parameters.color || '#CCCCCC', opacity: 0.2 }}></div>
            </div>
          </div>
        );
        
      case 'typography':
        return (
          <div className="space-y-6 border border-gray-200 rounded-md p-4 bg-white">
            <div>
              <p className="text-sm text-gray-500 mb-1">Font Family</p>
              <p className="font-medium">{brandRule.parameters.fontFamily || 'Default Font'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-2">Sample Text</p>
              <h3 
                style={{ 
                  fontFamily: brandRule.parameters.fontFamily || 'inherit',
                  fontWeight: brandRule.parameters.fontWeight || 'normal',
                  fontSize: `${Math.max(brandRule.parameters.minSize || 18, 18)}px`
                }}
                className="mb-2"
              >
                Heading Example
              </h3>
              <p
                style={{ 
                  fontFamily: brandRule.parameters.fontFamily || 'inherit',
                  fontWeight: 'normal',
                  fontSize: `${Math.max(brandRule.parameters.minSize || 16, 16)}px`
                }}
              >
                This is an example paragraph showing the typography style defined in this brand rule.
                The minimum font size is {brandRule.parameters.minSize || 16}px.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <AlertTriangle size={16} />
              <span>Text smaller than {brandRule.parameters.minSize || 16}px will not comply with this rule</span>
            </div>
          </div>
        );
        
      case 'cta':
        return (
          <div className="space-y-6">
            <div className="flex justify-center p-6 border border-gray-200 rounded-md bg-white">
              <button
                style={{
                  backgroundColor: brandRule.parameters.backgroundColor || '#0066CC',
                  color: brandRule.parameters.textColor || '#FFFFFF',
                  borderRadius: `${brandRule.parameters.borderRadius || 4}px`,
                  padding: brandRule.parameters.padding || '12px 24px',
                }}
                className="font-medium"
              >
                Call to Action
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Background</p>
                <div className="flex items-center mt-1">
                  <div 
                    className="w-4 h-4 rounded-sm mr-2"
                    style={{ backgroundColor: brandRule.parameters.backgroundColor || '#0066CC' }}
                  />
                  <span>{brandRule.parameters.backgroundColor || '#0066CC'}</span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500">Text Color</p>
                <div className="flex items-center mt-1">
                  <div 
                    className="w-4 h-4 rounded-sm mr-2"
                    style={{ backgroundColor: brandRule.parameters.textColor || '#FFFFFF' }}
                  />
                  <span>{brandRule.parameters.textColor || '#FFFFFF'}</span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500">Border Radius</p>
                <p>{brandRule.parameters.borderRadius || 4}px</p>
              </div>
              
              <div>
                <p className="text-gray-500">Padding</p>
                <p>{brandRule.parameters.padding || '12px 24px'}</p>
              </div>
            </div>
          </div>
        );
        
      case 'legal':
        return (
          <div className="relative border border-gray-200 rounded-md bg-white p-4 h-64">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center text-gray-400">
                [Ad Content Area]
              </div>
              
              <div 
                className="w-full text-center p-2"
                style={{
                  fontSize: `${brandRule.parameters.fontSize || 10}px`,
                  color: brandRule.parameters.fontColor || '#666666',
                  position: brandRule.parameters.position === 'bottom' ? 'relative' : 'absolute',
                  bottom: brandRule.parameters.position === 'bottom' ? 'auto' : '0',
                  top: brandRule.parameters.position === 'top' ? '0' : 'auto',
                  left: brandRule.parameters.position?.includes('left') ? '0' : 'auto',
                  right: brandRule.parameters.position?.includes('right') ? '0' : 'auto',
                  textAlign: brandRule.parameters.position?.includes('left') ? 'left' : 
                             brandRule.parameters.position?.includes('right') ? 'right' : 'center',
                  maxWidth: brandRule.parameters.position?.includes('left') || 
                            brandRule.parameters.position?.includes('right') ? '50%' : '100%',
                  padding: '8px',
                }}
              >
                * This is an example of a legal disclaimer that would appear in the ad according to the brand rule.
                The text is displayed at {brandRule.parameters.fontSize || 10}px in {brandRule.parameters.fontColor || '#666666'}.
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="border border-gray-200 rounded-md bg-gray-50 p-4 flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <AlertTriangle size={32} className="mx-auto mb-2" />
              <p>Preview not available for this rule type</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${bayerSansClasses.heading.h5}`}>{brandRule.name}</h3>
        <Button
          variant="ghost"
          size="sm"
          icon={showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">{brandRule.description}</p>
      </div>
      
      <div className="flex items-center mb-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
          {brandRule.category}
        </span>
        
        {brandRule.isRequired ? (
          <span className="inline-flex items-center text-xs text-red-600">
            <AlertTriangle size={14} className="mr-1" />
            Required
          </span>
        ) : (
          <span className="inline-flex items-center text-xs text-green-600">
            <CheckCircle size={14} className="mr-1" />
            Optional
          </span>
        )}
      </div>
      
      {showPreview && (
        <div className="mt-4">
          <h4 className={`${bayerSansClasses.heading.h6} mb-3`}>Rule Preview</h4>
          {renderPreviewContent()}
        </div>
      )}
    </Card>
  );
};
