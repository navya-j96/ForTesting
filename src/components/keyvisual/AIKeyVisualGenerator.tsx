import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormField } from '../ui/FormField';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Wand2, Upload, Loader2 } from 'lucide-react';
import { bayerSansClasses } from '../../lib/bayer-sans';
import { KeyVisualUploader } from './KeyVisualUploader';

interface AIKeyVisualGeneratorProps {
  onGenerate: (data: { creativeBrief: string, referenceImage?: File }) => void;
}

export const AIKeyVisualGenerator = ({ onGenerate }: AIKeyVisualGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      creativeBrief: '',
    }
  });

  const handleReferenceImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setReferenceImage(files[0]);
    }
  };

  const onSubmit = (data: { creativeBrief: string }) => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      onGenerate({
        creativeBrief: data.creativeBrief,
        referenceImage: referenceImage || undefined
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <h3 className={`${bayerSansClasses.heading.h4} mb-4`}>AI-Assisted Key Visual Generation</h3>
          
          <FormField
            label="Creative Brief"
            htmlFor="creativeBrief"
            required
            error={errors.creativeBrief?.message as string}
            hint="Describe the key visual you want to generate in detail. Include style, mood, colors, subjects, and any specific brand elements to include."
          >
            <Controller
              name="creativeBrief"
              control={control}
              rules={{ required: 'Creative brief is required' }}
              render={({ field }) => (
                <Textarea
                  id="creativeBrief"
                  placeholder="e.g., Create a modern, minimalist product image featuring our blue water bottle against a light gradient background. The image should convey freshness and hydration with subtle water droplets. Include space for text overlay in the top right."
                  rows={5}
                  error={!!errors.creativeBrief}
                  {...field}
                />
              )}
            />
          </FormField>
          
          <div className="mt-6">
            <h4 className={`${bayerSansClasses.heading.h5} mb-3`}>Reference Image (Optional)</h4>
            <p className="text-sm text-gray-500 mb-4">
              Upload a reference image to guide the AI in terms of style, composition, or color palette.
            </p>
            
            <KeyVisualUploader
              onUpload={handleReferenceImageUpload}
              maxFiles={1}
              acceptedFileTypes={['image/jpeg', 'image/png']}
            />
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              icon={isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Key Visual'}
            </Button>
          </div>
        </Card>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className={`${bayerSansClasses.heading.h5} text-blue-800 mb-2`}>AI Generation Tips</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
            <li>Be specific about the style, mood, and elements you want in your key visual</li>
            <li>Mention any brand colors or typography that should be incorporated</li>
            <li>Specify the intended use (web banner, social media post, etc.)</li>
            <li>Include information about the target audience to guide the tone</li>
            <li>Upload reference images that match your desired aesthetic</li>
          </ul>
        </div>
      </div>
    </form>
  );
};
