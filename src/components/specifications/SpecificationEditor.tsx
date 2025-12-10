import { useForm, Controller } from 'react-hook-form';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Save, Trash2 } from 'lucide-react';
import { bayerSansClasses } from '../../lib/bayer-sans';
import { Specification } from '../../types';

interface SpecificationEditorProps {
  specification?: Specification;
  onSave: (data: Partial<Specification>) => void;
  onDelete?: () => void;
}

const fileTypeOptions = [
  { value: 'jpg', label: 'JPG' },
  { value: 'png', label: 'PNG' },
  { value: 'gif', label: 'GIF' },
  { value: 'html5', label: 'HTML5' },
  { value: 'mp4', label: 'MP4' },
];

const unitOptions = [
  { value: 'px', label: 'Pixels (px)' },
  { value: 'dp', label: 'Density-independent Pixels (dp)' },
];

export const SpecificationEditor = ({
  specification,
  onSave,
  onDelete,
}: SpecificationEditorProps) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: specification || {
      name: '',
      dimensions: {
        width: 0,
        height: 0,
        unit: 'px',
      },
      fileTypes: [],
      maxFileSize: 0,
      animationParams: {
        allowed: false,
      },
      clickThrough: {
        required: true,
        multipleDestinations: false,
      },
      source: 'custom',
    }
  });

  const animationAllowed = watch('animationParams.allowed');

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Card>
        <div className="space-y-6">
          <FormField
            label="Specification Name"
            htmlFor="name"
            required
            error={errors.name?.message as string}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="e.g., Billboard (970x250)"
                  error={!!errors.name}
                  {...field}
                />
              )}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Width"
              htmlFor="dimensions.width"
              required
              error={errors.dimensions?.width?.message as string}
            >
              <Controller
                name="dimensions.width"
                control={control}
                rules={{ required: 'Width is required', min: { value: 1, message: 'Must be greater than 0' } }}
                render={({ field }) => (
                  <Input
                    id="dimensions.width"
                    type="number"
                    placeholder="Width"
                    error={!!errors.dimensions?.width}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
            </FormField>

            <FormField
              label="Height"
              htmlFor="dimensions.height"
              required
              error={errors.dimensions?.height?.message as string}
            >
              <Controller
                name="dimensions.height"
                control={control}
                rules={{ required: 'Height is required', min: { value: 1, message: 'Must be greater than 0' } }}
                render={({ field }) => (
                  <Input
                    id="dimensions.height"
                    type="number"
                    placeholder="Height"
                    error={!!errors.dimensions?.height}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                )}
              />
            </FormField>

            <FormField
              label="Unit"
              htmlFor="dimensions.unit"
              required
              error={errors.dimensions?.unit?.message as string}
            >
              <Controller
                name="dimensions.unit"
                control={control}
                rules={{ required: 'Unit is required' }}
                render={({ field }) => (
                  <Select
                    id="dimensions.unit"
                    options={unitOptions}
                    error={!!errors.dimensions?.unit}
                    {...field}
                  />
                )}
              />
            </FormField>
          </div>

          <FormField
            label="Aspect Ratio"
            htmlFor="aspectRatio"
            hint="Optional: Will be calculated from dimensions if left blank"
            error={errors.aspectRatio?.message as string}
          >
            <Controller
              name="aspectRatio"
              control={control}
              render={({ field }) => (
                <Input
                  id="aspectRatio"
                  placeholder="e.g., 16:9"
                  error={!!errors.aspectRatio}
                  {...field}
                />
              )}
            />
          </FormField>

          <FormField
            label="Allowed File Types"
            htmlFor="fileTypes"
            required
            error={errors.fileTypes?.message as string}
          >
            <Controller
              name="fileTypes"
              control={control}
              rules={{ required: 'At least one file type is required' }}
              render={({ field }) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {fileTypeOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filetype-${option.value}`}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        value={option.value}
                        checked={field.value?.includes(option.value)}
                        onChange={(e) => {
                          const value = option.value;
                          const newValue = e.target.checked
                            ? [...(field.value || []), value]
                            : (field.value || []).filter((v: string) => v !== value);
                          field.onChange(newValue);
                        }}
                      />
                      <label htmlFor={`filetype-${option.value}`} className="ml-2 block text-sm text-gray-900">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />
          </FormField>

          <FormField
            label="Maximum File Size (KB)"
            htmlFor="maxFileSize"
            required
            error={errors.maxFileSize?.message as string}
          >
            <Controller
              name="maxFileSize"
              control={control}
              rules={{ 
                required: 'Maximum file size is required',
                min: { value: 1, message: 'Must be greater than 0' }
              }}
              render={({ field }) => (
                <Input
                  id="maxFileSize"
                  type="number"
                  placeholder="e.g., 150"
                  error={!!errors.maxFileSize}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
          </FormField>

          <div className="border-t border-gray-200 pt-6">
            <h3 className={`${bayerSansClasses.heading.h5} mb-4`}>Animation Parameters</h3>
            
            <div className="mb-4">
              <Controller
                name="animationParams.allowed"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <input
                      id="animationAllowed"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label htmlFor="animationAllowed" className="ml-2 block text-sm font-medium text-gray-700">
                      Animation Allowed
                    </label>
                  </div>
                )}
              />
            </div>

            {animationAllowed && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <FormField
                  label="Maximum Duration (seconds)"
                  htmlFor="animationParams.maxDuration"
                  error={errors.animationParams?.maxDuration?.message as string}
                >
                  <Controller
                    name="animationParams.maxDuration"
                    control={control}
                    rules={{ min: { value: 1, message: 'Must be greater than 0' } }}
                    render={({ field }) => (
                      <Input
                        id="animationParams.maxDuration"
                        type="number"
                        placeholder="e.g., 15"
                        error={!!errors.animationParams?.maxDuration}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    )}
                  />
                </FormField>

                <FormField
                  label="Maximum Loops"
                  htmlFor="animationParams.maxLoops"
                  error={errors.animationParams?.maxLoops?.message as string}
                >
                  <Controller
                    name="animationParams.maxLoops"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="animationParams.maxLoops"
                        type="number"
                        placeholder="e.g., 3"
                        error={!!errors.animationParams?.maxLoops}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    )}
                  />
                </FormField>

                <div className="flex items-center mt-8">
                  <Controller
                    name="animationParams.autoplay"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          id="autoplay"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label htmlFor="autoplay" className="ml-2 block text-sm font-medium text-gray-700">
                          Autoplay Allowed
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className={`${bayerSansClasses.heading.h5} mb-4`}>Text Limits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Headline Character Limit"
                htmlFor="textLimits.headline"
                error={errors.textLimits?.headline?.message as string}
              >
                <Controller
                  name="textLimits.headline"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="textLimits.headline"
                      type="number"
                      placeholder="e.g., 70"
                      error={!!errors.textLimits?.headline}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>

              <FormField
                label="Subhead Character Limit"
                htmlFor="textLimits.subhead"
                error={errors.textLimits?.subhead?.message as string}
              >
                <Controller
                  name="textLimits.subhead"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="textLimits.subhead"
                      type="number"
                      placeholder="e.g., 120"
                      error={!!errors.textLimits?.subhead}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>

              <FormField
                label="Body Text Character Limit"
                htmlFor="textLimits.body"
                error={errors.textLimits?.body?.message as string}
              >
                <Controller
                  name="textLimits.body"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="textLimits.body"
                      type="number"
                      placeholder="e.g., 300"
                      error={!!errors.textLimits?.body}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>

              <FormField
                label="CTA Character Limit"
                htmlFor="textLimits.cta"
                error={errors.textLimits?.cta?.message as string}
              >
                <Controller
                  name="textLimits.cta"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="textLimits.cta"
                      type="number"
                      placeholder="e.g., 25"
                      error={!!errors.textLimits?.cta}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              </FormField>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className={`${bayerSansClasses.heading.h5} mb-4`}>Click-Through Settings</h3>
            
            <div className="space-y-4">
              <Controller
                name="clickThrough.required"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <input
                      id="clickThroughRequired"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label htmlFor="clickThroughRequired" className="ml-2 block text-sm font-medium text-gray-700">
                      Click-Through Required
                    </label>
                  </div>
                )}
              />

              <Controller
                name="clickThrough.multipleDestinations"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <input
                      id="multipleDestinations"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <label htmlFor="multipleDestinations" className="ml-2 block text-sm font-medium text-gray-700">
                      Allow Multiple Destinations
                    </label>
                  </div>
                )}
              />
            </div>
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
              Delete Specification
            </Button>
          )}
          
          <Button
            type="submit"
            icon={<Save size={18} />}
          >
            Save Specification
          </Button>
        </div>
      </Card>
    </form>
  );
};
