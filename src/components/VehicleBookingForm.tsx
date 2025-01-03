import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CarIcon, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { VehicleSelection } from './form-sections/VehicleSelection';
import { PersonalInfo } from './form-sections/PersonalInfo';
import { ContactDetails } from './form-sections/ContactDetails';
import { DateFields } from './form-sections/DateFields';

const formSchema = z.object({
  vehicleCategory: z.string().min(1, 'Please select a vehicle category'),
  vehicleModel: z.string().min(1, 'Please select a vehicle model'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  countryCode: z.string(),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  dob: z.date({
    required_error: 'Date of birth is required',
  }).refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
  }, 'Must be at least 18 years old'),
  bookingDateTime: z.date({
    required_error: 'Booking date and time is required',
  }),
  deliveryDateTime: z.date({
    required_error: 'Delivery date and time is required',
  }),
});

export type BookingFormValues = z.infer<typeof formSchema>;

export function VehicleBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: '+1',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      vehicleCategory: '',
      vehicleModel: '',
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(values);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProgress = () => {
    const fields = Object.keys(form.getValues());
    const filledFields = fields.filter((field) => form.getValues(field));
    setProgress((filledFields.length / fields.length) * 100);
  };

  form.watch(() => updateProgress());

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {showSuccess ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Successful!</h2>
            <p className="text-gray-600">We'll send you a confirmation email shortly.</p>
            <Button
              className="mt-6"
              onClick={() => {
                setShowSuccess(false);
                form.reset();
              }}
            >
              Book Another Vehicle
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Luxury Vehicle Booking</h1>
              <Progress value={progress} className="h-2" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <VehicleSelection form={form} />
                <PersonalInfo form={form} />
                <ContactDetails form={form} />
                <DateFields form={form} />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !form.formState.isValid}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <CarIcon className="mr-2 h-4 w-4" />
                      Book Vehicle
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}