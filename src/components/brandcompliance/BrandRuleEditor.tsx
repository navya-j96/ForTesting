import { useForm, Controller } from 'react-hook-form';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Save, Trash2 } from 'lucide-react';
import { bayerSansClasses } from '../../lib/bayer-sans';
import { BrandRule, BrandRuleCategory } from '../../types';

interface BrandRuleEditorProps {
  brandRule?: BrandRule;
  onSave: (data: Partial<BrandRule>) => void;
  onDelete?: () => void;
}

const categoryOptions = [
  { value: 'logo', label: 'Logo' },
  { value: 'color', label: 'Color' },
  { value: 'typography', label: 'Typography' },
  { value: 'imagery', label: 'Imagery' },
  { value: 'layout', label: 'Layout' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'legal', label: 'Legal' },
];

export const BrandRuleEditor = ({
  brandRule,
  onSave,
  onDelete,
}: BrandRuleEditorProps) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: brandRule || {
      category: 'logo' as BrandRuleCategory,
      name: '',
      description: '',
      parameters: {},
      isRequired: true,
    }
  });

  const category = watch('category');

  const renderParameterFields = () => {
    switch (category) {
      case 'logo':
        return (
          <>
            <FormField
              label="Position"
              htmlFor="parameters.position"
              error={errors.parameters?.position?.message as string}
            >
              <Controller
                name="parameters.position"
                control={control}
                render={({ field }) => (
                  <Select
                    id="parameters.position"
                    options={[
                      { value: 'top-left', label: 'Top Left' },
                      { value: 'top-right', label: 'Top Right' },
                      { value: 'bottom-left', label: 'Bottom Left' },
                      { value: 'bottom-right', label: 'Bottom Right' },
                      { value: 'center', label: 'Center' },
                    ]}
                    {...field}
                  />
                )}
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Minimum Width (px)"
                htmlFor="parameters.minWidth"
                error={errors.parameters?.minWidth?.message as string}
              >
                <Controller
                  name="parameters.minWidth"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="parameters.minWidth"
                      type="number"
                      placeholder="e.g., 60"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>
              
              <FormField
                label="Clearance Zone (px)"
                htmlFor="parameters.clearanceZone"
                error={errors.parameters?.clearanceZone?.message as string}
              >
                <Controller
                  name="parameters.clearanceZone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="parameters.clearanceZone"
                      type="number"
                      placeholder="e.g., 20"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>
            </div>
          </>
        );
        
      case 'color':
        return (
          <>
            <FormField
              label="Color Value (HEX)"
              htmlFor="parameters.color"
              error={errors.parameters?.color?.message as string}
            >
              <Controller
                name="parameters.color"
                control={control}
                render={({ field }) => (
                  <div className="flex">
                    <Input
                      id="parameters.color"
                      placeholder="#000000"
                      className="flex-1"
                      {...field}
                    />
                    <div 
                      className="w-10 h-10 ml-2 border border-gray-300 rounded"
                      style={{ backgroundColor: field.value || '#FFFFFF' }}
                    />
                  </div>
                )}
              />
            </FormField>
            
            <FormField
              label="Elements"
              htmlFor="parameters.elements"
              hint="Comma-separated list of elements this color applies to"
              error={errors.parameters?.elements?.message as string}
            >
              <Controller
                name="parameters.elements"
                control={control}
                render={({ field }) => (
                  <Input
                    id="parameters.elements"
                    placeholder="e.g., cta-primary, heading, background"
                    {...field}
                    value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                    onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                  />
                )}
              />
            </FormField>
          </>
        );
        
      case 'typography':
        return (
          <>
            <FormField
              label="Font Family"
              htmlFor="parameters.fontFamily"
              error={errors.parameters?.fontFamily?.message as string}
            >
              <Controller
                name="parameters.fontFamily"
                control={control}
                render={({ field }) => (
                  <Input
                    id="parameters.fontFamily"
                    placeholder="e.g., Bayer Sans"
                    {...field}
                  />
                )}
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Font Weight"
                htmlFor="parameters.fontWeight"
                error={errors.parameters?.fontWeight?.message as string}
              >
                <Controller
                  name="parameters.fontWeight"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="parameters.fontWeight"
                      options={[
                        { value: 'normal', label: 'Normal' },
                        { value: 'bold', label: 'Bold' },
                        { value: 'light', label: 'Light' },
                        { value: 'medium', label: 'Medium' },
                      ]}
                      {...field}
                    />
                  )}
                />
              </FormField>
              
              <FormField
                label="Minimum Size (px)"
                htmlFor="parameters.minSize"
                error={errors.parameters?.minSize?.message as string}
              >
                <Controller
                  name="parameters.minSize"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="parameters.minSize"
                      type="number"
                      placeholder="e.g., 16"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>
            </div>
          </>
        );
        
      case 'cta':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Background Color"
                htmlFor="parameters.backgroundColor"
                error={errors.parameters?.backgroundColor?.message as string}
              >
                <Controller
                  name="parameters.backgroundColor"
                  control={control}
                  render={({ field }) => (
                    <div className="flex">
                      <Input
                        id="parameters.backgroundColor"
                        placeholder="#000000"
                        className="flex-1"
                        {...field}
                      />
                      <div 
                        className="w-10 h-10 ml-2 border border-gray-300 rounded"
                        style={{ backgroundColor: field.value || '#FFFFFF' }}
                      />
                    </div>
                  )}
                />
              </FormField>
              
              <FormField
                label="Text Color"
                htmlFor="parameters.textColor"
                error={errors.parameters?.textColor?.message as string}
              >
                <Controller
                  name="parameters.textColor"
                  control={control}
                  render={({ field }) => (
                    <div className="flex">
                      <Input
                        id="parameters.textColor"
                        placeholder="#FFFFFF"
                        className="flex-1"
                        {...field}
                      />
                      <div 
                        className="w-10 h-10 ml-2 border border-gray-300 rounded"
                        style={{ backgroundColor: field.value || '#FFFFFF' }}
                      />
                    </div>
                  )}
                />
              </FormField>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Border Radius (px)"
                htmlFor="parameters.borderRadius"
                error={errors.parameters?.borderRadius?.message as string}
              >
                <Controller
                  name="parameters.borderRadius"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="parameters.borderRadius"
                      type="number"
                      placeholder="e.g., 4"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>
              
              <FormField
                label="Padding (px)"
                htmlFor="parameters.padding"
                error={errors.parameters?.padding?.message as string}
              >
                <Controller
                  name="parameters.padding"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="parameters.padding"
                      placeholder="e.g., 12px 24px"
                      {...field}
                    />
                  )}
                />
              </FormField>
            </div>
          </>
        );
        
      case 'legal':
        return (
          <>
            <FormField
              label="Position"
              htmlFor="parameters.position"
              error={errors.parameters?.position?.message as string}
            >
              <Controller
                name="parameters.position"
                control={control}
                render={({ field }) => (
                  <Select
                    id="parameters.position"
                    options={[
                      { value: 'bottom', label: 'Bottom' },
                      { value: 'top', label: 'Top' },
                      { value: 'bottom-left', label: 'Bottom Left' },
                      { value: 'bottom-right', label: 'Bottom Right' },
                    ]}
                    {...field}
                  />
                )}
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Font Size (px)"
                htmlFor="parameters.fontSize"
                error={errors.parameters?.fontSize?.message as string}
              >
                <Controller
                  name="parameters.fontSize"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="parameters.fontSize"
                      type="number"
                      placeholder="e.g., 10"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>
              
              <FormField
                label="Font Color"
                htmlFor="parameters.fontColor"
                error={errors.parameters?.fontColor?.message as string}
              >
                <Controller
                  name="parameters.fontColor"
                  control={control}
                  render={({ field }) => (
                    <div className="flex">
                      <Input
                        id="parameters.fontColor"
                        placeholder="#666666"
                        className="flex-1"
                        {...field}
                      />
                      <div 
                        className="w-10 h-10 ml-2 border border-gray-300 rounded"
                        style={{ backgroundColor: field.value || '#FFFFFF' }}
                      />
                    </div>
                  )}
                />
              </FormField>
            </div>
          </>
        );
        
      default:
        return (
          <FormField
            label="Parameters (JSON)"
            htmlFor="parametersJson"
            hint="Enter parameters as JSON"
            error={errors.parameters?.message as string}
          >
            <Controller
              name="parameters"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="parametersJson"
                  rows={5}
                  placeholder='{"key": "value"}'
                  {...field}
                  value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      field.onChange(parsed);
                    } catch (error) {
                      // Allow invalid JSON during typing
                      field.onChange(e.target.value);
                    }
                  }}
                />
              )}
            />
          </FormField>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Card>
        <div className="space-y-6">
          <FormField
            label="Rule Name"
            htmlFor="name"
            required
            error={errors.name?.message as string}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Rule name is required' }}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="e.g., Logo Placement"
                  error={!!errors.name}
                  {...field}
                />
              )}
            />
          </FormField>

          <FormField
            label="Category"
            htmlFor="category"
            required
            error={errors.category?.message as string}
          >
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select
                  id="category"
                  options={categoryOptions}
                  error={!!errors.category}
                  {...field}
                />
              )}
            />
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            required
            error={errors.description?.message as string}
          >
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Describe the brand rule in detail"
                  rows={3}
                  error={!!errors.description}
                  {...field}
                />
              )}
            />
          </FormField>

          <div className="border-t border-gray-200 pt-6">
            <h3 className={`${bayerSansClasses.heading.h5} mb-4`}>Rule Parameters</h3>
            {renderParameterFields()}
          </div>

          <div className="flex items-center mt-4">
            <Controller
              name="isRequired"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    id="isRequired"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <label htmlFor="isRequired" className="ml-2 block text-sm font-medium text-gray-700">
                    This rule is required (cannot be overridden)
                  </label>
                </>
              )}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          {onDelete && (
            <Button
              type="button"
              variant="danger"
              icon={<Trash2 size={18} />}
              onClick={onDelete}
            >
              Delete Rule
            </Button>
          )}
          
          <Button
            type="submit"
            icon={<Save size={18} />}
          >
            Save Rule
          </Button>
        </div>
      </Card>
    </form>
  );
};
