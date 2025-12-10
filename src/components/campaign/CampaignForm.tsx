import { useForm, Controller } from 'react-hook-form';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Tabs } from '../ui/Tabs';
import { Save, ChevronRight } from 'lucide-react';
import { bayerSansClasses } from '../../lib/bayer-sans';
import { CampaignObjective } from '../../types';

interface CampaignFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const objectiveOptions = [
  { value: 'awareness', label: 'Brand Awareness' },
  { value: 'consideration', label: 'Consideration' },
  { value: 'conversion', label: 'Conversion' },
  { value: 'loyalty', label: 'Loyalty' },
  { value: 'advocacy', label: 'Advocacy' },
];

const timezoneOptions = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
];

export const CampaignForm = ({ onSubmit, initialData }: CampaignFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      objectives: {
        primary: 'awareness',
        secondary: ''
      },
      targetAudience: {
        demographics: [],
        psychographics: []
      },
      messaging: {
        framework: '',
        valueProposition: '',
        callToAction: {
          primary: '',
          secondary: ''
        }
      },
      timeline: {
        startDate: '',
        endDate: '',
        timezone: 'UTC'
      },
      geography: {
        countries: [],
        regions: [],
        cities: []
      },
      languages: []
    }
  });

  const basicInfoTab = (
    <div className="space-y-6">
      <FormField
        label="Campaign Name"
        htmlFor="name"
        required
        error={errors.name?.message as string}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Campaign name is required' }}
          render={({ field }) => (
            <Input
              id="name"
              placeholder="Enter campaign name"
              error={!!errors.name}
              {...field}
            />
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Primary Objective"
          htmlFor="objectives.primary"
          required
          error={errors.objectives?.primary?.message as string}
        >
          <Controller
            name="objectives.primary"
            control={control}
            rules={{ required: 'Primary objective is required' }}
            render={({ field }) => (
              <Select
                id="objectives.primary"
                options={objectiveOptions}
                error={!!errors.objectives?.primary}
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Secondary Objective"
          htmlFor="objectives.secondary"
          error={errors.objectives?.secondary?.message as string}
        >
          <Controller
            name="objectives.secondary"
            control={control}
            render={({ field }) => (
              <Select
                id="objectives.secondary"
                options={objectiveOptions}
                placeholder="Select secondary objective (optional)"
                error={!!errors.objectives?.secondary}
                {...field}
              />
            )}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Start Date"
          htmlFor="timeline.startDate"
          required
          error={errors.timeline?.startDate?.message as string}
        >
          <Controller
            name="timeline.startDate"
            control={control}
            rules={{ required: 'Start date is required' }}
            render={({ field }) => (
              <Input
                id="timeline.startDate"
                type="date"
                error={!!errors.timeline?.startDate}
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="End Date"
          htmlFor="timeline.endDate"
          required
          error={errors.timeline?.endDate?.message as string}
        >
          <Controller
            name="timeline.endDate"
            control={control}
            rules={{ required: 'End date is required' }}
            render={({ field }) => (
              <Input
                id="timeline.endDate"
                type="date"
                error={!!errors.timeline?.endDate}
                {...field}
              />
            )}
          />
        </FormField>
      </div>

      <FormField
        label="Timezone"
        htmlFor="timeline.timezone"
        required
        error={errors.timeline?.timezone?.message as string}
      >
        <Controller
          name="timeline.timezone"
          control={control}
          rules={{ required: 'Timezone is required' }}
          render={({ field }) => (
            <Select
              id="timeline.timezone"
              options={timezoneOptions}
              error={!!errors.timeline?.timezone}
              {...field}
            />
          )}
        />
      </FormField>
    </div>
  );

  const targetAudienceTab = (
    <div className="space-y-6">
      <FormField
        label="Demographics"
        htmlFor="targetAudience.demographics"
        hint="Enter key demographic information about your target audience"
        error={errors.targetAudience?.demographics?.message as string}
      >
        <Controller
          name="targetAudience.demographics"
          control={control}
          render={({ field }) => (
            <Textarea
              id="targetAudience.demographics"
              placeholder="Age: 25-45, Gender: All, Income: Middle to upper, Education: College degree or higher"
              rows={3}
              error={!!errors.targetAudience?.demographics}
              {...field}
              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
              onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
            />
          )}
        />
      </FormField>

      <FormField
        label="Psychographics"
        htmlFor="targetAudience.psychographics"
        hint="Enter psychographic traits, interests, and behaviors"
        error={errors.targetAudience?.psychographics?.message as string}
      >
        <Controller
          name="targetAudience.psychographics"
          control={control}
          render={({ field }) => (
            <Textarea
              id="targetAudience.psychographics"
              placeholder="Health-conscious, tech-savvy, environmentally aware, values quality over price"
              rows={3}
              error={!!errors.targetAudience?.psychographics}
              {...field}
              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
              onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
            />
          )}
        />
      </FormField>
    </div>
  );

  const messagingTab = (
    <div className="space-y-6">
      <FormField
        label="Messaging Framework"
        htmlFor="messaging.framework"
        required
        error={errors.messaging?.framework?.message as string}
      >
        <Controller
          name="messaging.framework"
          control={control}
          rules={{ required: 'Messaging framework is required' }}
          render={({ field }) => (
            <Textarea
              id="messaging.framework"
              placeholder="Enter your campaign's messaging framework"
              rows={3}
              error={!!errors.messaging?.framework}
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        label="Value Proposition"
        htmlFor="messaging.valueProposition"
        required
        error={errors.messaging?.valueProposition?.message as string}
      >
        <Controller
          name="messaging.valueProposition"
          control={control}
          rules={{ required: 'Value proposition is required' }}
          render={({ field }) => (
            <Textarea
              id="messaging.valueProposition"
              placeholder="Enter your campaign's value proposition"
              rows={3}
              error={!!errors.messaging?.valueProposition}
              {...field}
            />
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Primary Call-to-Action"
          htmlFor="messaging.callToAction.primary"
          required
          error={errors.messaging?.callToAction?.primary?.message as string}
        >
          <Controller
            name="messaging.callToAction.primary"
            control={control}
            rules={{ required: 'Primary CTA is required' }}
            render={({ field }) => (
              <Input
                id="messaging.callToAction.primary"
                placeholder="e.g., Sign Up Now"
                error={!!errors.messaging?.callToAction?.primary}
                {...field}
              />
            )}
          />
        </FormField>

        <FormField
          label="Secondary Call-to-Action"
          htmlFor="messaging.callToAction.secondary"
          error={errors.messaging?.callToAction?.secondary?.message as string}
        >
          <Controller
            name="messaging.callToAction.secondary"
            control={control}
            render={({ field }) => (
              <Input
                id="messaging.callToAction.secondary"
                placeholder="e.g., Learn More"
                error={!!errors.messaging?.callToAction?.secondary}
                {...field}
              />
            )}
          />
        </FormField>
      </div>
    </div>
  );

  const geographyTab = (
    <div className="space-y-6">
      <FormField
        label="Target Countries"
        htmlFor="geography.countries"
        required
        error={errors.geography?.countries?.message as string}
      >
        <Controller
          name="geography.countries"
          control={control}
          rules={{ required: 'At least one country is required' }}
          render={({ field }) => (
            <Textarea
              id="geography.countries"
              placeholder="Enter target countries (comma separated)"
              rows={2}
              error={!!errors.geography?.countries}
              {...field}
              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
              onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
            />
          )}
        />
      </FormField>

      <FormField
        label="Target Regions/States"
        htmlFor="geography.regions"
        hint="Optional: Specify regions or states if targeting specific areas"
        error={errors.geography?.regions?.message as string}
      >
        <Controller
          name="geography.regions"
          control={control}
          render={({ field }) => (
            <Textarea
              id="geography.regions"
              placeholder="Enter target regions (comma separated)"
              rows={2}
              error={!!errors.geography?.regions}
              {...field}
              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
              onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
            />
          )}
        />
      </FormField>

      <FormField
        label="Target Cities"
        htmlFor="geography.cities"
        hint="Optional: Specify cities if targeting urban areas"
        error={errors.geography?.cities?.message as string}
      >
        <Controller
          name="geography.cities"
          control={control}
          render={({ field }) => (
            <Textarea
              id="geography.cities"
              placeholder="Enter target cities (comma separated)"
              rows={2}
              error={!!errors.geography?.cities}
              {...field}
              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
              onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
            />
          )}
        />
      </FormField>
    </div>
  );

  const languageTab = (
    <div className="space-y-6">
      <FormField
        label="Campaign Languages"
        htmlFor="languages"
        required
        error={errors.languages?.message as string}
        hint="Select all languages that will be used in this campaign"
      >
        <Controller
          name="languages"
          control={control}
          rules={{ required: 'At least one language is required' }}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {languageOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`language-${option.value}`}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    value={option.value}
                    checked={field.value?.some((lang: any) => 
                      lang.code === option.value || 
                      (typeof lang === 'string' && lang === option.value)
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const newValue = [...(field.value || [])];
                      
                      if (isChecked) {
                        newValue.push({
                          code: option.value,
                          name: option.label,
                          localization: false
                        });
                      } else {
                        const index = newValue.findIndex((lang: any) => 
                          lang.code === option.value || 
                          (typeof lang === 'string' && lang === option.value)
                        );
                        if (index !== -1) {
                          newValue.splice(index, 1);
                        }
                      }
                      
                      field.onChange(newValue);
                    }}
                  />
                  <label htmlFor={`language-${option.value}`} className="ml-2 block text-sm text-gray-900">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        />
      </FormField>

      <div className="mt-6">
        <h3 className={`${bayerSansClasses.heading.h5} mb-3`}>Localization Options</h3>
        <p className="text-sm text-gray-500 mb-4">
          For each selected language, specify if localization is required beyond simple translation.
        </p>

        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <div className="space-y-4">
              {field.value?.map((lang: any, index: number) => (
                <div key={index} className="flex items-center p-3 border border-gray-200 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium">{lang.name || languageOptions.find(l => l.value === lang.code)?.label || lang.code}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      id={`localization-${lang.code}`}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={lang.localization || false}
                      onChange={(e) => {
                        const newValue = [...field.value];
                        newValue[index] = {
                          ...newValue[index],
                          localization: e.target.checked
                        };
                        field.onChange(newValue);
                      }}
                    />
                    <label htmlFor={`localization-${lang.code}`} className="ml-2 block text-sm text-gray-900">
                      Requires localization
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Tabs
          tabs={[
            { id: 'basic', label: 'Basic Info', content: basicInfoTab },
            { id: 'audience', label: 'Target Audience', content: targetAudienceTab },
            { id: 'messaging', label: 'Messaging', content: messagingTab },
            { id: 'geography', label: 'Geography', content: geographyTab },
            { id: 'language', label: 'Languages', content: languageTab },
          ]}
          defaultTab="basic"
        />
        
        <div className="mt-8 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            icon={<Save size={18} />}
          >
            Save Campaign
          </Button>
        </div>
      </Card>
    </form>
  );
};
