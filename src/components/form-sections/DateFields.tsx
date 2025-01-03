import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DateInput } from '@/components/ui/date-input';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormValues } from '../VehicleBookingForm';

interface DateFieldsProps {
  form: UseFormReturn<BookingFormValues>;
}

export function DateFields({ form }: DateFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date of Birth *</FormLabel>
            <FormControl>
              <DateInput
                value={field.value}
                onChange={field.onChange}
                disabled={(date) =>
                  date > new Date() ||
                  date > new Date().setFullYear(new Date().getFullYear() - 18)
                }
                placeholder="Enter your date of birth"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bookingDateTime"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Booking Date *</FormLabel>
            <FormControl>
              <DateInput
                value={field.value}
                onChange={field.onChange}
                disabled={(date) => date < new Date()}
                placeholder="Select booking date"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="deliveryDateTime"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Delivery Date *</FormLabel>
            <FormControl>
              <DateInput
                value={field.value}
                onChange={field.onChange}
                disabled={(date) =>
                  date < form.watch('bookingDateTime') || date < new Date()
                }
                placeholder="Select delivery date"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}